import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Signal } from "@preact/signals-react";
import { useState } from "react";
import type { HSLColor } from "../../lib/color-conversions";

function monochromaticPalettes(
  { hue, saturation, lightness }: HSLColor,
  length: number
): HSLColor[] {
  const palette: Array<HSLColor> = [];

  // Calculate the step size for hue variation
  const stepSize = 100 / length;

  // To avoid full black or full white the lightness range should be between 5 and 95: totaly abritrary
  const min = 5;
  const max = 95;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    // Calculate the new hue by adding the step size
    const currenLightness = (lightness + i * stepSize) % 100;
    const currenLightnessClamped = Math.min(Math.max(currenLightness, min), max);
    // Push the new color into the palette
    palette.push({
      hue,
      saturation,
      lightness: currenLightnessClamped,
    });
  }

  return palette.sort((a, b) => a.lightness - b.lightness);
}

type Props = {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
};

function MonochromaticForm({ palettes, baseColor }: Props) {
  const [length, setLength] = useState(5);

  function handleClick() {
    const colors = monochromaticPalettes(baseColor.value, length);
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
        Monochromatic
      </Button>
    </div>
  );
}

export { MonochromaticForm };
