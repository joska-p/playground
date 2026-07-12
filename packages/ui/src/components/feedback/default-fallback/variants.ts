import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ColorVariant } from '../../../lib/colorVariant';

export const defaultFallbackVariants = cva(
  'bg-surface rounded-lg border-l-4 p-5 flex backdrop-blur flex-col items-start gap-3',
  {
    variants: {
      variant: {
        default: 'bg-surface-raised text-foreground',
        primary: 'bg-primary/15 text-primary-foreground',
        secondary: 'bg-secondary/15 text-secondary-foreground',
        accent: 'bg-accent/15 text-accent-foreground',
        warning: 'bg-warning/15 text-warning-foreground',
        destructive: 'bg-destructive/15 text-destructive-foreground'
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
  destructive: 'text-destructive'
};

export type DefaultFallbackVariants = VariantProps<typeof defaultFallbackVariants>;
export type FallbackIconColor = typeof fallbackIconColor;
