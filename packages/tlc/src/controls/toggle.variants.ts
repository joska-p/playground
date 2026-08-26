import { cva } from "class-variance-authority";

export const toggleVariants = cva(
    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-input data-[state=on]:bg-primary",
                accent: "bg-input data-[state=on]:bg-accent",
                destructive: "bg-input data-[state=on]:bg-destructive",
            },
        },
        defaultVariants: { variant: "default" },
    },
);
