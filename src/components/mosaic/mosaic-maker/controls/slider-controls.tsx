import { useState } from "react";
import { useMosaicMakerContext } from "../mosaic-context";
import { Slider } from "@/components/ui/slider/slider";

interface Props {
  label: string;
  defaultValue: number;
  cssVar: string;
  min: number;
  max: number;
  step: number;
}

function SliderControls({ label, defaultValue, cssVar, min, max, step }: Props) {
  const { mosaicRef } = useMosaicMakerContext();
  const [value, setValue] = useState(defaultValue);

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setValue(value);
    mosaicRef.current?.style.setProperty(cssVar, `${value}px`);
  };

  return (
    <Slider.Label>
      {label}: {value}px
      <Slider.Input min={min} max={max} step={step} value={value} onChange={handleSetValue} />
    </Slider.Label>
  );
}

export { SliderControls };
