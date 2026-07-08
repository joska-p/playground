import { cva } from 'class-variance-authority';

export const notificationItemVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-surface-raised/15 text-foreground-dim',
      primary: 'bg-primary/15 text-primary',
      secondary: 'bg-secondary/15 text-secondary',
      accent: 'bg-accent/15 text-accent',
      warning: 'bg-warning/15 text-warning',
      destructive: 'bg-destructive/15 text-destructive',
      ghost: 'text-foreground',
      outline: 'bg-transparent text-foreground-dim border border-border'
    }
  },
  defaultVariants: { variant: 'primary' }
});
