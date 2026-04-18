import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { buttonVariants } from "./buttonVariants.js";

interface ButtonProps
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

function Button({
  ref,
  className,
  children,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
