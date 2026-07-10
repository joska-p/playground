import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva(
  'overflow-hidden rounded backdrop-blur transition-shadow shadow-xs duration-200 hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'bg-surface-raised/10',
        primary: 'bg-primary/10',
        secondary: 'bg-secondary/10',
        accent: 'bg-accent/10',
        warning: 'bg-warning/10',
        destructive: 'bg-destructive/10',
        outline: 'border border-border bg-transparent'
      }
    },
    defaultVariants: { variant: 'default' }
  }
);

export type CardVariantProps = VariantProps<typeof cardVariants>;
