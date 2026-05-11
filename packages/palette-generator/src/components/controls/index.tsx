import { setBaseColor, addPalette } from "../../store/usePaletteStore";
import { ColorPicker } from "./color-picker/ColorPicker";
import { oklab, oklch } from "../../utils/colorspaces";
import type { PickResult } from "../../utils/color-utils";
import { generatePalette } from "../../core/generator";
import { rules } from "../../core/rules";
import type { Rule } from "../../core/rules";

/**
 * Controls renders two colorspace slices sharing a common lightness value.
 * Picking a color in either slice updates the global palette base color.
 */
function Controls() {
  const handleColorPick = (result: PickResult) => {
    const palette = generatePalette(result.hex, rules["rule01"] as Rule);
    addPalette(palette);
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
