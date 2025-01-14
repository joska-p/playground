import type { Signal } from "@preact/signals-react";
import { useState } from "react";
import type { HSLColor } from "../../lib/color-conversions";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

interface MonochromaticPalettes {
  baseColor: HSLColor;
  length: number;
  split: number;
}

function complementaryPalettes({ baseColor, length, split }: MonochromaticPalettes): HSLColor[] {
  const { hue, saturation, lightness } = baseColor;
  const palette: HSLColor[] = [];
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

interface Props {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
}

function ComplementaryForm({ palettes, baseColor }: Props) {
  const [length, setLength] = useState(3);
  const [split, setSplit] = useState(30);

  function handleClick() {
    const colors = complementaryPalettes({ baseColor: baseColor.value, length, split });
    palettes.value = [...palettes.value, colors];
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
