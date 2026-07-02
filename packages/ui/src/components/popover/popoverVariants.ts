import { createVariant } from '../../lib/variants/create-variant';

export const popoverContentVariants = createVariant({
  base: 'bg-surface rounded-lg shadow-lg pointer-events-none absolute z-50 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100',
  variants: {
    side: {
      top: 'left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)]',
      bottom: 'left-1/2 -translate-x-1/2 top-[calc(100%+12px)]',
      left: 'top-1/2 -translate-y-1/2 right-[calc(100%+12px)]',
      right: 'top-1/2 -translate-y-1/2 left-[calc(100%+12px)]'
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
    side: 'top',
    variant: 'default'
  }
});
