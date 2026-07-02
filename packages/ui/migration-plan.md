# UI Library Migration Plan

> Comparing the current `@repo/ui` library with the new design in `src/drafts/index.html`.
> Excluded: `control-panel` (widget and all its sub-controls).

---

## 1. Design Philosophy Comparison

| Aspect | Current Library | New Draft (`drafts/index.html`) |
|---|---|---|
| **Typography** | Mixed font stacks (sans/mono/serif) | **JetBrains Mono** only — single voice |
| **Theme** | Oklch-based Gruvbox (oklch values) | CSS-variable-based Gruvbox (`--background: #1d2021`, etc.) |
| **Surfaces** | Borders, shadows, opacity | **Flat surfaces** separated by spacing/color, subtle shadows, no visible borders on cards |
| **Buttons** | `hover:bg-X/80` fade transitions | `hover:brightness-110 active:scale-[.97]` — tactile snap |
| **Badges** | CVA variants (primary/secondary/accent/outline/ghost) | CSS variable `--_color` drives soft/solid/outline/dot — one pattern, any color |
| **Form inputs** | Label + input + helper + icon pattern | Simpler wrapper with `:focus-within` glow, expanding search, auto-growing textarea |
| **Switch** | `<button role="switch">` with JS state | Pure CSS `.toggle` via `appearance:none` on checkbox |
| **Card interaction** | `interactive` prop → cursor-pointer | `:has()` glow on child hover (`card-interactive:has(.card-actions:hover)`) |
| **Tabs** | (not implemented) | CSS-only via hidden radio + `:has()` |
| **Accordion** | (not implemented) | Native `<details>` + `@starting-style` animation |
| **Toasts** | (not implemented) | JS-driven with CSS animation |
| **Dialog** | (not implemented) | Native `<dialog>` + `@starting-style` |
| **Popover** | (not implemented) | CSS-only hover groups |

---

## 2. Components — What to Keep, Drop, or Add

### 🔵 Keep & Refactor (existing components to redesign)

| Component | Status | Changes Needed |
|---|---|---|
| `Button` | **Refactor** | New variant set: primary, secondary, destructive, accent, warning, ghost, link. Sizes: sm/default/lg (drop icon size). Add `active:scale-[.97]`, `hover:brightness-110`. Loading state with spinner. Tooltip support. |
| `Badge` | **Rewrite** | Drop CVA-based variants. Use `--_color` CSS variable approach. Four modes: soft, solid, outline, dot. Accept any color from theme. |
| `Card` | **Refactor** | Simpler structure. No borders. Shadow-based separation. Support `interactive` with `:has()` glow. Sub-components: Card.Image, Card.Content, Card.Footer, Card.Actions. Responsive grid. |
| `Input` | **Refactor** | Update to new input-wrapper pattern with `:focus-within:border-color-primary`. Support startIcon, endIcon, loading, expanding variant, trailing action. Auto-growing textarea. |
| `Select` | **Refactor** | Restyle to match draft aesthetic. Keep existing API surface. |
| `Slider` | **Refactor** | Restyle range input with accent-primary. Keep label + value + unit pattern (aligns with draft docs). |
| `Switch` / `Toggle` | **Rewrite** | CSS-only toggle via `appearance:none` checkbox. Remove JS button pattern. |
| `Label` | **Refactor** | Keep simple, restyle to JetBrains Mono. |
| `HelperText` | **Refactor** | Keep as shared utility. Restyle to new type scale. |
| `ErrorBoundary` | **Keep** | Not design-related. Keep as-is. |
| `DefaultFallback` | **Keep** | Not design-related. Keep as-is. |
| `Icon` system | **Keep** | Already well-designed. No changes needed. |
| `Sidebar` | **Refactor** | Orientation-fluid grid (landscape/portrait), data-* attributes for state. Per draft/overview.md. |
| `ColorPalette` | **Refactor** | Update to new theme tokens. |
| `cn` | **Keep** | No changes. |
| `createVariant` | **Keep** | Still useful for shared base styles. |
| `styles.css` | **Update** | Replace with new Tailwind v4 theme from draft. |
| `gruvbox-theme.css` | **Update** | Replace with new CSS-variable-based palette (hex values from draft). |

### 🟢 Add (new components from draft)

