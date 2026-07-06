import { Slider } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function SliderDemo() {
  return (
    <DemoSection
      id="component-slider"
      title="Slider"
      intro="Native range input with accent-color via variant. Optional tick labels below the track."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        {
          prop: 'showTicks',
          type: 'boolean',
          default: 'true',
          notes: 'min/mid/max labels below track'
        }
      ]}
      code={`<Slider defaultValue={65} />`}
    >
      <div className="max-w-xs space-y-4">
        <Slider defaultValue={65} />
        <Slider
          variant="accent"
          defaultValue={30}
        />
      </div>
    </DemoSection>
  );
}
