const loopbackHosts = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

export function isSafeSeedTarget(databaseUrl) {
  if (typeof databaseUrl !== 'string' || databaseUrl.length === 0) return false;

  try {
    const url = new URL(databaseUrl);
    const databaseName = url.pathname.replace(/^\//, '');
    return ['postgres:', 'postgresql:'].includes(url.protocol)
      && loopbackHosts.has(url.hostname.toLowerCase())
      && databaseName === 'folio_dev';
  } catch {
    return false;
  }
}

export function assertSafeSeedTarget(databaseUrl) {
  if (!isSafeSeedTarget(databaseUrl)) {
    throw new Error('Refusing to seed: DATABASE_URL must point to the local folio_dev PostgreSQL database.');
  }
}
