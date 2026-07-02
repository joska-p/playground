# Migration Decisions

> Progressive discussion log.
> Core constraints: Gruvbox + oklch tokens, CVA + `cn()` for variants, composition-first APIs.

---

## Decision 1: Shadows ✓

**Verdict:** Subtle depth with shadows. The polished `drafts/index.html` is the reference, not the speculative `prompt.md`.

**Implementation:** Simplified shadow variables in `gruvbox-theme.css`:
- Single-layer shadows (replaced multi-layer stack)
- Dark: 0 1px 3px / 4px 12px / 8px 24px at 0.3 / 0.4 / 0.5 opacity
- Light: same offsets using foreground-tinted black at 0.06 / 0.08 / 0.12
- Extended gradient for xs/xl/2xl at proportional opacities

---

## Decision 2: Token Naming ✓

**Verdict:** Keep shadcn/Tailwind naming convention (modifier-first) for existing tokens. Add new tokens for the draft. Rename utilities to meaningful names.

**Rules:**
- **Keep all existing shadcn-standard names:** `--background`, `--foreground`, `--card`, `--card-foreground`, `--muted`, `--muted-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, `--radius`, `--shadow-*`, `--font-*`
- **Add (new):** `--surface`, `--surface-raised`, `--foreground-dim` — companions alongside `--card` and `--muted-foreground`
- **Add (new):** `--warning`, `--warning-foreground` — new semantic color for Alert component
- **Rename:** `--utility-1` → `--green`, `--utility-2` → `--purple`, `--utility-3` → `--orange`* etc. Keep `--category-*` aliases mapped to these new names
- **Theme compatible:** A consumer relying on standard shadcn names (`--card`, `--muted-foreground`) still works. The new tokens are additive.

*\*Exact color-name mapping TBD — needs to align draft's raw colors with the 8 utility slots and 8 category aliases.*

---

## Decision 3: Typography Scale ✓

**Verdict:** Tailwind v4 scale only. No arbitrary `text-[13px]`.

Text that was 13px in the draft maps to `text-sm` (14px in TW v4). Text that was 11px maps to `text-xs` (12px). The slight size difference is imperceptible in context and the consistency is worth more than pixel-perfect fidelity to a static mockup.

| Draft | Tailwind |
|---|---|
| 11px (tooltips, metadata badges) | `text-xs` (12px) |
| 13px (body, buttons) | `text-sm` (14px) |
| 14px (card titles) | `text-sm font-medium` |
| clamp(24px, 3.5vw, 32px) (section h2) | `text-2xl` or `text-3xl` per context |

---

## Decision 4: Badge Architecture ✓

**Verdict:** CVA for the 4 visual modes (soft/solid/outline/dot). `color` prop sets `--_color` CSS variable via inline style. `cn()` composes them on the root element.

The color is treated as data, not a variant — no CVA entry needed per color. Any theme color works. The CVA only encodes the backdrop treatment (soft tint, solid fill, outline border, dot indicator).

```tsx
// badgeVariants handles: soft | solid | outline | dot
// color prop handles: any theme color → --_color
<Badge variant="soft" color="green">generative</Badge>
<Badge variant="solid" color="purple">color</Badge>
```

---

## Decision 5: Button Variant Set ✓

**Current variants:** primary, secondary, accent, destructive, outline, ghost
**Draft variants:** primary, secondary, accent, destructive, warning, ghost, link

The draft adds `warning` and `link`, drops `outline`. The interaction model also changes — `hover:brightness-110 active:scale-[.97]` replaces per-variant `hover:bg-X/80`.

**Proposal — adopt the draft set:**
- **Add** `warning` and `link` variants
- **Drop** `outline` (not in the draft design)
- **Keep** `ghost` with draft's visual (no border, no bg by default, `hover:bg-surface-raised`)
- **Move interaction to base:** `hover:brightness-110 active:scale-[.97]` shared by all solid variants
- **Disabled to base:** `disabled:pointer-events-none disabled:opacity-40`

---

## Decision 6: Button Sizes ✓

**Verdict:** Three sizes, Tailwind naming (sm/md/lg), padding-based.

| Size | Classes |
|---|---|
| sm | `px-3 py-1.5 text-xs` |
| md (default) | `px-4 py-2 text-sm` |
| lg | `px-6 py-3 text-sm` |

No `icon` size. Icon-only buttons use `md` with tighter horizontal padding.

---

## Decision 7: Switch (Toggle) ✓

**Verdict:** Pure CSS checkbox (`<input type="checkbox">` with `appearance: none`). Still uses CVA + cn() for visual variants and sizes.

```tsx
// variants: primary (default) | secondary | accent | destructive
// sizes: sm | md (default) | lg
<Switch variant="primary" size="md" />
```

---

## Decision 8: Card Structure ✓

**Verdict:** Single `Card` wrapper (CVA for shell styles). No sub-components. Consumers compose internal layout.

```tsx
<Card className="...">
  <img src="..." />
  <div className="p-4">
    <Badge variant="soft" color="green">generative</Badge>
    <p className="text-sm font-medium">title</p>
  </div>
