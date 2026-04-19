import { Slider, ControlGroup } from "@repo/ui";
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
    <ControlGroup label={label} valueDisplay={`${value}px`}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSetValue}
      />
    </ControlGroup>
  );
}

export { SliderControls };
