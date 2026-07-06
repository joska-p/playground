import { ChangelogItem, Tabs, TabsContent, TabsList, TabsTrigger, useTabsState } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function TabsDemo() {
  const tabs = useTabsState('overview');
  return (
    <DemoSection
      id="component-tabs"
      title="Tabs"
      intro="Fully controlled via useTabsState. Built on a native radio group with CSS-only underline animation."
      apiRows={[
        { prop: 'Tabs value', type: 'string', default: 'required' },
        { prop: 'Tabs onValueChange', type: '(v: string) => void', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"', notes: 'underline color' }
      ]}
      code={`const tabs = useTabsState("overview");
<Tabs value={tabs.value} onValueChange={tabs.setValue}>
  <TabsList>
    <TabsTrigger value="overview">overview</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>`}
    >
      <Tabs
        value={tabs.value}
        onValueChange={tabs.setValue}
      >
        <TabsList>
          <TabsTrigger value="overview">overview</TabsTrigger>
          <TabsTrigger value="features">features</TabsTrigger>
          <TabsTrigger value="changelog">changelog</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          pg_lab is a design-first toolkit built on modern css.
        </TabsContent>
        <TabsContent value="features">
          css-only states via :has(), entry animations with @starting-style, zero-js accordion,
          tabs, toggles.
        </TabsContent>
        <TabsContent value="changelog">
          <ChangelogItem
            variant="primary"
            version="v2.0"
          >
            complete rewrite — stateless components, hooks, gruvbox v2.
          </ChangelogItem>
          <ChangelogItem
            variant="accent"
            version="v1.3"
          >
            semantic colors, popover, carousel.
          </ChangelogItem>
        </TabsContent>
      </Tabs>
    </DemoSection>
  );
}
