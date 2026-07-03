import { cva } from 'class-variance-authority';

export const alertVariants = cva({
  base: 'flex items-start gap-3 rounded-lg px-4 py-3',
  variants: {
    variant: {
      primary: 'bg-primary/8',
      secondary: 'bg-secondary/8',
      accent: 'bg-accent/8',
      destructive: 'bg-destructive/8',
      warning: 'bg-warning/8'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
