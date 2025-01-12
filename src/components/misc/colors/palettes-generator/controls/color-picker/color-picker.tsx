import { cn } from "@/lib/utils";
import { type Signal } from "@preact/signals-react";
import type { HSLColor } from "../../lib/color-conversions";
import { useColorPicker } from "./use-colorPicker";

const DEFAULT_DIMENSIONS = 300;

interface ColorPickerProps {
  baseColor: Signal<HSLColor>;
  marker: Signal<{ x: number; y: number }>;
  width?: number;
  height?: number;
}

function ColorPicker({
  baseColor,
  marker,
  width = DEFAULT_DIMENSIONS,
  height = DEFAULT_DIMENSIONS,
}: ColorPickerProps) {
  const { canvasRef, handlePickColor } = useColorPicker({ baseColor, marker });

  return (
    <div className="relative flex w-fit flex-col items-start justify-between gap-4">
      <div
        style={{ top: marker.value.y, left: marker.value.x }}
        inert
        className={cn(
          "absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
          { "border-white": baseColor.value.lightness < 50 },
          { "border-black": baseColor.value.lightness >= 50 }
        )}
      ></div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handlePickColor}
        aria-label="Color picker"
        role="img"
        style={{ cursor: "crosshair" }}
      />
      <label className="w-full text-center">
        Saturation
        <div
          className="h-8 w-full"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(${baseColor.value.hue}, 0%, ${baseColor.value.lightness}%), hsl(${baseColor.value.hue}, 100%, ${baseColor.value.lightness}%))`,
          }}
        />
        <input
          className="w-full"
          type="range"
          min={0}
          max={100}
          step={1}
          value={baseColor.value.saturation}
          aria-label="Saturation"
          onChange={(event) =>
            (baseColor.value = { ...baseColor.value, saturation: Number(event.target.value) })
          }
        />
      </label>
      <div
        className="h-16 w-full"
        style={{
          background: `hsl(${baseColor.value.hue}, ${baseColor.value.saturation}%, ${baseColor.value.lightness}%)`,
        }}
      ></div>
    </div>
  );
}

export { ColorPicker };
