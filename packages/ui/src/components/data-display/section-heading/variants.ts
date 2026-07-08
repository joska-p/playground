import { cva } from 'class-variance-authority';
import { COLOR_VARIABLE_CLASSES } from '../../../lib/colorVariant';

export const sectionHeadingVariants = cva('', {
  variants: {
    variant: { ...COLOR_VARIABLE_CLASSES }
  },
  defaultVariants: { variant: 'primary' }
});
