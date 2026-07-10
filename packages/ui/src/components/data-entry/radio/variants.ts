import { cva, type VariantProps } from 'class-variance-authority';

export const radioVariants = cva(
  'inline-flex items-center gap-2.5 text-sm select-none transition-all duration-200 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        warning: 'text-warning',
        destructive: 'text-destructive',
        outline: 'text-foreground-dim'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export type RadioVariants = VariantProps<typeof radioVariants>;
