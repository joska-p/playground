import { cva } from 'class-variance-authority';

export const sectionHeadingVariants = cva({
  variants: {
    align: {
      left: 'items-start text-left',
      center: 'items-center text-center'
    }
  },
  defaultVariants: {
    align: 'left'
  }
});
