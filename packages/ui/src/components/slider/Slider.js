import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { sliderVariants } from "./sliderVariants";
export function Slider({ ref, min, max, step, value, onChange, className, variant, label, ariaLabel, }) {
    const [sliderValue, setSliderValue] = useState(value);
    function handleChange(event) {
        const newValue = parseFloat(event.target.value);
        setSliderValue(newValue);
        onChange(newValue);
    }
    return (_jsxs("label", { className: "flex cursor-pointer flex-col items-center text-sm md:text-base", children: [_jsx("span", { children: label ? `${label}: ${sliderValue}` : sliderValue }), _jsx("input", { "aria-label": ariaLabel, ref: ref, type: "range", min: min, max: max, step: step, value: sliderValue, onChange: handleChange, className: cn(sliderVariants({ variant, className })) })] }));
}