| Component | Category | Implementation Notes |
|---|---|---|
| `Accordion` | Disclosure | Native `<details>`/`<summary>`. Accept `open` prop. CSS-only animation with `@starting-style`. |
| `Tabs` | Navigation | CSS-only via hidden radio inputs + `:has()`. Accept `tabs` array. Three-tab default. |
| `Alert` | Feedback | Status messages: info, success, warning, error. Colored left accent. Icon + title + description. |
| `Toast` / `ToastContainer` | Feedback | Notification system. CreatePortal. Slide-in animation. Auto-dismiss. Stack multiple. |
| `Dialog` | Overlay | Native `<dialog>` with `.showModal()`/`.close()`. Accept `onConfirm`/`onCancel`. |
| `Popover` | Overlay | CSS-only hover groups. Also a JS version for click. Three variants: profile, notifications, context menu. |
| `Carousel` | Layout | overflow-x:scroll with snap. Prev/next arrows. Accept `slides` array. |
| `FloatingNav` | Navigation | Fixed pill nav with backdrop-blur. Appears on scroll, hides after 1.5s idle. |

### 🔴 Drop (existing → not needed or replaced)

| Component | Reason |
|---|---|
| (none to drop outright) | All existing components map to a new version |

---

## 3. Proposed Directory Structure

```
src/
├── components/
│   ├── accordion/
│   │   ├── Accordion.tsx
│   │   └── accordionVariants.ts           # (if needed, otherwise inline)
│   ├── alert/
│   │   ├── Alert.tsx
│   │   └── alertVariants.ts
│   ├── badge/
│   │   ├── Badge.tsx
│   │   └── badgeVariants.ts
│   ├── button/
│   │   ├── Button.tsx
│   │   └── buttonVariants.ts
│   ├── card/
│   │   ├── Card.tsx
│   │   └── cardVariants.ts
│   ├── carousel/
│   │   ├── Carousel.tsx
│   │   └── carouselVariants.ts
│   ├── dialog/
│   │   ├── Dialog.tsx
│   │   └── dialogVariants.ts
│   ├── error-boundary/
│   │   ├── DefaultFallback.tsx
│   │   ├── defaultFallbackVariants.ts
│   │   └── ErrorBoundary.tsx
│   ├── floating-nav/
│   │   ├── FloatingNav.tsx
│   │   └── floatingNavVariants.ts
│   ├── helper-text/
│   │   └── HelperText.tsx
│   ├── icons/
│   │   ├── Icon.tsx
│   │   ├── iconMap.ts
│   │   ├── index.ts
│   │   ├── lib.tsx
│   │   └── components/                    # (33 individual icon files)
│   ├── input/
│   │   ├── Input.tsx
│   │   └── inputVariants.ts
│   ├── label/
│   │   └── Label.tsx
│   ├── popover/
│   │   ├── Popover.tsx
│   │   └── popoverVariants.ts
│   ├── select/
│   │   ├── Select.tsx
│   │   └── selectVariants.ts
│   ├── slider/
│   │   ├── Slider.tsx
│   │   └── sliderVariants.ts
│   ├── switch/
│   │   ├── Switch.tsx
│   │   └── switchVariants.ts
│   ├── tabs/
│   │   ├── Tabs.tsx
│   │   └── tabsVariants.ts
│   ├── toast/
│   │   ├── Toast.tsx
│   │   ├── ToastContainer.tsx
│   │   └── toastVariants.ts
│   ├── widgets/
│   │   ├── color-palette/
│   │   │   ├── ColorPalette.tsx
│   │   │   └── colorPaletteVariants.ts
│   │   ├── control-panel/                 # EXCLUDED from migration
│   │   │   ├── ControlPanel.tsx
│   │   │   ├── ControlSection.tsx
│   │   │   ├── PanelContent.tsx
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   ├── readme.md
│   │   │   └── controls/
│   │   └── sidebar/
│   │       ├── Sidebar.tsx
│   │       ├── SidebarContext.ts
│   │       ├── SidebarMain.tsx
│   │       ├── SidebarPanel.tsx
│   │       ├── SidebarToggle.tsx
│   │       ├── sidebar.module.css
│   │       └── useSidebarContext.ts
├── hooks/
│   └── useResizeObserver.ts
├── lib/
│   └── variants/
│       └── create-variant.ts
├── utils/
│   └── cn.ts
├── styles/
│   ├── gruvbox-theme.css                  # ← replace palette
│   └── styles.css                         # ← replace imports
```

---

## 4. Theme Token Mapping

