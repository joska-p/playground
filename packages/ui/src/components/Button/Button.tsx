import type { VariantProps } from "class-variance-authority";
import type { ElementType, ComponentPropsWithRef } from "react";
import { cn } from "../../utils/cn";
import { buttonVariants } from "./buttonVariants";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  loading?: boolean;
} & ComponentPropsWithRef<T> &
  VariantProps<typeof buttonVariants>;

function Button<T extends ElementType = "button">({
  as,
  ref,
  className,
  children,
  variant,
  size,
  loading = false,
  disabled,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  const type = Component === "button" ? "button" : undefined;

  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      ref={ref}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && (
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      )}
      {children}
    </Component>
  );
}

export { Button };
