import { Select } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function SelectDemo() {
  return (
    <DemoSection
      id="component-select"
      title="Select"
      intro="Native &lt;select&gt; styled to match Input/Textarea. The browser supplies the picker UI, keyboard support, and type-ahead search."
      apiRows={[
        { prop: 'variant', type: 'VariantProps', default: '"primary"', notes: 'focus ring color' },
        { prop: 'size', type: '"sm" | "default" | "lg"', default: '"default"' },
        {
          prop: 'placeholder',
          type: 'string',
          default: '—',
          notes: 'renders a disabled first option'
        },
        {
          prop: 'loading',
          type: 'boolean',
          default: 'false',
          notes: 'disables input and shows spinner'
        },
        { prop: 'leadingIcon', type: 'ReactNode', default: '—' }
      ]}
      code={`<Select placeholder="choose...">
  <option value="generative">generative</option>
  <option value="shader">shader</option>
</Select>`}
    >
      <div className="max-w-sm space-y-3">
        <Select placeholder="choose a category...">
          <option value="generative">generative</option>
          <option value="shader">shader</option>
          <option value="simulation">simulation</option>
        </Select>
        <Select
          variant="destructive"
          placeholder="required field"
        >
          <option value="">select...</option>
          <option value="opt1">option 1</option>
        </Select>
        <Select
          loading
          placeholder="Loading state"
        >
          <option value="opt1">option 1</option>
        </Select>
      </div>
    </DemoSection>
  );
}
