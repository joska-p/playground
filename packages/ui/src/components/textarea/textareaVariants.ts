import { createVariant } from '../../lib/variants/create-variant';

export const textareaVariants = createVariant({
  base: 'flex items-start gap-2 rounded-md px-3 transition-shadow duration-200',
  variants: {
    variant: {
      primary:
        'bg-surface focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_15%,transparent)]',
      secondary:
        'bg-surface focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--secondary)_15%,transparent)]',
      accent:
        'bg-surface focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)]',
      destructive:
        'bg-surface focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--destructive)_15%,transparent)]',
      outline:
        'bg-transparent border border-border focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_15%,transparent)]',
      ghost:
        'bg-transparent focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--foreground)_15%,transparent)]'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
