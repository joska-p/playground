import { Badge } from './components/elements/badge/Badge';
import { Button } from './components/elements/button/Button';
import { Slider } from './components/elements/slider/Slider';
import { Switch } from './components/elements/switch/Switch';
import { Alert } from './components/feedback/alert/Alert';
import { ToastContainer } from './components/feedback/toast/Toast';
import { useToast } from './components/feedback/toast/useToast';
import { Checkbox } from './components/form/checkbox/Checkbox';
import { Input } from './components/form/input/Input';
import { Radio } from './components/form/radio/Radio';
import { Select } from './components/form/select/Select';
import { Textarea } from './components/form/textarea/Textarea';
import { Accordion } from './components/layout/accordion/Accordion';
import { Card } from './components/layout/card/Card';
import { Carousel } from './components/layout/carousel/Carousel';
import { Tabs } from './components/navigation/tabs/Tabs';
import { Dialog } from './components/overlay/dialog/Dialog';
import { Popover } from './components/overlay/popover/Popover';
import { Tooltip } from './components/overlay/tooltip/Tooltip';
import { ColorSwatch } from './components/stylistic/atoms/ColorSwatch';
import { SectionHeading } from './components/stylistic/atoms/SectionHeading';
import { ChangelogItem } from './components/stylistic/molecules/ChangelogItem';
import { MenuItem } from './components/stylistic/molecules/MenuItem';
import { NotificationItem } from './components/stylistic/molecules/NotificationItem';
import { FloatingNav } from './components/stylistic/organisms/FloatingNav';
import { ScrollReveal } from './components/stylistic/organisms/ScrollReveal';
import { ColorPalette } from './components/widgets/color-palette/ColorPalette';

const variants = ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'] as const;

const sizes = ['sm', 'md', 'lg'] as const;

