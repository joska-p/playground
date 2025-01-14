import type { ComponentProps } from "react";
import styles from "./slider.module.css";
import { cn } from "@/lib/utils";

type LabelProps = ComponentProps<"label">;
type InputProps = ComponentProps<"input">;

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label
      className={cn("flex w-fit cursor-pointer flex-col items-center text-sm", className)}
      {...props}
    >
      {children}
    </label>
  );
};

const Input = ({ ref, min, step, max, value, onChange, className, ...props }: InputProps) => {
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
        "my-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-foreground/50 outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent",
        styles.slider,
        className
      )}
      {...props}
    />
  );
};

const Slider = { Label, Input };

export { Slider };
