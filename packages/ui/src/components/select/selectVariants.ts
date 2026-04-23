import { cva } from "class-variance-authority";

export const selectVariants = cva(
  "bg-input ring-offset-background focus-visible:ring-ring flex h-10 w-full cursor-pointer appearance-none rounded-md border px-3 py-2 font-mono text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-border hover:border-primary/50",
        secondary: "border-secondary/50 hover:border-secondary",
        accent: "border-accent/50 hover:border-accent",
        destructive: "border-destructive text-destructive focus-visible:ring-destructive",
        outline: "border-border bg-transparent hover:border-primary/50",
        ghost: "border-transparent bg-transparent hover:bg-foreground/5",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
