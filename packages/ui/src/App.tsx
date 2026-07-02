import { Accordion } from './components/accordion/Accordion';
import { Alert } from './components/alert/Alert';
import { Badge } from './components/badge/Badge';
import { Button } from './components/button/Button';
import { Card } from './components/card/Card';
import { Carousel } from './components/carousel/Carousel';
import { Checkbox } from './components/checkbox/Checkbox';
import { ColorPalette } from './components/widgets/color-palette/ColorPalette';
import { Dialog } from './components/dialog/Dialog';
import { Input } from './components/input/Input';
import { Popover } from './components/popover/Popover';
import { Radio } from './components/radio/Radio';
import { Select } from './components/select/Select';
import { Slider } from './components/slider/Slider';
import { Switch } from './components/switch/Switch';
import { Tabs } from './components/tabs/Tabs';
import { Textarea } from './components/textarea/Textarea';
import { ToastContainer, useToast } from './components/toast/Toast';
import { Tooltip } from './components/tooltip/Tooltip';

const variants = [
  'primary', 'secondary', 'accent', 'destructive', 'warning', 'ghost', 'link'
] as const;

const sizes = ['sm', 'md', 'lg'] as const;

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen p-8 space-y-12">
      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Button variants</h2>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <Button key={v} variant={v}>{v}</Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Button sizes</h2>
        <div className="flex flex-wrap items-end gap-2">
          {sizes.map((s) => (
            <Button key={s} size={s}>size {s}</Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Button states</h2>
        <div className="flex flex-wrap gap-2">
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full width</Button>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Badge</h2>
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
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="soft" color="primary">soft</Badge>
            <Badge variant="solid" color="primary">solid</Badge>
            <Badge variant="outline" color="primary">outline</Badge>
            <Badge variant="dot" color="secondary">active</Badge>
            <Badge variant="dot" color="yellow">draft</Badge>
            <Badge variant="dot" color="destructive">archived</Badge>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Input</h2>
        <div className="max-w-sm space-y-4">
          <Input label="Default" placeholder="type something..." />
          <Input label="With icon" placeholder="search..." startIcon={<span>&#128269;</span>} />
          <Input label="Error state" variant="destructive" helperText="this field is required" />
          <Input label="Disabled" disabled value="cant touch this" />
          <Input label="Loading" isLoading value="loading..." />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Select</h2>
        <div className="max-w-sm space-y-4">
          <Select label="Choose one">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
          </Select>
          <Select label="Error" variant="destructive" helperText="pick something">
            <option>select...</option>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Textarea</h2>
        <div className="max-w-sm">
          <Textarea label="Notes" placeholder="start typing — grows with content..." />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Slider</h2>
        <div className="max-w-xs space-y-4">
          <Slider />
          <Slider variant="secondary" />
          <Slider variant="destructive" />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Checkbox & Radio</h2>
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
        <div className="flex gap-6 mt-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
            <Radio name="demo" defaultChecked /> 2d
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
            <Radio name="demo" /> 3d
          </label>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Switch</h2>
        <div className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
            <Switch defaultChecked /> fullscreen
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
            <Switch /> loop
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
            <Switch variant="secondary" defaultChecked /> dark mode
          </label>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Card</h2>
        <div className="grid gap-4 grid-cols-1 landscape:grid-cols-2 max-w-2xl">
          <Card>
            <img src="https://picsum.photos/seed/pg1/400/225.jpg" alt="" className="aspect-video w-full object-cover" />
            <div className="p-4">
              <Badge variant="soft" color="green">generative</Badge>
              <p className="text-sm font-medium mt-2">flow field exploration</p>
              <p className="text-xs text-muted-foreground mt-1">perlin noise fields and particle tracing.</p>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface-raised/50">
              <span className="text-xs text-foreground-dim">2 days ago</span>
              <Button variant="ghost" size="sm">view</Button>
            </div>
          </Card>
          <Card variant="interactive">
            <img src="https://picsum.photos/seed/pg2/400/225.jpg" alt="" className="aspect-video w-full object-cover" />
            <div className="p-4">
              <Badge variant="soft" color="purple">color</Badge>
              <p className="text-sm font-medium mt-2">oklch palette generator</p>
              <p className="text-xs text-muted-foreground mt-1">harmonious palettes in perceptually uniform space.</p>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Alert</h2>
        <div className="space-y-3 max-w-lg">
          <Alert variant="info">
            <Alert.Icon />
            <div>
              <Alert.Title>info</Alert.Title>
              <Alert.Description>project updated with latest changes.</Alert.Description>
            </div>
          </Alert>
          <Alert variant="success">
            <Alert.Icon />
            <div>
              <Alert.Title>success</Alert.Title>
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
          <Alert variant="error">
            <Alert.Icon />
            <div>
              <Alert.Title>error</Alert.Title>
              <Alert.Description>deployment failed. check config.</Alert.Description>
            </div>
          </Alert>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Accordion</h2>
        <div className="max-w-lg">
          <Accordion>
            <Accordion.Item title="what makes this different?" defaultOpen>
              <p className="text-sm text-muted-foreground leading-relaxed">every component uses modern css features like :has(), @starting-style, and color-mix() instead of javascript state management.</p>
            </Accordion.Item>
            <Accordion.Item title="why gruvbox?">
              <p className="text-sm text-muted-foreground leading-relaxed">warm, easy on the eyes, distinctive. feels like a workshop.</p>
            </Accordion.Item>
            <Accordion.Item title="single mono font?">
              <p className="text-sm text-muted-foreground leading-relaxed">creative coding toolkit. monospace is the native habitat.</p>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Tabs</h2>
        <div className="max-w-lg">
          <Tabs
            tabs={[
              { label: 'overview', content: <p className="text-sm text-muted-foreground leading-relaxed">pg_lab is a design-first toolkit built on modern css.</p> },
              { label: 'features', content: <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5"><li>css-only states via :has()</li><li>entry animations with @starting-style</li><li>zero-js accordion, tabs, toggles</li></ul> },
              { label: 'changelog', content: <div className="text-sm text-muted-foreground space-y-1"><p>v1.3 — semantic colors</p><p>v1.2 — popover, carousel</p></div> },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Dialog</h2>
        <div>
          <Button command="show-modal" commandfor="demo-dialog">open dialog</Button>
          <Dialog id="demo-dialog">
            <div className="p-5">
              <h3 className="text-sm font-medium mb-2">confirm action</h3>
              <p className="text-sm text-muted-foreground">are you sure? this will apply changes.</p>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 bg-surface-raised/50 rounded-b-lg">
              <Button command="close" commandfor="demo-dialog" variant="ghost">cancel</Button>
              <Button command="close" commandfor="demo-dialog">confirm</Button>
            </div>
          </Dialog>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Popover</h2>
        <div className="flex gap-8">
          <Popover>
            <Popover.Trigger><Button variant="primary">profile</Button></Popover.Trigger>
            <Popover.Content>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/15 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold">pg</div>
                <div><p className="text-sm font-medium">pg_lab</p><p className="text-xs text-foreground-dim">creative playground</p></div>
              </div>
            </Popover.Content>
          </Popover>
          <Popover>
            <Popover.Trigger><Button variant="ghost"><span>&#8942;</span></Button></Popover.Trigger>
            <Popover.Content>
              <div className="py-1">
                <button className="text-foreground hover:bg-surface-raised w-full px-3 py-1.5 text-left text-xs transition-colors rounded-sm">edit</button>
                <button className="text-foreground hover:bg-surface-raised w-full px-3 py-1.5 text-left text-xs transition-colors rounded-sm">duplicate</button>
                <div className="border-t border-border my-1 mx-2" />
                <button className="text-destructive hover:bg-destructive/10 w-full px-3 py-1.5 text-left text-xs transition-colors rounded-sm">delete</button>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Toast</h2>
        <ToastContainer>
          <ToastDemo />
        </ToastContainer>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Carousel</h2>
        <Carousel aria-label="projects">
          <Carousel.Slide size="sm">
            <img src="https://picsum.photos/seed/pgc1/400/225.jpg" alt="" className="aspect-video w-full object-cover" />
            <div className="p-3"><Badge variant="soft" color="green">generative</Badge><p className="text-xs font-medium mt-1">noise landscapes</p></div>
          </Carousel.Slide>
          <Carousel.Slide size="sm">
            <img src="https://picsum.photos/seed/pgc2/400/225.jpg" alt="" className="aspect-video w-full object-cover" />
            <div className="p-3"><Badge variant="soft" color="purple">color</Badge><p className="text-xs font-medium mt-1">gradient meshes</p></div>
          </Carousel.Slide>
          <Carousel.Slide size="sm">
            <img src="https://picsum.photos/seed/pgc3/400/225.jpg" alt="" className="aspect-video w-full object-cover" />
            <div className="p-3"><Badge variant="soft" color="blue">shader</Badge><p className="text-xs font-medium mt-1">ray marching</p></div>
          </Carousel.Slide>
        </Carousel>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Tooltip</h2>
        <div className="flex gap-3">
          <Tooltip content="settings"><Button><span>&#9881;</span></Button></Tooltip>
          <Tooltip content="delete" variant="destructive"><Button variant="destructive"><span>&#128465;</span></Button></Tooltip>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">ColorPalette</h2>
        <div className="flex flex-wrap gap-4">
          <ColorPalette colors={['#83a598', '#b8bb26', '#fb4934', '#d3869b', '#8ec07c']} name="demo-palette" />
        </div>
      </section>
    </div>
  );
}

function ToastDemo() {
  const toast = useToast();
  return (
    <div className="flex gap-2">
      <Button onClick={() => { toast.info('saved', 'work saved to disk.'); }}>info toast</Button>
      <Button onClick={() => { toast.success('deployed', 'project is live.'); }} variant="secondary">success toast</Button>
      <Button onClick={() => { toast.error('failed', 'upload exceeded limit.'); }} variant="destructive">error toast</Button>
    </div>
  );
}

export { App };
