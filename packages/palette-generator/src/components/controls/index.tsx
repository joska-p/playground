import { setBaseColor } from "../../store/usePaletteStore";
import { ColorPicker } from "./color-picker/ColorPicker";
import { oklab, oklch } from "../../utils/colorspaces";
import type { PickResult } from "../../utils/color-utils";

/**
 * Controls renders two colorspace slices sharing a common lightness value.
 * Picking a color in either slice updates the global palette base color.
 */
function Controls() {
  const handleColorPick = (result: PickResult) => {
    setBaseColor(result.hex);
  };

  return (
    <div className="flex flex-wrap gap-6 p-4">
      <ColorPicker colorSpace={oklab} displaySize={400} onPick={handleColorPick} />
      <ColorPicker colorSpace={oklch} displaySize={400} onPick={handleColorPick} />
    </div>
  );
}

export { Controls };
