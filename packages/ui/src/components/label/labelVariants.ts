import { cva } from "class-variance-authority";

export const labelVariants = cva(
  // Clean mono font with standard casing to match your new style
  "text-sm font-mono leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors",
  {
    variants: {
      variant: {
        // Standard text color from your Gruvbox theme
        default: "text-foreground",
        // Distinctive red for associated error states
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
