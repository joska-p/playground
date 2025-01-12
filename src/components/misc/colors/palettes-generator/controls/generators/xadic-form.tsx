import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Signal } from "@preact/signals-react";
import { useState } from "react";
import type { HSLColor } from "../../lib/color-conversions";

function xadicPalettes({ hue, saturation, lightness }: HSLColor, length: number): HSLColor[] {
  const palette: HSLColor[] = [];

  const stepSize = 360 / length;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    const newHue = (hue + i * stepSize + 360) % 360; // Wrap around hue. And add a small variation to the angle
    palette.push({
      hue: newHue,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

type Props = {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
};

function XadicForm({ palettes, baseColor }: Props) {
  const [length, setLength] = useState(3);

  function handleClick() {
    const colors = xadicPalettes(baseColor.value, length);
    palettes.value = [...palettes.value, colors];
  }

  return (
    <div className="flex gap-2">
      <Input
        title="Number of colors"
        className="w-16 grow"
        aria-label="Number of colors"
        type="number"
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
      />

      <Button className="w-1/2" onClick={handleClick}>
        Xadic
      </Button>
    </div>
  );
}

export { XadicForm };
