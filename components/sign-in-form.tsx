"use client";

import { useActionState } from "react";
import { signIn } from "@/app/sign-in/actions";

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, null);
  const error = state === "invalid"
    ? "Email or password is incorrect."
    : state === "unavailable"
      ? "Sign in is temporarily unavailable. Please try again."
      : null;

  return (
    <form className="auth-form" action={action}>
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="username" maxLength={254} required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" maxLength={128} required />
      <p className="auth-error" aria-live="polite">{error}</p>
      <button className="auth-submit" type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
