import { cva } from 'class-variance-authority';

export const defaultFallbackVariants = cva('flex h-full items-center justify-center', {
  variants: {
    variant: {
      destructive: 'bg-destructive/5',
      primary: 'bg-primary/5',
      secondary: 'bg-secondary/5',
      accent: 'bg-accent/5',
      outline: 'border-border/30 border',
      ghost: 'bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'destructive'
  }
});

export const fallbackIconVariants = cva(
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        destructive: 'bg-destructive/10 text-destructive',
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        accent: 'bg-accent/10 text-accent',
        outline: 'bg-muted text-muted-foreground',
        ghost: 'bg-muted text-muted-foreground'
      }
    },
    defaultVariants: {
      variant: 'destructive'
    }
  }
);
