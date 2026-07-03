import { cva } from 'class-variance-authority';

export const menuItemVariants = cva({
  base: [
    'flex w-full cursor-pointer items-center rounded-sm px-3 py-1.5 text-left text-[12px] transition-colors'
  ],
  variants: {
    variant: {
      default: 'text-foreground hover:bg-surface-raised',
      destructive: 'text-destructive hover:bg-destructive/10'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
