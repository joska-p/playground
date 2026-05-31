# Swagger-Inspired Docs Refactor

> Design document for the `PipelineDocs` refactor — replacing the current
> single-scroll page with a Swagger-UI–inspired interactive documentation
> experience for the image pipeline API.

---

## Context

The current `PipelineDocs` component is a single-scroll page that lists all
manipulations in sequence (Pixel → Neighborhood → Whole → Pipeline demos).
Each section is a grid of `ManipCard` components, followed by standalone
demos for chaining, snapshots, resize, and custom manipulations.

Problems with the current approach:

- **No navigation** — the reader must scroll past everything to reach a
  specific manipulation.
- **No hierarchy** — all manipulaitons have equal visual weight; there's
  no distinction between "here's an overview" and "here's a detail".
- **Consumer + contributor mixed** — code samples and interactive demos
  are present, but architecture context (why, how it works) is buried in
  the `ApiShowcase` section that users often skip.
- **No mobile consideration** — the fixed grid layout works poorly on
  small screens.

## Design Goals

1. **Swagger-like UX** — sidebar navigation, grouped endpoints, expandable
   detail panels, "Try it out" interactivity, code samples.
2. **Mobile-first** — responsive layout that works on both phone and desktop.
3. **Gallery walk-through** — endpoints are ordered as a narrative arc,
   not just grouped by type. The reader walks through the package as a
   story: start → pixel ops → spatial ops → transforms → composition.
4. **Consumer + contributor friendly** — each endpoint shows both
   "how to use" and "how it works / how to extend".
5. **Reuse `@repo/ui`** — use existing components (`Sidebar`, `Card`,
   `Badge`, `Button`, `Slider`). No new dependencies.
6. **Incremental** — existing demo components (`ChainDemo`, `ResizeDemo`,
   etc.) are embedded, not rewritten.

## Layout

### Desktop (≥768px)

```
┌────────────────────────────────────────────────────────────┐
│  ▓ @repo/image-pipeline API                                │
├───────────────┬────────────────────────────────────────────┤
│ Sidebar Panel │ Sidebar Main                               │
│ (pinned left) │                                             │
│  280px wide   │  PIXEL  /manip/brightness                  │
│               │  ┌─ Parameters ───────────────────────┐   │
│  ▼ Overview   │  │ Name   Type    Default  Description │   │
│               │  │ value  number  1.5      Multiplier  │   │
│  ▼ Pixel      │  └─────────────────────────────────────┘   │
│    brightness │                                             │
│    contrast   │  ┌─ Try it Out ───────────────────────┐   │
│    grayscale  │  │  ┌──────────┐  ┌──────────┐       │   │
│    sepia      │  │  │ Original │  │ Result   │       │   │
│    invert     │  │  │          │  │          │       │   │
│    saturation │  │  └──────────┘  └──────────┘       │   │
│    hue-rotate │  │  ═══●═══ slider ═══ 1.5          │   │
│    opacity    │  └─────────────────────────────────────┘   │
│    threshold  │                                             │
│               │  ┌─ Code Sample ──────────────────────┐   │
│  ▼ Neighbor   │  │ pipelineGateway(src, [{...}])      │   │
│    gaussian   │  └─────────────────────────────────────┘   │
│    box-blur   │                                             │
│    sharpen    │                                             │
│    edge-detect│                                             │
│               │                                             │
│  ▼ Whole      │                                             │
│    histogram  │                                             │
│    flip-horiz │                                             │
│    flip-vert  │                                             │
│    rotate-90cw│                                             │
│               │                                             │
│  ▼ Pipeline   │                                             │
│    Snapshots  │                                             │
│    Resize     │                                             │
│    Chaining   │                                             │
│    Custom     │                                             │
└───────────────┴────────────────────────────────────────────┘
```

### Mobile (<768px)

The `Sidebar` component's built-in responsive behavior handles this:
`desktopPosition="left"` + `mobilePosition="bottom"`.

