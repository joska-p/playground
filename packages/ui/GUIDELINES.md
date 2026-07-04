# pg-lab-ui — Guidelines

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
   (theme, toasts, active tab), that state is extracted into a hook in
   `src/hooks/`. Components are pure functions of props; hooks are where
   logic and memory live. This makes every component trivially testable,
   server-renderable, and reusable in a fully controlled way.
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
import 'pg-lab-ui/styles/globals.css';
```

`globals.css` is Tailwind v4 CSS-first config (`@import "tailwindcss"` +
`@theme inline`) — there is no `tailwind.config.js`. It defines:

- the gruvbox color tokens for dark (`:root`) and light
  (`html[data-theme="light"]`)
- every CSS-only interactive behavior the components rely on: `.toggle`,
  `.tabs-container`, `.accordion-trigger`, `.dialog-modal`, `.toast-item`,
  `.badge-soft/solid/outline/dot`, `.card-interactive`, `.tooltip`,
  `.carousel`, `.floating-nav`, `.reveal`

### Step 2 — wire up stateful providers

State lives in hooks; providers just relay it. Call the hook, pass its
values into the provider:

```tsx
import { ThemeProvider, useThemeState, ToastProvider, useToastQueue } from 'pg-lab-ui';

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
        {/* your app */}
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
import { Button, Badge, Card, CardBody, CardTitle } from 'pg-lab-ui';
```

See `src/App.example.tsx` in the package for a working tour of every
component.

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
content needs a color that isn't tied to a UI meaning (e.g. tagging a
badge "generative" green vs "shader" blue). Don't use these for button
or alert `variant`s — those are semantic tokens above.

### Elevation & shape

- Shadows: `--shadow-sm` / `--shadow-md` / `--shadow-lg` (apply via
  inline `style`, not a Tailwind class, since they're full box-shadow
  strings — see any component source for the pattern).
- Radius: `rounded-md` (inputs, buttons), `rounded-lg` (cards, panels,
  dialogs), `rounded-full` (pills, avatars, floating nav).
- Font: JetBrains Mono everywhere — this is a monospace-only design
  system (`--font-sans` and `--font-mono` are the same stack). Load the
  font in your `<head>`; it isn't bundled here.

---

## 4. Architecture

### 4.1 React 19 ref-as-prop

No component uses `forwardRef`. `ref` is declared as an ordinary prop:

```tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  // ...
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
on that `ref` prop — again, no wrapper needed:

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
  Button.tsx           ← imports buttonVariants
  Button.variants.ts    ← cva() definition, importable on its own
  Badge.tsx
  Badge.variants.ts
  Alert.tsx
  Alert.variants.ts
  Input.tsx
  Input.variants.ts
```

This means the variant config can be imported, tested, or previewed
(e.g. in Storybook controls) without pulling in the component itself,
and keeps each component file focused on markup/behavior rather than
class-string bookkeeping.

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
| No — native element owns state | `AccordionItem` (`<details>`), `Dialog` (`<dialog>`), `Checkbox`/`Radio`/`Switch`/`Slider` (native inputs) | —                                        |
| No — pure CSS                  | `Popover`, `Tooltip`                                                                                       | —                                        |
| No — ref only, not state       | `Carousel` (`useRef` for `scrollBy`)                                                                       | —                                        |

**Convention for new components:** if a component needs to remember
something across renders that isn't already owned by the DOM (a native
element's own state, a ref), don't put `useState` in the component.
Write a `useXState()` hook in `src/hooks/`, have the component accept
the state and setters as props, and let the hook be the thing apps
call. This keeps every component in `src/components/` a pure
`(props) => JSX` function.

### 4.4 File layout

```
src/
  styles/globals.css        theme tokens + CSS-only component behaviors
  lib/
    cn.ts                   clsx + tailwind-merge helper
    colorVariant.ts          shared 6-value ColorVariant type + helpers
  hooks/
    useThemeState.ts
    useToastQueue.ts
    useTabsState.ts
  theme/
    ThemeProvider.tsx
  components/
    <Name>.tsx
    <Name>.variants.ts        (only for cva-based components)
  index.ts                   barrel export
  App.example.tsx            full usage tour
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

There are exactly two ways a component consumes `variant` — pick
whichever fits when building something new.

### 5.1 Full color, via `cva` (own `.variants.ts` file)

