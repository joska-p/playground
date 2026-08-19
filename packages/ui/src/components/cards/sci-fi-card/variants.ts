import { cva, type VariantProps } from 'class-variance-authority';

export const sciFiCardVariants = cva(
    'border-(--variant-color)/20 bg-(--variant-color)/5 backdrop-blur relative aspect-square overflow-hidden border p-5 group hover:border-(--variant-color)/95',
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

export type SciFiCardVariantProps = VariantProps<typeof sciFiCardVariants>;
