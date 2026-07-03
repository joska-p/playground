import { cva } from 'class-variance-authority';

export const toastVariants = cva(
  'bg-surface text-foreground flex items-start gap-3 rounded-lg border-y border-r border-l-4 border-y-border border-r-border px-4 py-3 shadow-lg min-w-72 starting:opacity-0 starting:translate-x-10 starting:scale-95 animate-[toastIn_0.4s_cubic-bezier(0.4,0,0.2,1)_both]',
  {
    variants: {
      variant: {
        default: 'border-l-border',
        primary: 'border-l-primary',
        secondary: 'border-l-secondary',
        accent: 'border-l-accent',
        destructive: 'border-l-destructive',
        warning: 'border-l-warning'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);
