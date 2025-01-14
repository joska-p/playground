import type { Signal } from "@preact/signals-react";
import { useState } from "react";
import type { HSLColor } from "../../lib/color-conversions";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

interface MonochromaticPalettes {
  baseColor: HSLColor;
  length: number;
  angle: number;
}

function monochromaticPalettes({ baseColor, length, angle }: MonochromaticPalettes) {
  const { hue, saturation, lightness } = baseColor;
  const palette: HSLColor[] = [];

  // Calculate the step size for hue variation

  // To avoid full black or full white the lightness range should be between 5 and 95: totaly abritrary
  const min = 5;
  const max = 95;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    // Calculate the new hue by adding the step size
    const currenLightness = (lightness + i * angle) % 100;
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

interface Props {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
}

function MonochromaticForm({ palettes, baseColor }: Props) {
  const [length, setLength] = useState(5);
  const [angle, setAngle] = useState(100 / 5);

  function handleClick() {
    const colors = monochromaticPalettes({ baseColor: baseColor.value, length, angle });
    palettes.value = [...palettes.value, colors];
  }

  function handleSetLength(event: React.ChangeEvent<HTMLInputElement>) {
    setLength(Number(event.target.value));
    //also set the default split value for that length but let the user able to change it
    setAngle(Math.round(100 / Number(event.target.value)));
  }

  return (
    <div className="flex gap-2">
      <Input
        title="Angle"
        className="w-16 grow"
        aria-label="Angle"
        type="number"
        min={0}
        max={100}
        value={angle}
        onChange={(e) => setAngle(parseInt(e.target.value))}
      />

      <Input
        title="Number of colors"
        className="w-16 grow"
        aria-label="Number of colors"
        type="number"
        value={length}
        onChange={handleSetLength}
      />
      <Button className="w-1/2" onClick={handleClick}>
        Monochromatic
      </Button>
    </div>
  );
}

export { MonochromaticForm };
