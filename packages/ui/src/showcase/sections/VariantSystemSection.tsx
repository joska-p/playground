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
        <p>There are two ways a component consumes variant:</p>
      </Prose>

      <DocHeading level="h4">5.1 Full color, via cva</DocHeading>
      <Prose>
        <p>
          Used when the variant changes multiple properties at once (background AND text color AND
          focus ring).
        </p>
      </Prose>
      <CodeBlock
        code={`export const buttonVariants = cva("inline-flex ...", {
  variants: {
    variant: {
      default: "bg-surface-raised text-foreground ...",
      primary: "bg-primary text-primary-foreground ...",
    },
    size: { sm: "...", default: "...", lg: "...", icon: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});`}
      />

      <DocHeading level="h4">5.2 Single accent, via --_color</DocHeading>
      <Prose>
        <p>
          Used when only one value changes — a focus ring, an accent dot, a glow color. The
          component sets --_color from colorVar(variant) and CSS reads it.
        </p>
      </Prose>
      <CodeBlock code={`<span style={colorVarStyle(variant)} />`} />

      <DocHeading level="h3">5.3 Component variant reference</DocHeading>
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
              ['Badge', '--_color', 'default', 'soft/solid/outline/dot fill'],
              ['Input / Textarea', '--_ring', 'primary', 'focus border + ring'],
              ['Select', '--_ring', 'primary', 'focus border + ring'],
              ['Switch', '--_color', 'primary', 'checked-state fill'],
              ['Checkbox / Radio / Slider', 'accent-color', 'primary', 'native accent'],
              ['Card', '--_color', 'primary', ':has() hover glow'],
              ['Tabs', '--_color', 'primary', 'active tab underline'],
              ['Alert', 'cva', 'default', 'tinted background + icon'],
              ['Label / HelperText', 'cva', 'default', 'text color'],
              ['ChangelogItem', '--_color', 'primary', 'version label'],
              ['Hero', '--_color', 'primary', 'gradient accent'],
              ['MenuItem', '--_color', 'default', 'icon background'],
              ['NotificationItem', '--_color', 'primary', 'icon background'],
              ['SectionHeader / SectionHeading', '--_color', 'primary', 'title + link'],
              ['ColorPalette', '--_color', 'primary', 'selection ring'],
              ['SidebarPanel / SidebarToggle', '--_color', 'default', 'panel accent / button'],
              ['FloatingNav', '--_color', 'primary', 'brand text'],
              ['ErrorBoundary', '--_color', 'destructive', 'fallback accent'],
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
