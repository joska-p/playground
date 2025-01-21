import { useState } from "react";
import type { Palette, BaseColor } from "../../palette-context";
import { usePaletteContext } from "../../palette-context";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

interface ComplementaryPalettes {
  baseColor: BaseColor;
  length: number;
  split: number;
}

function complementaryPalettes({ baseColor, length, split }: ComplementaryPalettes): Palette {
  const { hue, saturation, lightness } = baseColor;
  const palette: Palette = [];
  const angle = 180;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    // Calculate the new hue
    const currentHue = (((hue + i * angle) % 360) + split * Math.sign(i)) % 360;

    // Push the new color into the palette
    palette.push({
      hue: currentHue,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

function ComplementaryForm() {
  const { setPalettes, baseColor } = usePaletteContext();

  const [length, setLength] = useState(3);
  const [split, setSplit] = useState(30);

  function handleClick() {
    const colors = complementaryPalettes({ baseColor, length, split });
    setPalettes((prev) => [...prev, colors]);
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
        complementary
      </Button>
    </div>
  );
}

export { ComplementaryForm };
