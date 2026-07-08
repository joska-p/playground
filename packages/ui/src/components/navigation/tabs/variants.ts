import { cva } from 'class-variance-authority';

export const tabUnderlineVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-surface-raised',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      warning: 'bg-warning',
      destructive: 'bg-destructive',
      ghost: 'bg-transparent',
      outline: 'bg-transparent'
    }
  },
  defaultVariants: { variant: 'primary' }
});
