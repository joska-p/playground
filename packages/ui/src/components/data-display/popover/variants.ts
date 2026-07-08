import { cva } from 'class-variance-authority';

export const popoverVariants = cva('', {
  variants: {
    variant: {
      default: 'border-t-foreground-dim/20',
      primary: 'border-t-primary',
      secondary: 'border-t-secondary',
      accent: 'border-t-accent',
      warning: 'border-t-warning',
      destructive: 'border-t-destructive',
      ghost: 'border-t-foreground',
      outline: 'border-t-foreground-dim'
    }
  },
  defaultVariants: { variant: 'default' }
});
