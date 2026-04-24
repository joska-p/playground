import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-mono text-sm whitespace-nowrap shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-border hover:bg-foreground/5 hover:text-foreground border bg-transparent",
        ghost: "hover:bg-foreground/10 hover:text-foreground",
      },
      size: {
        small: "h-8 px-3 text-xs",
        medium: "h-10 px-4 py-2",
        large: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);
