import { cva } from "class-variance-authority";

export const labelVariants = cva(
  "focus-visible:ring-ring inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        destructive: "text-destructive",
        outline: "border-border hover:bg-foreground/5 border bg-transparent shadow-sm",
        ghost: "hover:bg-foreground/10 hover:text-foreground",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
