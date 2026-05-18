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
        const color = toRGB(x, y, zValue);

        const index = (py * size + px) * 4;
        data[index] = color.srgb["red"] ?? 0; // Red
        data[index + 1] = color.srgb["green"] ?? 0; // Green
        data[index + 2] = color.srgb["blue"] ?? 0; // Blue
        data[index + 3] = color.srgb["alpha"] ?? 255; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [config, zValue, size, ref]);

  return (
    <canvas ref={ref} width={size} height={size} onPointerDown={onPick} onPointerMove={onPick} />
  );
}

export { ColorSpaceCanvas };
