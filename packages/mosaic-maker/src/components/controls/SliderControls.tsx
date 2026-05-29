import { Slider } from "@repo/ui/Slider";
import { useEffect, useRef, useState } from "react";
import { regenerateMosaicTiles } from "../../store/actions";
import { useMosaicRef } from "../../store/selectors";

export type SliderControlsProps = {
  label: string;
  defaultValue: number;
  cssVar: string;
  min: number;
  max: number;
  step: number;
};

function SliderControls({ label, defaultValue, cssVar, min, max, step }: SliderControlsProps) {
  const mosaicRef = useMosaicRef();
  const [value, setValue] = useState(defaultValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(150);

  function handleSetValue(newValue: number) {
    setValue(newValue);
    mosaicRef.current?.style.setProperty(cssVar, `${newValue}px`);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(regenerateMosaicTiles, 150);
  }

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

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
