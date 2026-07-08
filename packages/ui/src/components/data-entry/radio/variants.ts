import { cva } from 'class-variance-authority';
import { COLOR_CLASSES } from '../../../lib/colorVariant';

export const radioVariants = cva(
  'h-4 w-4 shrink-0 cursor-pointer rounded-full flex items-center gap-2.5 text-[13px] select-none',
  {
    variants: {
      variant: { ...COLOR_CLASSES }
    },
    defaultVariants: { variant: 'primary' }
  }
);
