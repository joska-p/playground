import { createContext, useContext, type ReactNode } from "react";
import type { Theme } from "../hooks/useThemeState";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  children: ReactNode;
}

/**
 * ThemeProvider — stateless. It never calls `useState` itself; `theme`,
 * `setTheme`, and `toggleTheme` are supplied by the caller (typically from
 * the `useThemeState` hook) and simply relayed through context. Dark is
 * the CSS `:root` default, so this provider is entirely optional — apps
 * that never render it still get the dark theme for free.
 */
export function ThemeProvider({ theme, setTheme, toggleTheme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
  return ctx;
}
