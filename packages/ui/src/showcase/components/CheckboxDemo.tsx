import { Checkbox } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function CheckboxDemo() {
  return (
    <DemoSection
      id="component-checkbox"
      title="Checkbox"
      intro="Native checkbox with accent-color via variant prop. Supports label prop for a styled &lt;label&gt; wrapper."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        {
          prop: 'label',
          type: 'ReactNode',
          default: '—',
          notes: 'wraps input + label in a <label>'
        }
      ]}
      code={`<Checkbox defaultChecked label="option" />
<Checkbox variant="accent" label="accent" />
<Checkbox disabled label="disabled" />`}
    >
      <div className="flex flex-col gap-2.5">
        <Checkbox
          id="chk1"
          defaultChecked
          label="generative"
        />
        <Checkbox
          id="chk2"
          variant="accent"
          label="color"
        />
        <Checkbox
          id="chk3"
          variant="secondary"
          label="shader"
        />
        <Checkbox
          id="chk4"
          disabled
          label="disabled"
        />
      </div>
    </DemoSection>
  );
}
