import { cva } from "class-variance-authority";

export const switchVariants = cva(
  "focus-visible:ring-ring inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/30",
        secondary: "data-[state=checked]:bg-secondary data-[state=unchecked]:bg-secondary/30",
        accent: "data-[state=checked]:bg-accent data-[state=unchecked]:bg-accent/30",
        destructive: "data-[state=checked]:bg-destructive data-[state=unchecked]:bg-destructive/30",
      },
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-13",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export const switchThumbVariants = cva(
  "bg-background pointer-events-none block rounded-full shadow-md ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        default: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);