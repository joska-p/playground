import {
  Book,
  CircleCheck,
  Cog,
  Globe,
  Info,
  Moon,
  Search,
  Settings,
  Sun,
  TriangleAlert,
  User,
  Zap
} from 'lucide-react';
import { useRef, useState } from 'react';
import {
  accentTokens,
  Accordion,
  AccordionItem,
  Alert,
  Badge,
  Button,
  Card,
  CardActions,
  CardBody,
  CardDescription,
  CardFooter,
  CardImage,
  CardLink,
  CardTitle,
  Carousel,
  CarouselSlide,
  CategoryCard,
  ChangelogItem,
  Checkbox,
  ColorPalette,
  ColorSwatch,
  ControlConditional,
  ControlGrid,
  ControlPanel,
  ControlRow,
  ControlSection,
  ControlSubsection,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  DocCard,
  ErrorBoundary,
  FloatingNav,
  HelperText,
  Hero,
  Icon,
  Input,
  Label,
  MenuItem,
  NotificationItem,
  Popover,
  ProjectCard,
  Radio,
  ScrollReveal,
  SectionHeader,
  SectionHeading,
  Select,
  Sidebar,
  SidebarMain,
  SidebarPanel,
  SidebarToggle,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeProvider,
  ToastProvider,
  Tooltip,
  useSidebarState,
  useTabsState,
  useTheme,
  useThemeState,
  useToast,
  useToastQueue,
  type ColorVariant,
  type DialogHandle
} from './index';

const VARIANTS: ColorVariant[] = [
  'default',
  'primary',
  'secondary',
  'accent',
  'warning',
  'destructive'
];

/* ------------------------------------------------------------------ */
/*  Layout helpers                                                     */
/* ------------------------------------------------------------------ */

