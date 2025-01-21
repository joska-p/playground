import { useState } from "react";
import type { Palette, BaseColor } from "../../palette-context";
import { usePaletteContext } from "../../palette-context";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

interface XadicPalettes {
  baseColor: BaseColor;
  length: number;
  angle: number;
}

function xadicPalettes({ baseColor, length, angle }: XadicPalettes): Palette {
  const { hue, saturation, lightness } = baseColor;
  const palette: Palette = [];

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    const newHue = (hue + i * angle + 360) % 360;
    palette.push({
      hue: newHue,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

function XadicForm() {
  const { setPalettes, baseColor } = usePaletteContext();
  const [length, setLength] = useState(3);
  const [angle, setAngle] = useState(360 / 3);

  function handleClick() {
    const colors = xadicPalettes({ baseColor, length, angle });
    setPalettes((prev) => [...prev, colors]);
  }

  function handleSetLength(event: React.ChangeEvent<HTMLInputElement>) {
    setLength(Number(event.target.value));
    //also set the default split value for that length but let the user able to change it
    setAngle(Math.round(360 / Number(event.target.value)));
  }

  return (
    <div className="flex gap-2">
      <Input
        title="Angle"
        className="w-16 grow"
        aria-label="Angle"
        type="number"
        min={0}
        max={360}
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
        Xadic
      </Button>
    </div>
  );
}

export { XadicForm };
