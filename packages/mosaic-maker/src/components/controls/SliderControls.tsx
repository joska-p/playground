import { Slider } from "@repo/ui/Slider";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useMosaicStore } from "../../store/useMosaicStore";

export type SliderControlsProps = {
  label: string;
  defaultValue: number;
  cssVar: string;
  min: number;
  max: number;
  step: number;
};

function SliderControls({ label, defaultValue, cssVar, min, max, step }: SliderControlsProps) {
  const { mosaicRef } = useMosaicStore(useShallow((state) => ({ mosaicRef: state.mosaicRef })));
  const [value, setValue] = useState(defaultValue);

  function handleSetValue(newValue: number) {
    setValue(newValue);
    mosaicRef.current?.style.setProperty(cssVar, `${newValue}px`);
  }

  return (
    <Slider
      label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleSetValue}
      unit="px"
    />
  );
}

export { SliderControls };
