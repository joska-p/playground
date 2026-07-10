import { cva, type VariantProps } from 'class-variance-authority';

export const sectionHeadingVariants = cva('', {
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
    variant: 'primary'
  }
});

export type SectionHeadingVariants = VariantProps<typeof sectionHeadingVariants>;
