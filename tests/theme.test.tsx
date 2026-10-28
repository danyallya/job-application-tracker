import { describe, expect, it } from 'vitest';
import { readFolioTheme, writeFolioTheme } from '../components/theme-preference';
describe('Folio appearance storage boundary', () => {
  it('restores explicit preferences and uses system fallback for invalid values', () => {
    expect(readFolioTheme({ getItem: () => 'dark', setItem: () => {} }, false)).toBe(true);
    expect(readFolioTheme({ getItem: () => 'light', setItem: () => {} }, true)).toBe(false);
    expect(readFolioTheme({ getItem: () => 'invalid', setItem: () => {} }, true)).toBe(true);
  });
  it('continues with disabled storage and writes only the appearance key', () => {
    const blocked = { getItem: () => { throw Error('blocked'); }, setItem: () => { throw Error('blocked'); } };
    expect(readFolioTheme(blocked, false)).toBe(false);
    expect(() => writeFolioTheme(blocked, true)).not.toThrow();
    const written: string[] = [];
    writeFolioTheme({ getItem: () => null, setItem: (key, value) => { written.push(key, value); } }, true);
    expect(written).toEqual(['folio-theme', 'dark']);
  });
});
