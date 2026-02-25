/**
 * Theme management utility.
 * Handles theme persistence (localStorage), resolution (system preference),
 * and application (data-theme attribute on <html>).
 */

export type Theme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'md2pdf-theme';
const THEMES: Theme[] = ['light', 'dark', 'system'];

/** Reads the stored theme from localStorage. Defaults to 'system'. */
export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && THEMES.includes(stored as Theme)) {
    return stored as Theme;
  }
  return 'system';
}

/** Persists the theme choice to localStorage. */
export function storeTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme);
}

/** Resolves 'system' to the actual OS preference; returns 'light' or 'dark'. */
export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

/** Returns the next theme in the cycle: light → dark → system → light. */
export function cycleTheme(current: Theme): Theme {
  const index = THEMES.indexOf(current);
  return THEMES[(index + 1) % THEMES.length];
}

/**
 * Applies the theme to the document.
 * Sets `data-theme` on <html> and toggles the `dark` class.
 */
export function applyTheme(theme: Theme): void {
  const effective = resolveTheme(theme);
  document.documentElement.dataset.theme = effective;

  if (effective === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
