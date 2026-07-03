import { cva } from 'class-variance-authority';

export const cardVariants = cva({
  base: 'bg-surface rounded-lg overflow-hidden transition-shadow duration-200 shadow-sm',
  variants: {
    variant: {
      default: 'bg-surface',
      primary: 'bg-primary/5',
      secondary: 'bg-secondary/5',
      accent: 'bg-accent/5',
      destructive: 'bg-destructive/5',
      warning: 'bg-warning/5',
      interactive:
        'hover:shadow-md has-[.card-actions:hover]:shadow-md has-[.card-actions:hover]:ring-2 has-[.card-actions:hover]:ring-primary/10'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
