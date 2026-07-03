import { cva } from 'class-variance-authority';

export const badgeVariants = cva({
  base: 'inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium',
  variants: {
    variant: {
      soft: 'bg-(--_color)/15 text-(--_color)',
      solid: 'bg-(--_color) text-background',
      outline: 'bg-transparent border border-(--_color) text-(--_color)',
      dot: 'bg-(--_color)/15 text-(--_color)'
    }
  },
  defaultVariants: {
    variant: 'soft'
  }
});
