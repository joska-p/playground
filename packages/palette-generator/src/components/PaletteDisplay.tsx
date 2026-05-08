import { usePaletteStore, removePalette, clearPalettes } from "../store/usePaletteStore.js";

function PaletteDisplay() {
  const palettes = usePaletteStore((state) => state.palettes);

  if (palettes.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-neutral-500">
        No palettes yet — pick a color and generate one
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          onClick={clearPalettes}
          className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50"
        >
          Clear all
        </button>
      </div>
      {palettes.map((palette, paletteIndex) => (
        <div key={paletteIndex} className="group relative">
          <div className="flex flex-wrap">
            {palette.map((color, colorIndex) => (
              <div
                key={colorIndex}
                style={{
                  backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
                }}
                className="h-16 w-20"
              />
            ))}
          </div>
          <button
            onClick={() => removePalette(paletteIndex)}
            className="absolute -right-2 -top-2 hidden h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white group-hover:flex"
            aria-label="Remove palette"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export { PaletteDisplay };
