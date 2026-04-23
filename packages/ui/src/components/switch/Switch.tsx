import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { useId } from "react";
import { cn } from "../../utils/cn.js";
import { switchVariants, switchThumbVariants } from "./switchVariants.js";

interface SwitchProps
  extends Omit<ComponentProps<"button">, "onChange">, VariantProps<typeof switchVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  helperText?: string;
}

/**
 * A tactile toggle switch for binary states.
 * Uses Radix-like data attributes for easy styling in your Gruvbox playground.
 */
function Switch({
  ref,
  className,
  variant,
  size,
  checked,
  onCheckedChange,
  label,
  helperText,
  id,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={switchId} className="text-foreground/80 cursor-pointer text-xs">
          {label}
        </label>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={switchId}
        data-state={checked ? "checked" : "unchecked"}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(switchVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className={cn(switchThumbVariants({ size }))}
        />
      </button>
      {helperText && (
        <p
          className={cn(
            "text-xs italic",
            variant === "destructive" ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Switch };
