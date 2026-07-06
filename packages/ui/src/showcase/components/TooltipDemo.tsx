import { Globe, Info, Settings } from 'lucide-react';
import { Button, Tooltip } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function TooltipDemo() {
  return (
    <DemoSection
      id="component-tooltip"
      title="Tooltip"
      intro="CSS-only ::after bubble on hover/focus-visible. Clones the child element and adds data-tooltip attribute. No portal, no measurement."
      apiRows={[
        { prop: 'content', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"default"' }
      ]}
      code={`<Tooltip content="settings">
  <Button variant="ghost" size="icon"><Settings /></Button>
</Tooltip>`}
    >
      <div className="flex gap-3">
        <Tooltip content="settings">
          <Button
            variant="ghost"
            size="icon"
            aria-label="settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </Tooltip>
        <Tooltip content="delete">
          <Button
            variant="destructive"
            size="icon"
            aria-label="delete"
          >
            <Globe className="h-3.5 w-3.5" />
          </Button>
        </Tooltip>
        <Tooltip content="save">
          <Button
            variant="primary"
            size="icon"
            aria-label="save"
          >
            <Info className="h-3.5 w-3.5" />
          </Button>
        </Tooltip>
      </div>
    </DemoSection>
  );
}
