import { cva } from "class-variance-authority";

export const inputVariants = cva(
  // Use font-mono for that terminal aesthetic
  "flex h-10 w-full rounded-md border bg-input px-3 py-2 text-sm font-mono ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        // High contrast border for light mode, softer for dark
        default: "border-border hover:border-primary/50",
        // Distinctive Gruvbox red for errors
        error: "border-destructive text-destructive focus-visible:ring-destructive",
        // Subtle variation
        secondary: "bg-secondary/10 border-secondary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
