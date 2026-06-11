import { variantFactory } from '../../lib/variants/variantFactory';

export const badgeVariants = variantFactory({
  base: 'focus-visible:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
      accent:
        'bg-accent text-accent-foreground hover:bg-accent/80 border-transparent',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
      outline: 'text-foreground',
      ghost:
        'bg-transparent text-foreground/70 border-transparent hover:bg-foreground/5',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
