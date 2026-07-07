import { cva } from 'class-variance-authority';

export const labelVariants = cva(
  'font-medium select-none inline-flex items-center gap-1 backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'text-foreground bg-surface/1',
        primary: 'text-primary bg-primary/1',
        secondary: 'text-secondary bg-secondary/1',
        accent: 'text-accent bg-accent/1',
        warning: 'text-warning bg-warning/1',
        destructive: 'text-destructive bg-destructive/1',
        ghost: 'text-foreground bg-none',
        outline: 'text-foreground bg-none border border-border'
      },
      size: {
        sm: 'text-xs',
        default: 'text-base',
        lg: 'text-sm'
      },
      disabled: {
        true: 'opacity-40 cursor-not-allowed',
        false: 'cursor-pointer'
      }
    },
    defaultVariants: { variant: 'default', size: 'default', disabled: false }
  }
);