</Card>
```

---

## Decision 9: Accordion ✓

**Verdict:** Compound component — `Accordion` (container) + `Accordion.Item` (details/summary pair). Chevron pseudo-element, marker removal, and `@starting-style` animation all baked into `Accordion.Item` via CVA + CSS.

```tsx
<Accordion>
  <Accordion.Item title="what makes this different?" defaultOpen>
    <p>content...</p>
  </Accordion.Item>
  <Accordion.Item title="why gruvbox?">
    <p>content...</p>
  </Accordion.Item>
</Accordion>
```

---

## Decision 10: Tabs ✓

**Verdict:** CSS-only radio pattern, identical to the draft. React generates IDs at build time → Astro serializes to static HTML → `:has()` selectors work with zero runtime JS.

Compound component:
- `Tabs` — container, accepts `tabs` array of `{ label, content }`, generates radio inputs + labels + panels
- Underline indicator + panel fade via CSS (same as draft's `.tab-trigger::after` + `@starting-style`)

---

## Decision 11: Dialog ✓

**Verdict:** Pure HTML Invoker Commands API (`command="show-modal"` / `command="close"`). No JS, no `useRef`. Component is just a styled `<dialog>` with CVA + `::backdrop` + `@starting-style` animation.

```tsx
<Dialog id="my-dialog">
  <h3>confirm action</h3>
  <p>are you sure?</p>
  <div className="flex justify-end gap-2">
    <Button commandfor="my-dialog" command="close">cancel</Button>
    <Button commandfor="my-dialog" command="close">confirm</Button>
  </div>
</Dialog>

<!-- trigger lives anywhere -->
<Button command="show-modal" commandfor="my-dialog">open</Button>
```

---

## Decision 12: Popover ✓

**Verdict:** Thin composition helper. No state management, no click logic. `Popover.Trigger` + `Popover.Content` wrap the positioning/animation classes. Consumer decides hover vs. click.

```tsx
<Popover>
  <Popover.Trigger><Button>profile</Button></Popover.Trigger>
  <Popover.Content>
    <p>content...</p>
  </Popover.Content>
</Popover>
```

---

## Decision 13: Toast ✓

**Verdict:** Imperative `useToast()` hook. `ToastContainer` is rendered once (in layout), accepts `useToast` calls via context.

```tsx
// layout:
<ToastContainer />

// anywhere:
const toast = useToast();
toast.info("saved", "work saved to disk.");
toast.success("deployed", "project is live.");
toast.error("failed", "upload exceeded limit.");
```

Types: info (primary), success (secondary), error (destructive). 4s auto-dismiss. Stack in bottom-right.

---

## Decision 14: Carousel ✓

**Verdict:** Compound — `Carousel` (scrollable track + arrow buttons) + `Carousel.Slide` (consistent width/sizing via CVA).

```tsx
<Carousel aria-label="projects">
  <Carousel.Slide>
    <img src="..." />
    <div className="p-3">
      <Badge variant="soft" color="green">generative</Badge>
      <p className="text-sm font-medium">noise landscapes</p>
    </div>
  </Carousel.Slide>
  <Carousel.Slide>...</Carousel.Slide>
