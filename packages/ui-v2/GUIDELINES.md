# @repo/ui-v2 — Guidelines

A gruvbox-themed React 19 component library built on Tailwind v4 and CVA.
This document is the full reference: philosophy, architecture, design
tokens, the variant system, every component's API, and the conventions to
follow when extending the library.

---

## 1. Philosophy

Four rules shape every decision in this library:

1. **Mobile-first.** Base classes (no breakpoint prefix) are the complete,
   working experience. `landscape:` / `sm:` prefixes only ever _add_
   refinements — a third grid column, a horizontal card layout — never
   fix something that was broken on mobile.
2. **Progressive enhancement.** Prefer the platform. Native `<details>`,
   `<dialog>`, `<input type="checkbox|radio|range">`, `accent-color`,
   `:has()`, `:focus-within`, and `@starting-style` do real work in this
   library — they are not decoration on top of a JS-driven component.
   Where the browser already solves a problem, React doesn't re-solve it.
3. **Stateless components, stateful hooks.** No component in
   `src/components/` calls `useState`. Anywhere the UI needs state
   (theme, toasts, active tab, sidebar open/close), that state is
   extracted into a hook in `src/hooks/`. Components are pure functions
   of props; hooks are where logic and memory live. This makes every
   component trivially testable, server-renderable, and reusable in a
   fully controlled way.
4. **One variant system, everywhere.** Every component that has any
   notion of "color" accepts the same six-value `variant` prop. Learn it
   once, use it on every component.

---

## 2. Installation & setup

```bash
pnpm add class-variance-authority clsx tailwind-merge lucide-react
```

`react` and `react-dom` are peer dependencies — this library targets
**React 19+** specifically (see §4, ref-as-prop).

### Step 1 — import the stylesheet once

```ts
import '@repo/ui-v2/styles';
```

`styles.css` is a Tailwind v4 CSS-first config (`@import "tailwindcss"` +
`@theme inline`) — there is no `tailwind.config.js`. It defines:

- the gruvbox color tokens for dark (`:root`) and light
  (`html[data-theme="light"]`)
- every CSS-only interactive behavior the components rely on

### Step 2 — wire up stateful providers

State lives in hooks; providers just relay it. Call the hook, pass its
values into the provider:

```tsx
import { ThemeProvider, useThemeState, ToastProvider, useToastQueue } from '@repo/ui-v2';

export default function App() {
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
```

Both providers are optional. Dark is the CSS `:root` default, so an app
that never renders `ThemeProvider` still gets the full dark theme —
`ThemeProvider` only adds the light-mode switch on top.

### Step 3 — use components

```tsx
import { Button, Badge, Card, CardBody } from '@repo/ui-v2';
```

---

## 3. Design tokens

All tokens are CSS custom properties, re-exposed to Tailwind via
`@theme inline` so they're usable as ordinary utility classes
(`bg-primary`, `text-foreground-muted`, `border-border`, …).

### Semantic tokens (the ones components use)

| Token                | Dark value              | Light value         | Paired foreground          |
| -------------------- | ----------------------- | ------------------- | -------------------------- |
| `--background`       | `#1d2021`               | `#fbf1c7`           | —                          |
| `--surface`          | `#282828`               | `#f2e5bc`           | —                          |
| `--surface-raised`   | `#3c3836`               | `#ebdbb2`           | —                          |
| `--foreground`       | `#ebdbb2`               | `#3c3836`           | —                          |
| `--foreground-muted` | `#a89984`               | `#665c54`           | —                          |
| `--foreground-dim`   | `#665c54`               | `#928374`           | —                          |
| `--border`           | `rgba(235,219,178,.07)` | `rgba(60,56,54,.1)` | —                          |
| `--primary`          | `#83a598`               | `#076678`           | `--primary-foreground`     |
| `--secondary`        | `#b8bb26`               | `#79740e`           | `--secondary-foreground`   |
| `--accent`           | `#d3869b`               | `#8f3f71`           | `--accent-foreground`      |
| `--warning`          | `#fabd2f`               | `#b57614`           | `--warning-foreground`     |
| `--destructive`      | `#fb4934`               | `#9d0006`           | `--destructive-foreground` |

Switching theme is one attribute: `<html data-theme="light">` (absence
of the attribute = dark). `ThemeProvider`/`useThemeState` do this for
you and persist the choice to `localStorage`.

### Raw palette (for badges, charts, generative content)

`--red --green --yellow --blue --purple --aqua --orange` — used when
content needs a color that isn't tied to a UI meaning.

