import { Textarea } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function TextareaDemo() {
  return (
    <DemoSection
      id="component-textarea"
      title="Textarea"
      intro="Auto-growing textarea using field-sizing: content. Focus ring color via variant."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'autoGrow', type: 'boolean', default: 'true', notes: 'uses field-sizing: content' }
      ]}
      code={`<Textarea placeholder="start typing..." />`}
    >
      <div className="max-w-sm">
        <Textarea placeholder="start typing — grows with content..." />
      </div>
    </DemoSection>
  );
}
