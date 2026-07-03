import { cva } from 'class-variance-authority';

export const categoryCardVariants = cva({
  base: [
    'group border-border/30 bg-card relative flex cursor-pointer flex-col rounded-lg border',
    'transition-[border-color,box-shadow] duration-300 select-none',
    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
    'hover:border-border hover:shadow-[0_0_28px_-6px_var(--accent)]'
  ],
  variants: {},
  defaultVariants: {}
});