### Elevation & shape

- Shadows: `--shadow-sm` / `--shadow-md` / `--shadow-lg`
- Radius: `rounded-md` (inputs, buttons), `rounded-lg` (cards, panels,
  dialogs), `rounded-full` (pills, avatars, floating nav).
- Font: JetBrains Mono everywhere — this is a monospace-only design
  system (`--font-sans` and `--font-mono` are the same stack).

---

## 4. Architecture

### 4.1 React 19 ref-as-prop

No component uses `forwardRef`. `ref` is declared as an ordinary prop:

```tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
}

export function Button({ ref, ...props }: ButtonProps) {
  return (
    <button
      ref={ref}
      {...props}
    />
  );
}
```

`Dialog` goes one step further and calls `useImperativeHandle` directly
on that `ref` prop:

```tsx
export function Dialog({ children, onClose, ref }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close()
  }));
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
    >
      {children}
    </dialog>
  );
}
```

**Convention for new components:** add `ref?: Ref<TElement>` to the
props interface, destructure it alongside other props, forward it to the
underlying DOM node. Never reach for `forwardRef`.

### 4.2 Variant files live next to their component

Every `cva()` call lives in its own `ComponentName.variants.ts` file,
imported by `ComponentName.tsx`:

```
components/
  data-entry/
    button/Button.tsx
    button/Button.variants.ts
    input/Input.tsx
    input/Input.variants.ts
```

This means the variant config can be imported, tested, or previewed
without pulling in the component itself.

Components that don't need `cva` (because they key off the single
shared `--_color` custom property instead — see §5.2) don't get a
variants file; they import `colorVar`/`colorVarStyle` from
`lib/colorVariant.ts` directly.

### 4.3 Stateless components, stateful hooks

| Needs state?                   | Component                                                                                                  | Hook that owns the state                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Yes                            | `ThemeProvider`                                                                                            | `useThemeState(defaultTheme?, persist?)` |
| Yes                            | `ToastProvider` / `ToastViewport`                                                                          | `useToastQueue()`                        |
| Yes                            | `Tabs`                                                                                                     | `useTabsState(defaultValue)`             |
| Yes                            | `Sidebar`                                                                                                  | `useSidebarState(defaultOpen?)`          |
| Yes                            | `FloatingNav`                                                                                              | `useFloatingNavState()`                  |
| Yes                            | `ScrollReveal`                                                                                             | `useScrollRevealState(threshold?)`       |
| No — native element owns state | `AccordionItem` (`<details>`), `Dialog` (`<dialog>`), `Checkbox`/`Radio`/`Switch`/`Slider` (native inputs) | —                                        |
| No — pure CSS                  | `Popover`, `Tooltip`                                                                                       | —                                        |
| No — ref only, not state       | `Carousel` (`useRef` for `scrollBy`), `ColorPalette`                                                       | —                                        |

**Convention for new components:** if a component needs to remember
something across renders that isn't already owned by the DOM, don't put
`useState` in the component. Write a `useXState()` hook in
`src/hooks/`, have the component accept the state and setters as props,
and let the hook be the thing apps call.

### 4.4 File layout

```
src/
  styles/
    styles.css              @import "tailwindcss"
    gruvbox-theme.css       theme tokens + CSS-only component behaviors
  lib/
    cn.ts                   clsx + tailwind-merge helper
    colorVariant.ts         shared 6-value ColorVariant type + helpers
  hooks/
    useThemeState.ts
    useToastQueue.ts
    useTabsState.ts
    useFloatingNavState.ts
    useScrollRevealState.ts
    useSidebarState.ts
    useResizeObserver.ts
  theme/
    ThemeProvider.tsx
    useTheme.ts
  components/
    data-entry/             Button, Checkbox, HelperText, Input, Label,
                            Radio, Select, Slider, Switch, Textarea
    data-display/           Accordion, Badge, Card family, Carousel,
                            ChangelogItem, ColorSwatch, Hero, MenuItem,
                            NotificationItem, Popover, ScrollReveal,
                            SectionHeader, SectionHeading, Tooltip
    feedback/               Alert, Dialog family, ErrorBoundary,
                            DefaultFallback, Toast
    navigation/             FloatingNav, Tabs family
    widgets/                ColorPalette, Sidebar family
    Cards/                  CategoryCard, DocCard, ProjectCard,
                            CardBodyWithAccent, CardLink
    ControlPanel/           ControlPanel, ControlSection, ControlRow,
                            ControlGrid, ControlSubsection, ControlConditional
    icons/                  Icon, iconMap, createIcon
  index.ts                  barrel export
```

