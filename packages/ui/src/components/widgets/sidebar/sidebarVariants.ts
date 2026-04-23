import { cva } from "class-variance-authority";

export const sidebarVariants = cva("relative grid min-h-full", {
  variants: {
    variant: {
      normal:
        "[&>.sidebar-panel]:bg-card [&>.sidebar-toggle]:text-card-foreground [&>.sidebar-toggle]:bg-background/20 [&>.sidebar-toggle]:hover:bg-background/50",
      primary:
        "[&>.sidebar-panel]:bg-primary/30 [&>.sidebar-toggle]:text-primary-foreground [&>.sidebar-toggle]:bg-primary/20 [&>.sidebar-toggle]:hover:bg-primary/50",
      secondary:
        "[&>.sidebar-panel]:bg-secondary/30 [&>.sidebar-toggle]:text-secondary-foreground [&>.sidebar-toggle]:bg-secondary/20 [&>.sidebar-toggle]:hover:bg-secondary/50",
      accent:
        "[&>.sidebar-panel]:bg-accent/30 [&>.sidebar-toggle]:text-accent-foreground [&>.sidebar-toggle]:bg-accent/20 [&>.sidebar-toggle]:hover:bg-accent/50",
    },
    mobilePosition: {
      top: "grid-cols-1 grid-rows-[auto_1fr] [grid-template-areas:'panel'_'main']",
      right: "grid-cols-[1fr_auto] grid-rows-1 [grid-template-areas:'main_panel']",
      bottom: "grid-cols-1 grid-rows-[1fr_auto] [grid-template-areas:'main'_'panel']",
      left: "grid-cols-[auto_1fr] grid-rows-1 [grid-template-areas:'panel_main']",
    },
    desktopPosition: {
      top: "lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'panel'_'main']",
      right: "lg:grid-cols-[1fr_auto] lg:grid-rows-1 lg:[grid-template-areas:'main_panel']",
      bottom: "lg:grid-cols-1 lg:grid-rows-[1fr_auto] lg:[grid-template-areas:'main'_'panel']",
      left: "lg:grid-cols-[auto_1fr] lg:grid-rows-1 lg:[grid-template-areas:'panel_main']",
    },
  },
  defaultVariants: {
    variant: "normal",
    mobilePosition: "bottom",
    desktopPosition: "bottom",
  },
});
