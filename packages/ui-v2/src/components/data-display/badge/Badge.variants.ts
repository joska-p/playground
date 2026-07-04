import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      appearance: {
        soft: 'badge-soft',
        solid: 'badge-solid',
        outline: 'badge-outline'
      },
      dot: {
        true: 'badge-dot',
        false: ''
      }
    },
    defaultVariants: {
      appearance: 'soft',
      dot: false
    }
  }
);
