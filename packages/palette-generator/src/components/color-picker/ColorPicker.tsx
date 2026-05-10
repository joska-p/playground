import { useState } from "react";
import { Slider } from "@repo/ui";
import { usePaletteStore, setBaseColor } from "../../store/usePaletteStore.js";
import { ColorCanvas } from "./ColorCanvas.js";

type ColorPickerProps = {
  width?: number;
  height?: number;
};

function ColorPicker({ width = 368, height = 368 }: ColorPickerProps) {
  const baseColor = usePaletteStore((state) => state.baseColor);
  const { hue, saturation, lightness } = baseColor;
  const marker = { x: baseColor.location.x, y: baseColor.location.y };

  const [localSat, setLocalSat] = useState<number>(saturation);

  function handlePickColor(picked: {
    hue: number;
    saturation: number;
    lightness: number;
    location: { x: number; y: number };
  }) {
    const colorId = `${picked.hue}-${picked.saturation}-${picked.lightness}`;
    setBaseColor({ ...picked, id: colorId });
  }

  function handleSaturationChange(value: number) {
    setLocalSat(value);
    // commit to store (debounced visual update is handled in ColorCanvas)
    setBaseColor({ ...baseColor, saturation: value });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <ColorCanvas
          width={width}
          height={height}
          saturation={localSat}
          marker={marker}
          onPick={handlePickColor}
        />
        <div className="flex w-44 flex-col gap-2">
          <div className="text-xs font-medium">Selected</div>
          <div
            className="h-12 w-full rounded-md border"
            style={{ background: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}
          />
          <div className="text-muted-foreground text-xs">
            Hue: {baseColor.hue} • Sat: {baseColor.saturation}% • Light: {baseColor.lightness}%
          </div>
        </div>
      </div>

      <Slider
        label="Saturation"
        value={localSat}
        onChange={handleSaturationChange}
        min={0}
        max={100}
      />
    </div>
  );
}

export { ColorPicker };
