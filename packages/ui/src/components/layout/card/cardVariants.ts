import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  'overflow-hidden rounded-lg bg-surface shadow-sm transition-all duration-200 border border-transparent',
  {
    variants: {
      variant: {
        default: 'hover:border-border',
        primary: 'border-primary/20 hover:border-primary/40',
        secondary: 'border-secondary/20 hover:border-secondary/40',
        // Interactive variant maintains high-contrast state
        interactive:
          'hover:shadow-md hover:bg-surface-raised has-[.card-actions:hover]:ring-2 has-[.card-actions:hover]:ring-primary/10'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);
