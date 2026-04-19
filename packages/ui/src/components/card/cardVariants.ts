import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
