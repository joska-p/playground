import { ColorSpaceControls } from "./color-picker/ColorSpaceControls";
import { usePaletteStore, addPalette } from "../../store/usePaletteStore";
import { generatePalette } from "../../core/generator";
import { Button } from "@repo/ui";
import { rules } from "../../core/rules";
import type { RuleKey } from "../../core/rules";

function Controls() {
  const baseColor = usePaletteStore((state) => state.baseColor);

  function handleGeneratePalette(color: typeof baseColor, ruleKey: RuleKey) {
    const palette = generatePalette(color, rules[ruleKey]);
    addPalette(palette);
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-6">
        <ColorSpaceControls spaceId="oklab" size={200} isActive={baseColor.spaceId === "oklab"} />
        <ColorSpaceControls spaceId="oklch" size={200} isActive={baseColor.spaceId === "oklch"} />
        <ColorSpaceControls spaceId="hsl" size={200} isActive={baseColor.spaceId === "hsl"} />
        <ColorSpaceControls spaceId="srgb" size={200} isActive={baseColor.spaceId === "srgb"} />
      </div>
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
  );
}

export { Controls };
