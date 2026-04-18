import { cva } from "class-variance-authority";

export const switchVariants = cva(
  "ui:inline-flex ui:shrink-0 ui:cursor-pointer ui:items-center ui:rounded-full ui:border-2 ui:border-transparent ui:transition-colors ui:focus-visible:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-ring ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background ui:disabled:cursor-not-allowed ui:disabled:opacity-50 ui:data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default: "ui:data-[state=checked]:bg-primary",
        dangerous: "ui:data-[state=checked]:bg-destructive",
      },
      size: {
        default: "ui:h-6 ui:w-11",
        sm: "ui:h-5 ui:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const switchThumbVariants = cva(
  "ui:pointer-events-none ui:block ui:rounded-full ui:bg-background ui:shadow-lg ui:ring-0 ui:transition-transform ui:data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        default: "ui:h-5 ui:w-5 ui:data-[state=checked]:translate-x-5",
        sm: "ui:h-4 ui:w-4 ui:data-[state=checked]:translate-x-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
