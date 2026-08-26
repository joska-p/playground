import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition-fast active:scale-[.97] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2',
    {
        variants: {
            variant: {
                default:
                    'bg-surface-raised text-foreground hover:brightness-110 focus-visible:outline-foreground-dim',
                primary:
                    'bg-primary text-primary-foreground hover:brightness-110 focus-visible:outline-primary',
                secondary:
                    'bg-secondary text-secondary-foreground hover:brightness-110 focus-visible:outline-secondary',
                accent: 'bg-accent text-accent-foreground hover:brightness-110 focus-visible:outline-accent',
                warning:
                    'bg-warning text-warning-foreground hover:brightness-110 focus-visible:outline-warning',
                destructive:
                    'bg-destructive text-destructive-foreground hover:brightness-110 focus-visible:outline-destructive',
                outline:
                    'text-foreground-dim border border-border bg-transparent hover:text-foreground focus-visible:outline-foreground-dim',
                link: 'text-primary hover:bg-primary/10 focus-visible:outline-primary'
            },
            size: {
                sm: 'px-2 py-1 text-xs gap-1.5',
                md: 'px-2.5 py-1.5 text-sm gap-2',
                lg: 'px-3 py-2 text-base gap-2',
                icon: 'p-1.5 text-xs'
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md'
        }
    }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
