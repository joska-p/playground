import { cva } from 'class-variance-authority';
import { COLOR_CLASSES } from '../../../lib/colorVariant';

export const sliderVariants = cva('w-full', {
  variants: {
    variant: { ...COLOR_CLASSES }
  },
  defaultVariants: { variant: 'primary' }
});
