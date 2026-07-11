import { useState } from 'react';
import { Badge } from '../components/data-display/badge/Badge';
import { Card } from '../components/data-display/card/Card';
import { ColorSwatch } from '../components/data-display/color-swatch/ColorSwatch';
import { SectionHeading } from '../components/data-display/section-heading/SectionHeading';
import { Icon } from '../components/icons/Icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/navigation/tabs/Tabs';

const STATS = [
  { label: 'Components', value: '42', icon: 'box' as const, variant: 'primary' as const },
  { label: 'Seeds Mapped', value: '128', icon: 'sparkles' as const, variant: 'accent' as const },
  {
    label: 'Contour Lines',
    value: '3.2k',
    icon: 'data-viz' as const,
    variant: 'secondary' as const
  },
  { label: 'Expeditions', value: '7', icon: 'flame' as const, variant: 'warning' as const }
];

const TERRAIN_PALETTE = [
  { color: 'var(--blue)', name: 'Ocean Depth', token: '--blue' },
  { color: 'var(--aqua)', name: 'Shallow Reef', token: '--aqua' },
  { color: 'var(--accent)', name: 'Highland Moss', token: '--accent' },
  { color: 'var(--orange)', name: 'Desert Sand', token: '--orange' },
  { color: 'var(--destructive)', name: 'Volcanic Ash', token: '--destructive' },
  { color: 'var(--secondary)', name: 'Glacial Ice', token: '--secondary' }
];

export function CartographerStats() {
  const [activeTab, setActiveTab] = useState('palette');
  return (
    <section
      id="log"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <SectionHeading
        label="Expedition Log"
        title="Survey Readings"
        description="Instrument readings from across the mapped territories."
        variant="accent"
      />

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card
            key={s.label}
            variant={s.variant}
          >
            <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
              <Icon
                name={s.icon}
                className="h-6 w-6 text-(--variant-color) opacity-70"
              />
              <span className="text-foreground text-3xl font-light tracking-tight">{s.value}</span>
              <span className="text-foreground-dim text-xs tracking-wider uppercase">
                {s.label}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          variant="accent"
        >
          <TabsList>
            <TabsTrigger value="palette">Terrain Palette</TabsTrigger>
            <TabsTrigger value="density">Density Scale</TabsTrigger>
          </TabsList>
          <TabsContent value="palette">
            <div className="flex flex-wrap gap-4 py-4">
              {TERRAIN_PALETTE.map((swatch) => (
                <ColorSwatch
                  key={swatch.token}
                  color={swatch.color}
                  name={swatch.name}
                  token={swatch.token}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="density">
            <div className="flex items-center gap-4 py-4">
              <Badge
                appearance="solid"
                variant="primary"
                size="sm"
              >
                0.8 g/cm³
              </Badge>
              <span className="text-foreground-dim">→</span>
              <Badge
                appearance="solid"
                variant="accent"
                size="sm"
              >
                1.6 g/cm³
              </Badge>
              <span className="text-foreground-dim">→</span>
              <Badge
                appearance="solid"
                variant="destructive"
                size="sm"
              >
                3.1 g/cm³
              </Badge>
            </div>
            <p className="text-foreground-muted mt-3 text-sm">
              Density increases from coastal shelves to central volcanic zones. Higher values
              correlate with tighter contour spacing.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
