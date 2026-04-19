import { cva } from "class-variance-authority";

export const colorPaletteVariants = cva(
  "flex w-fit overflow-hidden rounded-md border border-border transition-all",
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
        true: "cursor-pointer hover:ring-2 hover:ring-primary/50 active:scale-95",
        false: "cursor-default",
      },
      checked: {
        true: "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-md",
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
