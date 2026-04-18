import { Slider, Label } from "@repo/ui";
import { useState } from "react";
import { useMosaicMakerContext } from "../Mosaic-context.js";

export interface Props {
  label: string;
  defaultValue: number;
  cssVar: string;
  min: number;
  max: number;
  step: number;
}

function SliderControls({
  label,
  defaultValue,
  cssVar,
  min,
  max,
  step,
}: Props) {
  const { mosaicRef } = useMosaicMakerContext();
  const [value, setValue] = useState(defaultValue);

  const handleSetValue = (newValue: number) => {
    setValue(newValue);
    mosaicRef.current?.style.setProperty(cssVar, `${newValue}px`);
  };

  return (
    <Label className="mm:flex mm:flex-col mm:gap-2">
      <span className="mm:text-sm mm:font-medium">
        {label}: {value}px
      </span>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSetValue}
      />
    </Label>
  );
}

export { SliderControls };