- Sidebar panel slides up as a bottom drawer
- `Sidebar.Toggle` floats in the viewport to open/close
- Main content fills the full width

## Navigation & Information Architecture

### Endpoint Order (the narrative arc)

| # | Group | Items | Purpose |
|---|-------|-------|---------|
| 1 | Overview | — | Architecture intro, two API surfaces, quick start |
| 2 | Pixel | 9 manipulations | "Start here — per-pixel ops are the simplest" |
| 3 | Neighbor | 4 manipulations | "Now try spatial effects that look at neighbors" |
| 4 | Whole | 4 manipulations | "Structural transforms (flips, rotate, histogram)" |
| 5 | Pipeline | 4 demos | "Compose them, extend them — chaining → snapshots → resize → custom" |

### Interactive State

```typescript
type EndpointId =
  | { kind: "overview" }
  | { kind: "manip"; id: string }
  | { kind: "pipeline"; id: "snapshots" | "resize" | "chaining" | "custom" };
```

### Sidebar Behavior

- Groups are collapsible (click group header to expand/collapse)
- Active endpoint has a highlighted background
- Clicking an endpoint scrolls it into view in the sidebar
- The sidebar panel itself is scrollable (overflow-y: auto)

## Component Architecture

### New Components

```
PipelineDocs                      ← orchestrator: state, layout
├── SwaggerSidebar                ← sidebar: groups, items, active highlighting
│   └── EndpointList              ← the actual list (replaces SectionHeader)
├── EndpointView                  ← renders whichever endpoint is active
│   ├── EndpointHeader            ← badge + name + description
│   ├── ParamTable                ← Swagger-style parameter metadata
│   ├── TryItOut                  ← interactive demo with sliders + before/after
│   │   └── BeforeAfter           ← side-by-side image comparison
│   └── CodeSample                ← generated TypeScript snippet
└── Pipeline endpoint content     ← embedded existing demos
    ├── ChainDemo
    ├── ResizeDemo
    ├── SnapshotDemo
    └── CustomDemo
```

### Component Responsibilities

#### `SwaggerSidebar`
- Receives list of all endpoint groups
- Maps group → color-coded badge
- Tracks which group/endpoint is active
- Handles group expand/collapse
- No search bar (explicitly excluded)

#### `EndpointView`
- Receives active `EndpointId` + source data + param values
- Dispatches to the right content:
  - `{ kind: "manip" }` → EndpointHeader + ParamTable + TryItOut + CodeSample
  - `{ kind: "pipeline" }` → embedded demo component
  - `{ kind: "overview" }` → architecture overview + quick start

#### `ParamTable`
- Renders a table: Name | Type | Default | Description
- Styled like Swagger's parameter tables (monospace names, muted descriptions)
- Only renders if the manip has params defined

#### `TryItOut`
- Shows source image + result image side-by-side
- Renders `Slider` components for each param
- Auto-applies on param change (debounced via `useEffect` cancellation)
- Loading state while pipeline runs
- Uses `pipelineGateway` directly, not `usePipeline`

### Modified Components

#### `PipelineDocs`
- Complete rewrite: no longer a scroll-page
- Holds all state (`activeEndpoint`, `sourceData`, `paramValues`)
- Renders the `Sidebar` layout wrapping `SwaggerSidebar` and `EndpointView`

#### `manipData.ts`
- Extend `ManipInfo` with: `path` (canonical endpoint path), `examples`
  (multiple code examples for different use cases)
- Add unified endpoint list that includes pipeline-level items

### Removed Components

| Component | Why removed |
|-----------|-------------|
| `SectionHeader` | Replaced by Swagger-style endpoint headers + sidebar |
| `ApiShowcase` | Content folded into the Overview endpoint |

### Kept As-Is

