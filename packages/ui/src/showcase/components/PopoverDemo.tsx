import { Button, MenuItem, Popover } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function PopoverDemo() {
  return (
    <DemoSection
      id="component-popover"
      title="Popover"
      intro="Hover/focus-triggered via Tailwind group/group-hover — no JS, no positioning library, no portal."
      apiRows={[
        { prop: 'trigger', type: 'ReactNode', default: 'required' },
        { prop: 'widthClassName', type: 'string', default: '"w-60"' },
        { prop: 'align', type: '"left" | "center"', default: '"center"' }
      ]}
      code={`<Popover trigger={<Button>profile</Button>}>
  <p>content</p>
</Popover>`}
    >
      <div className="flex gap-3">
        <Popover trigger={<Button variant="primary">profile</Button>}>
          <p className="text-foreground text-sm font-medium">pg_lab</p>
          <p className="text-foreground-dim text-xs">creative playground</p>
        </Popover>
        <Popover
          trigger={
            <Button
              variant="ghost"
              size="icon"
              aria-label="more"
            >
              &#8942;
            </Button>
          }
        >
          <div className="py-1">
            <MenuItem label="edit" />
            <MenuItem label="duplicate" />
            <MenuItem
              label="delete"
              variant="destructive"
            />
          </div>
        </Popover>
      </div>
    </DemoSection>
  );
}
