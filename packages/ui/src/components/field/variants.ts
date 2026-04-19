import { cva } from "class-variance-authority";

export const fieldVariants = cva("flex flex-col gap-1.5 w-full", {
  variants: {
    variant: {
      default: "",
      error: "",
      secondary: "opacity-80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const helperTextVariants = cva("text-xs font-mono italic mt-1", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      error: "text-destructive font-bold",
      secondary: "text-muted-foreground/70",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
