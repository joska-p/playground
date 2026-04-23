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
        md: "[--cell-size:theme(spacing.6)]",
        lg: "[--cell-size:theme(spacing.8)]",
      },
      variant: {
        primary: "hover:ring-primary/50",
        secondary: "hover:ring-secondary/50",
        accent: "hover:ring-accent/50",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        checked: true,
        className: "ring-primary shadow-md",
      },
      {
        variant: "secondary",
        checked: true,
        className: "ring-secondary shadow-md",
      },
      {
        variant: "accent",
        checked: true,
        className: "ring-accent shadow-md",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
      variant: "primary",
      checked: false,
    },
  }
);
