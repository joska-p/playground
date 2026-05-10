import { useEffect, useRef, useCallback } from "react";
import type { HSLColor } from "../../utils/colorConversions.js";
import { drawColorSpace } from "../../utils/canvasHelpers.js";
import { RGBToHSL } from "../../utils/colorConversions.js";
import { DEBOUNCE_DELAY } from "../../core/config.js";

type ColorCanvasProps = {
  width?: number;
  height?: number;
  saturation: number;
  marker?: { x: number; y: number } | null;
  onPick?: (picked: HSLColor & { location: { x: number; y: number } }) => void;
  className?: string;
};

function ColorCanvas({
  width = 368,
  height = 368,
  saturation,
  marker = null,
  onPick,
}: ColorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ensure canvas pixel dimensions match
    canvas.width = width;
    canvas.height = height;

    const tid = setTimeout(() => drawColorSpace(ctx, width, height, saturation), DEBOUNCE_DELAY);
    return () => clearTimeout(tid);
  }, [width, height, saturation]);

  const handlePick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const px = Math.round(event.clientX - rect.left);
      const py = Math.round(event.clientY - rect.top);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const pixel = ctx.getImageData(px, py, 1, 1).data;
      const picked = RGBToHSL({ red: pixel[0] ?? 0, green: pixel[1] ?? 0, blue: pixel[2] ?? 0 });
      onPick?.({ ...picked, location: { x: px, y: py } });
    },
    [onPick]
  );

  return (
    <div className="relative inline-block">
      {marker && (
        <div
          style={{ top: marker.y, left: marker.x }}
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        />
      )}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block cursor-crosshair"
        onClick={handlePick}
        aria-label="Color picker canvas"
        role="img"
      />
    </div>
  );
}

export { ColorCanvas };
