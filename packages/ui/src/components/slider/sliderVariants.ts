import { createVariant } from '../../lib/variants/create-variant';

export const sliderVariants = createVariant({
  base: 'h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none',
  variants: {
    variant: {
      default: 'accent-primary',
      primary: 'accent-primary',
      secondary: 'accent-secondary',
      accent: 'accent-accent',
      destructive: 'accent-destructive',
      warning: 'accent-warning'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
