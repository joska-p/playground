import { cva } from "class-variance-authority";

export const selectVariants = cva(
  "bg-input ring-offset-background focus-visible:ring-ring flex h-10 w-full cursor-pointer appearance-none rounded-md border px-3 py-2 font-mono text-sm shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border/50 hover:border-secondary hover:border-border",
        primary: "border-primary/50 text-primary hover:border-primary",
        secondary: "border-secondary/50 text-secondary hover:border-secondary",
        error: "border-destructive text-destructive focus-visible:ring-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
