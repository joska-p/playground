import { DocHeading } from '../layout/DocHeading';
import { Prose } from '../layout/Prose';

export function ChecklistSection() {
  return (
    <section
      id="checklist"
      className="space-y-6"
    >
      <DocHeading level="h2">8. Progressive enhancement checklist</DocHeading>
      <Prose>
        <p>When touching or extending a component, verify:</p>
      </Prose>
      <ul className="text-foreground-muted list-inside list-disc space-y-2 text-sm">
        <li>
          Base (mobile) styles have no breakpoint prefix and are fully functional on their own.
        </li>
        <li>
          landscape: / sm: classes only <em>add</em> — removing them should degrade gracefully,
          never break layout or hide content.
        </li>
        <li>
          If the browser has a native element for this (checkbox, radio, range, details, dialog),
          you are using it — not reimplementing it with role + aria-* + custom key handlers.
        </li>
        <li>
          :has(), :focus-within, @starting-style, color-mix() stay in globals.css. React only
          toggles attributes (open, checked, data-active, --_color) on top of them.
        </li>
        <li>prefers-reduced-motion is respected (handled globally in globals.css).</li>
      </ul>
    </section>
  );
}
