import { usePaletteBaseColor, usePalettePalettes } from '../../stores/palette/store';

function Display() {
  const palettes = usePalettePalettes();
  const baseColor = usePaletteBaseColor();

  return (
    <div className="flex flex-wrap gap-8">
      <div
        className="h-10 w-10"
        style={{
          backgroundColor: baseColor.to('lch').toString({ precision: 3 })
        }}
      />
      {palettes.map((palette) => {
        const paletteId = palette.colors.join();
        return (
          <div
            key={paletteId}
            className="flex gap-2"
          >
            {palette.colors.map((color) => (
              <div
                key={color.to('lch').toString()}
                className="h-10 w-10"
                style={{
                  backgroundColor: color.to('lch').toString({ precision: 3 })
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export { Display };
