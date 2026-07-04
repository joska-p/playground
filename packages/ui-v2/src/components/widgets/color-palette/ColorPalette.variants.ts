import { cva } from 'class-variance-authority';

export const colorPaletteVariants = cva({
  base: 'flex w-fit cursor-pointer overflow-hidden rounded-lg bg-surface transition-all hover:brightness-110 active:scale-[.97] has-checked:shadow-[0_0_0_2px_var(--_color)]',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    },
    size: {
      sm: '[--cell-size:--spacing(4)]',
      md: '[--cell-size:--spacing(6)]',
      lg: '[--cell-size:--spacing(8)]'
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md'
  }
});
