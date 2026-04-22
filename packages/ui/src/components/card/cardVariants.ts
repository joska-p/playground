import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "border-border bg-card text-card-foreground rounded-lg border shadow-sm transition-colors",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        muted: "bg-muted/30 border-dashed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);