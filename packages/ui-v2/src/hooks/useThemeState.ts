import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'pg-lab-theme';

/**
 * useThemeState — the state hook for <ThemeProvider>. `ThemeProvider` is a
 * stateless component; this hook is where the actual `useState` call and
 * DOM/localStorage side effects live.
 *
 *   const theme = useThemeState();
 *   <ThemeProvider theme={theme.theme} setTheme={theme.setTheme} toggleTheme={theme.toggleTheme}>
 */
export function useThemeState(defaultTheme: Theme = 'dark', persist = true) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    if (persist) {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'light') html.setAttribute('data-theme', 'light');
    else html.removeAttribute('data-theme');
    if (persist) window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, persist]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, setTheme, toggleTheme };
}
