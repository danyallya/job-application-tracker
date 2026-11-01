import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';

function deriveKey(password, salt, keyLength) {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, keyLength, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await deriveKey(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${key.toString('hex')}`;
}

export async function verifyPassword(password, encodedHash) {
  if (typeof password !== 'string' || typeof encodedHash !== 'string') return false;
  const [algorithm, saltHex, keyHex, extra] = encodedHash.split('$');
  if (algorithm !== 'scrypt' || extra !== undefined) return false;
  if (!/^[0-9a-f]{32}$/i.test(saltHex ?? '') || !/^[0-9a-f]{128}$/i.test(keyHex ?? '')) return false;

  const salt = Buffer.from(saltHex, 'hex');
  const expectedKey = Buffer.from(keyHex, 'hex');
  const actualKey = await deriveKey(password, salt, expectedKey.length);
  return timingSafeEqual(actualKey, expectedKey);
}
