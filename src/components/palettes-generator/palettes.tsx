import { usePaletteContext } from "./palette-context";

function Palettes() {
  const { palettes } = usePaletteContext();
  return (
    <div className="flex flex-col gap-4">
      {palettes.value.map((palette, index) => (
        <div key={index} className="flex flex-wrap">
          {palette.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
              }}
              className="h-16 w-20"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export { Palettes };
