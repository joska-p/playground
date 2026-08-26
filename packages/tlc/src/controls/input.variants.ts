import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
    "bg-background text-foreground placeholder:text-muted-foreground w-full rounded-md border border-input px-3 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
    {
        variants: {
            variant: {
                default: "",
                primary:
                    "border-primary focus-visible:border-primary focus-visible:ring-primary/20",
                secondary:
                    "border-secondary focus-visible:border-secondary focus-visible:ring-secondary/20",
                accent:
                    "border-accent focus-visible:border-accent focus-visible:ring-accent/20",
                destructive:
                    "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
                ghost: "border-transparent focus-visible:border-transparent focus-visible:ring-ring/20",
            },
            size: {
                sm: "h-6 min-w-8 px-2 text-xs",
                md: "h-8 min-w-10 px-2.5 text-sm",
                lg: "h-10 min-w-12 px-3 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    },
);

export { inputVariants };
export type InputVariants = VariantProps<typeof inputVariants>;
