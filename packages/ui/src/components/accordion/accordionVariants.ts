import { createVariant } from '../../lib/variants/create-variant';

export const accordionVariants = createVariant({
  base: 'flex flex-col gap-2',
  variants: {
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
    variant: 'default'
  }
});

export const accordionItemVariants = createVariant({
  base: 'bg-surface rounded-lg overflow-hidden group',
  variants: {
    variant: {
      default: '',
      primary: 'ring-1 ring-primary/20',
      secondary: 'ring-1 ring-secondary/20',
      accent: 'ring-1 ring-accent/20',
      destructive: 'ring-1 ring-destructive/20',
      warning: 'ring-1 ring-warning/20'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
