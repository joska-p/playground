import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { cn } from "../../utils/cn.js";
import { Label } from "../label/Label.js";
import { fieldVariants, helperTextVariants } from "./variants.js";

interface FieldProps
  extends ComponentProps<"div">,
    VariantProps<typeof fieldVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  children: ReactNode;
}

/**
 * A wrapper for form elements that provides labeling, helper text, and error states.
 */
function Field({
  children,
  label,
  helperText,
  error,
  variant,
  className,
  id,
  ...props
}: FieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const status = error ? "error" : variant;

  return (
    <div className={cn(fieldVariants({ variant, className }))} {...props}>
      {label && (
        <Label
          htmlFor={fieldId}
          variant={error ? "destructive" : "default"}
          className="uppercase tracking-wider font-bold text-[10px]"
        >
          {label}
        </Label>
      )}

      {/*
        This is where the primitive (Input, Select, etc.) goes.
        The primitive should use the same id.
      */}
      {children}

      {helperText && (
        <p className={cn(helperTextVariants({ variant: status }))}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Field };
