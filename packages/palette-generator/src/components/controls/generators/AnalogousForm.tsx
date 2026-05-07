import { Button, Input } from "@repo/ui";
import { useState } from "react";
import { addPalette, usePaletteStore } from "../../../store/usePaletteStore.js";
import type { Palette, BaseColor } from "../../../store/usePaletteStore.js";

interface AnalogousPalettes {
  baseColor: BaseColor;
  length: number;
  split: number;
}

function analogousPalettes({ baseColor, length, split }: AnalogousPalettes): Palette {
  const { hue, saturation, lightness } = baseColor;
  const palette: Palette = [];
  const angle = 30;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    const newHue = (((hue + i * angle) % 360) + split * Math.sign(i)) % 360;
    palette.push({
      hue: newHue,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

function AnalogousForm() {
  const baseColor = usePaletteStore((state) => state.baseColor);

  const [length, setLength] = useState(3);
  const [split, setSplit] = useState(30);

  function handleClick() {
    const colors = analogousPalettes({ baseColor, length, split });
    addPalette(colors);
  }

  return (
    <div className="flex gap-2">
      <Input
        title="Split"
        className="w-16 grow"
        aria-label="Split"
        type="number"
        min={0}
        max={360}
        value={split}
        onChange={(e) => setSplit(parseInt(e.target.value))}
      />
      <Input
        title="Number of colors"
        className="w-16 grow"
        aria-label="Number of colors"
        type="number"
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
      />
      <Button className="w-1/2" onClick={handleClick}>
        Analogous
      </Button>
    </div>
  );
}

export { AnalogousForm };
