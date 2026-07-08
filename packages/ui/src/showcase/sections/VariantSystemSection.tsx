import { CodeBlock } from '../layout/CodeBlock';
import { DocHeading } from '../layout/DocHeading';
import { Prose } from '../layout/Prose';

export function VariantSystemSection() {
  return (
    <section
      id="variants"
      className="space-y-6"
    >
      <DocHeading level="h2">5. Variant system</DocHeading>
      <Prose>
        <p>Defined once in lib/colorVariant.ts, used by every component:</p>
      </Prose>
      <CodeBlock
        code={`type ColorVariant = "default" | "primary" | "secondary" | "accent" | "warning" | "destructive";`}
      />
      <Prose>
        <p>
          <strong>default</strong> is neutral (--foreground-dim); the other five map to the semantic
          CSS variables.
        </p>
        <p>Every component consumes variant through a single mechanism:</p>
      </Prose>

      <DocHeading level="h4">5.1 cva + COLOR_CLASSES</DocHeading>
      <Prose>
        <p>
          Each component owns a cva variant axis that spreads COLOR_CLASSES or defines its own
          per-variant Tailwind classes. No inline styles or CSS custom properties are involved.
        </p>
      </Prose>
      <CodeBlock
        code={`export const buttonVariants = cva("inline-flex ...", {
  variants: {
    variant: { ...COLOR_CLASSES, ... },
    size: { sm: "...", default: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});`}
      />

      <DocHeading level="h3">5.2 Component variant reference</DocHeading>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Component</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Mechanism</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Default</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">
                What it colors
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Button', 'cva', 'default', 'background + text'],
              ['Badge', 'cva', 'default', 'compound (variant x appearance)'],
              ['Input / Textarea', 'cva', 'primary', 'focus-within border + ring'],
              ['Select', 'cva', 'primary', 'focus-within border + ring'],
              ['Switch', 'cva', 'primary', 'checked-state fill'],
              [
                'Checkbox / Radio / Slider',
                'inline accent-color',
                'primary',
                'native accent via CSS var'
              ],
              ['Card', 'cva', 'primary', ':has() hover glow'],
              ['Tabs', 'cva', 'primary', 'active tab underline (child span)'],
              ['Alert', 'cva', 'default', 'tinted background + icon'],
              ['Label / HelperText', 'cva', 'default', 'text color'],
              ['ChangelogItem', 'cva', 'primary', 'version label'],
              ['Hero', 'cva', 'primary', 'gradient accent'],
              ['MenuItem', 'cva', 'default', 'tinted bg + text'],
              ['NotificationItem', 'cva', 'primary', 'tinted bg + text'],
              ['SectionHeader / SectionHeading', 'cva', 'primary', 'title + link'],
              ['ColorPalette', 'cva', 'primary', 'selection ring'],
              ['SidebarPanel / SidebarToggle', 'cva', 'default', 'panel / button styling'],
              ['FloatingNav', 'cva', 'primary', 'brand text'],
              ['ErrorBoundary', 'cva', 'destructive', 'fallback accent'],
              ['ControlSection', 'cva', 'default', 'header + border']
            ].map(([comp, mech, def, colors]) => (
              <tr
                key={comp}
                className="border-border border-b"
              >
                <td className="text-foreground px-3 py-2 font-mono">{comp}</td>
                <td className="text-foreground-muted px-3 py-2 font-mono">{mech}</td>
                <td className="text-foreground-dim px-3 py-2 font-mono">{def}</td>
                <td className="text-foreground-dim px-3 py-2">{colors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
