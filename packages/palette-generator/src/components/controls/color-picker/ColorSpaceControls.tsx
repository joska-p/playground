import { useState, useRef } from "react";
import { COLOR_SPACES } from "../../../core/colorspaces";
import { ColorSpaceCanvas } from "./ColorSpaceCanvas";
import { Slider } from "@repo/ui";
import { setBaseColor } from "../../../store/usePaletteStore";

type ColorSliceProps = {
  spaceId?: keyof typeof COLOR_SPACES;
  size?: number;
};

function ColorSpaceControls({ spaceId = "oklab", size = 200 }: ColorSliceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { name, zSlider, toPickResult, xAxis, yAxis } = COLOR_SPACES[spaceId];
  const { label, min, max, step } = zSlider;
  const [zValue, setZValue] = useState<number>(max / 2);

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = Math.max(0, Math.min(size, e.clientX - rect.left));
    const py = Math.max(0, Math.min(size, e.clientY - rect.top));

    // 1. Map pixels to the specific Color Space units (x, y)
    const xValue = xAxis.min + (px / size) * (xAxis.max - xAxis.min);
    const yValue = yAxis.max - (py / size) * (yAxis.max - yAxis.min);

    // 2. Call the native pick result for this specific space
    const result = toPickResult(xValue, yValue, zValue);

    console.log(result);
    setBaseColor(result.hex);
  };

  return (
    <div className="flex flex-col gap-8">
      <h3>{name} Slice</h3>
      <ColorSpaceCanvas
        ref={canvasRef}
        spaceId={spaceId}
        zValue={zValue}
        size={size}
        onPick={handlePointer}
      />

      <Slider
        label={label}
        min={min}
        max={max}
        step={step ?? 1}
        value={zValue}
        onChange={setZValue}
      />
    </div>
  );
}

export { ColorSpaceControls };
