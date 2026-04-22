import { cva } from "class-variance-authority";

export const sliderVariants = cva(
  "border-border/50 focus-visible:ring-ring mt-2 block w-full cursor-pointer rounded-md border py-2 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "accent-secondary",
        destructive: "accent-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);