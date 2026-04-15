import { Slider } from "@repo/ui";
import { useState } from "react";
import { useMosaicMakerContext } from "../Mosaic-context";

interface Props {
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

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    mosaicRef.current?.style.setProperty(cssVar, `${newValue}px`);
  };

  return (
    <Slider
      label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleSetValue}
    />
  );
}

export { SliderControls };
