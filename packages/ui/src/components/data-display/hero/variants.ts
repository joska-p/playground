import { cva, type VariantProps } from 'class-variance-authority';

export const heroVariants = cva('backdrop-blur-xs', {
  variants: {
    variant: {
      default: 'bg-surface-raised/5 text-foreground-dim from-foreground-dim',
      primary: 'bg-primary/5 text-primary from-primary',
      secondary: 'bg-secondary/5 text-secondary from-secondary',
      accent: 'bg-accent/5 text-accent from-accent',
      warning: 'bg-warning/5 text-warning from-warning',
      destructive: 'bg-destructive/5 text-destructive from-destructive',
      ghost: 'text-foreground backdrop-blur-none bg-transparent'
    }
  },
  defaultVariants: { variant: 'primary' }
});

export type HeroVariants = VariantProps<typeof heroVariants>;
