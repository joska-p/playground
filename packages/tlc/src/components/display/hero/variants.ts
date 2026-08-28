import { cva, type VariantProps } from 'class-variance-authority';

export const heroVariants = cva(
    'relative flex min-h-[65vh] flex-col justify-center overflow-hidden px-6 py-[clamp(5rem,8vw,8rem)] font-mono',
    {
        variants: {
            variant: {
                default: 'bg-muted/30 text-foreground',
                primary: 'bg-primary/10 text-primary',
                secondary: 'bg-secondary/10 text-secondary',
                accent: 'bg-accent/10 text-accent',
                destructive: 'bg-destructive/10 text-destructive',
                ghost: 'bg-transparent text-foreground'
            }
        },
        defaultVariants: { variant: 'ghost' }
    }
);

export type HeroVariants = VariantProps<typeof heroVariants>;
