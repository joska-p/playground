import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "bg-card text-card-foreground rounded-lg border shadow-sm transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-card border-border",
        secondary: "bg-secondary/10 border-secondary/20",
        accent: "bg-accent/10 border-accent/20",
        outline: "bg-transparent border-border",
        ghost: "bg-transparent border-transparent shadow-none",
        muted: "bg-muted/30 border-dashed border-muted-foreground/30",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);