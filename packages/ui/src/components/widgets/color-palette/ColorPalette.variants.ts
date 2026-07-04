import { cva } from 'class-variance-authority';

export const colorPaletteVariants = cva(
  // Argument 1: Base styles (string or array of strings)
  'flex w-fit cursor-pointer overflow-hidden rounded-sm  bg-surface transition-all hover:brightness-110 active:scale-[.97] has-checked:shadow-[0_0_0_2px_var(--_color)]   hover:scale-110  has-checked:scale-110',

  // Argument 2: Options object containing variants
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col'
      },
      size: {
        sm: '[--cell-size:var(--spacing-4)]',
        md: '[--cell-size:var(--spacing-6)]',
        lg: '[--cell-size:var(--spacing-8)]'
      }
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md'
    }
  }
);
