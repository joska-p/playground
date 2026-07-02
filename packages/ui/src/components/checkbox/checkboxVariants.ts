import { createVariant } from '../../lib/variants/create-variant';

export const checkboxVariants = createVariant({
  base: 'appearance-none h-4 w-4 shrink-0 cursor-pointer rounded border border-border bg-surface transition-colors duration-200 checked:bg-[color:var(--_accent)] checked:border-[color:var(--_accent)] disabled:cursor-not-allowed disabled:opacity-40',
  variants: {
    variant: {
      default: '[--_accent:var(--primary)]',
      primary: '[--_accent:var(--primary)]',
      secondary: '[--_accent:var(--secondary)]',
      accent: '[--_accent:var(--accent)]',
      destructive: '[--_accent:var(--destructive)]',
      warning: '[--_accent:var(--warning)]'
    },
    size: {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
});
