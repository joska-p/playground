import { cva } from 'class-variance-authority';

export const scrollRevealVariants = cva({
  base: [
    'translate-y-4 opacity-0 transition-all duration-500 ease-out',
    'data-visible:translate-y-0 data-visible:opacity-100'
  ],
  variants: {},
  defaultVariants: {}
});
