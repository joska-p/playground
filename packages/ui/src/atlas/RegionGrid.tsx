import { AtlasCard } from '../components/cards/atlas-card';
import { Badge } from '../components/data-display/badge/Badge';
import { SectionHeader } from '../components/data-display/section-header/SectionHeader';

const REGIONS = [
  {
    seed: 42,
    id: 'N-01',
    title: 'Northern Frontier',
    classification: 'Tundra',
    density: '0.8 g/cm³',
    resolution: '256 px',
    color: 'var(--blue)'
  },
  {
    seed: 73,
    id: 'S-02',
    title: 'Southern Basin',
    classification: 'Abyssal',
    density: '1.2 g/cm³',
    resolution: '512 px',
    color: 'var(--aqua)'
  },
  {
    seed: 17,
    id: 'E-03',
    title: 'Eastern Highlands',
    classification: 'Alpine',
    density: '2.4 g/cm³',
    resolution: '1024 px',
    color: 'var(--accent)'
  },
  {
    seed: 91,
    id: 'W-04',
    title: 'Western Shelf',
    classification: 'Continental',
    density: '1.6 g/cm³',
    resolution: '512 px',
    color: 'var(--orange)'
  },
  {
    seed: 55,
    id: 'C-05',
    title: 'Central Caldera',
    classification: 'Volcanic',
    density: '3.1 g/cm³',
    resolution: '1024 px',
    color: 'var(--destructive)'
  },
  {
    seed: 33,
    id: 'P-06',
    title: 'Polar Expanse',
    classification: 'Glacial',
    density: '0.9 g/cm³',
    resolution: '256 px',
    color: 'var(--secondary)'
  }
];

export function RegionGrid() {
  return (
    <section
      id="regions"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <SectionHeader
        variant="primary"
        title="Surveyed Regions"
        description="Six cardinal terrains, each procedurally generated from a unique seed. Hover to inspect contour topology."
        iconName="grid"
        align="center"
      />

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Badge
          appearance="outline"
          variant="primary"
        >
          6 regions mapped
        </Badge>
        <Badge
          appearance="outline"
          variant="secondary"
        >
          3.2k contours rendered
        </Badge>
        <Badge
          appearance="outline"
          variant="accent"
        >
          1024 px max res
        </Badge>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REGIONS.map((r) => (
          <AtlasCard
            key={r.id}
            animated={true}
            seed={r.seed}
            cardId={r.id}
            cardTitle={r.title}
            classification={r.classification}
            density={r.density}
            resolution={r.resolution}
            color={r.color}
          />
        ))}
      </div>
    </section>
  );
}
