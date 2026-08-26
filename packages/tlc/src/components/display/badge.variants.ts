import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-full font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-secondary text-secondary-foreground',
                primary: 'bg-primary/15 text-primary',
                secondary: 'bg-secondary/15 text-secondary',
                accent: 'bg-accent/15 text-accent',
                destructive: 'bg-destructive/15 text-destructive'
            },
            size: {
                sm: 'px-1.5 py-px text-[10px]',
                md: 'px-2 py-0.5 text-xs',
                lg: 'px-2.5 py-0.5 text-sm'
            },
            dot: {
                true: 'before:mr-1 before:size-1.5 before:rounded-full before:shrink-0 before:bg-current',
                false: ''
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
            dot: false
        }
    }
);

export { badgeVariants };
export type BadgeVariants = VariantProps<typeof badgeVariants>;
