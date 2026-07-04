import { Moon, Search, Settings, Sun, User } from 'lucide-react';
import { useRef } from 'react';
import {
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
  CardTitle,
  Carousel,
  CarouselSlide,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  Input,
  Popover,
  Radio,
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

function ButtonGallery() {
  return (
    <section className="space-y-3">
      <h2 className="text-foreground text-lg font-medium">Buttons — all 6 variants</h2>
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Button
            key={v}
            variant={v}
          >
            {v}
          </Button>
        ))}
      </div>
    </section>
  );
}

function BadgeGallery() {
  return (
    <section className="space-y-3">
      <h2 className="text-foreground text-lg font-medium">Badges</h2>
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
            dot
          >
            {v}
          </Badge>
        ))}
      </div>
    </section>
  );
}

function DialogDemo() {
  const dialogRef = useRef<DialogHandle>(null);
  return (
    <section className="space-y-3">
      <h2 className="text-foreground text-lg font-medium">Dialog</h2>
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
    </section>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <section className="space-y-3">
      <h2 className="text-foreground text-lg font-medium">Toasts</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="primary"
          onClick={() =>
            toast({ variant: 'primary', title: 'saved', description: 'work saved to disk.' })
          }
        >
          info toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({ variant: 'secondary', title: 'deployed', description: 'project is live.' })
          }
        >
          success toast
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            toast({
              variant: 'destructive',
              title: 'failed',
              description: 'upload exceeded limit.'
            })
          }
        >
          error toast
        </Button>
      </div>
    </section>
  );
}

function TabsDemo() {
  // State lives here (via the hook), not inside <Tabs> itself.
  const tabs = useTabsState('overview');
  return (
    <section className="space-y-3">
      <h2 className="text-foreground text-lg font-medium">Tabs</h2>
      <Tabs
        value={tabs.value}
        onValueChange={tabs.setValue}
      >
        <TabsList>
          <TabsTrigger value="overview">overview</TabsTrigger>
          <TabsTrigger value="features">features</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          pg_lab is a design-first toolkit built on modern css.
        </TabsContent>
        <TabsContent value="features">
          css-only states, entry animations, dynamic theming.
        </TabsContent>
      </Tabs>
    </section>
  );
}

function AppContent() {
  return (
    <main className="mx-auto flex max-w-[960px] flex-col gap-14 px-4 py-10 sm:px-6">
      <header className="flex items-center justify-between">
        <span className="text-primary text-sm font-semibold tracking-tight">pg_lab-ui</span>
        <ThemeToggleButton />
      </header>

      <ButtonGallery />
      <BadgeGallery />

      <section className="space-y-3">
        <h2 className="text-foreground text-lg font-medium">Inputs</h2>
        <Input
          variant="primary"
          leadingIcon={<Search className="h-3.5 w-3.5" />}
          placeholder="search..."
        />
        <Textarea placeholder="start typing — grows with content..." />
        <div className="flex flex-col gap-2.5">
          <Checkbox
            id="c1"
            defaultChecked
            label="generative"
          />
          <Radio
            id="r1"
            name="demo"
            defaultChecked
            label="2d"
          />
          <Switch
            id="s1"
            defaultChecked
            label="fullscreen"
          />
        </div>
        <Slider defaultValue={65} />
      </section>

      <section className="space-y-3">
        <h2 className="text-foreground text-lg font-medium">Cards</h2>
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
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-foreground text-lg font-medium">Accordion</h2>
        <Accordion>
          <AccordionItem
            title="what makes this different?"
            open
          >
            every component uses modern css features instead of javascript state management.
          </AccordionItem>
          <AccordionItem title="why gruvbox?">warm, easy on the eyes, distinctive.</AccordionItem>
        </Accordion>
      </section>

      <TabsDemo />

      <section className="space-y-3">
        <h2 className="text-foreground text-lg font-medium">Carousel</h2>
        <Carousel>
          {['noise landscapes', 'gradient meshes', 'ray marching'].map((label) => (
            <CarouselSlide key={label}>
              <img
                src="https://picsum.photos/seed/pgc1/400/225.jpg"
                alt=""
                className="aspect-video w-full object-cover"
              />
              <div className="p-3">
                <p className="text-foreground text-[12px] font-medium">{label}</p>
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
      </section>

      <section className="space-y-3">
        <h2 className="text-foreground text-lg font-medium">Popover</h2>
        <Popover trigger={<Button variant="primary">profile</Button>}>
          <p className="text-foreground text-[13px] font-medium">pg_lab</p>
          <p className="text-foreground-dim text-xs">creative playground</p>
        </Popover>
      </section>

      <DialogDemo />

      <section className="space-y-3">
        <h2 className="text-foreground text-lg font-medium">Alerts</h2>
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
      </section>

      <ToastDemo />
    </main>
  );
}

export function App() {
  // All app-level state lives in these two hooks. ThemeProvider and
  // ToastProvider themselves are stateless — they just relay these values.
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
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
