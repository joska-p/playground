import { cva } from "class-variance-authority";

/**
 * Select wrapper variants — layout/size only. Color (the focus ring) is
 * handled separately via the shared `--_ring` custom property (see
 * lib/colorVariant.ts), same pattern as Input/Textarea.
 */
export const selectWrapperVariants = cva(
  "input-wrapper bg-surface flex w-full items-center gap-2 rounded-md px-3",
  {
    variants: {
      size: {
        sm: "py-1",
        default: "py-0",
        lg: "py-1.5",
      },
    },
    defaultVariants: { size: "default" },
  }
);

export const selectVariants = cva(
  "text-foreground w-full cursor-pointer appearance-none bg-transparent py-2 pr-6 outline-none disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      size: {
        sm: "text-[12px]",
        default: "text-[13px]",
        lg: "text-[14px]",
      },
    },
    defaultVariants: { size: "default" },
  }
);
