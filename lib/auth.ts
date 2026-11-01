import "server-only";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createSessionToken, hashSessionToken, resolveSession } from "@/lib/session-policy";

export const SESSION_COOKIE = "folio-session";
export const SESSION_LIFETIME_SECONDS = 60 * 60 * 24 * 7;

export async function createSession(userId: string) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_LIFETIME_SECONDS * 1000);
  await prisma.session.create({
    data: { userId, tokenHash: hashSessionToken(token), expiresAt },
  });
  return { token, expiresAt };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return resolveSession(token, async (tokenHash) => {
    const session = await prisma.session.findUnique({
      where: { tokenHash },
      select: { expiresAt: true, user: { select: { id: true, email: true, name: true } } },
    });
    return session;
  });
}

export function sessionCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}
