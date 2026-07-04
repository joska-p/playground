import { cva } from 'class-variance-authority';

export const carouselSlideVariants = cva(
  'min-w-0 shrink-0 snap-center focus-visible:outline-none focus-visible:ring-2 p-4 border focus-visible:ring-ring rounded-md',
  {
    variants: {
      size: {
        sm: 'w-44',
        md: 'w-60',
        lg: 'w-80'
      },
      variant: {
        default: 'bg-surface  border-border  text-foreground',
        surface: 'bg-surface-raised  border-border  text-foreground'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
);