Used when the variant changes multiple properties at once (background
_and_ text color _and_ focus ring). `variant` is a `cva` variant key,
resolved to a class string.

```ts
// Button.variants.ts
export const buttonVariants = cva('inline-flex ... rounded-md font-medium ...', {
  variants: {
    variant: {
      default: 'bg-surface-raised text-foreground hover:brightness-110 ...',
      primary: 'bg-primary text-primary-foreground hover:brightness-110 ...'
      // secondary, accent, warning, destructive follow the same shape
    },
    size: { sm: '...', default: '...', lg: '...', icon: '...' }
  },
  defaultVariants: { variant: 'default', size: 'default' }
});
```

Used by: `Button`, `Alert`, `Toast` (icon/color map), `Badge` (appearance

- dot only — color itself uses §5.2), `Input` (wrapper layout only).

### 5.2 Single accent, via `--_color` (no variants file needed)

Used when only _one_ value needs to change — a focus ring, an accent
dot, a glow color. The component sets a CSS custom property from
`colorVar(variant)`, and a plain CSS rule in `globals.css` reads it:

```ts
// any component
import { colorVar, colorVarStyle, type ColorVariant } from "../lib/colorVariant";

<span style={colorVarStyle(variant)} />          // sets --_color
<input style={{ accentColor: colorVar(variant) }} /> // native accent-color
```

```css
/* globals.css */
.badge-soft {
  background: color-mix(in srgb, var(--_color) 15%, transparent);
  color: var(--_color);
}
.toggle:checked {
  background: var(--_color, var(--primary));
}
.card-interactive:has(.card-actions:hover) {
  box-shadow:
    ...,
    0 0 0 2px color-mix(in srgb, var(--_color, var(--primary)) 12%, transparent) !important;
}
```

Used by: `Badge` (color itself), `Switch`, `Card` (glow), `Tabs` (active
indicator), `Checkbox`/`Radio`/`Slider` (`accent-color`), `Input`/
`Textarea` (focus ring, via `--_ring`).

### 5.3 Which components accept `variant`, and what it does

| Component                       | Mechanism      | Default   | What it colors                                |
| ------------------------------- | -------------- | --------- | --------------------------------------------- |
| `Button`                        | cva            | `default` | background + text                             |
| `Badge`                         | `--_color`     | `default` | soft/solid/outline/dot fill                   |
| `Input` / `Textarea`            | `--_ring`      | `primary` | focus border + ring                           |
| `Select`                        | `--_ring`      | `primary` | focus border + ring                           |
| `Switch`                        | `--_color`     | `primary` | checked-state fill                            |
| `Checkbox` / `Radio` / `Slider` | `accent-color` | `primary` | native accent                                 |
| `Card`                          | `--_color`     | `primary` | `:has()` hover glow (only when `interactive`) |
| `Tabs`                          | `--_color`     | `primary` | active tab underline                          |
| `Alert`                         | cva            | `default` | tinted background + icon                      |
| `Toast` (`toast()` options)     | icon/color map | `default` | icon + accent                                 |

`Accordion`, `Dialog`, `Carousel`, `Popover`, `Tooltip` have no color
variant — they're structural/overlay components without an inherent
semantic color.

### 5.4 Adding a 7th variant (or renaming one)

1. Add the CSS variable pair to `:root` and `html[data-theme="light"]`
   in `globals.css` (e.g. `--info` / `--info-foreground`).
2. Add it to `@theme inline` so `bg-info`/`text-info-foreground`
   Tailwind classes exist.
3. Add the key to `ColorVariant` in `lib/colorVariant.ts` and to the
   `colorVar()` map.
