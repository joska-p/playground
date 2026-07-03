import { createVariant } from '../../../lib/variants/create-variant';

export const checkboxVariants = createVariant({
  base: 'appearance-none h-4 w-4 shrink-0 cursor-pointer rounded border border-border bg-surface transition-colors duration-200  disabled:cursor-not-allowed disabled:opacity-70',
  variants: {
    variant: {
      primary: 'checked:bg-primary checked:border-primary',
      secondary: 'checked:bg-secondary checked:border-secondary',
      accent: 'checked:bg-accent checked:border-accent',
      destructive: 'checked:bg-destructive checked:border-destructive',
      warning: 'checked:bg-warning checked:border-warning',
      outline: 'checked:bg-transparent checked:border-accent'
    },
    size: {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});
