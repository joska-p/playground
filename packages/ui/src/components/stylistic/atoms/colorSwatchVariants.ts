import { cva } from 'class-variance-authority';

export const colorSwatchBoxVariants = cva({
  variants: {
    size: {
      sm: 'h-7 w-7 rounded',
      md: 'h-9 w-9 shrink-0 rounded-md'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export const colorSwatchNameVariants = cva({
  variants: {
    size: {
      sm: 'text-foreground-dim text-xs',
      md: 'text-foreground text-xs font-medium'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
