import { Bell, Book, Globe, Moon, Search, Settings, Sun, User, Zap } from 'lucide-react';
import { useRef, useState } from 'react';
import { iconArray } from './components/icons/iconMap';
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

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-surface max-h-80 overflow-x-auto rounded-lg p-4 text-xs leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

function Section({
  title,
  code,
  children
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-foreground text-lg font-medium">{title}</h2>
      {children}
      <details className="group">
        <summary className="text-foreground-dim hover:text-foreground cursor-pointer text-xs font-medium tracking-wide uppercase transition-colors select-none">
          source
        </summary>
        <div className="mt-2">
          <CodeBlock code={code} />
        </div>
      </details>
    </section>
  );
}

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

function HeroDemo() {
  return (
    <Section
      title="Hero"
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
    </Section>
  );
}

function ButtonGallery() {
  return (
    <Section
      title="Button"
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
    </Section>
  );
}

function BadgeGallery() {
  return (
    <Section
      title="Badge"
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
    </Section>
  );
}

function InputGallery() {
  return (
    <Section
      title="Input / Label / HelperText / Select / Textarea"
      code={`<Label htmlFor="input-id" required>label</Label>
<Input id="input-id" placeholder="type..." leadingIcon={<Search />} />
<HelperText>hint text</HelperText>
<Select label="choose one"><option>opt 1</option></Select>
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
    </Section>
  );
}

function CardGallery() {
  return (
    <Section
      title="Card / CardLink"
      code={`<Card interactive variant="accent">
  <CardImage src="..." />
  <CardBody>
    <Badge variant="accent">color</Badge>
    <CardTitle>title</CardTitle>
    <CardDescription>description</CardDescription>
  </CardBody>
  <CardActions>
    <Button variant="ghost" size="icon"><Settings /></Button>
  </CardActions>
</Card>

<CardLink href="/" accent={accentTokens.primary}>
  <CardTitle>link card</CardTitle>
  <CardDescription>entire surface is clickable</CardDescription>
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
    </Section>
  );
}

function AccordionDemo() {
  return (
    <Section
      title="Accordion"
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
    </Section>
  );
}

function TabsDemo() {
  const tabs = useTabsState('overview');
  return (
    <Section
      title="Tabs"
      code={`const tabs = useTabsState("overview");
<Tabs value={tabs.value} onValueChange={tabs.setValue}>
  <TabsList>
    <TabsTrigger value="overview">overview</TabsTrigger>
    <TabsTrigger value="features">features</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="features">...</TabsContent>
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
    </Section>
  );
}

function CarouselDemo() {
  return (
    <Section
      title="Carousel"
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
    </Section>
  );
}

function PopoverDemo() {
  return (
    <Section
      title="Popover"
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
    </Section>
  );
}

function DialogDemo() {
  const dialogRef = useRef<DialogHandle>(null);
  return (
    <Section
      title="Dialog"
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
    </Section>
  );
}

function AlertGallery() {
  return (
    <Section
      title="Alert"
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
    </Section>
  );
}

function TooltipDemo() {
  return (
    <Section
      title="Tooltip"
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
    </Section>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Section
      title="Toast"
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
    </Section>
  );
}

function SectionHeaderDemo() {
  return (
    <Section
      title="SectionHeader"
      code={`<SectionHeader
  title="projects"
  description="explore creative coding experiments."
  icon={<Zap className="h-5 w-5" />}
  href="/projects"
/>`}
    >
      <SectionHeader
        title="projects"
        description="explore creative coding experiments."
        icon={<Zap className="h-5 w-5" />}
        href="/projects"
      />
    </Section>
  );
}

function SectionHeadingDemo() {
  return (
    <Section
      title="SectionHeading"
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
    </Section>
  );
}

function ColorSwatchGallery() {
  return (
    <Section
      title="ColorSwatch"
      code={`<ColorSwatch color="var(--primary)" name="Primary" token="--primary" />
<ColorSwatch color="var(--accent)" name="Accent" token="--accent" size="sm" />`}
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
        ).map(([color, name, token]) => (
          <ColorSwatch
            key={name}
            color={color}
            name={name}
            token={token}
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
        ).map(([color, name]) => (
          <ColorSwatch
            key={name}
            color={color}
            name={name}
            size="sm"
          />
        ))}
      </div>
    </Section>
  );
}

function ChangelogGallery() {
  return (
    <Section
      title="ChangelogItem"
      code={`<ChangelogItem variant="primary" version="v2.0">
  description
</ChangelogItem>`}
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
    </Section>
  );
}

function NotificationItemDemo() {
  return (
    <Section
      title="NotificationItem"
      code={`<NotificationItem
  icon={<Bell className="h-4 w-4" />}
  title="New version released"
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
    </Section>
  );
}

function ColorPaletteDemo() {
  return (
    <Section
      title="ColorPalette"
      code={`<ColorPalette
  colors={["#83a598","#b8bb26","#d3869b","#fabd2f","#fb4934"]}
  name="palette"
  value="gruvbox"
  defaultChecked
/>`}
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
    </Section>
  );
}

function ScrollRevealDemo() {
  return (
    <Section
      title="ScrollReveal"
      code={`<ScrollReveal>
  <p>scroll down to reveal</p>
</ScrollReveal>`}
    >
      <ScrollReveal className="bg-surface-raised rounded-lg p-6 text-center text-sm">
        <p className="text-foreground-muted">↓ scroll down and back up to see me fade in</p>
      </ScrollReveal>
    </Section>
  );
}

function IconGallery() {
  return (
    <Section
      title="Icon"
      code={`<Icon name="color" className="h-5 w-5" />`}
    >
      <div className="flex flex-wrap gap-4">
        {iconArray.map(({ name, label }) => (
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
    </Section>
  );
}

function MenuItemDemo() {
  return (
    <Section
      title="MenuItem"
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
    </Section>
  );
}

function SidebarDemo() {
  const sidebar = useSidebarState(true);
  return (
    <Section
      title="Sidebar"
      code={`const sidebar = useSidebarState(true);
<Sidebar open={sidebar.isOpen} onOpenChange={sidebar.toggle}>
  <SidebarPanel>sidebar content</SidebarPanel>
  <SidebarMain>
    <SidebarToggle />
    main content
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
    </Section>
  );
}

function throwErrorDemo() {
  throw new Error('this widget always crashes');
}

function BuggyWidget() {
  throwErrorDemo();
  return <p>this widget always crashes</p>;
}

function ErrorBoundaryDemo() {
  return (
    <Section
      title="ErrorBoundary"
      code={`<ErrorBoundary variant="destructive">
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
    </Section>
  );
}

function ControlSectionDemo() {
  const [seed, setSeed] = useState(0);
  const [noiseOn, setNoiseOn] = useState(false);

  return (
    <Section
      title="ControlPanel"
      code={`<ControlPanel title="⚙" variant="default" dock="bottom-sheet">
  <ControlSection title="noise" variant="secondary">
    <ControlRow label="enabled">
      <Switch checked={noiseOn} onChange={(e) => setNoiseOn(e.target.checked)} />
    </ControlRow>
    <ControlConditional when={noiseOn}>
      <ControlRow label="seed">
        <Slider min={0} max={9999} value={seed} onChange={(e) => setSeed(+e.target.value)} />
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
    </Section>
  );
}

function CardGalleries() {
  return (
    <Section
      title="CategoryCard / DocCard / ProjectCard"
      code={`<CategoryCard title="color" description="palettes" iconName="color" href="/" color={accentTokens.primary} />
<DocCard title="getting started" description="installation" iconName="book" href="/" />
<ProjectCard title="flow field" description="particle tracing" iconName="generative" href="/" />`}
    >
      <div className="grid grid-cols-1 gap-4 landscape:grid-cols-3">
        <CategoryCard
          label="color"
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
    </Section>
  );
}

function AppContent() {
  return (
    <main className="mx-auto flex max-w-240 flex-col gap-14 px-4 py-10 sm:px-6">
      <header className="flex items-center justify-between">
        <span className="text-primary text-sm font-semibold tracking-tight">pg_lab-ui v2</span>
        <div className="flex items-center gap-2">
          <span className="text-foreground-dim hidden text-xs sm:inline">showcase</span>
          <ThemeToggleButton />
        </div>
      </header>

      <HeroDemo />

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
      <ScrollRevealDemo />
      <SectionHeaderDemo />
      <SectionHeadingDemo />
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
            { label: 'buttons', href: '#buttons' },
            { label: 'badges', href: '#badges' },
            { label: 'inputs', href: '#inputs' },
            { label: 'cards', href: '#cards' },
            { label: 'alerts', href: '#alerts' },
            { label: 'overlays', href: '#overlays' },
            { label: 'data', href: '#data' }
          ]}
          themeToggle={<ThemeToggleButton />}
        />
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
