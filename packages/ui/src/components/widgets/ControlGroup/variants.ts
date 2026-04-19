import { cva } from "class-variance-authority";

export const controlGroupVariants = cva(
  "relative flex flex-col gap-2 p-4 transition-all rounded-lg border shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card/30 border-border/40 hover:bg-card/50",
        secondary: "bg-secondary/5 border-secondary/20",
        ghost: "bg-transparent border-transparent shadow-none p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
