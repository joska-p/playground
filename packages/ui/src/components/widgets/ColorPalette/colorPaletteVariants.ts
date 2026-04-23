import { cva } from "class-variance-authority";

export const colorPaletteVariants = cva(
  "border-border flex w-fit cursor-pointer overflow-hidden border transition-all hover:ring-4",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "[--cell-size:theme(spacing.4)]",
        default: "[--cell-size:theme(spacing.6)]",
        lg: "[--cell-size:theme(spacing.8)]",
      },
      variant: {
        primary: "hover:ring-primary/50 has-checked:ring-primary",
        secondary: "hover:ring-secondary/50 has-checked:ring-secondary",
        accent: "hover:ring-accent/50 has-checked:ring-accent",
      },
      checked: {
        true: "ring-primary shadow-md ring-4",
        false: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "default",
      variant: "primary",
    },
  }
);
