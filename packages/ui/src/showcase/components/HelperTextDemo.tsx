import { HelperText, Input } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function HelperTextDemo() {
  return (
    <DemoSection
      id="component-helpertext"
      title="HelperText"
      intro="Hint or error text displayed below an input. Variant controls text color; icon mode shows an alert icon."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'icon', type: 'boolean', default: 'false', notes: 'shows alert icon' }
      ]}
      code={`<HelperText>Must be at least 8 characters.</HelperText>
<HelperText variant="destructive" icon>This field is required.</HelperText>`}
    >
      <div className="max-w-sm space-y-3">
        <div>
          <Input placeholder="password" />
          <HelperText>Must be at least 8 characters.</HelperText>
        </div>
        <div>
          <Input
            variant="destructive"
            defaultValue="short"
          />
          <HelperText
            variant="destructive"
            icon
          >
            Too short — min 8 characters.
          </HelperText>
        </div>
      </div>
    </DemoSection>
  );
}
