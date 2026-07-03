import { cva } from 'class-variance-authority';

export const toastVariants = cva({
  base: 'bg-surface text-foreground flex items-start gap-3 rounded-lg px-4 py-3 shadow-lg min-w-72 starting:opacity-0 starting:translate-x-10 starting:scale-95 animate-[toastIn_0.4s_cubic-bezier(0.4,0,0.2,1)_both]',
  variants: {
    variant: {
      default: 'border-l-4 border-primary',
      primary: 'border-l-4 border-primary bg-primary/5',
      secondary: 'border-l-4 border-secondary bg-secondary/5',
      accent: 'border-l-4 border-accent bg-accent/5',
      destructive: 'border-l-4 border-destructive bg-destructive/5',
      warning: 'border-l-4 border-warning bg-warning/5'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
