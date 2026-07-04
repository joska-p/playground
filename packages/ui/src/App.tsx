import { Bell, Book, Globe, Moon, Search, Settings, Sun, User, Zap } from 'lucide-react';
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
      <div className="pt-2">{children}</div>
      {code && (
        <details className="group">
          <summary className="text-foreground-dim hover:text-foreground cursor-pointer text-xs font-medium tracking-wide uppercase transition-colors select-none">
            source
          </summary>
          <div className="mt-2">
            <CodeBlock code={code} />
          </div>
        </details>
      )}
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
/*  Interactive demos                                                  */
/* ------------------------------------------------------------------ */

function HeroDemo() {
  return (
    <DemoSection
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
          prop: 'isLoading',
          type: 'boolean',
          default: 'false',
          notes: 'swaps label for spinner, sets aria-busy'
        },
        { prop: 'fullWidth', type: 'boolean', default: 'false' }
      ]}
      code={`<Button variant="primary">click me</Button>
<Button size="sm">small</Button>
<Button isLoading>loading</Button>
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

function InputGallery() {
  return (
    <DemoSection
      title="Input / Label / HelperText / Select / Textarea / Checkbox / Radio / Switch / Slider"
      intro="All data-entry components share the same ColorVariant prop. Native elements underneath — no custom state management."
      apiRows={[
        {
          prop: 'Input variant',
          type: 'ColorVariant',
          default: '"primary"',
          notes: 'focus ring color'
        },
        { prop: 'Input leadingIcon', type: 'ReactNode', default: '—' },
        { prop: 'Input isLoading', type: 'boolean', default: 'false' },
        { prop: 'Label variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'Label required', type: 'boolean', default: 'false', notes: 'adds * indicator' },
        { prop: 'HelperText variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'HelperText icon', type: 'boolean', default: 'false', notes: 'shows alert icon' },
        { prop: 'Select variant', type: 'ColorVariant', default: '"primary"' },
        {
          prop: 'Select placeholder',
          type: 'string',
          default: '—',
          notes: 'disabled first option'
        },
        { prop: 'Checkbox / Radio / Switch variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'Slider variant', type: 'ColorVariant', default: '"primary"' }
      ]}
      code={`<Label htmlFor="id">label</Label>
<Input id="id" placeholder="type..." />
<HelperText>hint</HelperText>
<Select><option>opt</option></Select>
<Textarea placeholder="write..." />
<Checkbox defaultChecked label="option" />
<Radio name="g" defaultChecked label="2d" />
<Switch defaultChecked label="fullscreen" />
<Slider defaultValue={65} />`}
    >
      <div className="max-w-sm space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="input-default">default</Label>
          <Input
            id="input-default"
            placeholder="type something..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="input-icon">with icon</Label>
          <Input
            id="input-icon"
            placeholder="search..."
            leadingIcon={<Search className="h-3.5 w-3.5" />}
          />
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="input-error"
            variant="destructive"
          >
            email
          </Label>
          <Input
            id="input-error"
            variant="destructive"
            defaultValue="not-an-email"
            aria-describedby="email-error"
          />
          <HelperText
            id="email-error"
            variant="destructive"
            icon
          >
            enter a valid email address.
          </HelperText>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="input-disabled">disabled</Label>
          <Input
            id="input-disabled"
            disabled
            value="cant touch this"
          />
        </div>

        <Select
          variant="primary"
          placeholder="choose a category..."
        >
          <option value="generative">generative</option>
          <option value="shader">shader</option>
          <option value="simulation">simulation</option>
        </Select>
        <Textarea placeholder="start typing — grows with content..." />
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
            disabled
            label="disabled"
          />
        </div>
        <div className="flex gap-6">
          <Radio
            id="r1"
            name="group-1"
            defaultChecked
            label="2d"
          />
          <Radio
            id="r2"
            name="group-1"
            label="3d"
          />
        </div>
        <Switch
          id="sw1"
          defaultChecked
          label="fullscreen"
        />
        <Switch
          id="sw2"
          variant="secondary"
          label="loop"
        />
        <Slider defaultValue={65} />
      </div>
    </DemoSection>
  );
}

function CardGallery() {
  return (
    <DemoSection
      title="Card / CardLink"
      intro="Card has an interactive variant with :has() hover glow. CardLink makes the entire surface a click target with neon tube glow."
      apiRows={[
        {
          prop: 'Card interactive',
          type: 'boolean',
          default: 'false',
          notes: 'enables :has() glow on .card-actions hover'
        },
        {
          prop: 'Card variant',
          type: 'ColorVariant',
          default: '"primary"',
          notes: 'glow color, only if interactive'
        },
        { prop: 'CardLink href', type: 'string', default: 'required' },
        {
          prop: 'CardLink accent',
          type: 'string',
          default: 'accentTokens.primary',
          notes: 'any CSS color'
        }
      ]}
      code={`<Card interactive variant="accent">
  <CardImage src="..." />
  <CardBody>
    <CardTitle>title</CardTitle>
    <CardDescription>description</CardDescription>
  </CardBody>
  <CardActions>
    <Button variant="ghost" size="icon"><Settings /></Button>
  </CardActions>
</Card>

<CardLink href="/" accent={accentTokens.primary}>
  <CardTitle>link card</CardTitle>
</CardLink>`}
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
          <CardActions>
            <Tooltip content="save">
              <Button
                variant="ghost"
                size="icon"
                aria-label="save"
              >
                <User className="h-3.5 w-3.5" />
              </Button>
            </Tooltip>
            <Tooltip content="settings">
              <Button
                variant="ghost"
                size="icon"
                aria-label="settings"
              >
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
        <CardLink
          href="/"
          accent={accentTokens.primary}
        >
          <CardImage src="https://picsum.photos/seed/pg3/400/225.jpg" />
          <CardBody>
            <CardTitle>card link</CardTitle>
            <CardDescription>entire surface is the click target.</CardDescription>
          </CardBody>
        </CardLink>
      </div>
    </DemoSection>
  );
}

function AccordionDemo() {
  return (
    <DemoSection
      title="Accordion"
      intro="Built on native <details> elements. Accordion is just a styled wrapper; AccordionItem is a <details> with a CSS rotating chevron."
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
      title="Tabs"
      intro="Fully controlled via useTabsState. Built on a native radio group (visually-hidden inputs) with CSS-only underline animation."
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
      title="Carousel"
      intro="CSS scroll-snap with overflow-x: scroll. Arrow buttons call scrollBy on the track ref. Touch users can swipe without JS."
      code={`<Carousel>
  <CarouselSlide>
    <img src="..." />
    <div className="p-3"><p>label</p></div>
  </CarouselSlide>
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
      title="Popover"
      intro="Hover/focus-triggered via Tailwind group/group-hover — no JS, no positioning library, no portal."
      apiRows={[
        { prop: 'trigger', type: 'ReactNode', default: 'required' },
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

function DialogDemo() {
  const dialogRef = useRef<DialogHandle>(null);
  return (
    <DemoSection
      title="Dialog"
      intro="Wraps native <dialog>. The ref exposes open/close via useImperativeHandle. Focus trapping, Esc-to-close, and ::backdrop blur are all native."
      code={`const ref = useRef<DialogHandle>(null);
<Button onClick={() => ref.current?.open()}>open</Button>
<Dialog ref={ref}>
  <DialogTitle>title</DialogTitle>
  <DialogDescription>description</DialogDescription>
  <DialogActions dialogRef={ref} variant="primary" />
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
      title="Alert"
      intro="Each of the 6 variants gets a tinted background and a per-variant icon. Optional title, description, and custom icon."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'title', type: 'ReactNode', default: 'required' },
        { prop: 'description', type: 'ReactNode', default: '—' },
        {
          prop: 'icon',
          type: 'ReactNode',
          default: '—',
          notes: 'overrides per-variant default icon'
        }
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

function TooltipDemo() {
  return (
    <DemoSection
      title="Tooltip"
      intro="CSS-only ::after bubble on hover/focus-visible. Clones the child element and adds data-tooltip attribute. No portal, no measurement."
      apiRows={[
        { prop: 'content', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"default"' }
      ]}
      code={`<Tooltip content="settings">
  <Button>hover me</Button>
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
            <Bell className="h-3.5 w-3.5" />
          </Button>
        </Tooltip>
      </div>
    </DemoSection>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <DemoSection
      title="Toast"
      intro="Stateless ToastProvider + ToastViewport relay state from useToastQueue. The useToast() hook is the consumer API. Animates in/out with CSS @starting-style."
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
      title="SectionHeader"
      intro="Section header with optional icon, description, and a 'View all' link. Accent color via variant prop."
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
  description="explore creative coding experiments."
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
      <div className="mt-3 flex flex-wrap gap-6">
        {(
          [
            ['var(--red)', 'Red'],
            ['var(--green)', 'Green'],
            ['var(--blue)', 'Blue'],
            ['var(--purple)', 'Purple'],
            ['var(--aqua)', 'Aqua'],
            ['var(--orange)', 'Orange']
          ] as const
        ).map(([c, n]) => (
          <ColorSwatch
            key={n}
            color={c}
            name={n}
            size="sm"
          />
        ))}
      </div>
    </DemoSection>
  );
}

function ChangelogGallery() {
  return (
    <DemoSection
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
          icon={<Bell className="h-4 w-4" />}
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
          icon={<Zap className="h-4 w-4" />}
          title="Build failed"
          timestamp="3 days ago"
          variant="destructive"
        />
      </div>
    </DemoSection>
  );
}

function ColorPaletteDemo() {
  return (
    <DemoSection
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
        <ColorPalette
          colors={['#83a598', '#b8bb26', '#d3869b', '#fabd2f', '#fb4934']}
          name="palette-1"
          value="gruvbox"
          defaultChecked
        />
        <ColorPalette
          colors={['#076678', '#79740e', '#8f3f71', '#b57614', '#9d0006']}
          name="palette-1"
          value="light"
          orientation="vertical"
        />
        <ColorPalette
          colors={['#fb4934', '#fe8019', '#fabd2f', '#b8bb26', '#8ec07c']}
          name="palette-1"
          value="warm"
          size="sm"
        />
      </div>
    </DemoSection>
  );
}

function ScrollRevealDemo() {
  return (
    <DemoSection
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
      title="Icon"
      intro={
        '44 hand-crafted SVG icons. Use the <Icon name="..." /> component or import individual icons from iconMap. Create your own with createIcon().'
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
          icon={<Settings className="h-4 w-4" />}
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

function SidebarDemo() {
  const sidebar = useSidebarState(true);
  return (
    <DemoSection
      title="Sidebar"
      intro="A compound component (Sidebar, Sidebar.Panel, Sidebar.Main, Sidebar.Toggle) supporting 4 dock positions. State via useSidebarState."
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

function throwErrorDemo() {
  throw new Error('this widget always crashes — demo purposes only.');
}

function BuggyWidget() {
  throwErrorDemo();
  return null;
}

function ErrorBoundaryDemo() {
  return (
    <DemoSection
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

function ControlSectionDemo() {
  const [seed, setSeed] = useState(0);
  const [noiseOn, setNoiseOn] = useState(false);

  return (
    <DemoSection
      title="ControlPanel"
      intro="Collapsible control panel for creative-coding tools. ControlSection groups controls by category, ControlConditional conditionally reveals controls."
      code={`<ControlPanel title="parameters" variant="default" dock="bottom-sheet">
  <ControlSection title="noise" variant="secondary">
    <ControlRow label="enabled">
      <Switch />
    </ControlRow>
    <ControlConditional when={visible}>
      <ControlRow label="seed">
        <Slider />
      </ControlRow>
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

/* ------------------------------------------------------------------ */
/*  Documentation sections                                             */
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

function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="space-y-6"
    >
      <DocHeading level="h2">3. Architecture</DocHeading>

      <DocHeading level="h3">3.1 React 19 ref-as-prop</DocHeading>
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

      <DocHeading level="h3">3.2 Variant files</DocHeading>
      <Prose>
        <p>
          Every cva() call lives in its own ComponentName.variants.ts file beside the component.
          This means the variant config can be imported and tested independently.
        </p>
      </Prose>

      <DocHeading level="h3">3.3 Stateless components, stateful hooks</DocHeading>
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

      <DocHeading level="h3">3.4 File layout</DocHeading>
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

function VariantSystemSection() {
  return (
    <section
      id="variants"
      className="space-y-6"
    >
      <DocHeading level="h2">4. Variant system</DocHeading>
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
        <p>There are two ways a component consumes variant. Pick whichever fits:</p>
      </Prose>

      <DocHeading level="h4">4.1 Full color, via cva</DocHeading>
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
      // secondary, accent, warning, destructive
    },
    size: { sm: "...", default: "...", lg: "...", icon: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});`}
      />
      <Prose>
        <p>Used by: Button, Alert, Toast, Input, Label, HelperText, Select, DefaultFallback.</p>
      </Prose>

      <DocHeading level="h4">4.2 Single accent, via --_color</DocHeading>
      <Prose>
        <p>
          Used when only one value changes — a focus ring, an accent dot, a glow color. The
          component sets --_color from colorVar(variant) and CSS reads it.
        </p>
      </Prose>
      <CodeBlock
        code={`import { colorVarStyle, type ColorVariant } from "../lib/colorVariant";
<span style={colorVarStyle(variant)} />`}
      />
      <CodeBlock
        code={`.badge-soft {
  background: color-mix(in srgb, var(--_color) 15%, transparent);
  color: var(--_color);
}`}
      />
      <Prose>
        <p>
          Used by: Badge, Switch, Card (glow), Tabs (underline), Checkbox/Radio/Slider
          (accent-color), Input/Textarea (focus ring), SidebarPanel/SidebarToggle, ChangelogItem,
          Hero, MenuItem, NotificationItem, SectionHeader/SectionHeading, ColorPalette, FloatingNav.
        </p>
      </Prose>

      <DocHeading level="h3">4.3 Component variant reference</DocHeading>
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

function HooksSection() {
  return (
    <DemoSection
      title="Hooks reference"
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

function ContributingSection() {
  return (
    <section
      id="contributing"
      className="space-y-6"
    >
      <DocHeading level="h2">5. Conventions for contributing</DocHeading>
      <Prose>
        <ol className="list-inside list-decimal space-y-2">
          <li>
            <strong>File location</strong>:
            src/components/&lt;category&gt;/&lt;Name&gt;/&lt;Name&gt;.tsx. If it needs cva, add
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
            lib/colorVariant.ts — don&apos;t invent a parallel color enum. Decide between cva (§4.1)
            and --_color (§4.2).
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
            <strong>Update this page</strong> — add a row to the variant table (§4.3) if it takes
            variant, and a DemoSection to the component gallery below.
          </li>
        </ol>
      </Prose>
      <Prose>
        <h4 className="text-foreground text-sm font-medium">Progressive enhancement checklist</h4>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Base (mobile) styles have no breakpoint prefix and are fully functional on their own.
          </li>
          <li>landscape:/sm: classes only add — removing them degrades gracefully.</li>
          <li>
            If the browser has a native element (checkbox, radio, range, details, dialog),
            you&apos;re using it.
          </li>
          <li>
            :has(), :focus-within, @starting-style, color-mix() stay in CSS. React only toggles
            attributes.
          </li>
          <li>prefers-reduced-motion is respected (handled globally in gruvbox-theme.css).</li>
        </ul>
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
      <ArchitectureSection />
      <VariantSystemSection />

      <DocHeading level="h2">Component reference</DocHeading>
      <Prose>
        <p>
          Each component entry includes the API table, an interactive example, and collapsible
          source code.
        </p>
      </Prose>

      <ButtonGallery />
      <BadgeGallery />
      <InputGallery />
      <CardGallery />
      <AccordionDemo />
      <TabsDemo />
      <CarouselDemo />
      <PopoverDemo />
      <DialogDemo />
      <AlertGallery />
      <TooltipDemo />
      <ToastDemo />
      <SectionHeaderDemo />
      <SectionHeadingDemo />
      <ScrollRevealDemo />
      <ColorSwatchGallery />
      <ChangelogGallery />
      <NotificationItemDemo />
      <IconGallery />
      <MenuItemDemo />
      <ColorPaletteDemo />
      <SidebarDemo />
      <ControlSectionDemo />
      <CardGalleries />
      <ErrorBoundaryDemo />

      <HooksSection />
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
            { label: 'architecture', href: '#architecture' },
            { label: 'variants', href: '#variants' },
            { label: 'components', href: '#components' },
            { label: 'contributing', href: '#contributing' }
          ]}
          themeToggle={<ThemeToggleButton />}
        />
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
