import { createVariant } from '../../lib/variants/create-variant';

export const cardVariants = createVariant({
  base: 'bg-card text-card-foreground w-full rounded-lg border shadow-sm transition-colors',
  variants: {
    variant: {
      primary: 'bg-card border-border',
      secondary: 'bg-secondary/10 border-secondary/20',
      accent: 'bg-accent/10 border-accent/20',
      destructive: 'bg-destructive/10 border-destructive/30',
      outline: 'border-border bg-transparent',
      ghost: 'border-transparent bg-transparent shadow-none',
      muted: 'bg-muted/30 border-muted-foreground/30 border-dashed'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
