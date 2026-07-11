import { cva, type VariantProps } from 'class-variance-authority';

export const colorPaletteVariants = cva(
  'flex w-fit h-fit cursor-pointer overflow-hidden rounded-sm bg-surface transition-all hover:brightness-110 active:scale-[.97] hover:scale-110 has-checked:scale-110',
  {
    variants: {
      variant: {
        default: 'has-checked:shadow-[0_0_0_2px_var(--foreground-dim)]',
        primary: 'has-checked:shadow-[0_0_0_2px_var(--primary)]',
        secondary: 'has-checked:shadow-[0_0_0_2px_var(--secondary)]',
        accent: 'has-checked:shadow-[0_0_0_2px_var(--accent)]',
        warning: 'has-checked:shadow-[0_0_0_2px_var(--warning)]',
        destructive: 'has-checked:shadow-[0_0_0_2px_var(--destructive)]',
        ghost: 'has-checked:shadow-[0_0_0_2px_transparent]',
        outline: 'has-checked:shadow-[0_0_0_2px_var(--foreground-dim)]'
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col'
      }
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'primary'
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

export type ColorPaletteVariants = VariantProps<typeof colorPaletteVariants>;
