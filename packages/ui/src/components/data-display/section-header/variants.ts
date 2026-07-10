import { cva, type VariantProps } from 'class-variance-authority';

export const sectionHeaderVariants = cva('text-(--variant-color) flex flex-col gap-2 font-mono', {
  variants: {
    variant: {
      default: '[--variant-color:var(--foreground)]',
      primary: '[--variant-color:var(--primary)]',
      secondary: '[--variant-color:var(--secondary)]',
      accent: '[--variant-color:var(--accent)]',
      warning: '[--variant-color:var(--warning)]',
      destructive: '[--variant-color:var(--destructive)]'
    }
  },
  defaultVariants: { variant: 'primary' }
});

export type SectionHeaderVariants = VariantProps<typeof sectionHeaderVariants>;
