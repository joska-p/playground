import { cva } from "class-variance-authority";

export const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    variant: {
      default: "text-foreground/50",
      primary: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "default",
  },
});
