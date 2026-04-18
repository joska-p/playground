import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "ui:inline-flex ui:items-center ui:justify-center ui:gap-2 ui:rounded-md ui:text-sm ui:font-medium ui:whitespace-nowrap ui:transition-all ui:focus-visible:outline-hidden ui:focus-visible:ring-2 ui:focus-visible:ring-ring ui:focus-visible:ring-offset-2 ui:disabled:pointer-events-none ui:disabled:opacity-50 ui:[&_svg]:pointer-events-none ui:[&_svg]:size-4 ui:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "ui:bg-primary ui:text-primary-foreground ui:hover:bg-primary/90 ui:shadow-sm",
        destructive:
          "ui:bg-destructive ui:text-destructive-foreground ui:hover:bg-destructive/90 ui:shadow-sm",
        outline:
          "ui:border-input ui:bg-transparent ui:hover:bg-accent ui:hover:text-accent-foreground ui:border ui:shadow-xs",
        secondary:
          "ui:bg-secondary ui:text-secondary-foreground ui:hover:bg-secondary/90 ui:shadow-xs",
        ghost: "ui:hover:bg-accent ui:hover:text-accent-foreground",
        link: "ui:text-primary ui:underline-offset-4 ui:hover:underline",
      },
      size: {
        default: "ui:h-10 ui:px-4 ui:py-2",
        sm: "ui:h-9 ui:rounded-md ui:px-3",
        lg: "ui:h-11 ui:rounded-md ui:px-8",
        icon: "ui:h-10 ui:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
