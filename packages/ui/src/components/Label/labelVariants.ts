import { cva } from "class-variance-authority";

export const labelVariants = cva(
  "ui:text-sm ui:font-medium ui:leading-none ui:peer-disabled:cursor-not-allowed ui:peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "ui:text-foreground",
        destructive: "ui:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
