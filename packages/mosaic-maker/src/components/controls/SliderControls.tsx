import { Slider } from "@repo/ui";
import { useState } from "react";
import { useMosaicStore } from "../../store/useMosaicStore.js";
import { useShallow } from "zustand/shallow";

export interface Props {
  label: string;
  defaultValue: number;
  cssVar: string;
  min: number;
  max: number;
  step: number;
}

function SliderControls({ label, defaultValue, cssVar, min, max, step }: Props) {
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
