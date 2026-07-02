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
      primary: 'bg-primary/5 ring-1 ring-primary/20',
      secondary: 'bg-secondary/5 ring-1 ring-secondary/20',
      accent: 'bg-accent/5 ring-1 ring-accent/20',
      destructive: 'bg-destructive/5 ring-1 ring-destructive/20',
      warning: 'bg-warning/5 ring-1 ring-warning/20'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
