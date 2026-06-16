import { Button } from '@repo/ui/Button';
import type { ColorSpacesKey } from '../../core/colorSpaces';
import { colorSpaces } from '../../core/colorSpaces';
import { generatePalette } from '../../core/generatePalette';
import { analogous } from '../../core/rules/analogous';
import { complementary } from '../../core/rules/complementary';
import { monochromatic } from '../../core/rules/monochromatic';
import { triadic } from '../../core/rules/triadic';
import { addPalette, usePaletteBaseColor } from '../../stores/palette/store';
import { ColorSpaceControls } from './color-picker/ColorSpaceControls';

const rules = { analogous, complementary, monochromatic, triadic } as const;
type RuleKey = keyof typeof rules;

function Controls() {
  const baseColor = usePaletteBaseColor();

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
