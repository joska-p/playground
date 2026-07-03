import { cva } from 'class-variance-authority';

export const floatingNavVariants = cva({
  base: [
    'border-border fixed top-3 left-1/2 z-50 flex items-center gap-1.5 rounded-full border',
    'px-3.5 py-1.5 shadow-lg saturate-150 backdrop-blur-xl',
    'transition-transform duration-350 ease-out'
  ],
  variants: {},
  defaultVariants: {}
});
