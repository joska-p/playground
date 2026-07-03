import { cva } from 'class-variance-authority';

export const sectionHeaderVariants = cva({
  base: 'flex flex-col gap-2',
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
