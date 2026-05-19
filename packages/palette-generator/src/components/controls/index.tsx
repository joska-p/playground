import { ColorSpaceControls } from "./color-picker/ColorSpaceControls";
import { usePaletteStore, addPalette } from "../../store/usePaletteStore";
import { generatePalette } from "../../core/generator";
import { Button } from "@repo/ui";
import { rules } from "../../core/rules";
import { colorSpaces } from "../../core/colorspaces";
import type { RuleKey } from "../../core/rules";
import type { ColorSpacesKey } from "../../core/colorspaces";

function Controls() {
  const baseColor = usePaletteStore((state) => state.baseColor);

  function handleGeneratePalette(color: typeof baseColor, ruleKey: RuleKey) {
    const palette = generatePalette(color, rules[ruleKey]);
    addPalette(palette);
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-6">
        {Object.keys(colorSpaces).map((key) => (
          <ColorSpaceControls
            key={key}
            spaceId={key as ColorSpacesKey}
            size={200}
            isActive={baseColor.spaceId === key}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        {Object.entries(rules).map(([key, rule]) => (
          <Button
            key={key}
            title={rule.info.description}
            onClick={() => handleGeneratePalette(baseColor, key as RuleKey)}
          >
            Generate {rule.info.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { Controls };
