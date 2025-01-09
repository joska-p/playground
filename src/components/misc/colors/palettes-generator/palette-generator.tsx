import { generateColorPalette } from "@/components/misc/colors/palettes-generator/lib/generate-palettes";
import { Slider } from "@/components/ui/slider/slider";
import { StrictMode, useState } from "react";

function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState({ h: 180, s: 50, l: 50 });
  const [analogousPalettes, setAnalogousPalettes] = useState<ReturnType<typeof generateColorPalette>[]>([]);
  const [complementaryPalettes, setComplementaryPalettes] = useState<ReturnType<typeof generateColorPalette>[]>([]);
  const [triadicPalettes, setTriadicPalettes] = useState<ReturnType<typeof generateColorPalette>[]>([]);

  return (
    <section className="flex flex-col items-center justify-center gap-20">
      <div className="mt-20 flex w-full items-center justify-center gap-4">
        <Slider.Label className="w-full">
          <div
            className="h-16 w-full"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(0, ${baseColor.s}%, ${baseColor.l}%), hsl(120, ${baseColor.s}%, ${baseColor.l}%), hsl(240, ${baseColor.s}%, ${baseColor.l}%), hsl(360, ${baseColor.s}%, ${baseColor.l}%))`,
            }}
          />
          <Slider.Input
            min={0}
            max={360}
            step={1}
            value={baseColor.h}
            aria-label="Hue"
            onChange={(event) => setBaseColor((prev) => ({ ...prev, h: Number(event.target.value) }))}
          />
          Hue
        </Slider.Label>
        <Slider.Label className="w-full">
          <div
            className="h-16 w-full"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(${baseColor.h}, 0%, ${baseColor.l}%), hsl(${baseColor.h}, 100%, ${baseColor.l}%))`,
            }}
          />
          <Slider.Input
            min={0}
            max={100}
            step={1}
            value={baseColor.s}
            aria-label="Saturation"
            onChange={(event) => setBaseColor((prev) => ({ ...prev, s: Number(event.target.value) }))}
          />
          Saturation
        </Slider.Label>
        <Slider.Label className="w-full">
          <div
            className="h-16 w-full"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(${baseColor.h}, ${baseColor.s}%, 0%),hsl(${baseColor.h}, ${baseColor.s}%, 50%), hsl(${baseColor.h}, ${baseColor.s}%, 100%))`,
            }}
          />
          <Slider.Input
            min={0}
            max={100}
            step={1}
            value={baseColor.l}
            aria-label="Lightness"
            onChange={(event) => setBaseColor((prev) => ({ ...prev, l: Number(event.target.value) }))}
          />
          Lightness
        </Slider.Label>
      </div>

      <div className="flex w-full items-start justify-center gap-4">
        <div className="flex w-full flex-col gap-4">
          <button
            type="button"
            style={{ background: `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)` }}
            className="h-32 w-full px-4 py-2 text-sm font-medium"
            onClick={() => setAnalogousPalettes((prev) => [...prev, generateColorPalette(baseColor, 5, "analogous")])}
          >
            <span className="text-nowrap bg-slate-800 px-3 py-1.5 text-slate-200">Generate analogous palettes</span>
          </button>

          {analogousPalettes.map((palette, index) => (
            <div key={index} className="flex w-full gap-4">
              {palette.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  className="h-16 w-full"
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col gap-4">
          <button
            type="button"
            style={{ background: `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)` }}
            className="h-32 w-full px-4 py-2 text-sm font-medium"
            onClick={() =>
              setComplementaryPalettes((prev) => [...prev, generateColorPalette(baseColor, 5, "complementary")])
            }
          >
            <span className="text-nowrap bg-slate-800 px-3 py-1.5 text-slate-200">Generate complementary palettes</span>
          </button>

          {complementaryPalettes.map((palette, index) => (
            <div key={index} className="flex w-full gap-4">
              {palette.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  className="h-16 w-full"
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col gap-4">
          <button
            type="button"
            style={{ background: `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)` }}
            className="h-32 w-full px-4 py-2 text-sm font-medium"
            onClick={() => setTriadicPalettes((prev) => [...prev, generateColorPalette(baseColor, 5, "triadic")])}
          >
            <span className="text-nowrap bg-slate-800 px-3 py-1.5 text-slate-200">Generate triadic palettes</span>
          </button>

          {triadicPalettes.map((palette, index) => (
            <div key={index} className="flex w-full gap-4">
              {palette.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  className="h-16 w-full"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const StrictModePaletteGenerator = () => (
  <StrictMode>
    <PaletteGenerator />
  </StrictMode>
);

export { StrictModePaletteGenerator };
