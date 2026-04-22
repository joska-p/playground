import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  // Base: Mono font, standard casing, and smoother transition
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-mono whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        // Uses your --primary token
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        // Uses your --destructive token
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        // Retro outline using the --border token
        outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        // Uses your --secondary token
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
        ghost: "hover:bg-foreground/5 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
