// Core Utilities
export { cn } from './lib/cn';
export { COLOR_VARIANTS, colorVar, colorVarStyle, type ColorVariant } from './lib/colorVariant';

// Theme
export { useThemeState, type Theme } from './hooks/useThemeState';
export { ThemeProvider, type ThemeProviderProps } from './theme/ThemeProvider';
export { useTheme } from './theme/useTheme';

// Section Barrels (convenience)
export * from './components/control-panel';
export * from './components/data-display';
export * from './components/data-entry';
export * from './components/feedback';
export * from './components/navigation';
export * from './components/widgets';

// Important Individual Hooks
export { useFloatingNavState, type FloatingNavState } from './hooks/useFloatingNavState';
export { useResizeObserver } from './hooks/useResizeObserver';
export { useScrollRevealState } from './hooks/useScrollRevealState';
export { useSidebarState, type SidebarState } from './hooks/useSidebarState';
export { useTabsState } from './hooks/useTabsState';
export { useToastQueue, type ToastItem, type ToastOptions } from './hooks/useToastQueue';

// Icons
export { Icon } from './components/icons/Icon';
export { iconMap, type IconName } from './components/icons/iconMap';
export { createIcon } from './components/icons/lib';
export type { IconProps } from './components/icons/lib';

// App-specific Cards
export * from './components/cards';