</Carousel>
```

---

## Decision 15: Input ✓

**Verdict:** Draft's wrapper pattern for visuals, keep 6 variants (now drive focus-ring color + wrapper bg shade), content-based padding (no fixed `h-10`).

**Visual structure:**
```
<div className="flex flex-col gap-1.5">          ← outer wrapper (label + input + helper)
  <label ... />
  <div className="input-wrapper flex items-center gap-2 rounded-md px-3">  ← bg-surface, no border
    {icon}
    <input className="w-full bg-transparent py-2 outline-none" />
  </div>
  <HelperText ... />
</div>
```

- **Wrapper:** `bg-surface` (variant drives subtle tint), rounded-md, px-3, no border
- **Focus:** `focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_15%,transparent)]`
- **Input:** `bg-transparent w-full py-2 outline-none`, placeholder: `text-foreground-dim`
- **Icons:** Flex layout (not absolute positioning) — same as draft's `flex items-center gap-2`
- **Variants preserve:** primary/secondary/accent/destructive/outline/ghost — but now the variant controls the wrapper's border tint vs bg tint, and the focus ring color

---

## Decision 16: Select ✓

**Verdict:** Same wrapper pattern as Input. Flex layout for chevron icon. Same 6 variants.

```
<div className="flex flex-col gap-1.5">
  <label ... />
  <div className="flex items-center gap-2 rounded-md px-3 bg-surface">
    <select className="w-full bg-transparent py-2 outline-none appearance-none">
      {children}
    </select>
    <IconChevronDown className="text-foreground-dim shrink-0 size-4" />
  </div>
  <HelperText ... />
</div>
```

- Same visual rules as Input (wrapper pattern, focus ring, variants)
- Chevron in flex layout (not absolute positioning)
- `appearance-none` on native select for consistent styling

---

## Decision 17: Slider ✓

**Verdict:** Range input only — consumers compose their own labels, values, and helper text. 6 variants drive the `accent-*` color.

```
<input type="range" className="... accent-primary h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none" />
```

- **Variants** (6): primary/secondary/accent/destructive/outline/ghost — applies `accent-{variant}` class
- **Base styles:** `h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none`
- **Track background:** left side of thumb inherits accent color via CSS (native range styling)
- **No built-in labels, value display, or helperText** — consumers compose these

---

## Decision 18: Checkbox & Radio ✓

**Verdict:** Thin components — just the `<input>` element. Consumers compose labels. 6 variants drive accent color. 3 sizes.

```tsx
// Input-only component:
<Checkbox variant="primary" size="md" />

<label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
  <Checkbox variant="primary" />
  generative
</label>
```

**Checkbox base:** `appearance-none h-4 w-4 shrink-0 cursor-pointer rounded border border-border bg-surface checked:bg-(--accent-color) checked:border-(--accent-color)`
**Radio base:** same but `rounded-full` instead of `rounded`

| Size | Classes |
|---|---|
| sm | `h-3.5 w-3.5` |
| md (default) | `h-4 w-4` |
| lg | `h-5 w-5` |

- **Variants** (6): primary/secondary/accent/destructive/outline/ghost — drives `--accent-color` CSS variable
- **Composition:** consumer provides `<label>` wrapper + text. No built-in label prop.
- **Checkmark/dot rendered** via CSS pseudo-element on `:checked`

---

## Decision 19: Textarea ✓

**Verdict:** Same wrapper pattern as Input — bg-surface wrapper, focus ring, 6 variants. Auto-growing via `field-sizing:content`. Content-based padding (p-3).

```tsx
<div className="flex flex-col gap-1.5">
  <label ... />
  <div className="flex rounded-md px-3 bg-surface focus-within:shadow-[0_0_0_3px_color-mix(...)]">
    <textarea className="w-full bg-transparent p-3 outline-none field-sizing-content min-h-[3lh] max-h-[15lh] resize-y" />
  </div>
  <HelperText ... />
</div>
```

- Same visual rules as Input (wrapper, focus ring, 6 variants)
- `field-sizing:content` for auto-grow (Chrome 128+, standard)
- `min-h-[3lh]` / `max-h-[15lh]` from draft
- `resize-y` for manual override

---

## Decision 20: Alert ✓

**Verdict:** Composition-based compound component. 4 variants (info/success/warning/error) with built-in icons. Variant-colored bg at `/8` opacity + matching icon color.

```tsx
<Alert variant="info">
  <Alert.Icon />
  <div>
    <Alert.Title>info</Alert.Title>
    <Alert.Description>project updated with latest changes.</Alert.Description>
  </div>
