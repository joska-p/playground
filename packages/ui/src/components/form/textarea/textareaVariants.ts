import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70 field-sizing:content min-h-20',
  {
    variants: {
      variant: {
        primary: 'focus-visible:border-primary',
        secondary: 'focus-visible:border-secondary',
        accent: 'focus-visible:border-accent',
        destructive: 'focus-visible:border-destructive',
        warning: 'focus-visible:border-warning'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);
