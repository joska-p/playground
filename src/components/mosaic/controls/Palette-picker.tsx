import { defaultPalette } from "./Controls";
import Palette from "./Palette";
type Props = {
  palettes: string[][];
  currentPalette: string[];
  handleSetNewColors: (palette?: string[]) => void;
};

const PalettePicker = ({ palettes, currentPalette, handleSetNewColors }: Props) => {
  return (
    <fieldset className="flex flex-wrap justify-center gap-4">
      <Palette
        palette={currentPalette}
        disabled
        checked={false}
        handleSetNewColors={handleSetNewColors}
      />
      <Palette
        palette={defaultPalette}
        handleSetNewColors={handleSetNewColors}
        checked={defaultPalette.join(",") === currentPalette.join(",")}
      />
      {palettes.map((palette, index) => (
        <Palette
          key={index}
          palette={palette}
          handleSetNewColors={handleSetNewColors}
          checked={palette.join(",") === currentPalette.join(",")}
        />
      ))}
    </fieldset>
  );
};

export default PalettePicker;
