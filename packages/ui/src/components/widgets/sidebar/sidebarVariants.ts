import { cva } from "class-variance-authority";

export const sidebarVariants = cva("grid min-h-full", {
  variants: {
    variant: {
      normal: "[&>.sidebar-panel]:bg-card",
      primary: "[&>.sidebar-panel]:bg-primary",
      secondary: "[&>.sidebar-panel]:bg-secondary",
      accent: "[&>.sidebar-panel]:bg-accent",
    },
    mobilePosition: {
      top: "grid-cols-1 grid-rows-[auto_1fr]",
      right: "grid-cols-[1fr_auto] grid-rows-1",
      bottom: "grid-cols-1 grid-rows-[1fr_auto]",
      left: "grid-cols-[auto_1fr] grid-rows-1",
    },
    desktopPosition: {
      top: "lg:grid-cols-1 lg:grid-rows-[auto_1fr]",
      right: "lg:grid-cols-[1fr_auto] lg:grid-rows-1",
      bottom: "lg:grid-cols-1 lg:grid-rows-[1fr_auto]",
      left: "lg:grid-cols-[auto_1fr] lg:grid-rows-1",
    },
  },
  defaultVariants: {
    variant: "normal",
    mobilePosition: "bottom",
    desktopPosition: "bottom",
  },
});
