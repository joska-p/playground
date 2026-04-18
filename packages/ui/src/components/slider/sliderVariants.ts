import { cva } from "class-variance-authority";

export const sliderVariants = cva(
  "ui:h-2 ui:w-full ui:cursor-pointer ui:appearance-none ui:rounded-lg ui:bg-secondary ui:transition-all ui:focus-visible:outline-hidden ui:focus-visible:ring-2 ui:focus-visible:ring-ring ui:disabled:cursor-not-allowed ui:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "ui:accent-primary",
        destructive: "ui:accent-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
