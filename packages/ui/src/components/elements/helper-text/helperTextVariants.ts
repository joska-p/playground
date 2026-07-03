import { cva } from 'class-variance-authority';

export const helperTextVariants = cva({
  base: 'text-xs',
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