function DocHeading({ level = 'h2', children }: { level?: 'h2' | 'h3' | 'h4'; children: string }) {
  const Tag = level;
  const styles = {
    h2: 'text-foreground mt-14 mb-4 text-xl font-medium tracking-tight',
    h3: 'text-foreground mt-10 mb-3 text-base font-medium',
    h4: 'text-foreground mt-6 mb-2 text-sm font-medium'
  };
  return <Tag className={styles[level]}>{children}</Tag>;
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-foreground-muted max-w-160 space-y-3 text-sm leading-relaxed">
      {children}
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-surface border-border max-h-80 overflow-x-auto rounded-lg border p-4 text-xs leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

function ApiTable({
  rows
}: {
  rows: { prop: string; type: string; default: string; notes?: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-border border-b">
            <th className="text-foreground-muted px-3 py-2 text-left font-medium">Prop</th>
            <th className="text-foreground-muted px-3 py-2 text-left font-medium">Type</th>
            <th className="text-foreground-muted px-3 py-2 text-left font-medium">Default</th>
            <th className="text-foreground-muted px-3 py-2 text-left font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.prop}
              className="border-border border-b"
            >
              <td className="text-foreground px-3 py-2 font-mono">{r.prop}</td>
              <td className="text-foreground-muted px-3 py-2 font-mono">{r.type}</td>
              <td className="text-foreground-dim px-3 py-2 font-mono">{r.default}</td>
              <td className="text-foreground-dim px-3 py-2">{r.notes ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DemoSection({
  id,
  title,
  intro,
  code,
  apiRows,
  children
}: {
  id?: string;
  title: string;
  intro?: string;
  code?: string;
  apiRows?: { prop: string; type: string; default: string; notes?: string }[];
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="space-y-4"
    >
      <DocHeading level="h3">{title}</DocHeading>
      {intro && (
        <Prose>
          <p>{intro}</p>
        </Prose>
      )}
      {apiRows && <ApiTable rows={apiRows} />}
      {code && <CodeBlock code={code} />}
      <div className="pt-2">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Theme toggle                                                       */
/* ------------------------------------------------------------------ */

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Tooltip content="Toggle theme">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </Button>
    </Tooltip>
  );
}

/* ------------------------------------------------------------------ */
/*  §1 — Philosophy                                                   */
/* ------------------------------------------------------------------ */

function PhilosophySection() {
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

/* ------------------------------------------------------------------ */
/*  §2 — Installation & setup                                         */
/* ------------------------------------------------------------------ */

function SetupSection() {
  return (
    <section
      id="setup"
      className="space-y-6"
    >
      <DocHeading level="h2">2. Installation &amp; setup</DocHeading>
      <Prose>
        <p>Install the package and its peer dependencies:</p>
      </Prose>
      <CodeBlock
        code={`pnpm add @repo/ui-v2 class-variance-authority clsx tailwind-merge lucide-react`}
      />
      <Prose>
        <p>
          <strong>Step 1</strong> — import the stylesheet once at your app root:
        </p>
      </Prose>
      <CodeBlock code={`import "@repo/ui-v2/styles";`} />
      <Prose>
        <p>
          The stylesheet is Tailwind v4 CSS-first config — no tailwind.config.js. It defines the
          gruvbox color tokens for dark (:root) and light (html[data-theme="light"]), plus every
          CSS-only interactive behavior the components rely on.
        </p>
        <p>
          <strong>Step 2</strong> — wire up stateful providers. State lives in hooks; providers just
          relay it:
        </p>
      </Prose>
      <CodeBlock
        code={`import { ThemeProvider, useThemeState, ToastProvider, useToastQueue } from "@repo/ui-v2";

export default function App() {
  const theme = useThemeState();
  const toastQueue = useToastQueue();

  return (
    <ThemeProvider theme={theme.theme} setTheme={theme.setTheme} toggleTheme={theme.toggleTheme}>
      <ToastProvider toasts={toastQueue.toasts} toast={toastQueue.toast} dismiss={toastQueue.dismiss}>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}`}
      />
      <Prose>
        <p>
          Both providers are optional. Dark is the CSS :root default, so an app that never renders
          ThemeProvider still gets the full dark theme.
        </p>
      </Prose>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §3 — Design Tokens                                                */
/* ------------------------------------------------------------------ */

function DesignTokensSection() {
  return (
    <section
      id="tokens"
      className="space-y-6"
    >
      <DocHeading level="h2">3. Design Tokens</DocHeading>
      <Prose>
        <p>
          All tokens are CSS custom properties, re-exposed to Tailwind via @theme inline so they are
          usable as ordinary utility classes (bg-primary, text-foreground-muted, border-border, …).
        </p>
      </Prose>

      <DocHeading level="h3">3.1 Semantic tokens</DocHeading>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Token</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Dark</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Light</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Foreground</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['--background', '#1d2021', '#fbf1c7', '—'],
              ['--surface', '#282828', '#f2e5bc', '—'],
              ['--surface-raised', '#3c3836', '#ebdbb2', '—'],
              ['--foreground', '#ebdbb2', '#3c3836', '—'],
              ['--foreground-muted', '#a89984', '#665c54', '—'],
              ['--foreground-dim', '#665c54', '#928374', '—'],
              ['--border', 'rgba(235,219,178,.07)', 'rgba(60,56,54,.1)', '—'],
              ['--primary', '#83a598', '#076678', '--primary-foreground'],
              ['--secondary', '#b8bb26', '#79740e', '--secondary-foreground'],
              ['--accent', '#d3869b', '#8f3f71', '--accent-foreground'],
              ['--warning', '#fabd2f', '#b57614', '--warning-foreground'],
              ['--destructive', '#fb4934', '#9d0006', '--destructive-foreground']
            ].map(([token, dark, light, fg]) => (
              <tr
                key={token}
                className="border-border border-b"
              >
                <td className="text-foreground px-3 py-2 font-mono">{token}</td>
                <td className="text-foreground-muted px-3 py-2 font-mono">{dark}</td>
                <td className="text-foreground-muted px-3 py-2 font-mono">{light}</td>
                <td className="text-foreground-dim px-3 py-2 font-mono">{fg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Prose>
        <p>
          Switching theme is one attribute: &lt;html data-theme="light"&gt; (absence of the
          attribute = dark). ThemeProvider / useThemeState do this for you and persist the choice to
          localStorage.
        </p>
      </Prose>

      <DocHeading level="h3">3.2 Raw palette</DocHeading>
      <Prose>
        <p>Used in badges, charts, generative content — not for UI variant props.</p>
      </Prose>
      <div className="flex flex-wrap gap-3">
        {[
          ['--red', '#cc241d'],
          ['--green', '#98971a'],
          ['--yellow', '#d79921'],
          ['--blue', '#458588'],
          ['--purple', '#b16286'],
          ['--aqua', '#689d6a'],
          ['--orange', '#d65d0e']
        ].map(([token]) => (
          <ColorSwatch
            key={token}
            color={`var(${token})`}
            name={token?.replace('--', '') ?? String(token)}
            token={token}
            size="sm"
          />
        ))}
      </div>

      <DocHeading level="h3">3.3 Elevation &amp; shape</DocHeading>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Token</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Usage</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['--shadow-sm / --shadow-md / --shadow-lg', 'Card, Dialog, toast elevation'],
              ['rounded-md', 'Inputs, buttons'],
              ['rounded-lg', 'Cards, panels, dialogs'],
              ['rounded-full', 'Pills, avatars, floating nav'],
              ['JetBrains Mono (monospace-only)', '--font-sans and --font-mono are the same stack']
            ].map(([token, usage]) => (
              <tr
                key={token}
                className="border-border border-b"
              >
                <td className="text-foreground px-3 py-2 font-mono">{token}</td>
                <td className="text-foreground-muted px-3 py-2">{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §4 — Architecture                                                  */
/* ------------------------------------------------------------------ */

function ArchitectureSection() {
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
    icons/          Icon, iconMap, createIcon
  index.ts          barrel export`}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §5 — Variant system                                                */
/* ------------------------------------------------------------------ */

function VariantSystemSection() {
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

/* ------------------------------------------------------------------ */
/*  §6 — Component demos                                               */
/* ------------------------------------------------------------------ */

function HeroDemo() {
  return (
    <DemoSection
      id="component-hero"
      title="Hero"
      intro="Full-width hero section with badge, gradient headline, optional description, and CTA slot."
      code={`<Hero
  badgeText="v2.0"
  title="UI Library"
  highlight="pg_lab"
  description="Gruvbox-themed React 19 components built on Tailwind v4 and CVA."
  variant="primary"
/>`}
    >
      <Hero
        badgeText="v2.0"
        title="UI Library"
        highlight="pg_lab"
        description="Gruvbox-themed React 19 components built on Tailwind v4 and CVA."
        variant="primary"
      />
    </DemoSection>
  );
}

function ButtonGallery() {
  return (
    <DemoSection
      id="component-button"
      title="Button"
      intro="All 6 semantic variants plus ghost/link. Four sizes including icon-only. Loading, disabled, and full-width states."
      apiRows={[
        {
          prop: 'variant',
          type: 'ColorVariant | "ghost" | "link"',
          default: '"default"',
          notes: 'ghost/link are extras beyond the 6-variant system'
        },
        { prop: 'size', type: '"sm" | "default" | "lg" | "icon"', default: '"default"' },
        {
          prop: 'loading',
          type: 'boolean',
          default: 'false',
          notes: 'swaps label for spinner, sets aria-busy'
        },
        { prop: 'fullWidth', type: 'boolean', default: 'false' }
      ]}
      code={`<Button variant="primary">click me</Button>
<Button size="sm">small</Button>
<Button loading>loading</Button>
<Button disabled>disabled</Button>
<Button fullWidth>full width</Button>`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Button
              key={v}
              variant={v}
            >
              {v}
            </Button>
          ))}
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <Button size="sm">sm</Button>
          <Button size="default">default</Button>
          <Button size="lg">lg</Button>
          <Button
            size="icon"
            aria-label="settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </DemoSection>
  );
}

function BadgeGallery() {
  return (
    <DemoSection
      id="component-badge"
      title="Badge"
      intro="Color-driven via --_color. Supports soft (default), solid, and outline appearances plus a dot indicator."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'appearance', type: '"soft" | "solid" | "outline"', default: '"soft"' },
        { prop: 'dot', type: 'boolean', default: 'false' }
      ]}
      code={`<Badge variant="primary">primary</Badge>
<Badge variant="primary" appearance="solid">solid</Badge>
<Badge variant="primary" appearance="outline">outline</Badge>
<Badge variant="primary" dot>active</Badge>`}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Badge
              key={v}
              variant={v}
              appearance="soft"
            >
              {v}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Badge
              key={v}
              variant={v}
              appearance="solid"
            >
              {v}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Badge
              key={v}
              variant={v}
              appearance="outline"
            >
              {v}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {VARIANTS.map((v) => (
            <Badge
              key={v}
              variant={v}
              dot
            >
              {v}
            </Badge>
          ))}
        </div>
      </div>
    </DemoSection>
  );
}

function InputDemo() {
  return (
    <DemoSection
      id="component-input"
      title="Input"
      intro="Text input with optional icon, loading spinner, and error state. Focus ring color via variant prop."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"', notes: 'focus ring color' },
        { prop: 'leadingIcon', type: 'ReactNode', default: '—' },
        { prop: 'loading', type: 'boolean', default: 'false' },
        {
          prop: 'expandable',
          type: 'boolean',
          default: 'false',
          notes: 'grows from 200px→320px on focus'
        }
      ]}
      code={`<Input placeholder="type something..." />
<Input placeholder="search..." leadingIcon={<Search />} />
<Input variant="destructive" defaultValue="bad input" />
<Input disabled value="cant touch this" />`}
    >
      <div className="max-w-sm space-y-3">
        <Input placeholder="type something..." />
        <Input
          placeholder="search..."
          leadingIcon={<Search className="h-3.5 w-3.5" />}
        />
        <Input
          variant="destructive"
          defaultValue="bad input"
        />
        <Input
          disabled
          value="cant touch this"
        />
      </div>
    </DemoSection>
  );
}

function LabelDemo() {
  return (
    <DemoSection
      id="component-label"
      title="Label"
      intro="Form label with optional required indicator. Variant controls the text color."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'required', type: 'boolean', default: 'false', notes: 'adds * indicator' }
      ]}
      code={`<Label htmlFor="input-id">Username</Label>
<Label htmlFor="req" required>Email</Label>
<Label htmlFor="err" variant="destructive">Error field</Label>`}
    >
      <div className="max-w-sm space-y-3">
        <div className="space-y-1">
          <Label htmlFor="label-default">Username</Label>
          <Input id="label-default" />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="label-req"
            required
          >
            Email
          </Label>
          <Input id="label-req" />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="label-err"
            variant="destructive"
          >
            Password
          </Label>
          <Input
            id="label-err"
            variant="destructive"
          />
        </div>
      </div>
    </DemoSection>
  );
}

function HelperTextDemo() {
  return (
    <DemoSection
      id="component-helpertext"
      title="HelperText"
      intro="Hint or error text displayed below an input. Variant controls text color; icon mode shows an alert icon."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'icon', type: 'boolean', default: 'false', notes: 'shows alert icon' }
      ]}
      code={`<HelperText>Must be at least 8 characters.</HelperText>
<HelperText variant="destructive" icon>This field is required.</HelperText>`}
    >
      <div className="max-w-sm space-y-3">
        <div>
          <Input placeholder="password" />
          <HelperText>Must be at least 8 characters.</HelperText>
        </div>
        <div>
          <Input
            variant="destructive"
            defaultValue="short"
          />
          <HelperText
            variant="destructive"
            icon
          >
            Too short — min 8 characters.
          </HelperText>
        </div>
      </div>
    </DemoSection>
  );
}

function TextareaDemo() {
  return (
    <DemoSection
      id="component-textarea"
      title="Textarea"
      intro="Auto-growing textarea using field-sizing: content. Focus ring color via variant."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'autoGrow', type: 'boolean', default: 'true', notes: 'uses field-sizing: content' }
      ]}
      code={`<Textarea placeholder="start typing..." />`}
    >
      <div className="max-w-sm">
        <Textarea placeholder="start typing — grows with content..." />
      </div>
    </DemoSection>
  );
}

function SelectDemo() {
  return (
    <DemoSection
      id="component-select"
      title="Select"
      intro="Native &lt;select&gt; styled to match Input/Textarea. The browser supplies the picker UI, keyboard support, and type-ahead search."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"', notes: 'focus ring color' },
        { prop: 'size', type: '"sm" | "default" | "lg"', default: '"default"' },
        {
          prop: 'placeholder',
          type: 'string',
          default: '—',
          notes: 'renders a disabled first option'
        },
        { prop: 'leadingIcon', type: 'ReactNode', default: '—' }
      ]}
      code={`<Select placeholder="choose...">
  <option value="generative">generative</option>
  <option value="shader">shader</option>
</Select>`}
    >
      <div className="max-w-sm space-y-3">
        <Select placeholder="choose a category...">
          <option value="generative">generative</option>
          <option value="shader">shader</option>
          <option value="simulation">simulation</option>
        </Select>
        <Select
          variant="destructive"
          placeholder="required field"
        >
          <option value="">select...</option>
          <option value="opt1">option 1</option>
        </Select>
      </div>
    </DemoSection>
  );
}

function CheckboxDemo() {
  return (
    <DemoSection
      id="component-checkbox"
      title="Checkbox"
      intro="Native checkbox with accent-color via variant prop. Supports label prop for a styled &lt;label&gt; wrapper."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        {
          prop: 'label',
          type: 'ReactNode',
          default: '—',
          notes: 'wraps input + label in a <label>'
        }
      ]}
      code={`<Checkbox defaultChecked label="option" />
<Checkbox variant="accent" label="accent" />
<Checkbox disabled label="disabled" />`}
    >
      <div className="flex flex-col gap-2.5">
        <Checkbox
          id="chk1"
          defaultChecked
          label="generative"
        />
        <Checkbox
          id="chk2"
          variant="accent"
          label="color"
        />
        <Checkbox
          id="chk3"
          variant="secondary"
          label="shader"
        />
        <Checkbox
          id="chk4"
          disabled
          label="disabled"
        />
      </div>
    </DemoSection>
  );
}

function RadioDemo() {
  return (
    <DemoSection
      id="component-radio"
      title="Radio"
      intro="Native radio input with accent-color via variant. Share a name prop to group radios."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'label', type: 'ReactNode', default: '—' }
      ]}
      code={`<Radio name="group" defaultChecked label="2d" />
<Radio name="group" label="3d" />`}
    >
      <div className="flex gap-6">
        <Radio
          id="r1"
          name="radio-demo"
          defaultChecked
          label="2d"
        />
        <Radio
          id="r2"
          name="radio-demo"
          label="3d"
        />
        <Radio
          id="r3"
          name="radio-demo"
          label="simulation"
        />
      </div>
    </DemoSection>
  );
}

function SwitchDemo() {
  return (
    <DemoSection
      id="component-switch"
      title="Switch"
      intro='Restyled checkbox with role="switch". Checked-state fill color via variant.'
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'label', type: 'ReactNode', default: '—' }
      ]}
      code={`<Switch defaultChecked label="fullscreen" />
<Switch variant="accent" label="loop" />
<Switch variant="secondary" label="dark mode" />`}
    >
      <div className="flex flex-col gap-2.5">
        <Switch
          id="sw1"
          defaultChecked
          label="fullscreen"
        />
        <Switch
          id="sw2"
          variant="accent"
          label="loop"
        />
        <Switch
          id="sw3"
          variant="secondary"
          defaultChecked
          label="dark mode"
        />
      </div>
    </DemoSection>
  );
}

function SliderDemo() {
  return (
    <DemoSection
      id="component-slider"
      title="Slider"
      intro="Native range input with accent-color via variant. Optional tick labels below the track."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        {
          prop: 'showTicks',
          type: 'boolean',
          default: 'true',
          notes: 'min/mid/max labels below track'
        }
      ]}
      code={`<Slider defaultValue={65} />`}
    >
      <div className="max-w-xs space-y-4">
        <Slider defaultValue={65} />
        <Slider
          variant="accent"
          defaultValue={30}
        />
      </div>
    </DemoSection>
  );
}

function CardDemo() {
  const [count, setCount] = useState(1);
  return (
    <DemoSection
      id="component-card"
      title="Card"
      intro="Card has an interactive variant with :has() hover glow. Sub-components: CardImage, CardBody, CardTitle, CardDescription, CardFooter, CardActions."
      apiRows={[
        { prop: 'interactive', type: 'boolean', default: 'false', notes: 'enables :has() glow' },
        {
          prop: 'variant',
          type: 'ColorVariant',
          default: '"primary"',
          notes: 'glow color (if interactive)'
        },
        { prop: 'horizontal', type: 'boolean', default: 'false', notes: 'row layout on landscape+' }
      ]}
      code={`<Card interactive variant="accent">
  <CardImage src="..." />
  <CardBody>
    <CardTitle>title</CardTitle>
    <CardDescription>description</CardDescription>
  </CardBody>
  <CardActions>
    <Button variant="ghost" size="icon"><Cog /></Button>
  </CardActions>
</Card>`}
    >
      <div className="grid grid-cols-1 gap-4 landscape:grid-cols-2">
        <Card
          interactive
          variant="accent"
        >
          <CardImage src="https://picsum.photos/seed/pg2/400/225.jpg" />
          <CardBody>
            <Badge
              variant="accent"
              className="mb-2"
            >
              color
            </Badge>
            <CardTitle>oklch palette generator</CardTitle>
            <CardDescription>harmonious palettes in perceptually uniform space.</CardDescription>
          </CardBody>
          <CardFooter>
            <span className="text-foreground-dim text-xs">2 days ago</span>
            <span className="text-foreground-dim text-xs">{count} views</span>
          </CardFooter>
          <CardActions>
            <Tooltip content="settings">
              <Button
                variant="ghost"
                size="icon"
                aria-label="settings"
                onClick={() => {
                  setCount((c) => c + 1);
                }}
              >
                <Cog className="h-3.5 w-3.5" />
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
        <Card>
          <CardImage src="https://picsum.photos/seed/pg1/400/225.jpg" />
          <CardBody>
            <Badge
              variant="primary"
              className="mb-2"
            >
              generative
            </Badge>
            <CardTitle>flow field exploration</CardTitle>
            <CardDescription>perlin noise fields and particle tracing.</CardDescription>
          </CardBody>
          <CardFooter>
            <span className="text-foreground-dim text-xs">2 days ago</span>
            <Button
              variant="primary"
              size="sm"
            >
              view
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DemoSection>
  );
}

function CardLinkDemo() {
  return (
    <DemoSection
      id="component-cardlink"
      title="CardLink"
      intro="Makes the entire card surface a click target with neon tube glow. Uses the accentTokens system."
      apiRows={[
        { prop: 'href', type: 'string', default: 'required' },
        { prop: 'accent', type: 'string', default: 'accentTokens.primary', notes: 'any CSS color' }
      ]}
      code={`<CardLink href="/" accent={accentTokens.primary}>
  <CardImage src="..." />
  <CardBody>
    <CardTitle>link card</CardTitle>
    <CardDescription>description</CardDescription>
  </CardBody>
</CardLink>`}
    >
      <div className="grid grid-cols-1 gap-4 landscape:grid-cols-2">
        <CardLink
          href="/"
          accent={accentTokens.primary}
        >
          <CardImage src="https://picsum.photos/seed/pg3/400/225.jpg" />
          <CardBody>
            <CardTitle>primary link</CardTitle>
            <CardDescription>entire surface is the click target.</CardDescription>
          </CardBody>
        </CardLink>
        <CardLink
          href="/"
          accent={accentTokens.accent}
        >
          <CardBody>
            <Badge
              variant="accent"
              className="mb-2"
            >
              accent
            </Badge>
            <CardTitle>accent glow</CardTitle>
            <CardDescription>neon tube effect with color-mix().</CardDescription>
          </CardBody>
        </CardLink>
      </div>
    </DemoSection>
  );
}

function AccordionDemo() {
  return (
    <DemoSection
      id="component-accordion"
      title="Accordion / AccordionItem"
      intro="Built on native &lt;details&gt; elements. Accordion is a styled wrapper; AccordionItem is a &lt;details&gt; with a CSS rotating chevron."
      code={`<Accordion>
  <AccordionItem title="question?" open>answer</AccordionItem>
  <AccordionItem title="another?">answer</AccordionItem>
</Accordion>`}
    >
      <Accordion>
        <AccordionItem
          title="what makes this different?"
          open
        >
          every component uses modern css features like :has(), @starting-style, and color-mix()
          instead of javascript state management.
        </AccordionItem>
        <AccordionItem title="why gruvbox?">
          warm, easy on the eyes, distinctive. feels like a workshop.
        </AccordionItem>
        <AccordionItem title="single mono font?">
          creative coding toolkit. monospace is the native habitat.
        </AccordionItem>
      </Accordion>
    </DemoSection>
  );
}

function TabsDemo() {
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

function CarouselDemo() {
  return (
    <DemoSection
      id="component-carousel"
      title="Carousel / CarouselSlide"
      intro="CSS scroll-snap with overflow-x: scroll. Arrow buttons call scrollBy on the track ref. Touch users can swipe without JS."
      apiRows={[
        { prop: 'scrollAmount', type: 'number', default: '280', notes: 'px per arrow click' },
        { prop: 'hideArrows', type: 'boolean', default: 'false' }
      ]}
      code={`<Carousel>
  <CarouselSlide>...</CarouselSlide>
  <CarouselSlide>...</CarouselSlide>
</Carousel>`}
    >
      <Carousel>
        {['noise landscapes', 'gradient meshes', 'ray marching'].map((label) => (
          <CarouselSlide key={label}>
            <img
              src="https://picsum.photos/seed/pgc1/400/225.jpg"
              alt=""
              className="aspect-video w-full object-cover"
            />
            <div className="p-3">
              <p className="text-foreground text-xs font-medium">{label}</p>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </DemoSection>
  );
}

function PopoverDemo() {
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

function TooltipDemo() {
  return (
    <DemoSection
      id="component-tooltip"
      title="Tooltip"
      intro="CSS-only ::after bubble on hover/focus-visible. Clones the child element and adds data-tooltip attribute. No portal, no measurement."
      apiRows={[
        { prop: 'content', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"default"' }
      ]}
      code={`<Tooltip content="settings">
  <Button variant="ghost" size="icon"><Settings /></Button>
</Tooltip>`}
    >
      <div className="flex gap-3">
        <Tooltip content="settings">
          <Button
            variant="ghost"
            size="icon"
            aria-label="settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </Tooltip>
        <Tooltip content="delete">
          <Button
            variant="destructive"
            size="icon"
            aria-label="delete"
          >
            <Globe className="h-3.5 w-3.5" />
          </Button>
        </Tooltip>
        <Tooltip content="save">
          <Button
            variant="primary"
            size="icon"
            aria-label="save"
          >
            <Info className="h-3.5 w-3.5" />
          </Button>
        </Tooltip>
      </div>
    </DemoSection>
  );
}

function DialogDemo() {
  const dialogRef = useRef<DialogHandle>(null);
  return (
    <DemoSection
      id="component-dialog"
      title="Dialog"
      intro="Wraps native &lt;dialog&gt;. The ref exposes open/close via useImperativeHandle. Focus trapping, Esc-to-close, and ::backdrop blur are all native."
      apiRows={[
        {
          prop: 'ref',
          type: 'Ref<DialogHandle>',
          default: 'required',
          notes: '{ open(), close() }'
        },
        { prop: 'onClose', type: '() => void', default: '—' },
        {
          prop: 'DialogActions variant',
          type: 'ColorVariant',
          default: '"primary"',
          notes: 'confirm button color'
        }
      ]}
      code={`const ref = useRef<DialogHandle>(null);
<Button onClick={() => ref.current?.open()}>open</Button>
<Dialog ref={ref}>
  <DialogBody>
    <DialogTitle>title</DialogTitle>
    <DialogDescription>description</DialogDescription>
  </DialogBody>
  <DialogActions dialogRef={ref} />
</Dialog>`}
    >
      <Button onClick={() => dialogRef.current?.open()}>open dialog</Button>
      <Dialog ref={dialogRef}>
        <DialogBody>
          <DialogTitle>confirm action</DialogTitle>
          <DialogDescription>
            are you sure? this will apply changes and notify collaborators.
          </DialogDescription>
        </DialogBody>
        <DialogActions
          dialogRef={dialogRef}
          variant="primary"
        />
      </Dialog>
    </DemoSection>
  );
}

function AlertGallery() {
  return (
    <DemoSection
      id="component-alert"
      title="Alert"
      intro="Each of the 6 variants gets a tinted background and a per-variant icon. Optional title, description, and custom icon."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'title', type: 'ReactNode', default: 'required' },
        { prop: 'description', type: 'ReactNode', default: '—' },
        { prop: 'icon', type: 'ReactNode', default: '—', notes: 'overrides default icon' }
      ]}
      code={`<Alert variant="primary" title="info" description="description" />`}
    >
      <div className="max-w-lg space-y-2">
        {VARIANTS.map((v) => (
          <Alert
            key={v}
            variant={v}
            title={v}
            description={`this is a ${v} alert.`}
          />
        ))}
      </div>
    </DemoSection>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <DemoSection
      id="component-toast"
      title="Toast"
      intro="Stateless ToastProvider + ToastViewport relay state from useToastQueue. Animates in/out with CSS @starting-style."
      code={`const { toast } = useToast();
toast({ variant: "primary", title: "saved", description: "done." });`}
    >
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Button
            key={v}
            variant={v}
            onClick={() => toast({ variant: v, title: v, description: `this is a ${v} toast.` })}
          >
            {v} toast
          </Button>
        ))}
      </div>
    </DemoSection>
  );
}

function SectionHeaderDemo() {
  return (
    <DemoSection
      id="component-sectionheader"
      title="SectionHeader"
      intro="Section header with optional icon, description, and a 'View all' link. Accent color via variant."
      apiRows={[
        { prop: 'title', type: 'string', default: 'required' },
        { prop: 'description', type: 'string', default: '—' },
        { prop: 'icon', type: 'ReactNode', default: '—' },
        { prop: 'href', type: 'string', default: '—' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'align', type: '"left" | "center"', default: '"left"' }
      ]}
      code={`<SectionHeader
  title="projects"
  description="explore creative coding."
  icon={<Zap />}
  href="/projects"
/>`}
    >
      <SectionHeader
        title="projects"
        description="explore creative coding experiments."
        icon={<Zap className="h-5 w-5" />}
        href="/projects"
      />
    </DemoSection>
  );
}

function SectionHeadingDemo() {
  return (
    <DemoSection
      id="component-sectionheading"
      title="SectionHeading"
      intro="Decorative heading pair: a small uppercase label + a larger title. Good for page sections."
      apiRows={[
        { prop: 'label', type: 'string', default: 'required' },
        { prop: 'title', type: 'string', default: 'required' },
        { prop: 'description', type: 'ReactNode', default: '—' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' }
      ]}
      code={`<SectionHeading
  label="overview"
  title="What is pg_lab?"
  description="A design-first component toolkit."
/>`}
    >
      <SectionHeading
        label="overview"
        title="What is pg_lab?"
        description="A design-first component toolkit built on modern CSS and React 19."
      />
    </DemoSection>
  );
}

function ColorSwatchGallery() {
  return (
    <DemoSection
      id="component-colorswatch"
      title="ColorSwatch"
      intro="Displays a color box with its name and optional CSS token reference. Two sizes available."
      apiRows={[
        { prop: 'color', type: 'string', default: 'required' },
        { prop: 'name', type: 'string', default: 'required' },
        { prop: 'token', type: 'string', default: '—' },
        { prop: 'size', type: '"sm" | "md"', default: '"md"' }
      ]}
      code={`<ColorSwatch color="var(--primary)" name="Primary" token="--primary" />`}
    >
      <div className="flex flex-wrap gap-6">
        {(
          [
            ['var(--primary)', 'Primary', '--primary'],
            ['var(--secondary)', 'Secondary', '--secondary'],
            ['var(--accent)', 'Accent', '--accent'],
            ['var(--destructive)', 'Destructive', '--destructive'],
            ['var(--warning)', 'Warning', '--warning'],
            ['var(--foreground)', 'Foreground', '--foreground']
          ] as const
        ).map(([c, n, t]) => (
          <ColorSwatch
            key={n}
            color={c}
            name={n}
            token={t}
          />
        ))}
      </div>
    </DemoSection>
  );
}

function ChangelogGallery() {
  return (
    <DemoSection
      id="component-changelogitem"
      title="ChangelogItem"
      intro="A version + description pair for changelogs. The version label is colored via variant."
      apiRows={[
        { prop: 'version', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' }
      ]}
      code={`<ChangelogItem variant="primary" version="v2.0">description</ChangelogItem>`}
    >
      <div className="max-w-sm space-y-2">
        <ChangelogItem
          variant="primary"
          version="v2.0"
        >
          complete rewrite — stateless components, hooks, gruvbox theme.
        </ChangelogItem>
        <ChangelogItem
          variant="accent"
          version="v1.3"
        >
          semantic colors, popover, carousel.
        </ChangelogItem>
        <ChangelogItem
          variant="secondary"
          version="v1.0"
        >
          initial release with button, badge, input, dialog.
        </ChangelogItem>
      </div>
    </DemoSection>
  );
}

function NotificationItemDemo() {
  return (
    <DemoSection
      id="component-notificationitem"
      title="NotificationItem"
      intro="Notification row with icon, title, and timestamp. The icon background picks up the variant color."
      apiRows={[
        { prop: 'icon', type: 'ReactNode', default: 'required' },
        { prop: 'title', type: 'string', default: 'required' },
        { prop: 'timestamp', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' }
      ]}
      code={`<NotificationItem
  icon={<Bell />}
  title="New version"
  timestamp="2 hours ago"
  variant="primary"
/>`}
    >
      <div className="max-w-sm space-y-3">
        <NotificationItem
          icon={<CircleCheck className="h-4 w-4" />}
          title="New version released"
          timestamp="2 hours ago"
          variant="primary"
        />
        <NotificationItem
          icon={<Globe className="h-4 w-4" />}
          title="Deployment complete"
          timestamp="1 day ago"
          variant="secondary"
        />
        <NotificationItem
          icon={<TriangleAlert className="h-4 w-4" />}
          title="Build failed"
          timestamp="3 days ago"
          variant="destructive"
        />
      </div>
    </DemoSection>
  );
}

function IconGallery() {
  const names: { name: string; label: string }[] = [
    { name: 'color', label: 'color' },
    { name: 'generative', label: 'generative' },
    { name: 'flame', label: 'flame' },
    { name: 'simulation', label: 'simulation' },
    { name: 'data-viz', label: 'data-viz' },
    { name: 'particles', label: 'particles' },
    { name: 'automa', label: 'automa' },
    { name: 'palette', label: 'palette' },
    { name: 'sparkles', label: 'sparkles' },
    { name: 'infinity', label: 'infinity' },
    { name: 'book', label: 'book' },
    { name: 'code', label: 'code' }
  ];
  return (
    <DemoSection
      id="component-icon"
      title="Icon"
      intro={
        '44 hand-crafted SVG icons. Use the &lt;Icon name="..." /&gt; component or import individual icons from iconMap. Create your own with createIcon().'
      }
      code={`<Icon name="color" className="h-5 w-5" />`}
    >
      <div className="flex flex-wrap gap-4">
        {names.map(({ name, label }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="bg-surface-raised flex size-10 items-center justify-center rounded-lg shadow-xs">
              <Icon
                name={name as never}
                className="h-5 w-5"
              />
            </div>
            <span className="text-foreground-dim text-[10px]">{label}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function MenuItemDemo() {
  return (
    <DemoSection
      id="component-menuitem"
      title="MenuItem"
      intro="A styled button row with optional icon. The icon background picks up the variant color."
      apiRows={[
        { prop: 'icon', type: 'ReactNode', default: '—' },
        { prop: 'label', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"default"' }
      ]}
      code={`<MenuItem icon={<Book />} label="docs" />
<MenuItem label="delete" variant="destructive" />`}
    >
      <div className="max-w-50 space-y-1 rounded-lg p-2 shadow-xs">
        <MenuItem
          icon={<Book className="h-4 w-4" />}
          label="documentation"
        />
        <MenuItem
          icon={<Cog className="h-4 w-4" />}
          label="settings"
        />
        <MenuItem
          icon={<User className="h-4 w-4" />}
          label="profile"
        />
        <hr className="border-border my-1" />
        <MenuItem
          label="delete"
          variant="destructive"
        />
      </div>
    </DemoSection>
  );
}

function ColorPaletteDemo() {
  return (
    <DemoSection
      id="component-colorpalette"
      title="ColorPalette"
      intro="A row/column of color swatches acting as a radio group. The selected palette gets a variant-colored ring."
      apiRows={[
        { prop: 'colors', type: 'string[]', default: 'required' },
        { prop: 'name', type: 'string', default: '"palette"' },
        { prop: 'value', type: 'string', default: '—' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"' },
        { prop: 'size', type: '"sm" | "md" | "lg"', default: '"md"' }
      ]}
      code={`<ColorPalette colors={["#83a598","#b8bb26"]} name="palette" value="gruvbox" />`}
    >
      <div className="flex flex-wrap gap-4">
        <div>
          <ColorPalette
            colors={['#83a598', '#b8bb26', '#d3869b', '#fabd2f', '#fb4934']}
            name="palette-1"
            value="gruvbox"
            defaultChecked
          />
        </div>
        <div>
          <ColorPalette
            colors={['#076678', '#79740e', '#8f3f71', '#b57614', '#9d0006']}
            name="palette-1"
            value="light"
            orientation="vertical"
          />
        </div>
        <div>
          <ColorPalette
            colors={['#fb4934', '#fe8019', '#fabd2f', '#b8bb26', '#8ec07c']}
            name="palette-1"
            value="warm"
            size="sm"
          />
        </div>
      </div>
    </DemoSection>
  );
}

function ScrollRevealDemo() {
  return (
    <DemoSection
      id="component-scrollreveal"
      title="ScrollReveal"
      intro="Fades and slides up when scrolled into view. Uses IntersectionObserver with a 2s fallback timeout."
      code={`<ScrollReveal>
  <p>scroll down to reveal</p>
</ScrollReveal>`}
    >
      <ScrollReveal className="bg-surface-raised rounded-lg p-6 text-center text-sm">
        <p className="text-foreground-muted">↓ scroll down and back up to see me fade in</p>
      </ScrollReveal>
    </DemoSection>
  );
}

function SidebarDemo() {
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

function ControlPanelDemo() {
  const [seed, setSeed] = useState(0);
  const [noiseOn, setNoiseOn] = useState(false);

  return (
    <DemoSection
      id="component-controlpanel"
      title="ControlPanel"
      intro="Collapsible control panel for creative-coding tools. Includes ControlSection, ControlRow, ControlConditional, ControlGrid, ControlSubsection."
      code={`<ControlPanel title="parameters" variant="default" dock="bottom-sheet">
  <ControlSection title="noise" variant="secondary">
    <ControlRow label="enabled"><Switch /></ControlRow>
    <ControlConditional when={visible}>
      <ControlRow label="seed"><Slider /></ControlRow>
    </ControlConditional>
  </ControlSection>
</ControlPanel>`}
    >
      <div className="space-y-4">
        <ControlPanel
          title="parameters"
          variant="default"
          dock="bottom-sheet"
        >
          <ControlSection
            title="noise"
            variant="secondary"
          >
            <ControlRow label="enabled">
              <Switch
                checked={noiseOn}
                onChange={(e) => {
                  setNoiseOn(e.target.checked);
                }}
              />
            </ControlRow>
            <ControlConditional when={noiseOn}>
              <ControlRow
                label="seed"
                value={seed}
              >
                <Slider
                  min={0}
                  max={9999}
                  value={seed}
                  onChange={(e) => {
                    setSeed(+e.target.value);
                  }}
                />
              </ControlRow>
              <ControlSubsection title="octaves">
                <ControlGrid columns={3}>
                  <ControlRow label="x">
                    <Input type="number" />
                  </ControlRow>
                  <ControlRow label="y">
                    <Input type="number" />
                  </ControlRow>
                  <ControlRow label="z">
                    <Input type="number" />
                  </ControlRow>
                </ControlGrid>
              </ControlSubsection>
            </ControlConditional>
          </ControlSection>
        </ControlPanel>
        <ControlPanel
          title="quick settings"
          variant="secondary"
          dock="top-left"
        >
          <ControlSection
            title="display"
            variant="primary"
          >
            <ControlRow label="fullscreen">
              <Switch defaultChecked />
            </ControlRow>
            <ControlRow label="vsync">
              <Switch />
            </ControlRow>
          </ControlSection>
        </ControlPanel>
      </div>
    </DemoSection>
  );
}

function CardGalleries() {
  return (
    <DemoSection
      id="component-categorycards"
      title="CategoryCard / DocCard / ProjectCard"
      intro="App-specific card variants built on CardLink. Each uses the accentTokens system for its neon glow."
      code={`<CategoryCard title="color" iconName="color" href="/" color={accentTokens.primary} />
<DocCard title="getting started" iconName="book" href="/" />
<ProjectCard title="flow field" iconName="generative" href="/" />`}
    >
      <div className="grid grid-cols-1 gap-4 landscape:grid-cols-3">
        <CategoryCard
          label="Color"
          title="color"
          description="palette exploration in oklch space."
          iconName="color"
          href="/"
          color={accentTokens.primary}
        />
        <DocCard
          title="getting started"
          description="installation and setup guide."
          iconName="book"
          href="/"
          color={accentTokens.secondary}
        />
        <ProjectCard
          title="flow field"
          description="particle tracing on perlin noise."
          iconName="generative"
          href="/"
          style={{ '--_color': accentTokens.accent } as React.CSSProperties}
        />
      </div>
    </DemoSection>
  );
}

function throwErrorDemo() {
  throw new Error('this widget always crashes — demo purposes only.');
}

function BuggyWidget() {
  throwErrorDemo();
  return <p>this widget always crashes — demo purposes only.</p>;
}

function ErrorBoundaryDemo() {
  return (
    <DemoSection
      id="component-errorboundary"
      title="ErrorBoundary"
      intro="Catches React render errors and shows a themed fallback. Custom fallback renderer and onError callback supported."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"destructive"' },
        { prop: 'onError', type: '(error: Error) => void', default: '—' },
        { prop: 'fallback', type: 'FallbackRenderer', default: 'DefaultFallback' }
      ]}
      code={`<ErrorBoundary variant="destructive" onError={(e) => console.error(e)}>
  <BuggyWidget />
</ErrorBoundary>`}
    >
      <ErrorBoundary
        variant="destructive"
        onError={(e) => {
          console.error(e);
        }}
      >
        <BuggyWidget />
      </ErrorBoundary>
    </DemoSection>
  );
}

/* ------------------------------------------------------------------ */
/*  §7 — Hooks reference                                              */
/* ------------------------------------------------------------------ */

function HooksSection() {
  return (
    <DemoSection
      id="hooks"
      title="7. Hooks reference"
      intro="All stateful hooks in the library. Components never call useState — hooks do."
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Hook</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Returns</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Used by</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'useThemeState(defaultTheme?, persist?)',
                '{ theme, setTheme, toggleTheme }',
                'ThemeProvider'
              ],
              ['useTheme()', '{ theme, setTheme, toggleTheme }', 'any consumer'],
              ['useToastQueue()', '{ toasts, toast, dismiss }', 'ToastProvider'],
              ['useToast()', '{ toast, dismiss }', 'any consumer'],
              ['useTabsState(defaultValue)', '{ value, setValue }', 'Tabs'],
              [
                'useFloatingNavState()',
                '{ visible, navHoveredRef, show, scheduleHide }',
                'FloatingNav'
              ],
              ['useSidebarState(defaultOpen?)', '{ isOpen, toggle, open, close }', 'Sidebar'],
              ['useScrollRevealState(threshold?)', '{ ref, visible }', 'ScrollReveal'],
              ['useResizeObserver(debounceMs?)', '[ref, { width, height }]', 'any']
            ].map(([hook, returns, usedBy]) => (
              <tr
                key={hook}
                className="border-border border-b"
              >
                <td className="text-foreground px-3 py-2 font-mono">{hook}</td>
                <td className="text-foreground-muted px-3 py-2 font-mono">{returns}</td>
                <td className="text-foreground-dim px-3 py-2">{usedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DemoSection>
  );
}

/* ------------------------------------------------------------------ */
/*  §8 — Progressive enhancement checklist                             */
/* ------------------------------------------------------------------ */

function ChecklistSection() {
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

/* ------------------------------------------------------------------ */
/*  §9 — Accessibility                                                  */
/* ------------------------------------------------------------------ */

function AccessibilitySection() {
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

/* ------------------------------------------------------------------ */
/*  §10 — Contributing conventions                                     */
/* ------------------------------------------------------------------ */

function ContributingSection() {
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
            lib/colorVariant.ts — do not invent a parallel color enum. Decide between cva (§5.1) and
            --_color (§5.2).
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

/* ------------------------------------------------------------------ */
/*  Main page assembly                                                 */
/* ------------------------------------------------------------------ */

function AppContent() {
  return (
    <main className="mx-auto flex max-w-240 flex-col px-4 py-10 sm:px-6">
      <header className="mb-14 flex items-center justify-between">
        <div>
          <span className="text-primary text-sm font-semibold tracking-tight">pg_lab-ui v2</span>
          <span className="text-foreground-dim ml-2 text-xs">guidelines + showcase</span>
        </div>
        <ThemeToggleButton />
      </header>

      <HeroDemo />

      <PhilosophySection />
      <SetupSection />
      <DesignTokensSection />
      <ArchitectureSection />
      <VariantSystemSection />

      <DocHeading level="h2">6. Component reference</DocHeading>
      <Prose>
        <p>
          Each component entry includes the API table, a code example, and an interactive live
          preview.
        </p>
      </Prose>

      <ButtonGallery />
      <BadgeGallery />
      <InputDemo />
      <LabelDemo />
      <HelperTextDemo />
      <TextareaDemo />
      <SelectDemo />
      <CheckboxDemo />
      <RadioDemo />
      <SwitchDemo />
      <SliderDemo />
      <CardDemo />
      <CardLinkDemo />
      <AccordionDemo />
      <TabsDemo />
      <CarouselDemo />
      <PopoverDemo />
      <TooltipDemo />
      <DialogDemo />
      <AlertGallery />
      <ToastDemo />
      <SectionHeaderDemo />
      <SectionHeadingDemo />
      <ColorSwatchGallery />
      <ChangelogGallery />
      <NotificationItemDemo />
      <IconGallery />
      <MenuItemDemo />
      <ColorPaletteDemo />
      <ScrollRevealDemo />
      <SidebarDemo />
      <ControlPanelDemo />
      <CardGalleries />
      <ErrorBoundaryDemo />

      <HooksSection />
      <ChecklistSection />
      <AccessibilitySection />
      <ContributingSection />
    </main>
  );
}

export function App() {
  const theme = useThemeState();
  const toastQueue = useToastQueue();

  return (
    <ThemeProvider
      theme={theme.theme}
      setTheme={theme.setTheme}
      toggleTheme={theme.toggleTheme}
    >
      <ToastProvider
        toasts={toastQueue.toasts}
        toast={toastQueue.toast}
        dismiss={toastQueue.dismiss}
      >
        <FloatingNav
          brand={{ label: 'pg_lab-ui', href: '#' }}
          links={[
            { label: 'philosophy', href: '#philosophy' },
            { label: 'setup', href: '#setup' },
            { label: 'tokens', href: '#tokens' },
            { label: 'architecture', href: '#architecture' },
            { label: 'variants', href: '#variants' },
            { label: 'components', href: '#components' },
            { label: 'hooks', href: '#hooks' },
            { label: 'checklist', href: '#checklist' },
            { label: 'a11y', href: '#accessibility' },
            { label: 'contributing', href: '#contributing' }
          ]}
          themeToggle={<ThemeToggleButton />}
        />
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
