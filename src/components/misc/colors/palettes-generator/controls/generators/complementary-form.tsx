import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Signal } from "@preact/signals-react";
import { useState } from "react";
import type { HSLColor } from "../../lib/color-conversions";

type Props = {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
};

function complementaryPalettes(
  { hue, saturation, lightness }: HSLColor,
  length: number
): HSLColor[] {
  const palette: Array<HSLColor> = [];

  // Calculate the step size for hue variation
  const stepSize = 360 / length;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    // Calculate the new hue by adding the step size
    const currentHue = (hue + i * stepSize) % 360;

    // Push the new color into the palette
    palette.push({
      hue: currentHue,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

function ComplementaryForm({ palettes, baseColor }: Props) {
  const [length, setLength] = useState(5);

  function handleClick() {
    const colors = complementaryPalettes(baseColor.value, length);
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
        complementary
      </Button>
    </div>
  );
}

export { ComplementaryForm };
