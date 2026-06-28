import { colorSpaces } from '@repo/palette-engine/colorSpaces';
import { Slider } from '@repo/ui/Slider';
import { useRef, useState } from 'react';
import { setPaletteBaseColor } from '../../../stores/palette/store';
import { ColorSpaceCanvas } from './ColorSpaceCanvas';

type ColorSliceProps = {
  spaceId?: keyof typeof colorSpaces;
  size?: number;
  isActive?: boolean;
};

function ColorSpaceControls({ spaceId = 'oklch', size = 200 }: ColorSliceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { zSlider, getColor, xAxis, yAxis } = colorSpaces[spaceId];
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
    const result = getColor(xValue, yValue, zValue);

    setPaletteBaseColor(result);
  };

  return (
    <div className="flex flex-col gap-8">
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
