export type PreferenceStore = Pick<Storage, 'getItem' | 'setItem'>;
export function readFolioTheme(store: PreferenceStore, prefersDark: boolean): boolean {
  try {
    const saved = store.getItem('folio-theme');
    return saved === 'dark' ? true : saved === 'light' ? false : prefersDark;
  } catch { return prefersDark; }
}
export function writeFolioTheme(store: PreferenceStore, dark: boolean): void {
  try { store.setItem('folio-theme', dark ? 'dark' : 'light'); } catch { /* Appearance remains session-local. */ }
}
