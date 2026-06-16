import { createVariant } from '../../lib/variants/create-variant';

export const defaultFallbackVariants = createVariant({
  base: 'flex items-center justify-center',
  variants: {
    variant: {
      destructive: 'bg-destructive/5',
      primary: 'bg-primary/5',
      secondary: 'bg-secondary/5',
      accent: 'bg-accent/5',
      outline: 'border-border/30 border',
      ghost: 'bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'destructive'
  }
});
