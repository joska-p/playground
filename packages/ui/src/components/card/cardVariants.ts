import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "ui:rounded-lg ui:border ui:bg-card ui:text-card-foreground ui:shadow-sm",
  {
    variants: {
      variant: {
        default: "ui:bg-card ui:text-card-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
