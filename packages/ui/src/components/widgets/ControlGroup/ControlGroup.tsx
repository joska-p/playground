import type { ComponentProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn.js";
import { Field } from "../../field/Field.js";
import { controlGroupVariants } from "./variants.js";

interface ControlGroupProps
  extends ComponentProps<"div">, VariantProps<typeof controlGroupVariants> {
  label: string;
  valueDisplay?: ReactNode;
  children: ReactNode;
  error?: boolean;
  helperText?: string;
}

/**
 * A specialized Field wrapper for controls that adds an optional Value display.
 */
function ControlGroup({
  ref,
  label,
  valueDisplay,
  children,
  className,
  variant,
  error,
  helperText,
  ...props
}: ControlGroupProps) {
  return (
    <div
      ref={ref}
      className={cn(controlGroupVariants({ variant, className }))}
      {...props}
    >
      <Field
        label={label}
        error={error}
        helperText={helperText}
        className="gap-0" // Manage gap here
      >
        {valueDisplay && (
          <div className="absolute top-0 right-0 font-mono text-xs text-secondary font-bold">
            {valueDisplay}
          </div>
        )}
        <div className="flex items-center gap-4 mt-2">{children}</div>
      </Field>
    </div>
  );
}

export { ControlGroup };
