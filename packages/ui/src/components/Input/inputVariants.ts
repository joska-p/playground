import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "ui:flex ui:h-9 ui:w-full ui:rounded-md ui:border ui:border-input ui:bg-transparent ui:px-3 ui:py-1 ui:text-base ui:shadow-xs ui:transition-colors ui:file:border-0 ui:file:bg-transparent ui:file:text-sm ui:file:font-medium ui:file:text-foreground ui:placeholder:text-muted-foreground ui:focus-visible:outline-hidden ui:focus-visible:ring-1 ui:focus-visible:ring-ring ui:disabled:cursor-not-allowed ui:disabled:opacity-50 ui:md:text-sm",
  {
    variants: {
      variant: {
        default: "",
        error: "ui:border-destructive ui:focus-visible:ring-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
