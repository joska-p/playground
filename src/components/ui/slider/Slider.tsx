import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import styles from "./slider.module.css";

type Props = ComponentProps<"input">;

const Slider = ({ ref, min, step, max, value, onChange, className }: Props) => {
  return (
    <input
      ref={ref}
      type="range"
      min={min}
      step={step}
      max={max}
      value={value}
      onChange={onChange}
      className={cn(
        "my-4 h-2 w-full appearance-none rounded-lg bg-foreground/50 outline-none",
        "hover:bg-primary/50",
        "focus:ring-2 focus:ring-accent",
        styles.slider,
        className
      )}
    />
  );
};

export { Slider };
