import { createVariant } from '../../lib/variants/create-variant';

export const carouselSlideVariants = createVariant({
  base: 'flex-shrink-0 scroll-snap-align-center',
  variants: {
    size: {
      sm: 'w-[180px]',
      md: 'w-[240px]',
      lg: 'w-[320px]'
    },
    variant: {
      default: '',
      primary: '',
      secondary: '',
      accent: '',
      destructive: '',
      warning: ''
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'default'
  }
});
