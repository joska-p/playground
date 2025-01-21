import { useColorPicker } from "./use-colorPicker";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  width?: number;
  height?: number;
}

function ColorPicker({ width, height }: ColorPickerProps) {
  const { canvasRef, baseColor, handlePickColor, handleSaturationChange } = useColorPicker();
  const { hue, saturation, lightness } = baseColor;
  const { x, y } = baseColor.location;

  return (
    <div className="relative flex flex-col items-start justify-between gap-4">
      <div
        style={{ top: y, left: x }}
        inert
        className={cn(
          "absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
          { "border-white": lightness < 50 },
          { "border-black": lightness >= 50 }
        )}
      ></div>
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
      ></div>
    </div>
  );
}

export { ColorPicker };
