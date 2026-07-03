import { cva } from 'class-variance-authority';

export const accordionVariants = cva({
  base: 'flex flex-col gap-2',
  variants: {
    variant: {
      default: 'bg-surface rounded-lg',
      primary: 'bg-primary/[3%] rounded-lg',
      secondary: 'bg-secondary/[3%] rounded-lg',
      accent: 'bg-accent/[3%] rounded-lg',
      destructive: 'bg-destructive/[3%] rounded-lg',
      warning: 'bg-warning/[3%] rounded-lg'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export const accordionItemVariants = cva({
  base: 'bg-surface rounded-lg overflow-hidden group ring-1',
  variants: {
    variant: {
      default: 'ring-border/20',
      primary: 'bg-primary/5 ring-primary/20',
      secondary: 'bg-secondary/5 ring-secondary/20',
      accent: 'bg-accent/5 ring-accent/20',
      destructive: 'bg-destructive/5 ring-destructive/20',
      warning: 'bg-warning/5 ring-warning/20'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
