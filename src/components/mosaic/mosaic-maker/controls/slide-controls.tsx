import { Slider } from "@components/ui/slider/slider";
import { useState } from "react";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  defaultValue: number;
  cssVars: string[];
  min: number;
  max: number;
  step: number;
};

const SlideControls = ({ mosaicRef, label, defaultValue, cssVars, min, max, step }: Props) => {
  const [value, setValue] = useState(defaultValue);

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;
    const value = Number(event.target.value);
    setValue(value);
    cssVars.forEach((cssVar) => mosaicRef.current!.style.setProperty(cssVar, `${value}px`));
  };

  return (
    <label className="flex flex-col items-center text-sm">
      {label}: {value} px
      <Slider min={min} max={max} step={step} value={value} onChange={handleSetValue} />
    </label>
  );
};

export { SlideControls };
