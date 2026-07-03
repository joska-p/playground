import { cva } from 'class-variance-authority';

export const heroVariants = cva({
  base: [
    'relative flex min-h-[65vh] flex-col justify-center overflow-hidden',
    'px-6 py-[clamp(5rem,8vw,8rem)]'
  ],
  variants: {},
  defaultVariants: {}
});
