import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { sliderVariants } from "./sliderVariants";

export interface SliderProps
  extends
    Omit<ComponentProps<"input">, "type" | "ref">,
    VariantProps<typeof sliderVariants> {
  ref?: React.Ref<HTMLInputElement>;
}

export function Slider({ ref, className, variant, ...props }: SliderProps) {
  return (
    <input
      ref={ref}
      type="range"
      className={cn(sliderVariants({ variant, className }))}
      {...props}
    />
  );
}
