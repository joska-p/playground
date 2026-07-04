import { cva, type VariantProps } from "class-variance-authority";

/**
 * Only the panel's *position and size* live here — never color. Color
 * is a single accent (`--_color`) set directly on the component, per
 * §5.2 of the guidelines, since it only ever paints one border.
 */
export const controlPanelVariants = cva(
  "fixed z-40 flex flex-col overflow-hidden rounded-lg border border-border bg-surface/95 backdrop-blur-sm text-foreground",
  {
    variants: {
      dock: {
        /** Mobile-first default: a bottom sheet that becomes a right sidebar in landscape. */
        "bottom-sheet":
          "inset-x-0 bottom-0 max-h-[70vh] rounded-b-none " +
          "landscape:inset-x-auto landscape:left-auto landscape:right-4 landscape:top-4 landscape:bottom-4 landscape:rounded-b-lg landscape:max-h-[calc(100vh-2rem)]",
        "top-right": "right-4 top-4 max-h-[calc(100vh-2rem)]",
        "top-left": "left-4 top-4 max-h-[calc(100vh-2rem)]",
        /** Embedded in normal document flow instead of floating — e.g. a split-screen layout. */
        inline: "!static !inset-auto max-h-none w-full",
      },
      size: {
        sm: "w-full landscape:w-64",
        default: "w-full landscape:w-80",
        lg: "w-full landscape:w-96",
      },
    },
    compoundVariants: [
      { dock: "inline", size: "sm", class: "landscape:w-full" },
      { dock: "inline", size: "default", class: "landscape:w-full" },
      { dock: "inline", size: "lg", class: "landscape:w-full" },
    ],
    defaultVariants: { dock: "bottom-sheet", size: "default" },
  },
);

export type ControlPanelVariantProps = VariantProps<typeof controlPanelVariants>;
