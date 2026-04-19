import { cva } from "class-variance-authority";

export const sliderVariants = cva(
  // Base: Mono-style range with custom thumb colors
  "h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        // High contrast thumb using your primary color
        default: "accent-primary",
        // Red thumb for "danger" zones or high-intensity settings
        destructive: "accent-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
