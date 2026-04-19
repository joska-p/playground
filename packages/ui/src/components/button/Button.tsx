import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { buttonVariants } from "./variants.js";

interface ButtonProps
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

/**
 * A primitive button component.
 */
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
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
