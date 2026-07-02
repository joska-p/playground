import { createVariant } from '../../lib/variants/create-variant';

export const alertVariants = createVariant({
  base: 'flex items-start gap-3 rounded-lg px-4 py-3',
  variants: {
    variant: {
      info: 'bg-primary/8',
      success: 'bg-secondary/8',
      warning: 'bg-warning/8',
      error: 'bg-destructive/8'
    }
  },
  defaultVariants: {
    variant: 'info'
  }
});
