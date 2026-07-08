import { cva } from 'class-variance-authority';

export const heroVariants = cva('backdrop-blur-lg', {
  variants: {
    variant: {
      default: 'bg-surface-raised/5 text-foreground-dim from-foreground-dim',
      primary: 'bg-primary/5 text-primary from-primary',
      secondary: 'bg-secondary/5 text-secondary from-secondary',
      accent: 'bg-accent/5 text-accent from-accent',
      warning: 'bg-warning/5 text-warning from-warning',
      destructive: 'bg-destructive/5 text-destructive from-destructive',
      ghost: 'text-foreground',
      outline: 'bg-transparent text-foreground-dim border border-border'
    }
  },
  defaultVariants: { variant: 'primary' }
});
