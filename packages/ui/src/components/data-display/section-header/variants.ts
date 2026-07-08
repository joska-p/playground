import { cva } from 'class-variance-authority';
import { COLOR_VARIABLE_CLASSES } from '../../../lib/colorVariant';

export const sectionHeaderVariants = cva('flex flex-col gap-2 font-mono', {
  variants: {
    variant: { ...COLOR_VARIABLE_CLASSES }
  },
  defaultVariants: { variant: 'primary' }
});
