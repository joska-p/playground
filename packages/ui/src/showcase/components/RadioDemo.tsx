import { Radio } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function RadioDemo() {
  return (
    <DemoSection
      id="component-radio"
      title="Radio"
      intro="Native radio input with accent-color via variant. Share a name prop to group radios."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'label', type: 'ReactNode', default: '—' }
      ]}
      code={`<Radio name="group" defaultChecked label="2d" />
<Radio name="group" label="3d" />`}
    >
      <div className="flex gap-6">
        <Radio
          id="r1"
          name="radio-demo"
          defaultChecked
          label="2d"
        />
        <Radio
          id="r2"
          name="radio-demo"
          label="3d"
        />
        <Radio
          id="r3"
          name="radio-demo"
          label="simulation"
        />
      </div>
    </DemoSection>
  );
}
