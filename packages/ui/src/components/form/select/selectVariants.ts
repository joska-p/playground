import { cva } from 'class-variance-authority';

export const selectVariants = cva(
  'w-full appearance-none rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70',
  {
    variants: {
      variant: {
        primary: 'focus-visible:border-primary',
        secondary: 'focus-visible:border-secondary',
        accent: 'focus-visible:border-accent',
        destructive: 'focus-visible:border-destructive',
        warning: 'focus-visible:border-warning',
        generative: 'focus-visible:border-category-generative',
        color: 'focus-visible:border-category-color',
        image: 'focus-visible:border-category-image',
        'data-viz': 'focus-visible:border-category-data-viz',
        random: 'focus-visible:border-category-random',
        simulation: 'focus-visible:border-category-simulation'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);