| Component | Why kept |
|-----------|----------|
| `usePipeline` | Still used by some demos (Chaining, Snapshots) |
| `helpers` | Still used for image loading |
| `CodeBlock` | Still used for code samples |
| `ChainDemo` | Embedded in Pipeline > Chaining |
| `ResizeDemo` | Embedded in Pipeline > Resize |
| `SnapshotDemo` | Embedded in Pipeline > Snapshots |
| `CustomDemo` | Embedded in Pipeline > Custom |
| `ManipCard` | No longer used directly; logic superseded by `TryItOut` |

## State Management

All state lives in `PipelineDocs` (no global store needed — this is a
presentation-only component).

```typescript
const [activeEndpoint, setActiveEndpoint] = useState<EndpointId>({
  kind: "overview",
});
const [sourceData, setSourceData] = useState<ImageData | null>(null);
const [paramValues, setParamValues] = useState<Record<string, number>>({});
```

- `paramValues` uses the same `"<id>:<key>"` key pattern as the current code
  (e.g. `"brightness:value"`, `"gaussian-blur:radius"`)
- `sourceData` is loaded once on mount (same as current behavior)
- No URL-based routing — pure client-side state

## Data Flow

```
User clicks sidebar item
        │
        ▼
setActiveEndpoint({ kind: "manip", id: "brightness" })
        │
        ▼
EndpointView receives active endpoint
        │
        ├── Renders EndpointHeader (badge + name)
        ├── Renders ParamTable (reads manipData.ts)
        ├── Renders TryItOut
        │       │
        │       ├── Shows source image (from sourceData)
        │       ├── Renders Sliders for each param
        │       │       │
        │       │       ▼
        │       │   onParamChange → setParamValues
        │       │       │
        │       │       ▼
        │       │   useEffect fires → pipelineGateway(...)
        │       │       │
        │       │       ▼
        │       │   setResult(r.final) → image updates
        │       │
        │       └── Shows result image
        │
        └── Renders CodeSample (generated from current params)
```

## Color Coding

Badges use the same color scheme as Swagger methods:

| Type | Badge Color | Tailwind Class |
|------|-------------|----------------|
| PIXEL | Green | `bg-secondary` (maps to green in gruvbox) |
| NEIGHBOR | Orange | `bg-category-image` (amber/orange) |
| WHOLE | Purple | `bg-category-color` (purple/violet) |
| PIPELINE | Blue | `bg-primary` (muted blue) |

## Accessibility Considerations

- Sidebar uses native `<nav>` with `aria-label="API Endpoints"`
- Each endpoint item is a `<button>` with `aria-current="page"` when active
- Group toggles use `aria-expanded`
- Param sliders use the `Slider` component from `@repo/ui` (already accessible)
- Before/after images have `alt` text derived from the manipulation label
- Color is not the only indicator — active items also have a background/highlight

## Migration Plan

### Phase 1: Foundation (this PR)
1. Write `SwaggerSidebar` — group/endpoint data structure + rendering
2. Write `EndpointView` — dispatcher between manip/pipeline/overview views
3. Write `ParamTable` — static parameter table
4. Write `TryItOut` — interactive demo with `pipelineGateway`
5. Rewrite `PipelineDocs` — sidebar layout with state
6. Rewrite `manipData.ts` — unified endpoint list with pipeline entries
7. Remove `SectionHeader`, `ApiShowcase` — fold content into Overview
8. Remove `ManipCard` — no longer referenced

### Phase 2: Polish (post-review)
- Smooth sidebar transitions
- Mobile drawer behavior tuning
- Dark mode verification
- Code sample tabs (TypeScript / plain JS / curl metaphor)

## Open Questions

1. Should the Overview endpoint show a diagram (ASCII or SVG) of the
   Pipeline architecture?
2. Should `TryItOut` auto-apply on mount (showing default param effect) or
   wait for user interaction?
3. How should errors from `pipelineGateway` be surfaced? (Toast? Inline? Current
   code just logs to console.)

---

_Design document for the PipelineDocs Swagger refactor. Last updated: 2026-05-31._
