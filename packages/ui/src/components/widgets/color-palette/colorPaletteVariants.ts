import { variantFactory } from '../../../lib/variants/variantFactory';

export const colorPaletteVariants = variantFactory({
  base: 'border-border flex w-fit cursor-pointer overflow-hidden border transition-all hover:ring-4',
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
      primary:
        'hover:ring-primary/50 has-checked:ring-primary has-checked:shadow-md has-checked:ring-4',
      secondary:
        'hover:ring-secondary/50 has-checked:ring-secondary has-checked:shadow-md has-checked:ring-4',
      accent:
        'hover:ring-accent/50 has-checked:ring-accent has-checked:shadow-md has-checked:ring-4',
      destructive:
        'hover:ring-destructive/50 has-checked:ring-destructive has-checked:shadow-md has-checked:ring-4',
      outline:
        'hover:ring-border has-checked:ring-foreground has-checked:shadow-md has-checked:ring-4 border',
      ghost:
        'hover:ring-foreground/20 has-checked:ring-foreground/50 has-checked:shadow-none has-checked:ring-2'
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
    variant: 'primary'
  }
});
