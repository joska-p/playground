import { cva } from "class-variance-authority";

export const sliderVariants = cva(
  // Base: Mono-style range with custom thumb colors
  // block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring
  "block w-full py-2 mt-2 border border-border/50 rounded-md cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        // High contrast thumb using your primary color
        default: "accent-secondary",
        // Red thumb for "danger" zones or high-intensity settings
        destructive: "accent-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
