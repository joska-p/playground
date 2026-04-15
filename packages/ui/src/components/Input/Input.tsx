import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { inputVariants } from "./inputVariants";

interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
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
    <div className="ui:relative ui:flex ui:w-full ui:items-center">
      {leftIcon && (
        <div className="ui:text-muted-foreground ui:absolute ui:left-3 ui:flex ui:items-center ui:justify-center ui:[&_svg]:size-4">
          {leftIcon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          inputVariants({ variant, className }),
          leftIcon && "ui:pl-10",
          rightIcon && "ui:pr-10",
        )}
        {...props}
      />
      {rightIcon && (
        <div className="ui:text-muted-foreground ui:absolute ui:right-3 ui:flex ui:items-center ui:justify-center ui:[&_svg]:size-4">
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export { Input };
