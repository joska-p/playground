import { cva } from "class-variance-authority";

export const selectVariants = cva(
  "flex h-10 w-full rounded-md border bg-input px-3 py-2 text-sm font-mono ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none shadow-sm cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-border hover:border-secondary hover:shadow-md",
        primary: "border-primary text-primary hover:bg-primary/5",
        secondary: "border-secondary/50 text-secondary hover:border-secondary",
        error:
          "border-destructive text-destructive focus-visible:ring-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
