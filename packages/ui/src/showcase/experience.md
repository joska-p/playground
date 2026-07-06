# Building with pg-lab-ui — Experience Log

## The variant system is the star

The `ColorVariant` type (`default | primary | secondary | accent | warning | destructive`) is genuinely the right abstraction. Learning it once and using it on Button, Badge, Alert, Input, Checkbox, Switch, Card, Tabs, and more means zero context-switching. You never wonder "does this component use a color prop or a variant prop?" — it's always `variant`.

**Design insight:** The two-mechanism approach (cva for multi-prop changes, `--_color` for single-accent) is invisible to the consumer. As an app developer you just pass `variant="primary"` and don't care about the internals. That's the right trade-off.

## Stateless components + stateful hooks is clean — with one edge

The pattern works great. You wire up a hook at the app level, pass its values down as props. The components are predictable. The one thing that's slightly unusual: you need to hold both the hook call and the provider in your app root. For `ThemeProvider` + `useThemeState` and `ToastProvider` + `useToastQueue`, that's two hooks + two providers in the root. A combined convenience provider would be nice but would violate the "components don't call useState" rule.

## CSS-first is a superpower

### What works brilliantly:

- **Popover / Tooltip** — zero JS, zero portal, zero positioning lib. Just CSS `group-hover`. Insane that this works.
- **Accordion** — native `<details>`/`<summary>`. You forget this exists in HTML. No React state at all.
- **Dialog** — native `<dialog>` with `showModal()`/`close()`. `::backdrop` for free.
- **Tabs** — visually-hidden radio inputs. Arrow keys work natively. Form-participating.
- **Checkbox/Radio/Switch/Slider** — native inputs with `accent-color`. Accessible for free.

### The gotchas:

- **Slider ticks** — the `showTicks` labels use absolute positioning. In a constrained container they can overflow. Not a library bug, but something to watch for when embedding in tight layouts.
- **Carousel scroll-snap** — the `scrollAmount` prop makes assumptions about slide width. If your slides vary in width, the arrows may scroll too little or too much.
- **ControlConditional animation** — uses `grid-template-rows: 0fr -> 1fr` for the collapse animation. This works but the transition can feel slightly janky if there's padding on the inner element (the padding doesn't collapse).

## API design observations

### Button

Ghost and link variants are genuinely useful additions beyond the 6-color system. The `loading` prop (swaps to spinner, disables, sets `aria-busy`) covers the most common async state without exposing a separate `Spinner` component. The `tooltip` prop via `data-tooltip` is clever — avoids needing to wrap every icon button in a `<Tooltip>`.

### Input

`leadingIcon` and `trailingAction` are well-named. "Trailing action" vs "leading icon" makes the slot purpose clear (icon = decoration, action = interactive). The `expandable` CSS-only focus-grow is a nice desktop progressive enhancement — doesn't affect mobile users.

### Badge

Three appearances (`soft`, `solid`, `outline`) × 6 colors × optional `dot` = 36 combinations from 3 props. The `dot` mode is independent of appearance, which is the right call.

### Card

The `interactive` + `:has()` glow is the most impressive trick. No JS at all — the glow activates when you hover over `CardActions`, which is a sibling. This is something most libraries would need a state manager + event handlers for.

### ControlPanel

The `dock` prop with responsive CSS is clever. `bottom-sheet` becomes a fixed sidebar on landscape via `landscape:` media queries. But the prop name is a bit overloaded — it controls both position AND behavior (collapsible vs fixed). Something to document clearly.

### Sidebar

Four positions, controlled/uncontrolled, compound API. The `Sidebar.Toggle` auto-detects its icon based on the sidebar state via context. Clean.

## What I'd change if I owned this library

1. **Toast provider boilerplate** — needing both `useToastQueue()` and `<ToastProvider>` in the root is friction. A combined `createToastSystem()` or `useToastSystem()` that returns both the state and the provider component would reduce ceremony.

2. **FloatingNav integration in showcases** — the FloatingNav is meant to be used once at the app level. Demoing it inline (like in this showcase) requires scaling it down or putting it in a constrained container, which defeats the purpose. Better to show a screenshot or a code block only.

3. **All demos in one page** — this showcase works as a reference, but for a real marketing landing page you'd want fewer full-API tables and more curated "here's what you can build" examples. The API tables are great for developers evaluating the library, less great for a homepage that needs to sell the design.

4. **ColorSwatch size** — the `sm` size is almost too small to see the color. But it's used in the tokens section to show all 7 palette colors in a row, where space is tight. Acceptable trade-off.

## Overall

This library is unusually opinionated about preferring the platform over JS. The result is components that are:

- Lighter (no JS runtime for popovers, tooltips, accordions, carousel swiping)
- More accessible (native elements bring a11y for free)
- More reliable (CSS can't throw exceptions)

The trade-off is that you can't customize behavior as deeply (no custom popover positioning, no custom accordion animations, no programmatic carousel slide index). For a creative-coding toolkit, this is the right call — you optimize for the 90% use case and let people bring their own JS when they need it.
