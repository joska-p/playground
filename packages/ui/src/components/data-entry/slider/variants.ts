import { cva, type VariantProps } from 'class-variance-authority';

export const sliderVariants = cva(
  'h-1.5 w-full cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'accent-foreground-dim focus-visible:outline-foreground-dim',
        primary: 'accent-primary focus-visible:outline-primary',
        secondary: 'accent-secondary focus-visible:outline-secondary',
        accent: 'accent-accent focus-visible:outline-accent',
        warning: 'accent-warning focus-visible:outline-warning',
        destructive: 'accent-destructive focus-visible:outline-destructive'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export type SliderVariants = VariantProps<typeof sliderVariants>;
