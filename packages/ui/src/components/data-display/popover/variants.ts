import { cva, type VariantProps } from 'class-variance-authority';

export const popoverVariants = cva('bg-surface rounded-lg border-t-2 p-4', {
  variants: {
    variant: {
      default: 'border-t-foreground-dim/20',
      primary: 'border-t-primary',
      secondary: 'border-t-secondary',
      accent: 'border-t-accent',
      warning: 'border-t-warning',
      destructive: 'border-t-destructive'
    }
  },
  defaultVariants: { variant: 'default' }
});

export type PopoverVariants = VariantProps<typeof popoverVariants>;
