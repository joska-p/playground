import { Badge } from './components/badge/Badge';
import { Button } from './components/button/Button';
import { Checkbox } from './components/checkbox/Checkbox';
import { Input } from './components/input/Input';
import { Radio } from './components/radio/Radio';
import { Select } from './components/select/Select';
import { Slider } from './components/slider/Slider';
import { Switch } from './components/switch/Switch';
import { Textarea } from './components/textarea/Textarea';

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
    </div>
  );
}

export { App };
