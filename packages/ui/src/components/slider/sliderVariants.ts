import { cva } from "class-variance-authority";

export const sliderVariants = cva(
  "h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "accent-primary",
        destructive: "accent-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
