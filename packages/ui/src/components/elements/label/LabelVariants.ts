import { cva } from 'class-variance-authority';

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none transition-colors',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        warning: 'text-warning'
      },
      size: {
        sm: 'text-xs',
        md: 'text-base',
        lg: 'text-base font-semibold'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);
