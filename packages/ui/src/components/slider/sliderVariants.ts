import { cva } from "class-variance-authority";

export const sliderVariants = cva(
  "block w-full cursor-pointer rounded-md py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "accent-primary text-primary",
        secondary: "accent-secondary text-secondary",
        accent: "accent-accent text-accent",
        destructive: "accent-destructive text-destructive",
      },
      layout: {
        vertical: "mt-2",
        horizontal: "flex items-center gap-3 py-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      layout: "vertical",
    },
  }
);
