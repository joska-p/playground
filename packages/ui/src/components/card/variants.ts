import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-md transition-shadow hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "border-border/50",
        outline: "border-2 border-border",
        secondary: "bg-muted/50 border-border/30 shadow-sm hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
