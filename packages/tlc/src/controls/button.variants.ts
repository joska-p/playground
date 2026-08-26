import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                primary:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                accent: "bg-accent text-accent-foreground hover:bg-accent/90",
                ghost: "hover:bg-muted hover:text-foreground",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-8 px-4 text-sm",
            },
        },
        defaultVariants: { variant: "default", size: "md" },
    },
);