---

## 5. The variant system

```ts
type ColorVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'destructive';
```

Defined once in `lib/colorVariant.ts`, used by every component that has
any notion of color. `default` is a neutral/grey token
(`--foreground-dim`); the other five map 1:1 to the semantic CSS
variables in §3.

There are exactly two ways a component consumes `variant`:

### 5.1 Full color, via `cva` (own `.variants.ts` file)

Used when the variant changes multiple properties at once (background
_and_ text color _and_ focus ring). `variant` is a `cva` variant key,
resolved to a class string.

```ts
// Button.variants.ts
export const buttonVariants = cva('inline-flex ...', {
  variants: {
    variant: {
      default: 'bg-surface-raised text-foreground ...',
      primary: 'bg-primary text-primary-foreground ...'
    },
    size: { sm: '...', default: '...', lg: '...', icon: '...' }
  },
  defaultVariants: { variant: 'default', size: 'default' }
});
```

Used by: `Button`, `Alert`, `Toast`, `Badge` (appearance + dot),
`Input` (wrapper), `Label`, `HelperText`, `Select`, `DefaultFallback`.

### 5.2 Single accent, via `--_color` (no variants file needed)

Used when only _one_ value needs to change — a focus ring, an accent
dot, a glow color. The component sets a CSS custom property from
`colorVar(variant)`, and a plain CSS rule in `gruvbox-theme.css` reads
it:

```ts
import { colorVar, colorVarStyle, type ColorVariant } from "../lib/colorVariant";

<span style={colorVarStyle(variant)} />
<input style={{ accentColor: colorVar(variant) }} />
```

```css
.badge-soft {
  background: color-mix(in srgb, var(--_color) 15%, transparent);
  color: var(--_color);
}
```

Used by: `Badge` (color itself), `Switch`, `Card` (glow), `Tabs`
(active indicator), `Checkbox`/`Radio`/`Slider` (`accent-color`),
`Input`/`Textarea` (focus ring), `SidebarPanel`, `SidebarToggle`,
`ChangelogItem`, `Hero`, `MenuItem`, `NotificationItem`, `SectionHeader`,
`SectionHeading`, `ColorPalette`, `FloatingNav`.

### 5.3 Which components accept `variant`, and what it does

| Component                       | Mechanism      | Default       | What it colors                           |
| ------------------------------- | -------------- | ------------- | ---------------------------------------- |
| `Button`                        | cva            | `default`     | background + text                        |
| `Badge`                         | `--_color`     | `default`     | soft/solid/outline/dot fill              |
| `Input` / `Textarea`            | `--_ring`      | `primary`     | focus border + ring                      |
| `Select`                        | `--_ring`      | `primary`     | focus border + ring                      |
| `Switch`                        | `--_color`     | `primary`     | checked-state fill                       |
| `Checkbox` / `Radio` / `Slider` | `accent-color` | `primary`     | native accent                            |
| `Card`                          | `--_color`     | `primary`     | `:has()` hover glow (when `interactive`) |
| `Tabs`                          | `--_color`     | `primary`     | active tab underline                     |
| `Alert`                         | cva            | `default`     | tinted background + icon                 |
| `Toast`                         | icon/color map | `default`     | icon + accent                            |
| `Label` / `HelperText`          | cva            | `default`     | text color                               |
| `ChangelogItem`                 | `--_color`     | `primary`     | version label                            |
| `Hero`                          | `--_color`     | `primary`     | gradient accent                          |
| `MenuItem`                      | `--_color`     | `default`     | icon background                          |
| `NotificationItem`              | `--_color`     | `primary`     | icon background                          |
| `SectionHeader`                 | `--_color`     | `primary`     | title + link                             |
| `SectionHeading`                | `--_color`     | `primary`     | label                                    |
| `ColorPalette`                  | `--_color`     | `primary`     | selection ring                           |
| `SidebarPanel`                  | `--_color`     | `default`     | panel accent                             |
| `SidebarToggle`                 | `--_color`     | `default`     | button color                             |
| `FloatingNav`                   | `--_color`     | `primary`     | brand text                               |
| `ErrorBoundary`                 | `--_color`     | `destructive` | fallback accent                          |
| `ControlSection`                | cva            | `default`     | header + border                          |
| `DefaultFallback`               | cva            | `destructive` | background + text                        |
| `ColorPalette`                  | cva            | —             | layout (orientation, size)               |

