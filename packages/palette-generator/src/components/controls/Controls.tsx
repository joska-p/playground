import { useState } from "react";
import { Button, Input } from "@repo/ui";
import { usePaletteStore, addPalette } from "../../store/usePaletteStore.js";
import { generatePalette, SCHEME_LABELS, SCHEME_DEFAULTS } from "../../core/paletteGenerators.js";
import type { SchemeType, GeneratorParams } from "../../core/paletteGenerators.js";

const SCHEMES: SchemeType[] = [
  "monochromatic",
  "analogous",
  "complementary",
  "split-complementary",
  "triadic",
  "tetradic",
];

const SCHEMES_WITH_ANGLE: SchemeType[] = ["analogous", "split-complementary", "tetradic"];

function Controls() {
  const baseColor = usePaletteStore((state) => state.baseColor);

  const [scheme, setScheme] = useState<SchemeType>("analogous");
  const [count, setCount] = useState(5);
  const [angle, setAngle] = useState(SCHEME_DEFAULTS.analogous.angle);
  const [lightnessSpread, setLightnessSpread] = useState(SCHEME_DEFAULTS.analogous.lightnessSpread);

  function handleSchemeChange(newScheme: SchemeType) {
    setScheme(newScheme);
    setAngle(SCHEME_DEFAULTS[newScheme].angle);
    setLightnessSpread(SCHEME_DEFAULTS[newScheme].lightnessSpread);
  }

  function handleGenerate() {
    const params: GeneratorParams = { scheme, count, angle, lightnessSpread };
    const palette = generatePalette(baseColor, params);
    addPalette(palette);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1">
        {SCHEMES.map((s) => (
          <Button
            key={s}
            variant={scheme === s ? "primary" : "outline"}
            size="small"
            onClick={() => handleSchemeChange(s)}
          >
            {SCHEME_LABELS[s]}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          title="Number of colors"
          aria-label="Number of colors"
          className="w-20 grow"
          type="number"
          min={1}
          max={12}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
        />

        {scheme === "monochromatic" && (
          <Input
            title="Lightness spread"
            aria-label="Lightness spread"
            className="w-20 grow"
            type="number"
            min={10}
            max={90}
            value={lightnessSpread}
            onChange={(e) => setLightnessSpread(parseInt(e.target.value) || 10)}
          />
        )}

        {SCHEMES_WITH_ANGLE.includes(scheme) && (
          <Input
            title="Angle"
            aria-label="Angle"
            className="w-20 grow"
            type="number"
            min={1}
            max={180}
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value) || 1)}
          />
        )}
      </div>

      <Button variant="primary" size="small" onClick={handleGenerate}>
        Generate
      </Button>
    </div>
  );
}

export { Controls };
