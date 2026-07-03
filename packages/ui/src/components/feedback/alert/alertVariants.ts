import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'flex items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors',
  {
    variants: {
      variant: {
        primary: 'border-primary/20 bg-primary/10 text-foreground',
        secondary: 'border-secondary/20 bg-secondary/10 text-foreground',
        accent: 'border-accent/20 bg-accent/10 text-foreground',
        destructive: 'border-destructive/20 bg-destructive/10 text-foreground',
        warning: 'border-warning/20 bg-warning/10 text-foreground'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);
