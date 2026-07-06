import { ColorSwatch } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function ColorSwatchGallery() {
  return (
    <DemoSection
      id="component-colorswatch"
      title="ColorSwatch"
      intro="Displays a color box with its name and optional CSS token reference. Two sizes available."
      apiRows={[
        { prop: 'color', type: 'string', default: 'required' },
        { prop: 'name', type: 'string', default: 'required' },
        { prop: 'token', type: 'string', default: '—' },
        { prop: 'size', type: '"sm" | "md"', default: '"md"' }
      ]}
      code={`<ColorSwatch color="var(--primary)" name="Primary" token="--primary" />`}
    >
      <div className="flex flex-wrap gap-6">
        {(
          [
            ['var(--primary)', 'Primary', '--primary'],
            ['var(--secondary)', 'Secondary', '--secondary'],
            ['var(--accent)', 'Accent', '--accent'],
            ['var(--destructive)', 'Destructive', '--destructive'],
            ['var(--warning)', 'Warning', '--warning'],
            ['var(--foreground)', 'Foreground', '--foreground']
          ] as const
        ).map(([c, n, t]) => (
          <ColorSwatch
            key={n}
            color={c}
            name={n}
            token={t}
          />
        ))}
      </div>
    </DemoSection>
  );
}