</Alert>
```

| Variant | Icon | bg class |
|---|---|---|
| info (default) | circle-info | `bg-primary/8` |
| success | circle-check | `bg-secondary/8` |
| warning | triangle-exclamation | `bg-warning/8` |
| error | circle-xmark | `bg-destructive/8` |

- **Base:** `rounded-lg px-4 py-3 flex items-start gap-3`
- **Icon:** `mt-0.5 text-xs shrink-0` (color matches variant)
- **Title:** `text-sm font-medium` (color: `text-foreground`)
- **Description:** `text-xs mt-0.5` (color: `text-foreground-muted`)

---

## Decision 21: HelperText & Label ✓

**Verdict:** Keep both as separate exports. Restyle to match new design.

**HelperText:**
- **Base:** `text-xs`, italic removed
- **Default color:** `text-foreground-muted`
- **Destructive:** `text-destructive`
- Removed italic style

**Label:**
- **Base:** `text-sm font-medium` (was `font-semibold`)
- No other changes — thin wrapper around `<label>` element

---

## Decision 22: Tooltip ✓

**Verdict:** Thin wrapper component. Hover-triggered, renders content via `::after` pseudo-element. Color variants for visual theming. Default position: top.

```tsx
<Tooltip content="settings" variant="default">
  <Button><Icon name="gear" /></Button>
</Tooltip>
```

| Variant | bg / text |
|---|---|
| default | `bg-foreground text-background` |
| primary | `bg-primary text-primary-foreground` |
| destructive | `bg-destructive text-destructive-foreground` |

- **Trigger:** `position:relative` (on wrapper)
- **Content:** `::after` pseudo-element with `content:attr(data-content)`, positioned above
- **Animation:** `opacity 0.15s`, `pointer-events:none` → `pointer-events:auto` on hover
- **Sizing:** `text-xs`, `px-2.5 py-1`, `rounded`, `whitespace-nowrap`
- **Position (default):** `bottom:calc(100% + 8px); left:50%; transform:translateX(-50%)`

---

## Decision 23: ErrorBoundary ✓

**Verdict:** Restyle DefaultFallback visuals to match new design. Drop `variant` prop from ErrorBoundary — the fallback has its own visual identity now.

- **API change:** `<ErrorBoundary>` no longer accepts `variant`. Consumers who want custom fallbacks use `fallbackRender` directly.
- **DefaultFallback restyle:** Card uses `bg-surface`, `rounded-lg`, `shadow-sm`. Icon circle uses `bg-destructive/10` + `text-destructive`. Button uses `variant="destructive" size="sm"`.

---

## Decision 24: ColorPalette ✓

**Verdict:** Restyle visuals to match new design. Keep existing API + CVA structure.

- Updated colors, spacing, and shadows to match the new design language
- Same `orientation` / `size` / `variant` CVA props
- No API changes

---

## Decision 25: Sidebar ✓

**Verdict:** Excluded from the refactor. Keep as-is. It's a specialized widget, not a core component.

---

## Remaining: ControlPanel

**Verdict:** Excluded per user instruction. No changes.

**Verdict:** Thin wrapper component. Hover-triggered, renders content via `::after` pseudo-element. Color variants for visual theming. Default position: top.

```tsx
<Tooltip content="settings" variant="default">
  <Button><Icon name="gear" /></Button>
