import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slider } from "@repo/ui/Slider";
import { Label } from "@repo/ui/Label";
import { useState } from "react";
import { useMosaicMakerContext } from "../Mosaic-context.js";
function SliderControls({ label, defaultValue, cssVar, min, max, step, }) {
    const { mosaicRef } = useMosaicMakerContext();
    const [value, setValue] = useState(defaultValue);
    const handleSetValue = (newValue) => {
        setValue(newValue);
        mosaicRef.current?.style.setProperty(cssVar, `${newValue}px`);
    };
    return (_jsxs(Label, { children: [label, _jsx(Slider
            //label={label}
            , { 
                //label={label}
                min: min, max: max, step: step, value: value, onChange: handleSetValue })] }));
}
export { SliderControls };
