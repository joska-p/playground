import { cva, type VariantProps } from "class-variance-authority";

const checkboxVariants = cva(
    "peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
    {
        variants: {
            variant: {
                default: "checked:bg-secondary checked:border-secondary",
                primary: "checked:bg-primary checked:border-primary",
                secondary: "checked:bg-secondary checked:border-secondary",
                accent: "checked:bg-accent checked:border-accent",
                destructive:
                    "checked:bg-destructive checked:border-destructive",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    },
);

export { checkboxVariants };
export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
