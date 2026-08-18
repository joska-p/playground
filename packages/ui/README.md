# @repo/ui

> A React component library with a Gruvbox-inspired design system — CVA variants, Tailwind CSS v4 tokens, and a strict "stateless components, stateful hooks" architecture.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc. Interactive component docs live in Storybook.

---

## 🎯 Intention & Concept

`@repo/ui` is the shared UI kit for the playground. It is not a generic headless library: every component is opinionated toward the project's aesthetic (Gruvbox palette, OKLCH color drifting, subtle neon glows) and the app's common needs (control panels, data cards, experiment grids).

Two architectural rules drive everything:

- **Stateless components, stateful hooks.** Components never own state — `<ThemeProvider>`, `<Tabs>`, and the toast system are fully controlled; the actual `useState` calls live in sibling hooks (`useThemeState`, `useTabsState`, `useToastQueue`). The tree stays pure, and state is reusable without the component.
- **One color system, one source of truth.** Every component accepts the same `variant` prop, and `COLOR_CLASSES` is the single canonical map each component's CVA config spreads from.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** Gruvbox color palette, ambient "breathing" UI with slow OKLCH hue drift, subtle neon-tube glows on cards.
- **Math / Papers:** OKLCH perceptually-uniform color space — hue rotation keeps brightness constant, which makes it ideal for organic color animation.
- **Borrowed Code & Algorithms:** CVA variant recipes, Tailwind CSS v4 `@theme` tokens, `cn()` = clsx + tailwind-merge, shadcn-style component conventions.

## ⚠️ Patterns & Gotchas

- **Theming:** the theme CSS uses split `--*-l / --*-c / --*-h` channels so JS animates single raw numbers per frame (60fps "breathing") instead of full color strings. The base palette block is the single source of truth — every semantic/tag token is a pure `var()` alias.
- **Variant colors:** `COLOR_VARIABLE_CLASSES` sets `--variant-color`, and composed components (ProjectCard, DocCard, CategoryCard) get their accent through CardLink's `accent` prop — there is no per-card `category` mapping.
- **Height-collapse animation:** `ControlConditional` collapses via the `grid-template-rows: 0fr → 1fr` trick — a plain CSS transition, no measuring JS.
- **Opting out of shared behavior:** CategoryCard cancels CardLink's `hover:-translate-y-0.5` by passing `hover:translate-y-0` — `cn`'s tailwind-merge resolves the conflict, the standard way to tweak a composed component without forking it.
- **EdgeField:** the edge-detection look exists in three forms — live SVG filter chain, live WebGL2 fragment shader (same pipeline, per-pixel), and a baked webp mask (the alpha channel _is_ the contour pattern, applied via `mask-image` so `--glow-color` stays dynamic). See `codex/knowledge/ui-edgefield-baked-mask.md`.
- **Dialog:** fully controlled — `open` comes from the caller, `onClose` fires from the native `<dialog>` close event (Esc, backdrop click).
- **Label `required`:** purely visual — shows a `*` and does _not_ set the HTML `required` attribute.

## 📚 References

- [Storybook (component docs)](https://joska-p.github.io/playground/storybook/)
- [Project Conventions](/docs/conventions/overview.md)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/ui/`._
