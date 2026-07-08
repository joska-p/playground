import { cva } from 'class-variance-authority';

export const switchVariants = cva('flex items-center gap-2.5 text-[13px] select-none', {
  variants: {
    variant: {
      default: 'checked:bg-surface-raised',
      primary: 'checked:bg-primary',
      secondary: 'checked:bg-secondary',
      accent: 'checked:bg-accent',
      warning: 'checked:bg-warning',
      destructive: 'checked:bg-destructive',
      ghost: 'checked:bg-transparent',
      outline: 'checked:bg-transparent'
    }
  },
  defaultVariants: { variant: 'primary' }
});
