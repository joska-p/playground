import { cva, type VariantProps } from 'class-variance-authority';

export const helperTextVariants = cva('flex items-start gap-1.5 text-xs leading-relaxed', {
  variants: {
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      warning: 'text-warning',
      destructive: 'text-destructive'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export type HelperTextVariants = VariantProps<typeof helperTextVariants>;
