import { cva } from 'class-variance-authority';

export const carouselSlideVariants = cva({
  base: 'shrink-0 scroll-snap-align-center',
  variants: {
    size: {
      sm: 'w-32',
      md: 'w-60',
      lg: 'w-80'
    },
    variant: {
      default: 'bg-surface',
      primary: 'bg-primary/5',
      secondary: 'bg-secondary/5',
      accent: 'bg-accent/5',
      destructive: 'bg-destructive/5',
      warning: 'bg-warning/5'
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'default'
  }
});
