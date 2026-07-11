import { cva, type VariantProps } from 'class-variance-authority';

export const edgeCardVariants = cva(
  'group relative aspect-square overflow-hidden border p-5 transition-all duration-450 ease-in-out group relative aspect-square cursor-none overflow-hidden border p-5 transition-all duration-450 ease-[cubic-bezier(0.4,0,0.2,1)] ease-in-out',
  {
    variants: {
      variant: {
        default: '[--variant-color:var(--foreground-dim)]',
        primary: '[--variant-color:var(--primary)]',
        secondary: '[--variant-color:var(--secondary)]',
        accent: '[--variant-color:var(--accent)]',
        warning: '[--variant-color:var(--warning)]',
        destructive: '[--variant-color:var(--destructive)]'
      }
    },
    defaultVariants: { variant: 'primary' }
  }
);

export type EdgeCardVariantProps = VariantProps<typeof edgeCardVariants>;
