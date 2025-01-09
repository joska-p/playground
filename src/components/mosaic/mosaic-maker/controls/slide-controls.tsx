import { Slider } from "@/components/ui/slider/slider";
import { useSignal } from "@preact/signals-react";

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
  const slideValue = useSignal(defaultValue);

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;
    const value = Number(event.target.value);
    slideValue.value = value;
    mosaicRef.current!.style.setProperty(cssVar, `${value}px`);
  };

  return (
    <Slider.Label>
      {label}: {slideValue.value}px
      <Slider.Input min={min} max={max} step={step} value={slideValue.value} onChange={handleSetValue} />
    </Slider.Label>
  );
}

export { SlideControls };
