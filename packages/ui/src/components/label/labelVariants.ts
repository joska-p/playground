import { cva } from "class-variance-authority";

export const labelVariants = cva(
  "font-mono text-sm leading-none transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);