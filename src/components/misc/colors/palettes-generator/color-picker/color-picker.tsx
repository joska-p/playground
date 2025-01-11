import { cn } from "@/lib/utils";
import { signal, type Signal } from "@preact/signals-react";
import type { HSLColor } from "../lib/color-conversions";
import { Controls } from "./controls";
import { useColorPicker } from "./use-colorPicker";

const DEFAULT_DIMENSIONS = 300;

const marker = signal({ x: 0, y: 0 });

interface ColorPickerProps {
  baseColor: Signal<HSLColor>;
  width?: number;
  height?: number;
}

function ColorPicker({
  baseColor,
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
      <Controls baseColor={baseColor} marker={marker} />
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
