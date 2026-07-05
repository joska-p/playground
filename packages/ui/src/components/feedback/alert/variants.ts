import { cva } from 'class-variance-authority';

export const alertVariants = cva('rounded-lg px-4 py-3 flex items-start gap-3', {
  variants: {
    variant: {
      default: 'bg-foreground-dim/8',
      primary: 'bg-primary/8',
      secondary: 'bg-secondary/8',
      accent: 'bg-accent/8',
      warning: 'bg-warning/8',
      destructive: 'bg-destructive/8'
    }
  },
  defaultVariants: { variant: 'default' }
});
