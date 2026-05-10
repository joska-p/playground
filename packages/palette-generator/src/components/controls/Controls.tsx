import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@repo/ui";
import { usePaletteStore, addPalette } from "../../store/usePaletteStore.js";
import { generatePalette, SCHEME_DEFAULTS } from "../../core/paletteGenerators.js";
import type { SchemeType, GeneratorParams } from "../../core/paletteGenerators.js";
import { SchemeSelector } from "./SchemeSelector.js";
import { NumericControl } from "./NumericControl.js";
import { ContrastControls } from "./ContrastControls.js";

const SCHEMES_WITH_ANGLE: SchemeType[] = ["analogous", "split-complementary", "tetradic"];

function Controls() {
  const baseColor = usePaletteStore((state) => state.baseColor);

  const [scheme, setScheme] = useState<SchemeType>("analogous");
  const [count, setCount] = useState(5);
  const [angle, setAngle] = useState(SCHEME_DEFAULTS.analogous.angle);
  const [lightnessSpread, setLightnessSpread] = useState(SCHEME_DEFAULTS.analogous.lightnessSpread);

  const [ensureContrast, setEnsureContrast] = useState(false);
  const [contrastMin, setContrastMin] = useState(4.5);
  const [contrastAgainst, setContrastAgainst] = useState("#ffffff");

  function handleSchemeChange(newScheme: SchemeType) {
    setScheme(newScheme);
    setAngle(SCHEME_DEFAULTS[newScheme].angle);
    setLightnessSpread(SCHEME_DEFAULTS[newScheme].lightnessSpread);
  }

  function handleGenerate() {
    const params: GeneratorParams = {
      scheme,
      count,
      angle,
      lightnessSpread,
      ...(ensureContrast ? { ensureContrast: { min: contrastMin, against: contrastAgainst } } : {}),
    };
    const palette = generatePalette(baseColor, params);
    addPalette(palette);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Palette Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-muted-foreground mb-2 text-xs">Scheme</div>
            <SchemeSelector value={scheme} onChange={handleSchemeChange} />
          </div>

          <div className="flex flex-wrap gap-2">
            <NumericControl
              label="Number of colors"
              className="w-24"
              value={count}
              onChange={setCount}
              min={1}
              max={12}
            />

            {scheme === "monochromatic" && (
              <NumericControl
                label="Lightness spread"
                className="w-28"
                value={lightnessSpread}
                onChange={setLightnessSpread}
                min={10}
                max={90}
              />
            )}

            {SCHEMES_WITH_ANGLE.includes(scheme) && (
              <NumericControl
                label="Angle"
                className="w-24"
                value={angle}
                onChange={setAngle}
                min={1}
                max={180}
              />
            )}
          </div>

          <ContrastControls
            enabled={ensureContrast}
            onToggle={setEnsureContrast}
            min={contrastMin}
            onMinChange={setContrastMin}
            against={contrastAgainst}
            onAgainstChange={setContrastAgainst}
          />

          <div className="flex justify-end">
            <Button variant="primary" size="small" onClick={handleGenerate}>
              Generate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { Controls };
