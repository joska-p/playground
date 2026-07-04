import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'flex items-center gap-2 rounded-md border border-border bg-surface px-3 transition-shadow duration-200',
  {
    variants: {
      variant: {
        default:
          'focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_15%,transparent)]',
        primary:
          'focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_15%,transparent)]',
        secondary:
          'focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--secondary)_15%,transparent)]',
        accent: 'focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)]',
        destructive:
          'focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--destructive)_15%,transparent)]',
        warning: 'focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--warning)_15%,transparent)]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);
