import { cva } from 'class-variance-authority';

export const colorPaletteVariants = cva({
  base: 'flex w-fit cursor-pointer overflow-hidden rounded-lg bg-surface transition-all hover:shadow-sm',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    },
    size: {
      sm: '[--cell-size:--spacing(4)]',
      md: '[--cell-size:--spacing(6)]',
      lg: '[--cell-size:--spacing(8)]'
    },
    variant: {
      primary: 'has-checked:shadow-[0_0_0_2px_var(--primary)]',
      secondary: 'has-checked:shadow-[0_0_0_2px_var(--secondary)]',
      accent: 'has-checked:shadow-[0_0_0_2px_var(--accent)]',
      destructive: 'has-checked:shadow-[0_0_0_2px_var(--destructive)]',
      outline: 'has-checked:shadow-[0_0_0_2px_var(--foreground)]',
      ghost: 'has-checked:shadow-[0_0_0_1px_var(--foreground-dim)]'
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
    variant: 'primary'
  }
});
