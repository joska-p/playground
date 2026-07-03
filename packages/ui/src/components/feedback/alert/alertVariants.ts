import { createVariant } from '../../../lib/variants/create-variant';

export const alertVariants = createVariant({
  base: 'flex items-start gap-3 rounded-lg px-4 py-3',
  variants: {
    variant: {
      default: 'bg-primary/8',
      primary: 'bg-primary/8',
      secondary: 'bg-secondary/8',
      accent: 'bg-accent/8',
      destructive: 'bg-destructive/8',
      warning: 'bg-warning/8'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
