import { cva } from "class-variance-authority";

export const controlGroupVariants = cva("flex flex-col gap-2 p-3 transition-all", {
  variants: {
    variant: {
      default: "bg-card/50 border-border/50 rounded-lg border",
      secondary: "bg-secondary/10 border-secondary/20 rounded-lg border",
      ghost: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
