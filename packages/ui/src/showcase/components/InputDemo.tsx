import { Search } from 'lucide-react';
import { Input } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function InputDemo() {
  return (
    <DemoSection
      id="component-input"
      title="Input"
      intro="Text input with optional icon, loading spinner, and error state. Focus ring color via variant prop."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"', notes: 'focus ring color' },
        { prop: 'leadingIcon', type: 'ReactNode', default: '—' },
        { prop: 'loading', type: 'boolean', default: 'false' },
        {
          prop: 'expandable',
          type: 'boolean',
          default: 'false',
          notes: 'grows from 200px→320px on focus'
        }
      ]}
      code={`<Input placeholder="type something..." />
<Input placeholder="search..." leadingIcon={<Search />} />
<Input variant="destructive" defaultValue="bad input" />
<Input disabled value="cant touch this" />`}
    >
      <div className="max-w-sm space-y-3">
        <Input placeholder="type something..." />
        <Input
          placeholder="search..."
          leadingIcon={<Search className="h-3.5 w-3.5" />}
        />
        <Input
          variant="destructive"
          defaultValue="bad input"
        />
        <Input
          disabled
          value="cant touch this"
        />
      </div>
    </DemoSection>
  );
}
