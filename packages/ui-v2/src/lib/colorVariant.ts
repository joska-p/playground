/**
 * Shared color-variant system.
 * -----------------------------
 * Every component in this library accepts the same `variant` prop with
 * these six values: one neutral `default` plus the five semantic tokens
 * defined in globals.css (primary, secondary, accent, warning, destructive).
 *
 * Two helpers are exported:
 *  - `colorVar(variant)` returns the raw CSS var (e.g. "var(--primary)"),
 *    for components that key off a single `--_color` custom property
 *    (badges, the toggle switch, tab indicators, card glow, accents...).
 *  - `colorVariant` is the shared type used across every component's props.
 */

import type { CSSProperties } from 'react';

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

/** Raw CSS custom-property reference for a given variant. */
export function colorVar(variant: ColorVariant = 'default'): string {
  const map: Record<ColorVariant, string> = {
    default: 'var(--foreground-dim)',
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
    warning: 'var(--warning)',
    destructive: 'var(--destructive)'
  };
  return map[variant];
}

/** Convenience style object for components using the `--_color` pattern. */
export function colorVarStyle(
  variant: ColorVariant = 'default',
  extra?: CSSProperties
): CSSProperties {
  return { ['--_color' as string]: colorVar(variant), ...extra };
}