`Accordion`, `Dialog`, `Carousel`, `Popover`, `Tooltip`, `ControlPanel`,
`ControlRow`, `ControlGrid`, `ControlSubsection`, `ControlConditional`,
`ColorSwatch`, `ScrollReveal`, `SectionHeading` (`label` only), `CardLink`,
`SidebarMain`, `CategoryCard`, `DocCard`, `ProjectCard`, `Icon` have no
color variant — they're structural or use their own accent system.

---

## 6. Component reference

Each entry lists the props beyond standard HTML attributes for that
element, plus the sub-components in a compound family.

### 6.1 Data Entry

#### Button

```tsx
<Button
  variant="primary"
  size="default"
>
  save
</Button>
```

| Prop        | Type                                  | Default     | Notes                                                 |
| ----------- | ------------------------------------- | ----------- | ----------------------------------------------------- |
| `variant`   | `ColorVariant \| "ghost" \| "link"`   | `"default"` | `ghost`/`link` are extras beyond the 6-variant system |
| `size`      | `"sm" \| "default" \| "lg" \| "icon"` | `"default"` |                                                       |
| `isLoading` | `boolean`                             | `false`     | swaps label for spinner, sets `aria-busy`             |
| `fullWidth` | `boolean`                             | `false`     | `w-full`                                              |

#### Checkbox

```tsx
<Checkbox
  variant="primary"
  defaultChecked
  label="generative"
/>
```

| Prop      | Type           | Default     |
| --------- | -------------- | ----------- |
| `variant` | `ColorVariant` | `"primary"` |
| `label`   | `ReactNode`    | —           |

Native `<input type="checkbox">` — pass `checked`/`defaultChecked`/`onChange`.

#### Radio

```tsx
<Radio
  name="demo"
  defaultChecked
  label="2d"
/>
```

| Prop      | Type           | Default     |
| --------- | -------------- | ----------- |
| `variant` | `ColorVariant` | `"primary"` |
| `label`   | `ReactNode`    | —           |

Native `<input type="radio">` — pass `checked`/`defaultChecked`/`onChange`.

#### Switch

```tsx
<Switch
  defaultChecked
  label="fullscreen"
/>
```

| Prop      | Type           | Default     |
| --------- | -------------- | ----------- |
| `variant` | `ColorVariant` | `"primary"` |
| `label`   | `ReactNode`    | —           |

Restyled native `<input type="checkbox">` with `role="switch"`.

#### Input

```tsx
<Input
  variant="primary"
  leadingIcon={<Search />}
  placeholder="search..."
/>
```

| Prop               | Type           | Default                        |
| ------------------ | -------------- | ------------------------------ |
| `variant`          | `ColorVariant` | `"primary"` — focus ring color |
| `leadingIcon`      | `ReactNode`    | —                              |
| `isLoading`        | `boolean`      | `false`                        |
| `wrapperClassName` | `string`       | —                              |

#### Label

```tsx
<Label
  htmlFor="input-id"
  variant="destructive"
  required
>
  email
</Label>
```

| Prop       | Type           | Default            |
| ---------- | -------------- | ------------------ |
| `variant`  | `ColorVariant` | `"default"`        |
| `required` | `boolean`      | `false` — adds `*` |

#### HelperText

```tsx
<HelperText
  variant="destructive"
  icon
>
  error message
</HelperText>
```

| Prop      | Type           | Default                       |
| --------- | -------------- | ----------------------------- |
| `variant` | `ColorVariant` | `"default"`                   |
| `icon`    | `boolean`      | `false` — shows an alert icon |

#### Select

```tsx
<Select
  variant="primary"
  placeholder="choose..."
>
  <option value="a">option a</option>
</Select>
```

| Prop          | Type           | Default                             |
| ------------- | -------------- | ----------------------------------- |
| `variant`     | `ColorVariant` | `"primary"`                         |
| `placeholder` | `string`       | — disabled, hidden first `<option>` |

#### Textarea

```tsx
<Textarea
  variant="primary"
  placeholder="write..."
/>
```

| Prop      | Type           | Default     |
| --------- | -------------- | ----------- |
| `variant` | `ColorVariant` | `"primary"` |

Auto-grows via `field-sizing: content`.

#### Slider

```tsx
<Slider
  variant="primary"
  defaultValue={50}
/>
```

| Prop      | Type           | Default     |
| --------- | -------------- | ----------- |
| `variant` | `ColorVariant` | `"primary"` |

