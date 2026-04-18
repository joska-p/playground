import type { VariantProps } from "class-variance-authority";
import { sliderVariants } from "./sliderVariants";
export interface SliderProps extends VariantProps<typeof sliderVariants> {
    ref?: React.Ref<HTMLInputElement>;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
    className?: string;
    label?: string;
    ariaLabel?: string;
}
export declare function Slider({ ref, min, max, step, value, onChange, className, variant, label, ariaLabel, }: SliderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Slider.d.ts.map