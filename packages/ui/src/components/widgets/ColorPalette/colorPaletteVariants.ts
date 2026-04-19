import { cva } from "class-variance-authority";

export const colorPaletteVariants = cva(
  "flex w-fit overflow-hidden border border-border transition-all",
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
        true: "cursor-pointer hover:ring-4 hover:ring-primary/50 active:scale-95",
        false: "cursor-default",
      },
      checked: {
        true: "ring-4 ring-primary shadow-md",
        false: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
      interactive: false,
      checked: false,
    },
  },
);
