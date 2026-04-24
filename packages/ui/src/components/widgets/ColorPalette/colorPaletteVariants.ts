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
        small: "[--cell-size:theme(spacing.4)]",
        medium: "[--cell-size:theme(spacing.6)]",
        large: "[--cell-size:theme(spacing.8)]",
      },
      variant: {
        primary:
          "hover:ring-primary/50 has-checked:ring-primary has-checked:shadow-md has-checked:ring-4",
        secondary:
          "hover:ring-secondary/50 has-checked:ring-secondary has-checked:shadow-md has-checked:ring-4",
        accent:
          "hover:ring-accent/50 has-checked:ring-accent has-checked:shadow-md has-checked:ring-4",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "medium",
      variant: "primary",
    },
  }
);
