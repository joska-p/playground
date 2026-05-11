import { usePaletteStore } from "../../store/usePaletteStore";

function Display() {
  const palettes = usePaletteStore((state) => state.palettes);
  return (
    <div className="flex flex-wrap gap-8">
      {palettes.map((palette) => {
        const paletteId = palette.colors.join();
        return (
          <div key={paletteId}>
            <div className="flex gap-2">
              {palette.colors.map((color) => (
                <div key={color} className="h-10 w-10" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Display };
