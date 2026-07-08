/**
 * Shared color-variant system.
 * -----------------------------
 * Every component in this library accepts the same `variant` prop with
 * these values: default, primary, secondary, accent, warning, destructive,
 * ghost, outline.
 *
 * `COLOR_CLASSES` is the single source of truth mapping each variant to
 * its canonical bg + text Tailwind classes. CVA variant configs in
 * individual components spread this object and add any overrides.
 */

export type ColorVariant =
  'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'destructive' | 'ghost' | 'outline';

export const COLOR_VARIANTS: ColorVariant[] = [
  'default',
  'primary',
  'secondary',
  'accent',
  'warning',
  'destructive',
  'ghost',
  'outline'
];

/** Canonical bg + text Tailwind classes per variant. */
export const COLOR_CLASSES: Record<ColorVariant, string> = {
  default: 'bg-surface-raised text-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  warning: 'bg-warning text-warning-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  ghost: 'text-foreground',
  outline: 'text-foreground-dim border border-border bg-transparent'
};

/** Gradient `from-` stop class per variant, for gradient headings and accents. */
export const COLOR_GRADIENT_FROM: Record<ColorVariant, string> = {
  default: 'from-foreground-dim',
  primary: 'from-primary',
  secondary: 'from-secondary',
  accent: 'from-accent',
  warning: 'from-warning',
  destructive: 'from-destructive',
  ghost: 'from-foreground',
  outline: 'from-foreground-dim'
};
