import { DocHeading } from '../layout/DocHeading';

export function AccessibilitySection() {
  return (
    <section
      id="accessibility"
      className="space-y-6"
    >
      <DocHeading level="h2">9. Accessibility</DocHeading>
      <ul className="text-foreground-muted list-inside list-disc space-y-2 text-sm">
        <li>
          <strong>Button</strong> sets <code>aria-busy</code> and <code>disabled</code> while{' '}
          <code>loading</code>.
        </li>
        <li>
          <strong>Switch</strong> sets <code>role="switch"</code> on the underlying checkbox.
        </li>
        <li>
          <strong>Carousel</strong> arrow buttons have explicit <code>aria-label</code>s; the track
          itself is native scroll, so screen readers and keyboard users can also tab through slide
          content.
        </li>
        <li>
          <strong>Tabs</strong> uses a real radio group (shared <code>name</code>, native{' '}
          <code>checked</code>), so arrow-key navigation between triggers is native browser
          behavior.
        </li>
        <li>
          <strong>Dialog</strong> inherits native <code>&lt;dialog&gt;</code> focus-trap and
          Esc-to-close.
        </li>
        <li>
          <strong>Toast</strong> items render with <code>role="status"</code>; the dismiss button
          always has an <code>aria-label</code>.
        </li>
        <li>
          Always pass your own <code>aria-label</code> on icon-only <code>Button</code>s (
          <code>size="icon"</code>) — the library cannot infer one from an icon alone.
        </li>
      </ul>
    </section>
  );
}
