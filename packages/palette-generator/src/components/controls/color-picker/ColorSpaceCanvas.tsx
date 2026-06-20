import { colorSpaces } from '@repo/palette-engine';
import { useEffect, useMemo } from 'react';
import { scaleTo255 } from '../../../utils/color';

type ColorSpaceCanvasProps = {
  ref?: React.RefObject<HTMLCanvasElement | null>;
  spaceId: keyof typeof colorSpaces;
  zValue: number;
  size?: number;
  onPick?: (e: React.PointerEvent<HTMLCanvasElement>) => void;
};

function ColorSpaceCanvas({
  ref,
  spaceId,
  zValue,
  size = 200,
  onPick = () => {}
}: ColorSpaceCanvasProps) {
  const config = useMemo(() => colorSpaces[spaceId], [spaceId]);

  useEffect(() => {
    const canvas = ref?.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { xAxis, yAxis, getColor } = config;
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        // Map pixel coordinates to axis ranges
        const x = xAxis.min + (px / size) * (xAxis.max - xAxis.min);
        const y = yAxis.max - (py / size) * (yAxis.max - yAxis.min); // Invert y for standard Cartesian

        // Calculate RGB
        const color = getColor(x, y, zValue);
        const [r, g, b] = color.srgb;

        const index = (py * size + px) * 4;
        data[index] = scaleTo255(r);
        data[index + 1] = scaleTo255(g);
        data[index + 2] = scaleTo255(b);
        data[index + 3] = 255; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [config, zValue, size, ref]);

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      onPointerDown={onPick}
      onPointerMove={onPick}
    />
  );
}

export { ColorSpaceCanvas };
