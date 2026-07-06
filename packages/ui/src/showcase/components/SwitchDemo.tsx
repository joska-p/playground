import { Switch } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function SwitchDemo() {
  return (
    <DemoSection
      id="component-switch"
      title="Switch"
      intro='Restyled checkbox with role="switch". Checked-state fill color via variant.'
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'label', type: 'ReactNode', default: '—' }
      ]}
      code={`<Switch defaultChecked label="fullscreen" />
<Switch variant="accent" label="loop" />
<Switch variant="secondary" label="dark mode" />`}
    >
      <div className="flex flex-col gap-2.5">
        <Switch
          id="sw1"
          defaultChecked
          label="fullscreen"
        />
        <Switch
          id="sw2"
          variant="accent"
          label="loop"
        />
        <Switch
          id="sw3"
          variant="secondary"
          defaultChecked
          label="dark mode"
        />
      </div>
    </DemoSection>
  );
}
