import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
    'overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-shadow',
    {
        variants: {
            variant: {
                default: '',
                primary: 'border-primary/50',
                secondary: 'border-secondary/50',
                accent: 'border-accent/50',
                destructive: 'border-destructive/50',
                outline: 'border-border bg-transparent'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

export { cardVariants };
export type CardVariants = VariantProps<typeof cardVariants>;
