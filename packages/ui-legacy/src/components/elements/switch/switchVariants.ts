import { cva } from 'class-variance-authority';

export const switchVariants = cva(
  [
    // Base track styling
    'peer relative inline-flex shrink-0 cursor-pointer appearance-none items-center rounded-full border-2 border-transparent bg-input transition-colors',
    // Accessible focus and disabled states
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
    // Thumb styling (rendered via ::after pseudo-element)
    'after:absolute after:left-0 after:rounded-full after:bg-background after:shadow-sm after:transition-transform after:content-[""]'
  ],
  {
    variants: {
      variant: {
        primary: 'checked:bg-primary',
        secondary: 'checked:bg-secondary',
        accent: 'checked:bg-accent',
        destructive: 'checked:bg-destructive',
        generative: 'checked:bg-category-generative'
      },
      size: {
        sm: 'h-5 w-9 after:h-4 after:w-4 checked:after:translate-x-4',
        md: 'h-6 w-11 after:h-5 after:w-5 checked:after:translate-x-5',
        lg: 'h-8 w-14 after:h-7 after:w-7 checked:after:translate-x-6'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);
