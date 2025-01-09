import { Slider } from "@/components/ui/slider/slider";
import { useState } from "react";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  defaultValue: number;
  cssVar: string;
  min: number;
  max: number;
  step: number;
};

function SlideControls({ mosaicRef, label, defaultValue, cssVar, min, max, step }: Props) {
  const [value, setValue] = useState(defaultValue);

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;
    const value = Number(event.target.value);
    setValue(value);
    mosaicRef.current!.style.setProperty(cssVar, `${value}px`);
  };

  return (
    <Slider.Label>
      {label}: {value}px
      <Slider.Input min={min} max={max} step={step} value={value} onChange={handleSetValue} />
    </Slider.Label>
  );
}

export { SlideControls };
