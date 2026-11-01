"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/password-hash.mjs";
import { createSession, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type SignInState = "invalid" | "unavailable" | null;

export async function signIn(_previousState: SignInState, formData: FormData): Promise<SignInState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  if (typeof emailValue !== "string" || typeof passwordValue !== "string") return "invalid";

  const email = emailValue.trim().toLowerCase();
  if (!email || email.length > 254 || !email.includes("@") || passwordValue.length === 0 || passwordValue.length > 128) {
    return "invalid";
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });
    if (!user?.passwordHash || !(await verifyPassword(passwordValue, user.passwordHash))) return "invalid";

    const { token, expiresAt } = await createSession(user.id);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      ...sessionCookieOptions(expiresAt),
      maxAge: Math.floor((expiresAt.getTime() - Date.now()) / 1000),
    });
  } catch {
    return "unavailable";
  }

  redirect("/workspace");
}