4. Add the corresponding branch to every `*.variants.ts` file's
   `variant` map (`Button.variants.ts`, `Badge` doesn't need this since
   it's `--_color`-driven, `Alert.variants.ts`).
5. Add the icon/color-map entry in `Alert.tsx` and `Toast.tsx` if you
   want it to have a distinct icon.

---

## 6. Component reference

Each entry lists the props beyond standard HTML attributes for that
element, plus the sub-components in a compound family.

### Button

```tsx
<Button
  variant="primary"
  size="default"
>
  save
</Button>
```

| Prop      | Type                                  | Default     | Notes                                                                                                |
| --------- | ------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `variant` | `ColorVariant \| "ghost" \| "link"`   | `"default"` | `ghost`/`link` are extras beyond the 6-variant system, matching the source design's "subtle" buttons |
| `size`    | `"sm" \| "default" \| "lg" \| "icon"` | `"default"` |                                                                                                      |
| `loading` | `boolean`                             | `false`     | swaps label for a CSS spinner, sets `aria-busy`, disables the button                                 |
| `tooltip` | `string`                              | —           | adds the CSS-only `.tooltip` bubble via `data-tooltip`                                               |

### Badge

```tsx
<Badge
  variant="secondary"
  appearance="soft"
  dot
>
  active
</Badge>
```

| Prop         | Type                             | Default     |
| ------------ | -------------------------------- | ----------- |
| `variant`    | `ColorVariant`                   | `"default"` |
| `appearance` | `"soft" \| "solid" \| "outline"` | `"soft"`    |
| `dot`        | `boolean`                        | `false`     |

### Input

```tsx
<Input
  variant="primary"
  leadingIcon={<Search />}
  placeholder="search..."
/>
```

| Prop               | Type           | Default                                              |
| ------------------ | -------------- | ---------------------------------------------------- |
| `variant`          | `ColorVariant` | `"primary"` — focus ring color                       |
| `leadingIcon`      | `ReactNode`    | —                                                    |
| `trailingAction`   | `ReactNode`    | —                                                    |
| `expandable`       | `boolean`      | `false` — grows from 200px→320px on focus (CSS only) |
| `wrapperClassName` | `string`       | — class for the outer `.input-wrapper` div           |

### Textarea

| Prop       | Type           | Default                               |
| ---------- | -------------- | ------------------------------------- |
| `variant`  | `ColorVariant` | `"primary"`                           |
| `autoGrow` | `boolean`      | `true` — uses `field-sizing: content` |

### Select

```tsx
<Select
  variant="primary"
  placeholder="choose a category..."
>
  <option value="generative">generative</option>
  <option value="shader">shader</option>
</Select>
```

| Prop               | Type                        | Default                                       |
| ------------------ | --------------------------- | --------------------------------------------- |
| `variant`          | `ColorVariant`              | `"primary"` — focus ring color                |
| `size`             | `"sm" \| "default" \| "lg"` | `"default"`                                   |
| `leadingIcon`      | `ReactNode`                 | —                                             |
| `placeholder`      | `string`                    | — renders a disabled, hidden first `<option>` |
| `wrapperClassName` | `string`                    | — class for the outer `.input-wrapper` div    |

A native `<select>` styled to match `Input`/`Textarea` — children are
plain `<option>`/`<optgroup>` elements. The browser supplies the picker
UI (native wheel/sheet on touch, native dropdown on desktop), keyboard
support, and type-ahead search for free. Pass `value`/`defaultValue`/
`onChange` exactly as on a plain `<select>`.

### Checkbox / Radio / Switch

Same shape for all three:

| Prop      | Type           | Default                                                 |
| --------- | -------------- | ------------------------------------------------------- |
| `variant` | `ColorVariant` | `"primary"`                                             |
| `label`   | `ReactNode`    | — wraps input + label text in a `<label>` when provided |

All three are native inputs (`type="checkbox"`, `type="radio"`, and a
restyled `type="checkbox"` for `Switch`) — pass `checked`/`defaultChecked`/
`onChange` exactly as you would on a plain `<input>`.

### Slider

| Prop        | Type           | Default                                             |
| ----------- | -------------- | --------------------------------------------------- |
| `variant`   | `ColorVariant` | `"primary"`                                         |
| `showTicks` | `boolean`      | `true` — renders min/mid/max labels below the track |

### Card family

```tsx
<Card
  interactive
  variant="accent"
>
  <CardImage src="..." />
  <CardBody>
    <Badge variant="accent">color</Badge>
    <CardTitle>oklch palette generator</CardTitle>
    <CardDescription>harmonious palettes...</CardDescription>
  </CardBody>
  <CardActions>
    <Button
      variant="ghost"
      size="icon"
    >
      <Bookmark />
    </Button>
  </CardActions>
</Card>
```

| Component                                                                   | Prop                                   | Notes                                                     |
| --------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `Card`                                                                      | `interactive?: boolean`                | enables the `:has()` glow when `.card-actions` is hovered |
| `Card`                                                                      | `variant?: ColorVariant` (`"primary"`) | glow color, only matters if `interactive`                 |
| `Card`                                                                      | `horizontal?: boolean`                 | `grid-cols-1 landscape:grid-cols-[200px_1fr]`             |
| `CardImage`                                                                 | (all `<img>` props)                    | defaults `alt=""`, `aspect-video`                         |
| `CardBody` / `CardTitle` / `CardDescription` / `CardFooter` / `CardActions` | —                                      | layout-only wrappers, no props beyond `HTMLAttributes`    |

### Accordion / AccordionItem

```tsx
<Accordion>
  <AccordionItem
    title="what makes this different?"
    open
  >
    ...
  </AccordionItem>
  <AccordionItem title="why gruvbox?">...</AccordionItem>
</Accordion>
```

`AccordionItem` is a native `<details>`; pass `open` (uncontrolled
default) or manage it yourself with `open`/`onToggle` like any
`<details>` element. `Accordion` is just a `flex flex-col gap-2` wrapper.

### Tabs

```tsx
const tabs = useTabsState('overview');
<Tabs
  value={tabs.value}
  onValueChange={tabs.setValue}
  variant="primary"
>
  <TabsList>
    <TabsTrigger value="overview">overview</TabsTrigger>
    <TabsTrigger value="features">features</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="features">...</TabsContent>
</Tabs>;
```

`Tabs` is **fully controlled** — `value` and `onValueChange` are
required, there is no internal state. Use `useTabsState(defaultValue)`
for the classic "just give me a default" ergonomics without putting
state inside the component tree.

| Component     | Props                                                            |
| ------------- | ---------------------------------------------------------------- |
| `Tabs`        | `value`, `onValueChange`, `variant?: ColorVariant` (`"primary"`) |
| `TabsTrigger` | `value: string`                                                  |
| `TabsContent` | `value: string`                                                  |

Built on visually-hidden radio inputs sharing one `useId()`-generated
`name`, so it's a real, form-participating radio group under the hood.

### Carousel / CarouselSlide

```tsx
<Carousel scrollAmount={280}>
  <CarouselSlide>...</CarouselSlide>
  <CarouselSlide>...</CarouselSlide>
</Carousel>
```

| Prop           | Type      | Default                             |
| -------------- | --------- | ----------------------------------- |
| `scrollAmount` | `number`  | `280` — px scrolled per arrow click |
| `hideArrows`   | `boolean` | `false`                             |

Scrolling is `overflow-x: scroll` + `scroll-snap-type: x mandatory`
(CSS); the arrow buttons just call `trackRef.current.scrollBy(...)`.
Touch users can swipe without any JS at all.

### Popover

```tsx
<Popover
  trigger={<Button variant="primary">profile</Button>}
  widthClassName="w-60"
  align="center"
>
  <p>...</p>
</Popover>
```

| Prop             | Type                 | Default    |
| ---------------- | -------------------- | ---------- |
| `trigger`        | `ReactNode`          | required   |
| `widthClassName` | `string`             | `"w-60"`   |
| `align`          | `"left" \| "center"` | `"center"` |

Hover/focus-triggered via Tailwind `group`/`group-hover` +
`group-focus-within` — no JS, no positioning library, no portal.

### Tooltip

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

Clones its single child element, adding the `.tooltip` class and a
`data-tooltip` attribute. The bubble itself is a CSS `::after` — works
on any element, no portal, no measurement.

### Dialog

```tsx
const dialogRef = useRef<DialogHandle>(null);

<Button onClick={() => dialogRef.current?.open()}>open</Button>
<Dialog ref={dialogRef} onClose={() => console.log("closed")}>
  <DialogBody>
    <DialogTitle>confirm action</DialogTitle>
    <DialogDescription>are you sure?</DialogDescription>
  </DialogBody>
  <DialogActions dialogRef={dialogRef} variant="destructive" confirmLabel="delete" onConfirm={handleDelete} />
</Dialog>
```

| Export                                                              | Purpose                                                                     |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `Dialog`                                                            | wraps native `<dialog>`; `ref` exposes `{ open(), close() }`                |
| `DialogBody` / `DialogTitle` / `DialogDescription` / `DialogFooter` | layout wrappers                                                             |
| `DialogActions`                                                     | convenience footer — cancel + confirm buttons wired to a `DialogHandle` ref |

Focus trapping, Esc-to-close, and the `::backdrop` blur are all native
`<dialog>` behavior — nothing to reimplement.

### Alert

```tsx
<Alert
  variant="warning"
  title="unsaved changes"
  description="may be lost."
/>
```

| Prop          | Type           | Default                                  |
| ------------- | -------------- | ---------------------------------------- |
| `variant`     | `ColorVariant` | `"default"`                              |
| `title`       | `ReactNode`    | required                                 |
| `description` | `ReactNode`    | —                                        |
| `icon`        | `ReactNode`    | — overrides the per-variant default icon |

### Toast

```tsx
const { toast } = useToast();
toast({ variant: 'destructive', title: 'failed', description: 'upload exceeded limit.' });
```

| Export            | Purpose                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `useToastQueue()` | the state hook — owns the toast array, id counter, timers                                 |
| `ToastProvider`   | stateless — takes `toasts`/`toast`/`dismiss` from the hook, provides `useToast()` context |
| `ToastViewport`   | stateless — pure `(toasts, onDismiss) => JSX`, portaled to `document.body`                |
| `useToast()`      | consumer hook: `{ toast(options), dismiss(id) }`                                          |

`ToastOptions`: `{ title, description?, variant?: ColorVariant, duration?: number }`
(`duration` defaults to `4000`ms; `0` disables auto-dismiss).

---

## 7. Progressive enhancement checklist

When you touch or extend a component, verify:

- [ ] Base (mobile) styles have no breakpoint prefix and are fully
      functional on their own.
- [ ] `landscape:`/`sm:` classes only _add_ — removing them should
      degrade gracefully, never break layout or hide content.
- [ ] If the browser has a native element for this (checkbox, radio,
      range, details, dialog), you're using it — not reimplementing it
      with `role` + `aria-*` + custom key handlers.
- [ ] `:has()`, `:focus-within`, `@starting-style`, `color-mix()` stay
      in `globals.css`. React only ever toggles attributes (`open`,
      `checked`, `data-active`, `--_color`) on top of them.
- [ ] `prefers-reduced-motion` is respected (handled globally in
      `globals.css` — don't add animations that bypass it).

---

## 8. Accessibility notes

- `Button` sets `aria-busy` and `disabled` while `loading`.
- `Switch` sets `role="switch"` on the underlying checkbox.
- `Carousel` arrow buttons have explicit `aria-label`s; the track itself
  is native scroll, so screen readers/keyboard users can also just tab
  through slide content.
- `Tabs` uses a real radio group (shared `name`, native `checked`), so
  arrow-key navigation between triggers is native browser behavior.
- `Dialog` inherits native `<dialog>` focus-trap and `Esc`-to-close.
- `Toast` items render with `role="status"`; the dismiss button always
  has an `aria-label`.
- Always pass your own `aria-label` on icon-only `Button`s (`size="icon"`)
  — the library can't infer one from an icon alone.

---

## 9. Conventions for contributing a new component

1. **File name**: `ComponentName.tsx` in `src/components/`. If it needs
   `cva`, add `ComponentName.variants.ts` beside it.
2. **No `forwardRef`.** Add `ref?: Ref<TElement>` to the props type,
   destructure and forward it.
3. **No `useState`/`useReducer` inside the component.** If it needs
   memory, write `useComponentNameState()` in `src/hooks/` and accept
   the resulting values as props (controlled component).
4. **Color, if any**, uses the shared `ColorVariant` type from
   `lib/colorVariant.ts` — don't invent a parallel color enum. Decide
   between the `cva` pattern (§5.1) and the `--_color` pattern (§5.2)
   based on whether one or several CSS properties change.
5. **Mobile-first.** Write the no-prefix styles as the complete
   experience first; add `landscape:`/`sm:` only for genuine
   enhancements.
6. **Prefer the platform.** Before writing interaction logic, check
   whether a native element (`<details>`, `<dialog>`, `<input>` types,
   `popover` attribute) already does it.
7. **Export from `index.ts`**: the component, its props type, its
   variants export (if any), and its state hook (if any) — following
   the existing grouping/comment style in that file.
8. **Update this document** — add a row to §5.3 if it takes `variant`,
   and an entry to §6.
