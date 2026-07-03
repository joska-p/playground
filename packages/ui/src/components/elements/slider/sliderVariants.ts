import { cva } from 'class-variance-authority';

export const sliderVariants = cva({
  base: 'h-1.5 w-full cursor-pointer rounded-full outline-none',
  variants: {
    variant: {
      primary: 'accent-primary',
      secondary: 'accent-secondary',
      accent: 'accent-accent',
      destructive: 'accent-destructive',
      warning: 'accent-warning'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
