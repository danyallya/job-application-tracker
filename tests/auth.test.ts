import { describe, expect, it, vi } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/password-hash.mjs";
import {
  createSessionToken,
  hashSessionToken,
  isValidSessionToken,
  resolveSession,
} from "@/lib/session-policy";

const user = { id: "user-1", email: "sample@folio.invalid", name: "Folio Sample Workspace" };

describe("Folio sign-in credentials", () => {
  it("stores a salted scrypt hash and verifies only the matching password", async () => {
    const password = "local-sample-passphrase";
    const encoded = await hashPassword(password);

    expect(encoded).not.toContain(password);
    expect(await verifyPassword(password, encoded)).toBe(true);
    expect(await verifyPassword("different-passphrase", encoded)).toBe(false);
    expect(await verifyPassword(password, "not-a-password-hash")).toBe(false);
  });
});

describe("Folio protected session resolution", () => {
  const now = new Date("2026-11-01T10:00:00.000Z");

  it("keeps anonymous requests out of the session lookup", async () => {
    const findSession = vi.fn(async () => null);

    await expect(resolveSession(null, findSession, now)).resolves.toBeNull();
    expect(findSession).not.toHaveBeenCalled();
  });

  it("rejects expired sessions at the expiry boundary", async () => {
    const token = createSessionToken();
    const findSession = vi.fn(async () => ({ expiresAt: now, user }));

    await expect(resolveSession(token, findSession, now)).resolves.toBeNull();
    expect(findSession).toHaveBeenCalledWith(hashSessionToken(token));
  });

  it("accepts a live session and rejects malformed tokens before lookup", async () => {
    const token = createSessionToken();
    const findSession = vi.fn(async () => ({
      expiresAt: new Date(now.getTime() + 60_000),
      user,
    }));

    await expect(resolveSession(token, findSession, now)).resolves.toEqual(user);
    expect(isValidSessionToken(token)).toBe(true);
    expect(hashSessionToken(token)).not.toBe(token);
    expect(await resolveSession("invalid", findSession, now)).toBeNull();
    expect(findSession).toHaveBeenCalledTimes(1);
  });
});
