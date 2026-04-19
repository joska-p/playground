import { cva } from "class-variance-authority";

export const controlGroupVariants = cva(
  "flex flex-col gap-2 p-3 transition-all",
  {
    variants: {
      variant: {
        default: "bg-card/50 rounded-lg border border-border/50",
        secondary: "bg-secondary/10 rounded-lg border border-secondary/20",
        ghost: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
