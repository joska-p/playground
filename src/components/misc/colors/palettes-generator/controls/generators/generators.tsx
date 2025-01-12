import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Signal } from "@preact/signals-react";
import { useState } from "react";
import { analogousPalettes } from "../../lib/analogous-palette";
import type { HSLColor } from "../../lib/color-conversions";
import { complementaryPalettes } from "../../lib/complementary-palettes";
import { monochromaticPalettes } from "../../lib/monochromatic-palettes";
import { triadicPalettes } from "../../lib/triadic-palettes";

type Props = {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
};

function Generators({ palettes, baseColor }: Props) {
  const [length, setLength] = useState(5);

  function setMonochromePalette() {
    const colors = monochromaticPalettes(baseColor.value, length);
    palettes.value = [...palettes.value, colors];
  }

  function setTriadicPalette() {
    const colors = triadicPalettes(baseColor.value, length);
    palettes.value = [...palettes.value, colors];
  }

  function setAnalogousPalette() {
    const colors = analogousPalettes(baseColor.value, length);
    palettes.value = [...palettes.value, colors];
  }

  function setComplementaryPalette() {
    const colors = complementaryPalettes(baseColor.value, length);
    palettes.value = [...palettes.value, colors];
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          title="Number of colors"
          className="w-16 grow"
          aria-label="Number of colors"
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <Button className="w-1/2" onClick={setComplementaryPalette}>
          Complementary
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          title="Number of colors"
          className="w-16 grow"
          aria-label="Number of colors"
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <Button className="w-1/2" onClick={setAnalogousPalette}>
          Analogous
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          title="Number of colors"
          className="w-16 grow"
          aria-label="Number of colors"
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <Button className="w-1/2" onClick={setMonochromePalette}>
          Monochrome
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          title="Number of colors"
          className="w-16 grow"
          aria-label="Number of colors"
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <Button className="w-1/2" onClick={setTriadicPalette}>
          Triadic
        </Button>
      </div>
    </div>
  );
}

export { Generators };
