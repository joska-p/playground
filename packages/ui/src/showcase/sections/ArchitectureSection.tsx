import { CodeBlock } from '../layout/CodeBlock';
import { DocHeading } from '../layout/DocHeading';
import { Prose } from '../layout/Prose';

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="space-y-6"
    >
      <DocHeading level="h2">4. Architecture</DocHeading>

      <DocHeading level="h3">4.1 React 19 ref-as-prop</DocHeading>
      <Prose>
        <p>No component uses forwardRef. ref is declared as an ordinary prop:</p>
      </Prose>
      <CodeBlock
        code={`export function Button({ ref, ...props }: ButtonProps) {
  return <button ref={ref} {...props} />;
}`}
      />
      <Prose>
        <p>Dialog goes further and calls useImperativeHandle directly on the ref:</p>
      </Prose>
      <CodeBlock
        code={`export function Dialog({ children, ref }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));
  return <dialog ref={dialogRef}>{children}</dialog>;
}`}
      />

      <DocHeading level="h3">4.2 Variant files</DocHeading>
      <Prose>
        <p>
          Every cva() call lives in its own ComponentName.variants.ts file beside the component.
          This means the variant config can be imported and tested independently.
        </p>
      </Prose>

      <DocHeading level="h3">4.3 Stateless components, stateful hooks</DocHeading>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">
                Needs state?
              </th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Component</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">
                Hook that owns the state
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Yes', 'ThemeProvider', 'useThemeState(defaultTheme?, persist?)'],
              ['Yes', 'ToastProvider / ToastViewport', 'useToastQueue()'],
              ['Yes', 'Tabs', 'useTabsState(defaultValue)'],
              ['Yes', 'Sidebar', 'useSidebarState(defaultOpen?)'],
              ['Yes', 'FloatingNav', 'useFloatingNavState()'],
              ['Yes', 'ScrollReveal', 'useScrollRevealState(threshold?)'],
              [
                'No — native element owns state',
                'AccordionItem, Dialog, Checkbox, Radio, Switch, Slider',
                '—'
              ],
              ['No — pure CSS', 'Popover, Tooltip', '—'],
              ['No — ref only', 'Carousel, ColorPalette', '—']
            ].map(([needs, comp, hook]) => (
              <tr
                key={comp}
                className="border-border border-b"
              >
                <td className="text-foreground-dim px-3 py-2">{needs}</td>
                <td className="text-foreground px-3 py-2 font-mono">{comp}</td>
                <td className="text-foreground-muted px-3 py-2 font-mono">{hook}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DocHeading level="h3">4.4 File layout</DocHeading>
      <CodeBlock
        code={`src/
  styles/
    styles.css              @import "tailwindcss"
    gruvbox-theme.css       theme tokens + CSS-only component behaviors
  lib/
    cn.ts                   clsx + tailwind-merge helper
    colorVariant.ts         shared 6-value ColorVariant type + helpers
  hooks/
    useThemeState.ts        useToastQueue.ts    useTabsState.ts
    useFloatingNavState.ts  useScrollRevealState.ts
    useSidebarState.ts      useResizeObserver.ts
  theme/
    ThemeProvider.tsx       useTheme.ts
  components/
    data-entry/     Button, Checkbox, HelperText, Input, Label,
                    Radio, Select, Slider, Switch, Textarea
    data-display/   Accordion, Badge, Card, Carousel, ChangelogItem,
                    ColorSwatch, Hero, MenuItem, NotificationItem,
                    Popover, ScrollReveal, SectionHeader, SectionHeading, Tooltip
    feedback/       Alert, Dialog, ErrorBoundary, Toast
    navigation/     FloatingNav, Tabs
    widgets/        ColorPalette, Sidebar
    Cards/          CategoryCard, DocCard, ProjectCard, CardLink
    ControlPanel/   ControlPanel, ControlSection, ControlRow, etc.
    icons/          Icon, iconMap, createIcon`}
      />
    </section>
  );
}
