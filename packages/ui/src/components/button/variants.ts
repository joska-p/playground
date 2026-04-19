import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-mono whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer shadow-sm border-b-2 active:border-b-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary-foreground/20 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive-foreground/20 hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary-foreground/20 hover:bg-secondary/90",
        ghost:
          "border-transparent hover:bg-foreground/5 hover:text-foreground active:border-b-0",
        link: "text-primary underline-offset-4 hover:underline border-none shadow-none active:translate-y-0",
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
  },
);
