import { cva, type VariantProps } from 'class-variance-authority';

export const sciFiCardVariants = cva(
    'relative aspect-square overflow-hidden border p-5 group transition-colors duration-300',
    {
        variants: {
            variant: {
                default: 'border-border bg-card hover:border-border/50',
                primary: 'border-primary/20 bg-primary/5 hover:border-primary/50',
                secondary: 'border-secondary/20 bg-secondary/5 hover:border-secondary/50',
                accent: 'border-accent/20 bg-accent/5 hover:border-accent/50',
                destructive: 'border-destructive/20 bg-destructive/5 hover:border-destructive/50'
            }
        },
        defaultVariants: { variant: 'primary' }
    }
);

export type SciFiCardVariantProps = VariantProps<typeof sciFiCardVariants>;
