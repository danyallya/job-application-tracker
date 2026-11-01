import { createHash, randomBytes } from "node:crypto";

export type SessionUser = { id: string; email: string; name: string };
export type SessionRecord = { expiresAt: Date; user: SessionUser };

const SESSION_TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function isValidSessionToken(token: string | null | undefined): token is string {
  return typeof token === "string" && SESSION_TOKEN_PATTERN.test(token);
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function resolveSession(
  token: string | null | undefined,
  findSession: (tokenHash: string) => Promise<SessionRecord | null>,
  now = new Date(),
): Promise<SessionUser | null> {
  if (!isValidSessionToken(token)) return null;
  const session = await findSession(hashSessionToken(token));
  if (!session || session.expiresAt.getTime() <= now.getTime()) return null;
  return session.user;
}
