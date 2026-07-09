import { cva } from 'class-variance-authority';
import { COLOR_VARIABLE_CLASSES } from '../../../lib/colorVariant';

export const edgeCardVariants = cva(
  'group relative aspect-square overflow-hidden border p-5 transition-all duration-450 ease-in-out',
  {
    variants: {
      variant: { ...COLOR_VARIABLE_CLASSES }
    },
    defaultVariants: { variant: 'primary' }
  }
);
