import { usePaletteStore } from "../../store/usePaletteStore";

function Display() {
  const palettes = usePaletteStore((state) => state.palettes);
  const baseColor = usePaletteStore((state) => state.baseColor);

  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex gap-2">
        <div
          className="h-10 w-10"
          style={{ backgroundColor: baseColor.to("lch").toString({ precision: 3 }) }}
        />
      </div>
      {palettes.map((palette) => {
        const paletteId = palette.colors.join();
        return (
          <div key={paletteId}>
            <div className="flex gap-2">
              {palette.colors.map((color) => (
                <div
                  key={color.to("lch").toString()}
                  className="h-10 w-10"
                  style={{ backgroundColor: color.to("lch").toString({ precision: 3 }) }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Display };
