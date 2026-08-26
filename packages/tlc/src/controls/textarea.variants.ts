import { cva, type VariantProps } from "class-variance-authority";

const textareaVariants = cva(
    "bg-background text-foreground placeholder:text-muted-foreground w-full resize-y rounded-md border border-input p-3 text-xs transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
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
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export { textareaVariants };
export type TextareaVariants = VariantProps<typeof textareaVariants>;