Native `<input type="range">`.

---

### 6.2 Data Display

#### Badge

```tsx
<Badge
  variant="accent"
  appearance="soft"
  dot
>
  active
</Badge>
```

| Prop         | Type                                          | Default     |
| ------------ | --------------------------------------------- | ----------- |
| `variant`    | `ColorVariant`                                | `"default"` |
| `appearance` | `"soft" \| "solid" \| "outline" \| undefined` | `"soft"`    |
| `dot`        | `boolean`                                     | `false`     |

#### Card family

```tsx
<Card
  interactive
  variant="accent"
>
  <CardImage src="..." />
  <CardBody>
    <CardTitle>title</CardTitle>
    <CardDescription>description</CardDescription>
  </CardBody>
  <CardActions>
    <Button
      variant="ghost"
      size="icon"
    >
      <Settings />
    </Button>
  </CardActions>
</Card>
```

| Component                                                                   | Prop                                   | Notes                                                     |
| --------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `Card`                                                                      | `interactive?: boolean`                | enables the `:has()` glow when `.card-actions` is hovered |
| `Card`                                                                      | `variant?: ColorVariant` (`"primary"`) | glow color, only matters if `interactive`                 |
| `CardImage`                                                                 | (all `<img>` props)                    | defaults `alt=""`                                         |
| `CardBody` / `CardTitle` / `CardDescription` / `CardFooter` / `CardActions` | —                                      | layout-only wrappers                                      |

#### CardLink

```tsx
<CardLink
  href="/projects"
  accent={accentTokens.primary}
>
  <CardImage src="..." />
  <CardBody>
    <CardTitle>project</CardTitle>
  </CardBody>
</CardLink>
```

| Prop     | Type                     | Default                |
| -------- | ------------------------ | ---------------------- |
| `href`   | `string`                 | required               |
| `accent` | `string` (any CSS color) | `accentTokens.primary` |

Anchor-rooted. Entire surface is the click target, with neon glow.

#### Accordion

```tsx
<Accordion>
  <AccordionItem
    title="question?"
    open
  >
    answer
  </AccordionItem>
</Accordion>
```

`AccordionItem` is a native `<details>`; pass `open` for uncontrolled default.

#### Tabs

```tsx
const tabs = useTabsState('overview');
<Tabs
  value={tabs.value}
  onValueChange={tabs.setValue}
>
  <TabsList>
    <TabsTrigger value="overview">overview</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>;
```

Fully controlled — `value` and `onValueChange` are required. Use
`useTabsState(defaultValue)` for uncontrolled ergonomics.

#### Carousel

```tsx
<Carousel>
  <CarouselSlide>content</CarouselSlide>
</Carousel>
```

CSS-only scroll-snap. Arrow buttons via `scrollBy` ref.

#### Popover

```tsx
<Popover trigger={<Button>profile</Button>}>
  <p>content</p>
</Popover>
```

| Prop      | Type                 | Default    |
| --------- | -------------------- | ---------- |
| `trigger` | `ReactNode`          | required   |
| `align`   | `"left" \| "center"` | `"center"` |

Hover/focus-triggered via group CSS — no JS, no portal.

#### Tooltip

```tsx
<Tooltip content="settings">
  <Button
    variant="ghost"
    size="icon"
  >
    <Settings />
  </Button>
</Tooltip>
```

| Prop      | Type           | Default     |
| --------- | -------------- | ----------- |
| `content` | `string`       | required    |
| `variant` | `ColorVariant` | `"default"` |

CSS-only `::after` bubble, no portal.

#### ChangelogItem

```tsx
<ChangelogItem
  variant="primary"
  version="v2.0"
>
  description text
</ChangelogItem>
```

| Prop      | Type           | Default     |
| --------- | -------------- | ----------- |
| `version` | `string`       | required    |
| `variant` | `ColorVariant` | `"primary"` |

#### ColorSwatch

```tsx
<ColorSwatch
  color="var(--primary)"
  name="Primary"
  token="--primary"
  size="md"
/>
```

| Prop    | Type           | Default  |
| ------- | -------------- | -------- |
| `color` | `string`       | required |
| `name`  | `string`       | required |
| `token` | `string`       | —        |
| `size`  | `"sm" \| "md"` | `"md"`   |

#### Hero

```tsx
<Hero
  badgeText="v2.0"
  title="UI Library"
  highlight="pg_lab"
  description="A design-first toolkit."
  variant="primary"
>
  <Button>cta</Button>
</Hero>
```

