import { Badge } from '../../components/data-display';
import { Sidebar, SidebarMain, SidebarPanel, SidebarToggle } from '../../components/widgets';
import { useSidebarState } from '../../hooks/useSidebarState';
import { DemoSection } from '../layout/DemoSection';

export function SidebarDemo() {
  const sidebar = useSidebarState(true);
  return (
    <DemoSection
      id="component-sidebar"
      title="Sidebar"
      intro="A compound component (Sidebar, SidebarPanel, SidebarMain, SidebarToggle) supporting 4 dock positions. State via useSidebarState."
      apiRows={[
        { prop: 'position', type: '"top" | "right" | "bottom" | "left"', default: '"left"' },
        { prop: 'defaultOpen', type: 'boolean', default: 'true' },
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'SidebarPanel variant', type: 'ColorVariant', default: '"default"' }
      ]}
      code={`const sidebar = useSidebarState(true);
<Sidebar open={sidebar.isOpen} onOpenChange={sidebar.toggle}>
  <SidebarPanel>sidebar</SidebarPanel>
  <SidebarMain>
    <SidebarToggle />
    main
  </SidebarMain>
</Sidebar>`}
    >
      <div className="bg-surface h-64 overflow-hidden rounded-lg shadow-xs">
        <Sidebar
          open={sidebar.isOpen}
          onOpenChange={sidebar.toggle}
          position="left"
        >
          <SidebarPanel
            variant="primary"
            className="flex flex-col gap-2 p-4 text-xs"
          >
            <Badge
              variant="accent"
              appearance="solid"
            >
              sidebar
            </Badge>
            <span className="text-foreground-muted mt-2">navigation</span>
            <span className="text-foreground-muted">settings</span>
            <span
              className="text-foreground-dim cursor-pointer"
              onClick={() => {
                sidebar.toggle();
              }}
            >
              close &rarr;
            </span>
          </SidebarPanel>
          <SidebarMain className="flex flex-col gap-2 p-4">
            <SidebarToggle variant="primary" />
            <p className="text-foreground-muted mt-4 text-xs">
              Main content area. Toggle the sidebar.
            </p>
          </SidebarMain>
        </Sidebar>
      </div>
    </DemoSection>
  );
}
