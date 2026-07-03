import { cva } from 'class-variance-authority';

export const panelContentVariants = cva({
  base: 'flex-1 overflow-y-auto overscroll-contain',
  variants: {},
  defaultVariants: {}
});
