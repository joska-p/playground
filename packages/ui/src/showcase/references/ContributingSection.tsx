import { DocHeading } from '../layout/DocHeading';
import { Prose } from '../layout/Prose';

export function ContributingSection() {
  return (
    <section
      id="contributing"
      className="space-y-6"
    >
      <DocHeading level="h2">10. Conventions for contributing</DocHeading>
      <Prose>
        <ol className="list-inside list-decimal space-y-2">
          <li>
            <strong>File location</strong>:
            src/components/&lt;category&gt;/&lt;name&gt;/&lt;Name&gt;.tsx. If it needs cva, add
            &lt;Name&gt;.variants.ts beside it.
          </li>
          <li>
            <strong>No forwardRef.</strong> Add ref?: Ref&lt;TElement&gt; to the props type,
            destructure and forward it.
          </li>
          <li>
            <strong>No useState/useReducer inside the component.</strong> If it needs memory, write
            use&lt;Name&gt;State() in src/hooks/ and accept the resulting values as props.
          </li>
          <li>
            <strong>Color, if any</strong>, uses the shared ColorVariant type from
            lib/colorVariant.ts — do not invent a parallel color enum. Use cva (§5.1) with a variant
            axis that spreads COLOR_CLASSES or defines per-variant Tailwind classes.
          </li>
          <li>
            <strong>Mobile-first.</strong> No-prefix styles are the complete experience;
            landscape:/sm: only add.
          </li>
          <li>
            <strong>Prefer the platform.</strong> Before writing interaction logic, check whether a
            native element or CSS feature already does it.
          </li>
          <li>
            <strong>Export from index.ts</strong>: the component, its props type, its variants
            export (if any), and its state hook (if any).
          </li>
          <li>
            <strong>Update this page</strong> — add a row to the variant table (§5.3) if it takes
            variant, and a DemoSection to the component gallery below.
          </li>
        </ol>
      </Prose>
    </section>
  );
}
