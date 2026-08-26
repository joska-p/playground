import { cva } from "class-variance-authority";

export const colorPaletteVariants = cva(
    "group relative cursor-pointer rounded-md transition-all duration-150 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring",
    {
        variants: {
            size: {
                sm: "h-8 w-8 rounded",
                md: "h-10 w-10 rounded-md",
            },
            orientation: {
                horizontal: "flex flex-row",
                vertical: "flex flex-col",
            },
        },
        defaultVariants: { size: "md", orientation: "vertical" },
    },
);

export const colorSwatchVariants = cva(
    "h-full w-full first:rounded-t last:rounded-b first:rounded-l last:rounded-r transition-opacity",
    {
        variants: {
            orientation: {
                horizontal: "first:rounded-l last:rounded-r first:rounded-t last:rounded-b",
                vertical: "first:rounded-t last:rounded-b first:rounded-l last:rounded-r",
            },
        },
        defaultVariants: { orientation: "vertical" },
    },
);

export const colorPaletteRingVariants = cva(
    "absolute inset-0 rounded-[inherit] ring-2 ring-offset-2 ring-offset-background transition-all duration-150 pointer-events-none",
    {
        variants: {
            checked: {
                true: "ring-primary opacity-100",
                false: "ring-transparent opacity-0",
            },
        },
        defaultVariants: { checked: false },
    },
);

export interface ColorPaletteVariants {
    size?: "sm" | "md";
    orientation?: "horizontal" | "vertical";
}
