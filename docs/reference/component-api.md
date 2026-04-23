# Component API

> Quick reference for UI components in `@repo/ui`.

---

## 🚦 Button

```tsx
import { Button } from "@repo/ui";

<Button variant="primary" size="default">Click me</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary"` \| `"secondary"` \| `"accent"` \| `"destructive"` \| `"outline"` \| `"ghost"` | `"primary"` | Visual style |
| `size` | `"sm"` \| `"default"` \| `"lg"` \| `"icon"` | `"default"` | Button size |
| `isLoading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable interaction |
| `type` | `"button"` \| `"submit"` \| `"reset"` | `"button"` | Form type |

---

## 📝 Input

```tsx
import { Input } from "@repo/ui";

<Input 
  label="Email" 
  type="email" 
  placeholder="you@example.com…" 
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Field label |
| `helperText` | `string` | Helper/error text |
| `isLoading` | `boolean` | Show loading spinner |
| `startIcon` | `ReactNode` | Icon before input |
| `endIcon` | `ReactNode` | Icon after input |
| `variant` | `"primary"` \| `"secondary"` \| `"accent"` \| `"destructive"` \| `"outline"` \| `"ghost"` | Visual style |

---

## 🎚️ Slider

```tsx
import { Slider } from "@repo/ui";

<Slider 
  label="Volume" 
  value={50} 
  min={0} 
  max={100} 
  step={1}
  unit="%"
  onChange={(v) => console.log(v)}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | Current value |
| `onChange` | `(value: number) => void` | Change handler |
| `min` | `number` | Minimum |
| `max` | `number` | Maximum |
| `step` | `number` | Step size |
| `label` | `string` | Label text |
| `helperText` | `string` | Helper text |
| `unit` | `string` | Display unit (e.g., "%", "px") |
| `layout` | `"horizontal"` \| `"vertical"` | Orientation |

---

## 🔘 Switch

```tsx
import { Switch } from "@repo/ui";

<Switch 
  checked={enabled} 
  onCheckedChange={(v) => setEnabled(v)}
  label="Enable feature"
/>
```

---

## 🔽 Select

```tsx
import { Select } from "@repo/ui";

<Select label="Choose one">
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</Select>
```

---

## 🃏 Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui";

<Card>
  <CardHeader>
    <CardTitle>Title Here</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Your content goes here.</p>
  </CardContent>
</Card>
```

---

## 🎨 ColorPalette

```tsx
import { ColorPalette } from "@repo/ui";

<ColorPalette 
  colors={["#ff0000", "#00ff00", "#0000ff"]} 
  checked={true}
  onChange={() => console.log("changed")}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `colors` | `string[]` | Color hex values |
| `checked` | `boolean` | Selected state |
| `onChange` | `() => void` | Selection handler |
| `variant` | `"primary"` \| `"secondary"` \| `"accent"` | Color variant |
| `orientation` | `"horizontal"` \| `"vertical"` | Layout |
| `size` | `"sm"` \| `"default"` \| `"lg"` | Cell size |

---

## 📐 Sidebar

```tsx
import { Sidebar } from "@repo/ui";

<Sidebar variant="normal" desktopPosition="left">
  <Sidebar.Toggle />
  <Sidebar.Panel>
    <p>Controls here</p>
  </Sidebar.Panel>
  <Sidebar.Main>
    <p>Main content here</p>
  </Sidebar.Main>
</Sidebar>
```

### Compound Components

| Component | Description |
|-----------|-------------|
| `Sidebar.Panel` | Collapsible sidebar panel. |
| `Sidebar.Main` | Main content area. |
| `Sidebar.Toggle` | Intelligent toggle button. Automatically snaps to the accessible corner based on sidebar position. |
| `Sidebar.use()` | Hook to access sidebar state (`isOpen`, `toggleSidebar`). |

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"normal"` \| `"primary"` \| `"secondary"` \| `"accent"` | `"normal"` | Background theme of the panel |
| `mobilePosition` | `"top"` \| `"right"` \| `"bottom"` \| `"left"` | `"bottom"` | Panel position on mobile |
| `desktopPosition` | Same | `"bottom"` | Panel position on desktop |
| `defaultOpen` | `boolean` | `true` | Initial open state |

---

> Tip: All components use design tokens (`bg-primary`, `text-foreground`, etc.) from `@repo/tailwind-config`.

> Note: For interactive examples, see [Storybook](https://joska-p.github.io/playground/storybook).