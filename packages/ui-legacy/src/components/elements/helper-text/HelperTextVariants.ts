import { cva } from 'class-variance-authority';

export const helperTextVariants = cva('text-xs', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      destructive: 'text-destructive'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