| Prop          | Type           | Default        |
| ------------- | -------------- | -------------- |
| `badgeText`   | `string`       | —              |
| `title`       | `string`       | `"Creative"`   |
| `highlight`   | `string`       | `"Playground"` |
| `description` | `string`       | —              |
| `variant`     | `ColorVariant` | `"primary"`    |

#### MenuItem

```tsx
<MenuItem icon={<Book />} label="docs" />
<MenuItem label="delete" variant="destructive" />
```

| Prop      | Type           | Default     |
| --------- | -------------- | ----------- |
| `icon`    | `ReactNode`    | —           |
| `label`   | `string`       | required    |
| `variant` | `ColorVariant` | `"default"` |

#### NotificationItem

```tsx
<NotificationItem
  icon={<Bell className="h-4 w-4" />}
  title="New version"
  timestamp="2 hours ago"
  variant="primary"
/>
```

| Prop        | Type           | Default     |
| ----------- | -------------- | ----------- |
| `icon`      | `ReactNode`    | required    |
| `title`     | `string`       | required    |
| `timestamp` | `string`       | required    |
| `variant`   | `ColorVariant` | `"primary"` |

#### ScrollReveal

```tsx
<ScrollReveal threshold={0.08}>
  <p>fades in on scroll</p>
</ScrollReveal>
```

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `threshold` | `number` | `0.08`  |

Uses `IntersectionObserver` via `useScrollRevealState`.

#### SectionHeader

```tsx
<SectionHeader
  title="projects"
  description="explore creative coding."
  icon={<Zap />}
  href="/projects"
  variant="primary"
  align="left"
/>
```

| Prop          | Type                 | Default      |
| ------------- | -------------------- | ------------ |
| `title`       | `string`             | required     |
| `description` | `string`             | —            |
| `icon`        | `ReactNode`          | —            |
| `href`        | `string`             | —            |
| `linkText`    | `ReactNode`          | `"View all"` |
| `variant`     | `ColorVariant`       | `"primary"`  |
| `align`       | `"left" \| "center"` | `"left"`     |

#### SectionHeading

```tsx
<SectionHeading
  label="overview"
  title="What is pg_lab?"
  description="A design-first toolkit."
  variant="primary"
/>
```

| Prop          | Type           | Default     |
| ------------- | -------------- | ----------- |
| `label`       | `string`       | required    |
| `title`       | `string`       | required    |
| `description` | `ReactNode`    | —           |
| `variant`     | `ColorVariant` | `"primary"` |

---

### 6.3 Feedback

#### Alert

```tsx
<Alert
  variant="warning"
  title="unsaved changes"
  description="may be lost."
/>
```

| Prop          | Type           | Default                         |
| ------------- | -------------- | ------------------------------- |
| `variant`     | `ColorVariant` | `"default"`                     |
| `title`       | `ReactNode`    | required                        |
| `description` | `ReactNode`    | —                               |
| `icon`        | `ReactNode`    | — overrides per-variant default |

#### Dialog

```tsx
const ref = useRef<DialogHandle>(null);
<Button onClick={() => ref.current?.open()}>open</Button>
<Dialog ref={ref}>
  <DialogBody>
    <DialogTitle>title</DialogTitle>
    <DialogDescription>description</DialogDescription>
  </DialogBody>
  <DialogActions dialogRef={ref} variant="primary" />
</Dialog>
```

| Export                                                              | Purpose                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| `Dialog`                                                            | wraps native `<dialog>`; `ref` exposes `{ open(), close() }` |
| `DialogBody` / `DialogTitle` / `DialogDescription` / `DialogFooter` | layout wrappers                                              |
| `DialogActions`                                                     | convenience footer with cancel + confirm                     |

#### ErrorBoundary

```tsx
<ErrorBoundary
  variant="destructive"
  onError={(e) => console.error(e)}
>
  <BuggyWidget />
</ErrorBoundary>
```

| Prop       | Type                     | Default           |
| ---------- | ------------------------ | ----------------- |
| `variant`  | `ColorVariant`           | `"destructive"`   |
| `onError`  | `(error: Error) => void` | —                 |
| `fallback` | `FallbackRenderer`       | `DefaultFallback` |

#### Toast

```tsx
const { toast } = useToast();
toast({ variant: 'primary', title: 'saved', description: 'done.' });
```

