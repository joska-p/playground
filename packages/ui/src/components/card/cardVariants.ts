import { createVariant } from '../../lib/variants/create-variant';

export const cardVariants = createVariant({
  base: 'bg-surface rounded-lg overflow-hidden transition-shadow duration-200',
  variants: {
    variant: {
      primary: 'shadow-sm',
      interactive:
        'shadow-sm hover:shadow-md has-[.card-actions:hover]:shadow-md has-[.card-actions:hover]:ring-2 has-[.card-actions:hover]:ring-primary/10'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
