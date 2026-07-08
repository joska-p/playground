import { EdgeCard, EdgeCardAnimated } from '../../components/cards';
import { DemoSection } from '../layout/DemoSection';

export function EdgeCardDemo() {
  // seed: number;
  // id: string;
  // title: string;
  // classification: string;
  // density: string;
  // resolution: string;
  // color?: string; //
  return (
    <DemoSection
      id="edge-card"
      title="EdgeCard"
      intro="Random generated edge card with interactive glow and settings button."
    >
      <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 lg:grid-cols-3">
        <EdgeCard
          seed={101}
          id="SAMPLE.001"
          title="Grain / Wood Fiber"
          classification="ORGANIC"
          resolution="240×240"
          density="32.1%"
          color="var(--orange)"
        />

        <EdgeCard
          seed={202}
          id="SAMPLE.002"
          title="Facet / Cut Crystal"
          classification="GEOMETRIC"
          resolution="240×240"
          density="41.8%"
          color="var(--purple)"
        />

        <EdgeCard
          seed={303}
          id="SAMPLE.003"
          title="Ridges / Stamp Edge"
          classification="TOPOGRAPHIC"
          resolution="240×240"
          density="28.4%"
          color="var(--blue)"
        />

        <EdgeCardAnimated
          seed={404}
          id="SAMPLE.004"
          title="Mesh / Woven Sample"
          classification="TEXTILE"
          resolution="240×240"
          density="56.2%"
          color="var(--green)"
        />

        <EdgeCardAnimated
          seed={505}
          id="SAMPLE.005"
          title="Strata / Sediment Cut"
          classification="GEOLOGICAL"
          resolution="240×240"
          density="35.7%"
          color="var(--aqua)"
        />

        <EdgeCardAnimated
          seed={606}
          id="SAMPLE.006"
          title="Fracture / Cracked Glass"
          classification="MATERIAL"
          resolution="240×240"
          density="49.3%"
          color="var(--yellow)"
        />
      </div>
    </DemoSection>
  );
}
