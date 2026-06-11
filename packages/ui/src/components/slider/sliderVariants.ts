import { variantFactory } from '../../lib/variants/variantFactory';

export const sliderVariants = variantFactory({
  base: 'w-full rounded-md py-2 transition-colors',
  variants: {
    variant: {
      primary: 'accent-primary text-primary',
      secondary: 'accent-secondary text-secondary',
      accent: 'accent-accent text-accent',
      destructive: 'accent-destructive text-destructive',
      outline: 'accent-primary text-foreground border border-border',
      ghost: 'accent-primary text-foreground/70',
    },
    layout: {
      stacked: 'mt-2',
      inline:
        'flex items-center gap-3 py-0 max-sm:flex-col max-sm:gap-1.5 max-sm:py-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'stacked',
  },
});
