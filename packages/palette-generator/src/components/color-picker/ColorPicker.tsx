import { useEffect, useRef } from "react";
import { cn } from "@repo/ui";
import { usePaletteStore, setBaseColor } from "../../store/usePaletteStore.js";
import { RGBToHSL, HSLToRGB } from "../../utils/colorConversions.js";
import { DEBOUNCE_DELAY } from "../../core/config.js";

type ColorPickerProps = {
  width?: number;
  height?: number;
};

function drawColorSpace(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  saturation: number
) {
  const imageData = context.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const hue = (x / width) * 360;
      const lightness = 100 - (y / height) * 100;
      const rgb = HSLToRGB({ hue, saturation, lightness });
      const idx = (y * width + x) * 4;
      data[idx] = rgb.red;
      data[idx + 1] = rgb.green;
      data[idx + 2] = rgb.blue;
      data[idx + 3] = 255;
    }
  }

  context.putImageData(imageData, 0, 0);
}

function ColorPicker({ width = 368, height = 368 }: ColorPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const baseColor = usePaletteStore((state) => state.baseColor);
  const { hue, saturation, lightness } = baseColor;
  const { x, y } = baseColor.location;

  function handlePickColor(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = Math.round(event.clientX - rect.left);
    const py = Math.round(event.clientY - rect.top);

    const context = canvas.getContext("2d");
    if (!context) return;

    const pixelData = context.getImageData(px, py, 1, 1).data;
    const picked = RGBToHSL({
      red: pixelData[0] ?? 0,
      green: pixelData[1] ?? 0,
      blue: pixelData[2] ?? 0,
    });
    const colorId = `${picked.hue}-${picked.saturation}-${picked.lightness}`;
    setBaseColor({ ...picked, location: { x: px, y: py }, id: colorId });
  }

  function handleSaturationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBaseColor({ ...baseColor, saturation: Number(event.target.value) });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      drawColorSpace(context, canvas.width, canvas.height, baseColor.saturation);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(timeout);
  }, [baseColor.saturation]);

  return (
    <div className="relative">
      <div
        style={{ top: y, left: x }}
        className={cn(
          "pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
          { "border-white": lightness < 50 },
          { "border-black": lightness >= 50 }
        )}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-crosshair"
        onClick={handlePickColor}
        aria-label="Color picker"
        role="img"
      />
      <label className="w-full text-center">
        Saturation
        <div
          className="h-8 w-full"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`,
          }}
        />
        <input
          className="w-full"
          type="range"
          min={0}
          max={100}
          step={1}
          value={saturation}
          aria-label="Saturation"
          onChange={handleSaturationChange}
        />
      </label>
      <div
        className="h-16 w-full"
        style={{
          background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        }}
      />
    </div>
  );
}

export { ColorPicker };
