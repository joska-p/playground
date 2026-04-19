import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { switchVariants, switchThumbVariants } from "./switchVariants.js";

interface SwitchProps
  extends
    Omit<ComponentProps<"button">, "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
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
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
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
  );
}

export { Switch };
