import { cva } from 'class-variance-authority';
import { COLOR_CLASSES } from '../../../lib/colorVariant';

export const sectionHeaderVariants = cva('', {
  variants: {
    variant: { ...COLOR_CLASSES }
  },
  defaultVariants: { variant: 'primary' }
});
