import { createVariant } from '../../lib/variants/create-variant';

export const sliderVariants = createVariant({
  base: 'h-1.5 w-full cursor-pointer rounded-full outline-none',
  variants: {
    variant: {
      primary: 'accent-primary',
      secondary: 'accent-secondary',
      accent: 'accent-accent',
      destructive: 'accent-destructive',
      outline: 'accent-primary',
      ghost: 'accent-foreground'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
