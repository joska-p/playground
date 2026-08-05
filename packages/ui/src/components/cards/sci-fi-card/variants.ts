import { cva, type VariantProps } from 'class-variance-authority';

export const sciFiCardVariants = cva(
        'border-[color-mix(in_oklch,var(--variant-color)_22%,transparent)] bg-[color-mix(in_oklch,var(--variant-color)_5%,transparent)] backdrop-blur relative aspect-square overflow-hidden border p-5 group hover:border-[color-mix(in_oklch,var(--variant-color)_95%,transparent)]',
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
