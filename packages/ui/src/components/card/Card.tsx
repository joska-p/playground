import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { cardVariants } from "./cardVariants.js";

interface CardProps extends ComponentProps<"div">, VariantProps<typeof cardVariants> {}

/**
 * A layout container component based on the Gruvbox theme.
 */
function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, className }))} {...props} />;
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3 className={cn("font-mono text-xl leading-none tracking-tight", className)} {...props} />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground font-mono text-sm italic", className)} {...props} />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0 font-mono", className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
