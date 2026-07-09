import { cva } from 'class-variance-authority';
import { COLOR_CLASSES } from '../../../lib/colorVariant';

export const cardVariants = cva(
  'bg-surface overflow-hidden rounded-lg transition-shadow duration-200 hover:shadow-md',
  {
    variants: {
      variant: { ...COLOR_CLASSES }
    },
    defaultVariants: { variant: 'primary' }
  }
);
