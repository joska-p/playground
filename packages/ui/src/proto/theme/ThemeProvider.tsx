import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "pg-lab-theme";

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  if (theme === "light") html.setAttribute("data-theme", "light");
  else html.removeAttribute("data-theme");
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Defaults to "dark" — mirrors the source design's `:root` default. */
  defaultTheme?: Theme;
  /** Persist choice to localStorage. Defaults to true. */
  persist?: boolean;
}

/**
 * Wrap your app once:
 *   <ThemeProvider><App /></ThemeProvider>
 *
 * Progressive enhancement note: the design is fully usable with no theme
 * toggle at all (dark is the CSS `:root` default) — this provider only
 * adds the optional light-mode switch on top.
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
  persist = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    if (persist) {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark") return stored;
    }
    return defaultTheme;
  });

  useEffect(() => {
    applyTheme(theme);
    if (persist) window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, persist]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "light" ? "dark" : "light")),
    []
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
  return ctx;
}
