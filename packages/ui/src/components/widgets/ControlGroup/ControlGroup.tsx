import type { ComponentProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn.js";
import { Label } from "../../label/Label.js";
import { controlGroupVariants } from "./controlGroupVariants.js";

interface ControlGroupProps
  extends ComponentProps<"div">, VariantProps<typeof controlGroupVariants> {
  label: string;
  valueDisplay?: ReactNode;
  children: ReactNode;
}

/**
 * A layout component for grouping a Label, an Input/Slider, and an optional Value display.
 */
function ControlGroup({
  ref,
  label,
  valueDisplay,
  children,
  className,
  variant,
  ...props
}: ControlGroupProps) {
  return (
    <div ref={ref} className={cn(controlGroupVariants({ variant, className }))} {...props}>
      <div className="text-muted-foreground flex items-center justify-between font-mono text-xs tracking-wider">
        <Label className="text-inherit">{label}</Label>
        {valueDisplay && <span className="text-primary">{valueDisplay}</span>}
      </div>
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
}

export { ControlGroup };
