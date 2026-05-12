import { useEffect, useMemo } from "react";
import { COLOR_SPACES } from "../../../core/colorspaces";

type ColorSpaceCanvasProps = {
  ref?: React.RefObject<HTMLCanvasElement | null>;
  spaceId: keyof typeof COLOR_SPACES;
  zValue: number;
  size?: number;
  onPick?: (e: React.PointerEvent<HTMLCanvasElement>) => void;
};

function ColorSpaceCanvas({
  ref,
  spaceId,
  zValue,
  size = 200,
  onPick = () => {},
}: ColorSpaceCanvasProps) {
  const config = useMemo(() => COLOR_SPACES[spaceId], [spaceId]);

  useEffect(() => {
    const canvas = ref?.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    const { xAxis, yAxis, toRGB } = config;

    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        // Map pixel coordinates to axis ranges
        const x = xAxis.min + (px / size) * (xAxis.max - xAxis.min);
        const y = yAxis.max - (py / size) * (yAxis.max - yAxis.min); // Invert y for standard Cartesian

        // Calculate RGB
        const [r, g, b] = toRGB(x, y, zValue);

        const index = (py * size + px) * 4;
        data[index] = r; // Red
        data[index + 1] = g; // Green
        data[index + 2] = b; // Blue
        data[index + 3] = 255; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [config, zValue, size, ref]);

  return (
    <canvas ref={ref} width={size} height={size} onPointerDown={onPick} onPointerMove={onPick} />
  );
}

export { ColorSpaceCanvas };
