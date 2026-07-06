import { cva } from 'class-variance-authority';

export const colorPaletteVariants = cva(
  'flex w-fit h-fit cursor-pointer overflow-hidden rounded-sm bg-surface transition-all hover:brightness-110 active:scale-[.97] has-checked:shadow-[0_0_0_2px_var(--_color)] hover:scale-110 has-checked:scale-110',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col'
      }
    },
    defaultVariants: {
      orientation: 'horizontal'
    }
  }
);

export const colorSwatchVariants = cva('shrink-0', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
