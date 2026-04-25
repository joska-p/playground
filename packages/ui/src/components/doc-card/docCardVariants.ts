import { cva } from "class-variance-authority";

export const docCardVariants = cva(
  "rounded-xl border bg-card p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
  {
    variants: {
      variant: {
        default: "hover:bg-card/80",
        tutorial: "border-secondary/30 hover:border-secondary/60",
        howTo: "border-accent/30 hover:border-accent/60",
        explanation: "border-primary/30 hover:border-primary/60",
        reference: "border-muted/30 hover:border-muted/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);