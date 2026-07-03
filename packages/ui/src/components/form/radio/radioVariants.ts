import { cva } from 'class-variance-authority';

export const radioVariants = cva(
  'appearance-none shrink-0 cursor-pointer rounded-full border border-border bg-surface transition-all duration-200 checked:border-none disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        primary: 'checked:bg-primary',
        secondary: 'checked:bg-secondary',
        accent: 'checked:bg-accent',
        destructive: 'checked:bg-destructive',
        warning: 'checked:bg-warning',
        generative: 'checked:bg-category-generative',
        color: 'checked:bg-category-color',
        image: 'checked:bg-category-image',
        'data-viz': 'checked:bg-category-data-viz',
        random: 'checked:bg-category-random',
        simulation: 'checked:bg-category-simulation'
      },
      size: {
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);
