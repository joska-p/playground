import { createVariant } from '../../lib/variants/create-variant';

export const cardVariants = createVariant({
  base: 'bg-surface rounded-lg overflow-hidden transition-shadow duration-200 shadow-sm',
  variants: {
    variant: {
      default: '',
      primary: '',
      secondary: '',
      accent: '',
      destructive: '',
      warning: '',
      interactive:
        'hover:shadow-md has-[.card-actions:hover]:shadow-md has-[.card-actions:hover]:ring-2 has-[.card-actions:hover]:ring-primary/10'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