</Tooltip>
```

| Variant | bg / text |
|---|---|
| default | `bg-foreground text-background` |
| primary | `bg-primary text-primary-foreground` |
| destructive | `bg-destructive text-destructive-foreground` |

- **Trigger:** `position:relative` (on wrapper)
- **Content:** `::after` pseudo-element with `content:attr(data-content)`, positioned above
- **Animation:** `opacity 0.15s`, `pointer-events:none` → `pointer-events:auto` on hover
- **Sizing:** `text-xs`, `px-2.5 py-1`, `rounded`, `whitespace-nowrap`
- **Position (default):** `bottom:calc(100% + 8px); left:50%; transform:translateX(-50%)`

**Verdict:** Same wrapper pattern as Input — bg-surface wrapper, focus ring, 6 variants. Auto-growing via `field-sizing:content`. Content-based padding (p-3).

```tsx
<div className="flex flex-col gap-1.5">
  <label ... />
  <div className="flex rounded-md px-3 bg-surface focus-within:shadow-[0_0_0_3px_color-mix(...)]">
    <textarea className="w-full bg-transparent p-3 outline-none field-sizing-content min-h-[3lh] max-h-[15lh] resize-y" />
  </div>
  <HelperText ... />
</div>
```

- Same visual rules as Input (wrapper, focus ring, 6 variants)
- `field-sizing:content` for auto-grow (Chrome 128+, standard)
- `min-h-[3lh]` / `max-h-[15lh]` from draft
- `resize-y` for manual override

**Verdict:** Thin components — just the `<input>` element. Consumers compose labels. 6 variants drive accent color. 3 sizes.

```tsx
// Input-only component:
<Checkbox variant="primary" size="md" />

<label className="flex cursor-pointer items-center gap-2.5 text-sm select-none">
  <Checkbox variant="primary" />
  generative
</label>
```

**Checkbox base:** `appearance-none h-4 w-4 shrink-0 cursor-pointer rounded border border-border bg-surface checked:bg-(--accent-color) checked:border-(--accent-color)`
**Radio base:** same but `rounded-full` instead of `rounded`

| Size | Classes |
|---|---|
| sm | `h-3.5 w-3.5` |
| md (default) | `h-4 w-4` |
| lg | `h-5 w-5` |

- **Variants** (6): primary/secondary/accent/destructive/outline/ghost — drives `--accent-color` CSS variable
- **Composition:** consumer provides `<label>` wrapper + text. No built-in label prop.
- **Checkmark/dot rendered** via CSS pseudo-element on `:checked`

**Verdict:** Range input only — consumers compose their own labels, values, and helper text. 6 variants drive the `accent-*` color.

```
<input type="range" className="... accent-primary h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none" />
```

- **Variants** (6): primary/secondary/accent/destructive/outline/ghost — applies `accent-{variant}` class
- **Base styles:** `h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none`
- **Track background:** left side of thumb inherits accent color via CSS (native range styling)
- **No built-in labels, value display, or helperText** — consumers compose these

**Verdict:** Same wrapper pattern as Input. Flex layout for chevron icon. Same 6 variants.

```
<div className="flex flex-col gap-1.5">
  <label ... />
  <div className="flex items-center gap-2 rounded-md px-3 bg-surface">
    <select className="w-full bg-transparent py-2 outline-none appearance-none">
      {children}
    </select>
    <IconChevronDown className="text-foreground-dim shrink-0 size-4" />
  </div>
  <HelperText ... />
</div>
```

- Same visual rules as Input (wrapper pattern, focus ring, variants)
- Chevron in flex layout (not absolute positioning)
- `appearance-none` on native select for consistent styling

**Verdict:** Draft's wrapper pattern for visuals, keep 6 variants (now drive focus-ring color + wrapper bg shade), content-based padding (no fixed `h-10`).

**Visual structure:**
```
<div className="flex flex-col gap-1.5">          ← outer wrapper (label + input + helper)
  <label ... />
  <div className="input-wrapper flex items-center gap-2 rounded-md px-3">  ← bg-surface, no border
    {icon}
    <input className="w-full bg-transparent py-2 outline-none" />
  </div>
  <HelperText ... />
</div>
```

- **Wrapper:** `bg-surface` (variant drives subtle tint), rounded-md, px-3, no border
- **Focus:** `focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_15%,transparent)]`
- **Input:** `bg-transparent w-full py-2 outline-none`, placeholder: `text-foreground-dim`
- **Icons:** Flex layout (not absolute positioning) — same as draft's `flex items-center gap-2`
- **Variants preserve:** primary/secondary/accent/destructive/outline/ghost — but now the variant controls the wrapper's border tint vs bg tint, and the focus ring color

---