function App() {
  return (
    <>
      <FloatingNav
        brand={{ label: 'pg_lab', href: '#' }}
        links={[
          { label: 'buttons', href: '#buttons' },
          { label: 'badges', href: '#badges' },
          { label: 'inputs', href: '#inputs' },
          { label: 'cards', href: '#cards' },
          { label: 'stylistic', href: '#stylistic' }
        ]}
        themeToggle={
          <button
            className="text-foreground-dim hover:text-foreground flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-xs transition-colors"
            aria-label="Toggle theme"
            onClick={() => {
              const h = document.documentElement;
              const isLight = h.getAttribute('data-theme') === 'light';
              if (isLight) h.removeAttribute('data-theme');
              else h.setAttribute('data-theme', 'light');
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        }
      />
      <div className="bg-background text-foreground mx-auto min-h-screen max-w-2xl space-y-12 p-8">
        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Button variants
          </h2>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <Button
                key={v}
                variant={v}
              >
                {v}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Button sizes
          </h2>
          <div className="flex flex-wrap items-end gap-2">
            {sizes.map((s) => (
              <Button
                key={s}
                size={s}
              >
                size {s}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Button states
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full width</Button>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Badge
          </h2>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge color="green">generative</Badge>
              <Badge color="blue">shader</Badge>
              <Badge color="purple">color</Badge>
              <Badge color="aqua">simulation</Badge>
              <Badge color="yellow">experiment</Badge>
              <Badge color="orange">visual</Badge>
              <Badge color="red">audio</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="soft"
                color="primary"
              >
                soft
              </Badge>
              <Badge
                variant="solid"
                color="primary"
              >
                solid
              </Badge>
              <Badge
                variant="outline"
                color="primary"
              >
                outline
              </Badge>
              <Badge
                variant="dot"
                color="secondary"
              >
                active
              </Badge>
              <Badge
                variant="dot"
                color="yellow"
              >
                draft
              </Badge>
              <Badge
                variant="dot"
                color="destructive"
              >
                archived
              </Badge>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Input
          </h2>
          <div className="max-w-sm space-y-4">
            <Input
              label="Default"
              placeholder="type something..."
            />
            <Input
              label="With icon"
              placeholder="search..."
              startIcon={<span>&#128269;</span>}
            />
            <Input
              label="Error state"
              variant="destructive"
              helperText="this field is required"
            />
            <Input
              label="Disabled"
              disabled
              value="cant touch this"
            />
            <Input
              label="Loading"
              isLoading
              value="loading..."
            />
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Select
          </h2>
          <div className="max-w-sm space-y-4">
            <Select label="Choose one">
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
            </Select>
            <Select
              label="Error"
              variant="destructive"
              helperText="pick something"
            >
              <option>select...</option>
            </Select>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Textarea
          </h2>
          <div className="max-w-sm">
            <Textarea
              label="Notes"
              placeholder="start typing — grows with content..."
            />
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Slider
          </h2>
          <div className="max-w-xs space-y-4">
            <Slider />
            <Slider variant="secondary" />
            <Slider variant="destructive" />
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Checkbox & Radio
          </h2>
          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
              <Checkbox defaultChecked /> generative
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
              <Checkbox /> shader
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
              <Checkbox disabled /> disabled
            </label>
          </div>
          <div className="mt-4 flex gap-6">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
              <Radio
                name="demo"
                defaultChecked
              />{' '}
              2d
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
              <Radio name="demo" /> 3d
            </label>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Switch
          </h2>
          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
              <Switch defaultChecked /> fullscreen
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
              <Switch /> loop
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
              <Switch
                variant="secondary"
                defaultChecked
              />{' '}
              dark mode
            </label>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Card
          </h2>
          <div className="grid max-w-2xl grid-cols-1 gap-4 landscape:grid-cols-2">
            <Card>
              <img
                src="https://picsum.photos/seed/pg1/400/225.jpg"
                alt=""
                className="aspect-video w-full object-cover"
              />
              <div className="p-4">
                <Badge
                  variant="soft"
                  color="green"
                >
                  generative
                </Badge>
                <p className="mt-2 text-sm font-medium">flow field exploration</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  perlin noise fields and particle tracing.
                </p>
              </div>
              <div className="bg-surface-raised/50 flex items-center justify-between px-4 py-2.5">
                <span className="text-foreground-dim text-xs">2 days ago</span>
                <Button
                  variant="default"
                  size="sm"
                >
                  view
                </Button>
              </div>
            </Card>
            <Card variant="interactive">
              <img
                src="https://picsum.photos/seed/pg2/400/225.jpg"
                alt=""
                className="aspect-video w-full object-cover"
              />
              <div className="p-4">
                <Badge
                  variant="soft"
                  color="purple"
                >
                  color
                </Badge>
                <p className="mt-2 text-sm font-medium">oklch palette generator</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  harmonious palettes in perceptually uniform space.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Alert
          </h2>
          <div className="max-w-lg space-y-3">
            <Alert variant="default">
              <Alert.Icon />
              <div>
                <Alert.Title>default</Alert.Title>
                <Alert.Description>project updated with latest changes.</Alert.Description>
              </div>
            </Alert>
            <Alert variant="secondary">
              <Alert.Icon />
              <div>
                <Alert.Title>secondary</Alert.Title>
                <Alert.Description>all changes saved.</Alert.Description>
              </div>
            </Alert>
            <Alert variant="warning">
              <Alert.Icon />
              <div>
                <Alert.Title>warning</Alert.Title>
                <Alert.Description>unsaved changes may be lost.</Alert.Description>
              </div>
            </Alert>
            <Alert variant="destructive">
              <Alert.Icon />
              <div>
                <Alert.Title>destructive</Alert.Title>
                <Alert.Description>deployment failed. check config.</Alert.Description>
              </div>
            </Alert>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Accordion
          </h2>
          <div className="max-w-lg">
            <Accordion>
              <Accordion.Item
                title="what makes this different?"
                defaultOpen
              >
                <p className="text-muted-foreground text-sm leading-relaxed">
                  every component uses modern css features like :has(), @starting-style, and
                  color-mix() instead of javascript state management.
                </p>
              </Accordion.Item>
              <Accordion.Item title="why gruvbox?">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  warm, easy on the eyes, distinctive. feels like a workshop.
                </p>
              </Accordion.Item>
              <Accordion.Item title="single mono font?">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  creative coding toolkit. monospace is the native habitat.
                </p>
              </Accordion.Item>
            </Accordion>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Tabs
          </h2>
          <div className="max-w-lg">
            <Tabs
              tabs={[
                {
                  label: 'overview',
                  content: (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      pg_lab is a design-first toolkit built on modern css.
                    </p>
                  )
                },
                {
                  label: 'features',
                  content: (
                    <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                      <li>css-only states via :has()</li>
                      <li>entry animations with @starting-style</li>
                      <li>zero-js accordion, tabs, toggles</li>
                    </ul>
                  )
                },
                {
                  label: 'changelog',
                  content: (
                    <div className="text-muted-foreground space-y-1 text-sm">
                      <p>v1.3 — semantic colors</p>
                      <p>v1.2 — popover, carousel</p>
                    </div>
                  )
                }
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Dialog
          </h2>
          <div>
            <Button
              command="show-modal"
              commandfor="demo-dialog"
            >
              open dialog
            </Button>
            <Dialog id="demo-dialog">
              <div className="p-5">
                <h3 className="mb-2 text-sm font-medium">confirm action</h3>
                <p className="text-muted-foreground text-sm">
                  are you sure? this will apply changes.
                </p>
              </div>
              <div className="bg-surface-raised/50 flex justify-end gap-2 rounded-b-lg px-5 py-3">
                <button
                  command="close"
                  commandfor="demo-dialog"
                  className="text-foreground hover:bg-surface inline-flex cursor-pointer items-center rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200"
                >
                  cancel
                </button>
                <Button
                  command="close"
                  commandfor="demo-dialog"
                >
                  confirm
                </Button>
              </div>
            </Dialog>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Popover
          </h2>
          <div className="flex gap-8">
            <Popover>
              <Popover.Trigger>
                <Button variant="primary">profile</Button>
              </Popover.Trigger>
              <Popover.Content>
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="bg-primary/15 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                      pg
                    </div>
                    <div>
                      <p className="text-sm font-medium">pg_lab</p>
                      <p className="text-foreground-dim text-xs">creative playground</p>
                    </div>
                  </div>
                  <div className="border-border border-t pt-2">
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      generative art, creative code, experiments.
                    </p>
                  </div>
                </div>
              </Popover.Content>
            </Popover>
            <Popover>
              <Popover.Trigger>
                <button className="text-foreground hover:bg-surface-raised inline-flex cursor-pointer items-center rounded-md p-2 text-sm transition-all duration-200">
                  <span>&#8942;</span>
                </button>
              </Popover.Trigger>
              <Popover.Content>
                <div className="py-1">
                  <button className="text-foreground hover:bg-surface-raised w-full rounded-sm px-3 py-1.5 text-left text-xs transition-colors">
                    edit
                  </button>
                  <button className="text-foreground hover:bg-surface-raised w-full rounded-sm px-3 py-1.5 text-left text-xs transition-colors">
                    duplicate
                  </button>
                  <div className="border-border mx-2 my-1 border-t" />
                  <button className="text-destructive hover:bg-destructive/10 w-full rounded-sm px-3 py-1.5 text-left text-xs transition-colors">
                    delete
                  </button>
                </div>
              </Popover.Content>
            </Popover>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Toast
          </h2>
          <ToastContainer>
            <ToastDemo />
          </ToastContainer>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Carousel
          </h2>
          <Carousel aria-label="projects">
            <Carousel.Slide size="sm">
              <img
                src="https://picsum.photos/seed/pgc1/400/225.jpg"
                alt=""
                className="aspect-video w-full object-cover"
              />
              <div className="p-3">
                <Badge
                  variant="soft"
                  color="green"
                >
                  generative
                </Badge>
                <p className="mt-1 text-xs font-medium">noise landscapes</p>
              </div>
            </Carousel.Slide>
            <Carousel.Slide size="sm">
              <img
                src="https://picsum.photos/seed/pgc2/400/225.jpg"
                alt=""
                className="aspect-video w-full object-cover"
              />
              <div className="p-3">
                <Badge
                  variant="soft"
                  color="purple"
                >
                  color
                </Badge>
                <p className="mt-1 text-xs font-medium">gradient meshes</p>
              </div>
            </Carousel.Slide>
            <Carousel.Slide size="sm">
              <img
                src="https://picsum.photos/seed/pgc3/400/225.jpg"
                alt=""
                className="aspect-video w-full object-cover"
              />
              <div className="p-3">
                <Badge
                  variant="soft"
                  color="blue"
                >
                  shader
                </Badge>
                <p className="mt-1 text-xs font-medium">ray marching</p>
              </div>
            </Carousel.Slide>
          </Carousel>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            Tooltip
          </h2>
          <div className="flex gap-3">
            <Tooltip content="settings">
              <Button>
                <span>&#9881;</span>
              </Button>
            </Tooltip>
            <Tooltip
              content="delete"
              variant="destructive"
            >
              <Button variant="destructive">
                <span>&#128465;</span>
              </Button>
            </Tooltip>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
            ColorPalette
          </h2>
          <div className="flex flex-wrap gap-4">
            <ColorPalette
              colors={['#83a598', '#b8bb26', '#fb4934', '#d3869b', '#8ec07c']}
              name="demo-palette"
            />
          </div>
        </section>

        {/* ─── Stylistic components ─── */}

        <section id="stylistic">
          <h2 className="text-muted-foreground mb-6 text-sm font-medium tracking-wide uppercase">
            Stylistic — atoms
          </h2>

          <div className="mb-8 space-y-4">
            <p className="text-foreground-dim text-xs font-medium tracking-tight uppercase">
              SectionHeading labelColor variants
            </p>
            <div className="space-y-6">
              <SectionHeading
                label="interactive"
                title="buttons"
                labelColor="primary"
              />
              <SectionHeading
                label="display"
                title="badges"
                labelColor="secondary"
              />
              <SectionHeading
                label="form"
                title="inputs"
                labelColor="warning"
              />
              <SectionHeading
                label="disclosure"
                title="accordion"
                labelColor="accent"
              />
              <SectionHeading
                label="feedback"
                title="alerts"
                labelColor="destructive"
              />
              <SectionHeading
                label="layout"
                title="carousel"
                labelColor="blue"
                description="a reusable carousel with snap scrolling."
              />
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <p className="text-foreground-dim text-xs font-medium tracking-tight uppercase">
              ColorSwatch sizes
            </p>
            <div className="grid grid-cols-2 gap-3 landscape:grid-cols-3">
              <ColorSwatch
                color="var(--primary)"
                name="primary"
                token="--primary (blue)"
              />
              <ColorSwatch
                color="var(--secondary)"
                name="secondary"
                token="--secondary (green)"
              />
              <ColorSwatch
                color="var(--destructive)"
                name="destructive"
                token="--destructive (red)"
              />
              <ColorSwatch
                color="var(--accent)"
                name="accent"
                token="--accent (purple)"
              />
              <ColorSwatch
                color="var(--warning)"
                name="warning"
                token="--warning (yellow)"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <ColorSwatch
                color="var(--red)"
                name="red"
                size="sm"
              />
              <ColorSwatch
                color="var(--green)"
                name="green"
                size="sm"
              />
              <ColorSwatch
                color="var(--blue)"
                name="blue"
                size="sm"
              />
              <ColorSwatch
                color="var(--purple)"
                name="purple"
                size="sm"
              />
              <ColorSwatch
                color="var(--aqua)"
                name="aqua"
                size="sm"
              />
              <ColorSwatch
                color="var(--orange)"
                name="orange"
                size="sm"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-6 text-sm font-medium tracking-wide uppercase">
            Stylistic — molecules
          </h2>

          <div className="mb-8 space-y-4">
            <p className="text-foreground-dim text-xs font-medium tracking-tight uppercase">
              NotificationItem
            </p>
            <div className="max-w-sm space-y-2.5">
              <NotificationItem
                icon={
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                }
                iconColor="bg-secondary/15 text-secondary"
                title="build ok"
                timestamp="2 min ago"
              />
              <NotificationItem
                icon={
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                }
                iconColor="bg-accent/15 text-accent"
                title="new comment"
                timestamp="1 hour ago"
              />
              <NotificationItem
                icon={
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                    />
                    <line
                      x1="12"
                      y1="16"
                      x2="12"
                      y2="12"
                    />
                    <line
                      x1="12"
                      y1="8"
                      x2="12.01"
                      y2="8"
                    />
                  </svg>
                }
                iconColor="bg-destructive/15 text-destructive"
                title="deployment failed"
                timestamp="just now"
              />
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <p className="text-foreground-dim text-xs font-medium tracking-tight uppercase">
              ChangelogItem
            </p>
            <div className="space-y-2">
              <ChangelogItem version="v1.3">
                semantic colors, floating nav, darker dark mode
              </ChangelogItem>
              <ChangelogItem version="v1.2">popover, carousel fix, gruvbox theme</ChangelogItem>
              <ChangelogItem version="v1.1">tabs, accordion, dialog</ChangelogItem>
              <ChangelogItem version="v1.0">initial release</ChangelogItem>
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <p className="text-foreground-dim text-xs font-medium tracking-tight uppercase">
              MenuItem variants
            </p>
            <div className="bg-surface max-w-[160px] rounded-lg py-1 shadow-sm">
              <MenuItem
                icon={
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                }
                label="edit"
              />
              <MenuItem
                icon={
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                }
                label="duplicate"
              />
              <div className="border-border mx-2 my-1 border-t" />
              <MenuItem
                icon={
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                }
                label="delete"
                destructive
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-muted-foreground mb-6 text-sm font-medium tracking-wide uppercase">
            Stylistic — organisms
          </h2>

          <div className="space-y-4">
            <p className="text-foreground-dim text-xs font-medium tracking-tight uppercase">
              ScrollReveal (scroll down to see)
            </p>
            <ScrollReveal className="bg-surface rounded-lg p-6 shadow-sm">
              <p className="text-foreground text-sm font-medium">
                this section fades in when scrolled into view
              </p>
              <p className="text-foreground-muted mt-1 text-xs">
                intersection observer with 0.08 threshold, 2s fallback.
              </p>
            </ScrollReveal>
            <ScrollReveal className="bg-surface rounded-lg p-6 shadow-sm">
              <p className="text-foreground text-sm font-medium">another reveal section</p>
              <p className="text-foreground-muted mt-1 text-xs">each one triggers independently.</p>
            </ScrollReveal>
          </div>

          <p className="text-foreground-dim mt-6 text-xs font-medium tracking-tight uppercase">
            FloatingNav
          </p>
          <p className="text-foreground-muted text-[13px]">
            the fixed pill nav at the top of this page is the FloatingNav component. scroll to see
            it hide, hover to keep it visible.
          </p>
        </section>
      </div>
    </>
  );
}

function ToastDemo() {
  const toast = useToast();
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => {
          toast.info('saved', 'work saved to disk.');
        }}
      >
        info toast
      </Button>
      <Button
        onClick={() => {
          toast.success('deployed', 'project is live.');
        }}
        variant="secondary"
      >
        success toast
      </Button>
      <Button
        onClick={() => {
          toast.error('failed', 'upload exceeded limit.');
        }}
        variant="destructive"
      >
        error toast
      </Button>
    </div>
  );
}

export { App };
