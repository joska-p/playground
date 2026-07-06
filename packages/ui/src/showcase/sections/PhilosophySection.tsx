import { DocHeading } from '../layout/DocHeading';
import { Prose } from '../layout/Prose';

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="space-y-6"
    >
      <DocHeading level="h2">1. Philosophy</DocHeading>
      <Prose>
        <p>Four rules shape every decision in this library:</p>
      </Prose>
      <div className="grid grid-cols-1 gap-4 landscape:grid-cols-2">
        {[
          {
            title: 'Mobile-first',
            body: 'Base classes (no breakpoint prefix) are the complete, working experience. landscape: / sm: prefixes only ever add refinements — never fix something that was broken on mobile.'
          },
          {
            title: 'Progressive enhancement',
            body: 'Prefer the platform. Native &lt;details&gt;, &lt;dialog&gt;, &lt;input&gt;, :has(), :focus-within, @starting-style do real work — they are not decoration on top of JS.'
          },
          {
            title: 'Stateless components, stateful hooks',
            body: 'No component calls useState. State is extracted into hooks (useThemeState, useToastQueue, useTabsState, useSidebarState…). Components are pure (props) =&gt; JSX functions.'
          },
          {
            title: 'One variant system, everywhere',
            body: 'Every component that has any notion of "color" accepts the same six-value variant prop (default/primary/secondary/accent/warning/destructive). Learn it once, use it everywhere.'
          }
        ].map(({ title, body }) => (
          <div
            key={title}
            className="bg-surface-raised space-y-2 rounded-lg p-5 shadow-xs"
          >
            <h4 className="text-foreground text-sm font-medium">{title}</h4>
            <p className="text-foreground-muted text-xs leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
