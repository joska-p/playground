export type ColorVariant =
    'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'destructive';

export const COLOR_VARIANTS: ColorVariant[] = [
    'default',
    'primary',
    'secondary',
    'accent',
    'warning',
    'destructive'
];

/**
 * Single source of truth for variant colors — component CVA configs spread this, then add
 * overrides.
 */
export const COLOR_CLASSES: Record<ColorVariant, string> = {
    default: 'bg-surface-raised text-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    warning: 'bg-warning text-warning-foreground',
    destructive: 'bg-destructive text-destructive-foreground'
};

export const COLOR_VARIABLE_CLASSES: Record<ColorVariant, string> = {
    default: '[--variant-color:var(--foreground-dim)]',
    primary: '[--variant-color:var(--primary)]',
    secondary: '[--variant-color:var(--secondary)]',
    accent: '[--variant-color:var(--accent)]',
    warning: '[--variant-color:var(--warning)]',
    destructive: '[--variant-color:var(--destructive)]'
};

export const COLOR_GRADIENT_FROM: Record<ColorVariant, string> = {
    default: 'from-foreground-dim',
    primary: 'from-primary',
    secondary: 'from-secondary',
    accent: 'from-accent',
    warning: 'from-warning',
    destructive: 'from-destructive'
};
