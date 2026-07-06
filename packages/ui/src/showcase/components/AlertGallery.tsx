import { Alert } from '../..';
import { DemoSection } from '../layout/DemoSection';
import { VARIANTS } from '../layout/constants';

export function AlertGallery() {
  return (
    <DemoSection
      id="component-alert"
      title="Alert"
      intro="Each of the 6 variants gets a tinted background and a per-variant icon. Optional title, description, and custom icon."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'title', type: 'ReactNode', default: 'required' },
        { prop: 'description', type: 'ReactNode', default: '—' },
        { prop: 'icon', type: 'ReactNode', default: '—', notes: 'overrides default icon' }
      ]}
      code={`<Alert variant="primary" title="info" description="description" />`}
    >
      <div className="max-w-lg space-y-2">
        {VARIANTS.map((v) => (
          <Alert
            key={v}
            variant={v}
            title={v}
            description={`this is a ${v} alert.`}
          />
        ))}
      </div>
    </DemoSection>
  );
}
