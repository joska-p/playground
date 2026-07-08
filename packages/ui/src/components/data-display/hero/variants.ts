import { cva } from 'class-variance-authority';

export const heroVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-surface-raised/15 text-foreground-dim from-foreground-dim',
      primary: 'bg-primary/15 text-primary from-primary',
      secondary: 'bg-secondary/15 text-secondary from-secondary',
      accent: 'bg-accent/15 text-accent from-accent',
      warning: 'bg-warning/15 text-warning from-warning',
      destructive: 'bg-destructive/15 text-destructive from-destructive',
      ghost: 'text-foreground',
      outline: 'bg-transparent text-foreground-dim border border-border'
    }
  },
  defaultVariants: { variant: 'primary' }
});
