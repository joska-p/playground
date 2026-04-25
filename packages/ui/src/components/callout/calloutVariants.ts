import { cva } from "class-variance-authority";
import { Lightbulb, AlertTriangle, Info, AlertCircle } from "lucide-react";

export const calloutVariants = cva(
  "flex gap-3 rounded-lg border p-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        tip: "border-secondary/50 bg-secondary/10 text-secondary",
        warning: "border-accent/50 bg-accent/10 text-accent",
        info: "border-primary/50 bg-primary/10 text-primary",
        danger: "border-destructive/50 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export const calloutIcons = {
  tip: Lightbulb,
  warning: AlertTriangle,
  info: Info,
  danger: AlertCircle,
};