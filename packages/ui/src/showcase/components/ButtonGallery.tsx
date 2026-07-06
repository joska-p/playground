import { Settings } from 'lucide-react';
import { Button } from '../..';
import { DemoSection } from '../layout/DemoSection';
import { VARIANTS } from '../layout/constants';

export function ButtonGallery() {
  return (
    <DemoSection
      id="component-button"
      title="Button"
      intro="All 6 semantic variants plus ghost/link. Four sizes including icon-only. Loading, disabled, and full-width states."
      apiRows={[
        {
          prop: 'variant',
          type: 'ColorVariant | "ghost" | "link"',
          default: '"default"',
          notes: 'ghost/link are extras beyond the 6-variant system'
        },
        { prop: 'size', type: '"sm" | "default" | "lg" | "icon"', default: '"default"' },
        {
          prop: 'loading',
          type: 'boolean',
          default: 'false',
          notes: 'swaps label for spinner, sets aria-busy'
        },
        { prop: 'fullWidth', type: 'boolean', default: 'false' }
      ]}
      code={`<Button variant="primary">click me</Button>
<Button size="sm">small</Button>
<Button loading>loading</Button>
<Button disabled>disabled</Button>
<Button fullWidth>full width</Button>`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Button
              key={v}
              variant={v}
            >
              {v}
            </Button>
          ))}
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <Button size="sm">sm</Button>
          <Button size="default">default</Button>
          <Button size="lg">lg</Button>
          <Button
            size="icon"
            aria-label="settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </DemoSection>
  );
}
