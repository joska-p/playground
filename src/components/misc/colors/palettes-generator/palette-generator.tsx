import { StrictMode, useState } from "react";
import { ColorPicker } from "./color-picker";

function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState({ hue: 180, saturation: 100, lightness: 50 });

  return (
    <section className="mt-20 flex flex-col items-center justify-center gap-20">
      <div className="grid auto-rows-[300px] grid-cols-[repeat(3,300px)] gap-4">
        <ColorPicker saturation={baseColor.saturation} setBaseColor={setBaseColor} />
        <div className="flex flex-col items-center justify-between gap-4">
          <label className="w-full">
            <div
              className="h-8 w-full"
              style={{
                backgroundImage: `linear-gradient(to right, hsl(0, ${baseColor.saturation}%, ${baseColor.lightness}%), hsl(120, ${baseColor.saturation}%, ${baseColor.lightness}%), hsl(240, ${baseColor.saturation}%, ${baseColor.lightness}%), hsl(360, ${baseColor.saturation}%, ${baseColor.lightness}%))`,
              }}
            />
            <input
              className="w-full"
              type="range"
              min={0}
              max={360}
              step={1}
              value={baseColor.hue}
              aria-label="Hue"
              onChange={(event) => setBaseColor((prev) => ({ ...prev, hue: Number(event.target.value) }))}
            />
          </label>
          <label className="w-full">
            <div
              className="h-8 w-full"
              style={{
                backgroundImage: `linear-gradient(to right, hsl(${baseColor.hue}, 0%, ${baseColor.lightness}%), hsl(${baseColor.hue}, 100%, ${baseColor.lightness}%))`,
              }}
            />
            <input
              className="w-full"
              type="range"
              min={0}
              max={100}
              step={1}
              value={baseColor.saturation}
              aria-label="Saturation"
              onChange={(event) => setBaseColor((prev) => ({ ...prev, saturation: Number(event.target.value) }))}
            />
          </label>
          <label className="w-full">
            <div
              className="h-8 w-full"
              style={{
                backgroundImage: `linear-gradient(to right, hsl(${baseColor.hue}, ${baseColor.saturation}%, 0%),hsl(${baseColor.hue}, ${baseColor.saturation}%, 50%), hsl(${baseColor.hue}, ${baseColor.saturation}%, 100%))`,
              }}
            />
            <input
              className="w-full"
              type="range"
              min={0}
              max={100}
              step={1}
              value={baseColor.lightness}
              aria-label="Lightness"
              onChange={(event) => setBaseColor((prev) => ({ ...prev, lightness: Number(event.target.value) }))}
            />
          </label>
        </div>
        <div style={{ background: `hsl(${baseColor.hue}, ${baseColor.saturation}%, ${baseColor.lightness}%)` }}></div>
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
