import { createVariant } from '../../../lib/variants/create-variant';

export const sliderVariants = createVariant({
  base: 'h-1.5 w-full cursor-pointer rounded-full outline-none',
  variants: {
    variant: {
      default: ''
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
