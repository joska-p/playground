import { ColorPalette } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function ColorPaletteDemo() {
  return (
    <DemoSection
      id="component-colorpalette"
      title="ColorPalette"
      intro="A row/column of color swatches acting as a radio group. The selected palette gets a variant-colored ring."
      apiRows={[
        { prop: 'colors', type: 'string[]', default: 'required' },
        { prop: 'name', type: 'string', default: '"palette"' },
        { prop: 'value', type: 'string', default: '—' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"' },
        { prop: 'size', type: '"sm" | "md" | "lg"', default: '"md"' }
      ]}
      code={`<ColorPalette colors={["#83a598","#b8bb26"]} name="palette" value="gruvbox" />`}
    >
      <div className="flex flex-wrap gap-4">
        <div>
          <ColorPalette
            colors={['#83a598', '#b8bb26', '#d3869b', '#fabd2f', '#fb4934']}
            name="palette-1"
            value="gruvbox"
            defaultChecked
          />
        </div>
        <div>
          <ColorPalette
            colors={['#076678', '#79740e', '#8f3f71', '#b57614', '#9d0006']}
            name="palette-1"
            value="light"
            orientation="vertical"
          />
        </div>
        <div>
          <ColorPalette
            colors={['#fb4934', '#fe8019', '#fabd2f', '#b8bb26', '#8ec07c']}
            name="palette-1"
            value="warm"
            size="sm"
          />
        </div>
      </div>
    </DemoSection>
  );
}