| Export            | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| `useToastQueue()` | state hook — owns toast array, id counter, timers          |
| `ToastProvider`   | stateless — takes `toasts`/`toast`/`dismiss` from the hook |
| `ToastViewport`   | renders toasts portaled to `document.body`                 |
| `useToast()`      | consumer hook: `{ toast(options), dismiss(id) }`           |

`ToastOptions`: `{ title, description?, variant?: ColorVariant, duration?: number }`
(`duration` defaults to `4000`ms; `0` disables auto-dismiss).

---

### 6.4 Navigation

#### FloatingNav

```tsx
const nav = useFloatingNavState();
<FloatingNav
  brand={{ label: 'pg_lab', href: '#' }}
  links={[{ label: 'buttons', href: '#buttons' }]}
  themeToggle={<ThemeToggleButton />}
/>;
```

| Prop          | Type                              | Default     |
| ------------- | --------------------------------- | ----------- |
| `brand`       | `{ label: string; href: string }` | required    |
| `links`       | `NavLink[]`                       | required    |
| `themeToggle` | `ReactNode`                       | —           |
| `variant`     | `ColorVariant`                    | `"primary"` |

Auto-hides on scroll via `useFloatingNavState`.

---

### 6.5 Widgets

#### Sidebar

```tsx
const sidebar = useSidebarState(true);
<Sidebar
  open={sidebar.isOpen}
  onOpenChange={sidebar.toggle}
  position="left"
>
  <SidebarPanel variant="primary">panel content</SidebarPanel>
  <SidebarMain>
    <SidebarToggle variant="primary" />
    main content
  </SidebarMain>
</Sidebar>;
```

| Prop          | Type                                     | Default     |
| ------------- | ---------------------------------------- | ----------- |
| `position`    | `"top" \| "right" \| "bottom" \| "left"` | `"left"`    |
| `defaultOpen` | `boolean`                                | `true`      |
| `variant`     | `ColorVariant`                           | `"default"` |
| `panelWidth`  | `string`                                 | —           |
| `panelHeight` | `string`                                 | —           |

Sub-components: `Sidebar.Panel`, `Sidebar.Main`, `Sidebar.Toggle`,
`Sidebar.use` (context hook).

#### ColorPalette

```tsx
<ColorPalette
  colors={['#83a598', '#b8bb26', '#d3869b']}
  name="palette"
  value="gruvbox"
  orientation="horizontal"
  size="md"
/>
```

| Prop          | Type                         | Default        |
| ------------- | ---------------------------- | -------------- |
| `colors`      | `string[]`                   | required       |
| `name`        | `string`                     | `"palette"`    |
| `value`       | `string`                     | —              |
| `variant`     | `ColorVariant`               | `"primary"`    |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `size`        | `"sm" \| "md" \| "lg"`       | `"md"`         |

---

### 6.6 App-specific Cards

#### CategoryCard

```tsx
<CategoryCard
  title="color"
  description="palette exploration."
  iconName="color"
  href="/"
  color={accentTokens.primary}
/>
```

| Prop          | Type       |
| ------------- | ---------- |
| `title`       | `string`   |
| `description` | `string`   |
| `iconName`    | `IconName` |
| `href`        | `string`   |
| `color`       | `string`   |

#### DocCard

```tsx
<DocCard
  title="getting started"
  description="installation guide."
  iconName="book"
  href="/"
  color={accentTokens.secondary}
/>
```

Same shape as `CategoryCard`.

#### ProjectCard

```tsx
<ProjectCard
  title="flow field"
  description="particle tracing on perlin noise."
  iconName="generative"
  href="/"
/>
```

Uses `--_color` custom property for accent.

#### CardLink

```tsx
<CardLink
  href="/"
  accent={accentTokens.primary}
>
  <CardBody>
    <CardTitle>clickable card</CardTitle>
  </CardBody>
</CardLink>
```

Anchor-based card. Entire surface is clickable with neon glow effect.

#### accentTokens

```tsx
import { accentTokens } from '@repo/ui-v2';
// { primary: string, secondary: string, accent: string, destructive: string, warning: string }
```

Pre-defined CSS color values matching the theme tokens, used as `accent`
prop shortcuts.

---

### 6.7 ControlPanel

```tsx
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
      <Switch />
    </ControlRow>
    <ControlConditional when={visible}>
      <ControlRow label="seed">
        <Slider />
      </ControlRow>
    </ControlConditional>
  </ControlSection>
</ControlPanel>
```

