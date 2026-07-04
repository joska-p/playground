# pg-lab-ui

React 19 + Tailwind v4 + CVA port of the `pg_lab` gruvbox design system.
Mobile-first, progressively enhanced, dark by default with an optional
light theme (`data-theme="light"`).

## Install

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react
```

(`react`, `react-dom` ≥ 19 are peer dependencies you already have.)

## Architecture: stateless components, stateful hooks

Every component in `src/components/` is a plain function of its props —
none of them call `useState`. Anywhere the original design needed state
(theme, toasts, tabs), that state lives in a dedicated hook in
`src/hooks/`, and the component just renders whatever it's handed:

| Stateless component | Its state hook |
|---|---|
| `ThemeProvider` | `useThemeState()` |
| `ToastProvider` / `ToastViewport` | `useToastQueue()` |
| `Tabs` | `useTabsState(defaultValue)` |

This also means every component uses React 19's ref-as-prop pattern —
`ref` is declared as a normal prop in each component's type, no
`forwardRef` anywhere in the codebase.

## Setup

1. Copy `src/styles/globals.css` into your project and import it once at
   your app root:

   ```ts
   import "./styles/globals.css";
   ```

   This file uses Tailwind v4's CSS-first config (`@import "tailwindcss"`
   + `@theme inline`) — no `tailwind.config.js` needed. It defines the
   gruvbox dark/light tokens and every CSS-only interactive behavior
   (`:has()`, `:focus-within`, `@starting-style`, native `<details>`/
   `<dialog>` styling, etc).

2. Wire up state with the hooks, then hand it to the stateless providers:

   ```tsx
   import { ThemeProvider, useThemeState, ToastProvider, useToastQueue } from "pg-lab-ui";

   export default function App() {
     const theme = useThemeState();
     const toastQueue = useToastQueue();

     return (
       <ThemeProvider theme={theme.theme} setTheme={theme.setTheme} toggleTheme={theme.toggleTheme}>
         <ToastProvider toasts={toastQueue.toasts} toast={toastQueue.toast} dismiss={toastQueue.dismiss}>
           {/* your app */}
         </ToastProvider>
       </ThemeProvider>
     );
   }
   ```

3. `Tabs` works the same way — pull state from `useTabsState`:

   ```tsx
   const tabs = useTabsState("overview");
   <Tabs value={tabs.value} onValueChange={tabs.setValue}>...</Tabs>
   ```

4. Import components from `pg-lab-ui` (see `src/App.example.tsx` for a
   full tour of every component).

## The variant system

Every component accepts the same `variant` prop with six values:

```ts
type ColorVariant = "default" | "primary" | "secondary" | "accent" | "warning" | "destructive";
```

- `default` is a neutral/grey token (`--foreground-dim`) — used for
  components that don't have a strong semantic meaning by default.
- The other five map 1:1 to the CSS custom properties defined in
  `globals.css` (`--primary`, `--secondary`, `--accent`, `--warning`,
  `--destructive`), each with a paired `-foreground` color for contrast.

Two ways components consume the variant, matching the source design:

- **Full color** (Button, Alert, Toast): `variant` resolves to Tailwind
  utility classes like `bg-primary text-primary-foreground` via `cva`.
  Each of these `cva` configs lives in its own sibling file
  (`Button.variants.ts`, `Badge.variants.ts`, `Alert.variants.ts`,
  `Input.variants.ts`) so the variant definitions can be imported,
  previewed, or extended independently of the component itself.
- **Single accent** (Badge, Switch, Card glow, Tabs indicator, Input
  focus ring, Checkbox/Radio/Slider accent-color): `variant` resolves to
  one CSS custom property (`--_color` or `accent-color`) via the shared
  `src/lib/colorVariant.ts` — the same `--_color` trick the original
  design used for badges, just generalized to every component.

## Components

| Component | Notes |
|---|---|
| `Button` | 6 variants + `ghost`/`link` extras, 4 sizes, `loading`, `tooltip` |
| `Badge` | soft / solid / outline appearances, optional status `dot` |
| `Input` | leading icon, trailing action, `expandable` (focus-grow) |
| `Textarea` | auto-growing via `field-sizing: content` |
| `Checkbox` / `Radio` | native inputs, `accent-color` theming |
| `Switch` | native checkbox restyled as a toggle |
| `Slider` | native range input with tick labels |
| `Card` + `CardImage/Body/Title/Description/Footer/Actions` | `interactive` glow via `:has()`, `horizontal` responsive layout |
| `Accordion` / `AccordionItem` | native `<details>`/`<summary>` |
| `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` | radio-based tab group |
| `Carousel` / `CarouselSlide` | scroll-snap track + `scrollBy` arrows |
| `Popover` | hover-triggered via `group`/`group-hover`, no JS |
| `Tooltip` | CSS `::after` bubble via `data-tooltip` |
| `Dialog` + parts + `DialogActions` | native `<dialog>`, `showModal()`/`close()` |
| `Alert` | colored accent banner, icon per variant |
| `ToastProvider` / `useToast` | `createPortal` toast stack, auto-dismiss |

## Progressive enhancement notes

- Dark theme is the `:root` default — the light theme is purely additive
  (`data-theme="light"` on `<html>`), so `ThemeProvider` is optional.
- Accordion, Dialog, checkboxes/radios/range all use native HTML elements
  — fully functional and accessible with CSS disabled.
- `:has()`, `:focus-within`, `@starting-style`, and `color-mix()` all stay
  in CSS exactly as in the source design; React only ever toggles
  attributes (`open`, `checked`, `data-active`) on top.
