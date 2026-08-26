# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19, Tailwind CSS v4, Vite. Zero runtime UI dependencies (no Radix). Design primitives built on native HTML inputs styled with `cva` + `cn()` (clsx + tailwind-merge). Monorepo managed by pnpm + Turborepo.

## Users

Solo developer building creative coding experiments (WebGL shaders, particle systems, generative art) and tool/dashboards UI. The design system serves as the internal shared foundation across these projects.

## Product Purpose

Eliminate the recurring cost of building canvas + control panel layouts and styled inputs from scratch. TLC provides a composable, non-generic design system purpose-built for creative lab interfaces — a canvas stage with dockable/overlay panels, and instrument-grade control widgets (sliders, toggles, number fields, color pickers, vector fields) that look and feel like lab instruments, not generic UI kits.

## Positioning

TLC is not a general-purpose component library. It is a creative-lab-specific design system with a strong identity (Gruvbox palette, terminal-aesthetic, monospace typography) that makes the "canvas + panels" layout pattern a solved problem. A generic UI kit like shadcn provides the primitives; TLC provides the _composition pattern_ and _visual world_ for interactive creative tools.

## Operating Context

- Typical session: developer opens a mini-app, adjusts parameters via panel controls, watches the canvas update in real-time.
- Input devices: mouse, keyboard (Shift+drag for fine control on sliders), touch on mobile (panels collapse to bottom-sheet).
- Density varies wildly: a simple color experiment has 3 controls; a physics sim might have 30+.
- Mobile usage is real: bottom-sheet panels with progressive enhancement to desktop dock.
- Experiments are often ephemeral — the design system must support rapid prototyping without boilerplate overhead.

## Capabilities and Constraints

- **Layout system:** `<Shell>` grid with `<Shell.Canvas>` (fullscreen) + `<Shell.Panels>` (right dock, left dock, or float). Mobile-first: bottom-sheet base, `md:` breakpoint enhances to dock.
- **Control system:** `Slider`, `NumberField`, `Toggle`, `Select`, `ColorField`, `VectorField`, `Button` — all built on native HTML inputs, not reimplemented from scratch.
- **Theming:** Gruvbox palette mapped to shadcn-compatible semantic tokens (OKLCH format, `@theme inline` CSS). Dark-first (`.light` variant, not `.dark`).
- **Font:** JetBrains Mono (monospace, terminal aesthetic).
- **Radius:** 0.25rem base (sobre, instrument-style).
- **`cva` + `cn()` pattern:** Every component uses class-variant-authority for variants + tailwind-merge for className merging.
- **Controlled + uncontrolled:** All inputs support both `value`/`onChange` and `defaultValue` via shared `useControllableState` hook.
- **asChild composition:** Minimal Slot primitive for `asChild` pattern, no Radix dependency.
- **No config-driven controls:** Components are composed in JSX, not generated from JSON schema objects.
- **Explicitly undecided:** No decision yet on `buildPath` (comp-first vs code-first) — to be decided at design time.

## Brand Commitments

- **Name:** TLC (The Living Circuit)
- **Identity:** Gruvbox palette, terminal/instrument aesthetic, monospace typography (JetBrains Mono). Not generic shadcn zinc.
- **Voice:** Technical, direct, no-nonsense. A lab tool, not a marketing product.
- **No marketing assets:** No logo, tagline, or brand guide beyond the Gruvbox palette commitment.

## Evidence on Hand

- `drafts/specsv1.md` — 495-line comprehensive design system specification (in French) with architecture, token system, layout API, control specs, anti-patterns, and implementation roadmap.
- Empty scaffold: `src/styles/global.css` (Tailwind import), `src/styles/theme.css` (empty, ready for tokens), `src/App.tsx` (null render stub), `src/main.tsx` (React 19 entrypoint).
- Build tooling confirmed working: Vite + React 19 Compiler + Tailwind v4 plugin.

## Product Principles

1. **Composition over configuration.** Components are composable JSX primitives, not config-driven generators. The API surface is the JSX tree.
2. **Progressive enhancement.** Base layout is 100% functional with zero JS (CSS grid, bottom-sheet). Desktop enhancements (dock, drag-resize, float) layer on top.
3. **Identity over generality.** Gruvbox palette + terminal aesthetic is the default, not a theme to swap later. Every token, radius, and spacing choice serves this identity.
4. **Native first.** Use HTML native inputs (`<input type=range>`, `<button>`, `<select>`) styled with Tailwind, not reimplemented from scratch. 80% robustness for 20% of the code.
5. **Mobile is real.** Panels must work as bottom-sheets on touch devices. No desktop-only assumptions.

## Accessibility & Inclusion

No formal certification requirement. Apply web accessibility best practices as a matter of good code hygiene: focus-visible styling, semantic HTML, ARIA attributes on interactive elements (role="switch", aria-checked), proper label associations via htmlFor/id, keyboard navigation on all controls. The goal is well-written, accessible-by-default code, not WCAG compliance audits.