The draft introduces new CSS variables that don't exist in the current theme:

| New Variable | Current Equivalent | Notes |
|---|---|---|
| `--surface` | n/a (new) | Card/surface background — replaces `--card` usage |
| `--surface-raised` | n/a (new) | Elevated surface for hover states |
| `--foreground-muted` | `--muted-foreground` | Secondary text |
| `--foreground-dim` | n/a (new) | Placeholder/disabled text |
| `--warning` / `--warning-foreground` | n/a (new) | New semantic color |
| `--red`, `--green`, `--yellow`, etc. | `--utility-1` through `--utility-8` | Raw gruvbox palette for badges |
| `--shadow-*` | Exists (oklch) | Replace with hex-based from draft |

The current theme uses **oklch** values; the draft uses **hex** values. The draft's hex values match the original Gruvbox palette more faithfully. Decision needed: use hex (draft) or keep oklch (current)?

---

## 5. Coding Convention Alignment

The draft docs (`draft/prompt.md`, `draft/overview.md`) enforce:

1. **React 19, no `forwardRef`** — already followed ✓
2. **TypeScript `type` only** — already followed ✓
3. **No barrel exports** (subpath exports in package.json) — already followed ✓
4. **`cn()` utility** — already followed ✓
5. **JetBrains Mono only** — need to update typography ✗
6. **No `shadow-*`** — conflicts with draft design (draft uses shadows). Draft docs say zero shadows, but `drafts/index.html` uses shadows. **Decision needed: reconcile.**
7. **No div soup** — need to audit and simplify wrappers ✗
8. **Pure CSS over JS state** — rewrite Switch, add CSS-only Tabs/Accordion ✗
9. **Semantic HTML as layout primitives** — use `<label>`, `<details>`, `<dialog>` directly ✗
10. **Visible data streams** — render values inline (slider position, switch status) ✓ (already done)

---

## 6. Dependency Changes

| Package | Action |
|---|---|
| `class-variance-authority` | **Keep** (Button, Badge, etc. still use it) |
| `clsx` + `tailwind-merge` | **Keep** (via `cn()`) |
| `react-error-boundary` | **Keep** |
| `@heroicons/react` or equivalent | **Not needed** — custom Icon system already exists |
| `framer-motion` | **Not needed** — CSS-native animations via `@starting-style` |

---

## 7. Implementation Order (Suggested)

| Phase | Components | Rationale |
|---|---|---|
| **1. Theme & Styles** | `gruvbox-theme.css`, `styles.css` | Foundation for everything |
| **2. Primitives** | `Button`, `Badge`, `Label`, `HelperText` | Atomic, reused everywhere |
| **3. Form controls** | `Input`, `Select`, `Slider`, `Switch` | Interactive, share HelperText pattern |
| **4. Layout** | `Card`, `Sidebar` | Compound components |
| **5. New widgets** | `Accordion`, `Tabs`, `Alert` | CSS-only, no JS runtime |
| **6. Overlays** | `Dialog`, `Popover`, `Toast` | JS+CSS, dep on portal |
| **7. Navigation** | `FloatingNav`, `Carousel` | Scroll-aware, compound |
| **8. Housekeeping** | Update `package.json` exports, remove unused files | — |

---

## 8. Open Decisions

1. **Shadows vs no shadows**: Draft `drafts/index.html` uses `shadow-sm/md/lg` on cards, popovers, dialogs. But `draft/prompt.md` and `draft/part1.md` enforce "zero shadows — use single-pixel borders instead." These conflict. Which direction?
2. **Theme format**: Draft uses hex values; current uses oklch. Oklch is more modern and perceptually uniform. Keep oklch with draft's palette mapped, or switch to hex?
3. **Button size scale**: Draft uses `sm` (px-3 py-1.5), `default` (px-4 py-2), `lg` (px-6 py-3). Current uses `sm` (h-11 sm:h-8), `md` (h-10), `lg` (h-12), `icon` (h-11 w-11). Decision: drop `icon` size, adopt draft's simpler padding-based scale?
4. **Typography scale**: Draft uses `<style>` arbitrary sizes (`text-[13px]`, `text-[14px]`). But prompt.md says "never use arbitrary bracket metrics — rely on native Tailwind scale only." Decision: what size maps for body text? `text-sm` is 14px in Tailwind v4; draft uses 13px for body. Either accept 14px or add a custom token.
