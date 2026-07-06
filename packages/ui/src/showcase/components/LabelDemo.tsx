import { Input, Label } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function LabelDemo() {
  return (
    <DemoSection
      id="component-label"
      title="Label"
      intro="Form label with optional required indicator. Variant controls the text color."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'required', type: 'boolean', default: 'false', notes: 'adds * indicator' }
      ]}
      code={`<Label htmlFor="input-id">Username</Label>
<Label htmlFor="req" required>Email</Label>
<Label htmlFor="err" variant="destructive">Error field</Label>`}
    >
      <div className="max-w-sm space-y-3">
        <div className="space-y-1">
          <Label htmlFor="label-default">Username</Label>
          <Input id="label-default" />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="label-req"
            required
          >
            Email
          </Label>
          <Input id="label-req" />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="label-err"
            variant="destructive"
          >
            Password
          </Label>
          <Input
            id="label-err"
            variant="destructive"
          />
        </div>
      </div>
    </DemoSection>
  );
}
