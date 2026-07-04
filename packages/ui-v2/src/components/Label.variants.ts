import { cva } from 'class-variance-authority';

export const labelVariants = cva('font-medium select-none inline-flex items-center gap-1', {
  variants: {
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      warning: 'text-warning',
      destructive: 'text-destructive'
    },
    size: {
      sm: 'text-xs',
      default: 'text-[13px]',
      lg: 'text-sm'
    },
    disabled: {
      true: 'opacity-40 cursor-not-allowed',
      false: 'cursor-pointer'
    }
  },
  defaultVariants: { variant: 'default', size: 'default', disabled: false }
});
