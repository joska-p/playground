import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "bg-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 font-mono text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border hover:border-primary/50",
        error: "border-destructive text-destructive focus-visible:ring-destructive",
        secondary: "bg-secondary/10 border-secondary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);