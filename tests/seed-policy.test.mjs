import { describe, expect, it } from 'vitest';
import { assertSafeSeedTarget, isSafeSeedTarget } from '../prisma/seed-policy.mjs';

describe('Folio seed database boundary', () => {
  it('allows only the local dedicated development database', () => {
    expect(isSafeSeedTarget('postgresql://localhost:5432/folio_dev')).toBe(true);
    expect(isSafeSeedTarget('postgres://127.0.0.1:5432/folio_dev')).toBe(true);
    expect(isSafeSeedTarget('postgresql://localhost:5432/folio')).toBe(false);
    expect(isSafeSeedTarget('postgresql://db.example.com:5432/folio_dev')).toBe(false);
    expect(isSafeSeedTarget('sqlite:///folio_dev.db')).toBe(false);
    expect(isSafeSeedTarget(undefined)).toBe(false);
  });

  it('refuses unsafe seed destinations with a clear error', () => {
    expect(() => assertSafeSeedTarget('postgresql://db.example.com/folio_dev'))
      .toThrow('DATABASE_URL must point to the local folio_dev PostgreSQL database.');
  });
});
