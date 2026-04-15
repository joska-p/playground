import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { inputVariants } from "./inputVariants";

interface InputProps
  extends ComponentProps<"input">, VariantProps<typeof inputVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function Input({
  ref,
  className,
  variant,
  type = "text",
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <div className="relative flex w-full items-center">
      {leftIcon && (
        <div className="text-muted-foreground absolute left-3 flex items-center justify-center [&_svg]:size-4">
          {leftIcon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          inputVariants({ variant, className }),
          leftIcon && "pl-10",
          rightIcon && "pr-10"
        )}
        {...props}
      />
      {rightIcon && (
        <div className="text-muted-foreground absolute right-3 flex items-center justify-center [&_svg]:size-4">
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export { Input };
