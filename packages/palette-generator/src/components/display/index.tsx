import { usePaletteStore } from "../../store/usePaletteStore";
import { scaleCoordsTo255 } from "../../utils/color";

function Display() {
  const palettes = usePaletteStore((state) => state.palettes);
  const baseColor = usePaletteStore((state) => state.baseColor);
  const [red, green, blue] = scaleCoordsTo255(baseColor.srgb);
  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex gap-2">
        <div
          className="h-10 w-10"
          style={{ backgroundColor: baseColor.to("lch").toString({ precision: 3 }) }}
        />
        <p>
          Color space is: {baseColor.spaceId} - red = {red}, green = {green}, blue = {blue}
        </p>
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
