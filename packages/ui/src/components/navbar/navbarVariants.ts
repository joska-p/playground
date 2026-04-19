import { cva } from "class-variance-authority";

export const navbarVariants = cva(
  "w-full border-b border-border bg-background/80 backdrop-blur-md transition-all",
  {
    variants: {
      sticky: {
        true: "sticky top-0 z-50",
        false: "relative",
      },
    },
    defaultVariants: {
      sticky: true,
    },
  },
);

export const navbarLinkVariants = cva(
  "relative rounded-md px-4 py-2 text-sm font-mono font-medium transition-all outline-none active:translate-y-[1px]",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground shadow-sm",
        false: "text-foreground/70 hover:bg-primary/10 hover:text-primary",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
