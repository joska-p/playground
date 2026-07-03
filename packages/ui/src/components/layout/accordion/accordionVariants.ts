import { cva } from 'class-variance-authority';

export const accordionVariants = cva('flex flex-col gap-2', {
  variants: {
    variant: {
      default: '',
      primary: 'rounded-lg bg-primary/5',
      secondary: 'rounded-lg bg-secondary/5',
      accent: 'rounded-lg bg-accent/5',
      destructive: 'rounded-lg bg-destructive/5',
      warning: 'rounded-lg bg-warning/5',
      generative: 'rounded-lg bg-category-generative/5',
      color: 'rounded-lg bg-category-color/5',
      image: 'rounded-lg bg-category-image/5',
      'data-viz': 'rounded-lg bg-category-data-viz/5',
      random: 'rounded-lg bg-category-random/5',
      simulation: 'rounded-lg bg-category-simulation/5'
    }
  },
  defaultVariants: { variant: 'default' }
});

export const accordionItemVariants = cva('group overflow-hidden rounded-lg bg-surface', {
  variants: {
    variant: {
      default: 'border border-border',
      primary: 'ring-1 ring-primary/20',
      secondary: 'ring-1 ring-secondary/20',
      accent: 'ring-1 ring-accent/20',
      destructive: 'ring-1 ring-destructive/20',
      warning: 'ring-1 ring-warning/20'
    }
  },
  defaultVariants: { variant: 'default' }
});
