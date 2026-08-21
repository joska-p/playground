import { type ReactNode } from 'react';

import { ThemeContext } from './useTheme';

import type { Theme } from '../hooks/useThemeState';

export interface ThemeProviderProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    children: ReactNode;
}

/**
 * Stateless relay — state comes from the caller (useThemeState). Optional: dark is the CSS `:root`
 * default, so the app works even without rendering this.
 */
export function ThemeProvider({ theme, setTheme, toggleTheme, children }: ThemeProviderProps) {
    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
