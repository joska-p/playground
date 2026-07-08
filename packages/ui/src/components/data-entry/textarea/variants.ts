import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  'bg-surface text-foreground placeholder:text-foreground-dim w-full resize-y rounded-md p-3 text-[13px] transition-[border-color,box-shadow] duration-200 outline-none border-border border',
  {
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
      }
    },
    defaultVariants: { variant: 'primary' }
  }
);
