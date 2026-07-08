import { cva } from 'class-variance-authority';

export const switchVariants = cva('', {
  variants: {
    variant: {
      default: 'peer-checked:bg-surface-raised',
      primary: 'peer-checked:bg-primary',
      secondary: 'peer-checked:bg-secondary',
      accent: 'peer-checked:bg-accent',
      warning: 'peer-checked:bg-warning',
      destructive: 'peer-checked:bg-destructive',
      ghost: 'peer-checked:bg-transparent',
      outline: 'peer-checked:bg-transparent'
    }
  },
  defaultVariants: { variant: 'primary' }
});
