import { cva } from 'class-variance-authority';
import { COLOR_CLASSES } from '../../../lib/colorVariant';

export const checkboxVariants = cva(
  'w-f h-4 w-4 cursor-pointer rounded flex items-center gap-2.5 text-[13px] select-none',
  {
    variants: {
      variant: { ...COLOR_CLASSES }
    },
    defaultVariants: { variant: 'primary' }
  }
);