| Component            | Props                                                                          |
| -------------------- | ------------------------------------------------------------------------------ |
| `ControlPanel`       | `title`, `variant?: ColorVariant`, `dock: "bottom-sheet" \| "top-left" \| ...` |
| `ControlSection`     | `title`, `variant?: ColorVariant`                                              |
| `ControlRow`         | `label`, `value?`                                                              |
| `ControlGrid`        | `columns: number`                                                              |
| `ControlSubsection`  | `title`                                                                        |
| `ControlConditional` | `when: boolean`                                                                |

---

### 6.8 Icons

```tsx
<Icon
  name="color"
  className="h-5 w-5"
/>
```

44 custom icons. `name` is a key from `iconMap`:

`arrow-diagonal`, `arrow-right`, `arrow-left`, `automa`, `bluesky`,
`book`, `box`, `chevron-down`, `close`, `code`, `color`, `data-viz`,
`discord`, `documentation`, `flame`, `generative`, `github`, `gitlab`,
`graphify`, `grid`, `grid-3x3`, `hamburger`, `home`, `image`,
`image-down`, `infinity`, `lightbulb`, `mosaic`, `palette`, `palettes`,
`particles`, `pie-chart`, `pipeline`, `pixel-manipulator`, `random`,
`sequences`, `simulation`, `social`, `sparkles`, `spinner`, `storybook`,
`three-stage`, `wrench`, `x`.

Create new icons:

```ts
import { createIcon } from "@repo/ui-v2";

export const IconMyShape = createIcon({
  name: "my-shape",
  children: <path d="..." />,
});
```

---

### 6.9 Hooks

| Hook                                     | Returns                                          | Used by         |
| ---------------------------------------- | ------------------------------------------------ | --------------- |
| `useThemeState(defaultTheme?, persist?)` | `{ theme, setTheme, toggleTheme }`               | `ThemeProvider` |
| `useTheme()`                             | `{ theme, setTheme, toggleTheme }`               | any consumer    |
| `useToastQueue()`                        | `{ toasts, toast, dismiss }`                     | `ToastProvider` |
| `useToast()`                             | `{ toast, dismiss }`                             | any consumer    |
| `useTabsState(defaultValue)`             | `{ value, setValue }`                            | `Tabs`          |
| `useFloatingNavState()`                  | `{ visible, navHoveredRef, show, scheduleHide }` | `FloatingNav`   |
| `useSidebarState(defaultOpen?)`          | `{ isOpen, toggle, open, close }`                | `Sidebar`       |
| `useScrollRevealState(threshold?)`       | `{ ref, visible }`                               | `ScrollReveal`  |
| `useResizeObserver(debounceMs?)`         | `[ref, { width, height }]`                       | any             |

---

## 7. Progressive enhancement checklist

- [ ] Base (mobile) styles have no breakpoint prefix and are fully
      functional on their own.
- [ ] `landscape:`/`sm:` classes only _add_ — removing them should
      degrade gracefully, never break layout or hide content.
- [ ] If the browser has a native element for this (checkbox, radio,
      range, details, dialog), you're using it — not reimplementing it.
- [ ] `:has()`, `:focus-within`, `@starting-style`, `color-mix()` stay
      in CSS. React only ever toggles attributes on top of them.
- [ ] `prefers-reduced-motion` is respected (handled globally in
      `gruvbox-theme.css`).

---

## 8. Conventions for contributing a new component

1. **File location**: `src/components/<category>/<Name>/<Name>.tsx`.
   If it needs `cva`, add `<Name>.variants.ts` beside it.
2. **No `forwardRef`.** Add `ref?: Ref<TElement>` to the props type,
   destructure and forward it.
3. **No `useState`/`useReducer` inside the component.** If it needs
   memory, write `use<Name>State()` in `src/hooks/` and accept the
   resulting values as props (controlled component).
4. **Color, if any**, uses the shared `ColorVariant` type from
   `lib/colorVariant.ts` — don't invent a parallel color enum. Decide
   between the `cva` pattern (§5.1) and the `--_color` pattern (§5.2)
   based on whether one or several CSS properties change.
5. **Mobile-first.** Write the no-prefix styles as the complete
   experience first; add `landscape:`/`sm:` only for genuine
   enhancements.
6. **Prefer the platform.** Before writing interaction logic, check
   whether a native element or CSS feature already does it.
7. **Export from `index.ts`**: the component, its props type, its
   variants export (if any), and its state hook (if any).
8. **Update this document** — add a row to §5.3 if it takes `variant`,
   and an entry to §6.
9. **Update `App.tsx`** — add a demo section showcasing the new
   component with both an interactive example and its source code.
