import { cva } from 'class-variance-authority';

export const defaultFallbackVariants = cva({
  base: 'flex items-center justify-center h-full',
  variants: {
    variant: {
      primary: 'bg-primary/5',
      secondary: 'bg-secondary/5',
      accent: 'bg-accent/5',
      destructive: 'bg-destructive/5',
      outline: 'border-border/30 border',
      ghost: 'bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'destructive'
  }
});
