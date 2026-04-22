import { cva } from "class-variance-authority";

export const colorPaletteVariants = cva(
  "border-border flex w-fit overflow-hidden border transition-all",
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
      interactive: {
        true: "hover:ring-primary/50 cursor-pointer hover:ring-4 active:scale-95",
        false: "cursor-default",
      },
      checked: {
        true: "ring-primary shadow-md ring-4",
        false: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
      interactive: false,
      checked: false,
    },
  }
);
