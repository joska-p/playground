import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ColorVariant } from '../../../lib/colorVariant';

export const defaultFallbackVariants = cva(
  'bg-surface rounded-lg border-l-4 p-5 flex flex-col items-start gap-3',
  {
    variants: {
      variant: {
        default: 'bg-surface-raised text-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        warning: 'bg-warning text-warning-foreground',
        destructive: 'bg-destructive text-destructive-foreground'
      }
    },
    defaultVariants: { variant: 'destructive' }
  }
);

export const fallbackIconColor: Record<ColorVariant, string> = {
  default: 'text-foreground-dim',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  warning: 'text-warning',
  destructive: 'text-destructive',
  ghost: 'text-sm',
  outline: 'border-border border'
};

export type DefaultFallbackVariants = VariantProps<typeof defaultFallbackVariants>;
export type FallbackIconColor = typeof fallbackIconColor;
