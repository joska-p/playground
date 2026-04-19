import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { cardVariants } from "./variants.js";

interface CardProps
  extends ComponentProps<"div">, VariantProps<typeof cardVariants> {}

/**
 * A layout container component based on the Gruvbox theme.
 */
function Card({ className, variant, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ref, ...props }: ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ref, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-mono font-bold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ref, ...props }: ComponentProps<"p">) {
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground font-mono italic",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ref, ...props }: ComponentProps<"div">) {
  return (
    <div ref={ref} className={cn("p-6 pt-0 font-mono", className)} {...props} />
  );
}

function CardFooter({ className, ref, ...props }: ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
