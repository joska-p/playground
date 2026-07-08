import { cva } from 'class-variance-authority';

export const inputWrapperVariants = cva('bg-surface flex items-center gap-2 rounded-md px-3', {
  variants: {
    variant: {
      default:
        'focus-within:border-foreground-dim focus-within:ring-[3px] focus-within:ring-foreground-dim/15 focus-within:text-foreground-dim',
      primary:
        'focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/15 focus-within:text-primary',
      secondary:
        'focus-within:border-secondary focus-within:ring-[3px] focus-within:ring-secondary/15 focus-within:text-secondary',
      accent:
        'focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent/15 focus-within:text-accent',
      warning:
        'focus-within:border-warning focus-within:ring-[3px] focus-within:ring-warning/15 focus-within:text-warning',
      destructive:
        'focus-within:border-destructive focus-within:ring-[3px] focus-within:ring-destructive/15 focus-within:text-destructive',
      ghost:
        'focus-within:border-transparent focus-within:ring-[3px] focus-within:ring-transparent focus-within:text-foreground',
      outline:
        'focus-within:border-foreground-dim focus-within:ring-[3px] focus-within:ring-foreground-dim/15 focus-within:text-foreground-dim'
    },
    expandable: {
      true: 'search-expandable',
      false: 'w-full'
    }
  },
  defaultVariants: { variant: 'primary', expandable: false }
});
