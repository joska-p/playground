import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { useId } from "react";
import { cn } from "../../utils/cn";
import { Label } from "../Label/Label";
import { sliderVariants } from "./sliderVariants";

export interface SliderProps
  extends Omit<ComponentProps<"input">, "type" | "ref">,
    VariantProps<typeof sliderVariants> {
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
}

export function Slider({
  ref,
  className,
  variant,
  label,
  id: providedId,
  ...props
}: SliderProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <div className="ui:flex ui:flex-col ui:gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        ref={ref}
        type="range"
        className={cn(sliderVariants({ variant, className }))}
        {...props}
      />
    </div>
  );
}
