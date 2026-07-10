import { cva, type VariantProps } from 'class-variance-authority';

export const labelVariants = cva(
  'inline-flex select-none w-fit items-center gap-1 font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        warning: 'text-warning',
        destructive: 'text-destructive'
      },
      size: {
        sm: 'text-xs',
        default: 'text-base',
        lg: 'text-lg'
      },
      disabled: {
        true: 'pointer-events-none opacity-40',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      disabled: false
    }
  }
);

export type LabelVariants = VariantProps<typeof labelVariants>;
