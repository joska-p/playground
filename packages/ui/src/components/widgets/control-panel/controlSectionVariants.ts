import { cva } from 'class-variance-authority';

export const controlSectionVariants = cva({
  base: 'border-border border-b last:border-b-0',
  variants: {},
  defaultVariants: {}
});

export const controlSectionHeaderVariants = cva({
  base: [
    'text-muted-foreground hover:text-foreground hover:bg-muted/50',
    'flex w-full items-center justify-between px-4 py-3 text-sm font-medium',
    'transition-colors duration-100'
  ],
  variants: {
    variant: {
      default: '',
      primary: 'text-foreground font-semibold'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
