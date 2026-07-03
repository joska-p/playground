import { cva } from 'class-variance-authority';

export const projectCardVariants = cva({
  base: [
    'group border-border/30 bg-card relative flex flex-col overflow-hidden rounded-lg border',
    'shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
    'hover:border-border'
  ],
  variants: {},
  defaultVariants: {}
});
