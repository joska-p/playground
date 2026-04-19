import { cva } from "class-variance-authority";

export const cardVariants = cva(
  // Uses your --card and --border tokens with a clean mono look
  "rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-colors",
  {
    variants: {
      variant: {
        // Standard Gruvbox card
        default: "bg-card text-card-foreground",
        // A slightly more "sunken" or muted version for secondary info
        muted: "bg-muted/30 border-dashed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
