# Graph Report - playground  (2026-05-12)

## Corpus Check
- 91 files · ~18,378 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 491 nodes · 746 edges · 49 communities (36 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `66560aa3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]

## God Nodes (most connected - your core abstractions)
1. `React 19` - 33 edges
2. `cn()` - 30 edges
3. `Sequence Renderer Engine` - 14 edges
4. `oklabToPickResult()` - 12 edges
5. `oklchToPickResult()` - 12 edges
6. `oklabToRgb()` - 11 edges
7. `useMosaicStore` - 10 edges
8. `usePaletteStore` - 10 edges
9. `Controls()` - 9 edges
10. `Adding Components` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ColorPicker()` --calls--> `usePaletteStore`  [EXTRACTED]
  components/color-picker/ColorPicker.tsx → packages/palette-generator/src/store/usePaletteStore.ts
- `PaletteDisplay()` --calls--> `usePaletteStore`  [EXTRACTED]
  components/palette-display/PaletteDisplay.tsx → packages/palette-generator/src/store/usePaletteStore.ts
- `generateSequence()` --calls--> `generateInitial()`  [INFERRED]
  packages/sequence-renderer/src/core/generator.ts → packages/sequence-renderer/src/store/useSequenceStore.tsx
- `Stable Shell / Volatile Engines` --semantically_similar_to--> `Pluggable Architecture`  [INFERRED] [semantically similar]
  apps/playground/src/content/docs/explanation/overview.md → apps/playground/src/content/docs/explanation/engines.md
- `Stateless First` --conceptually_related_to--> `Sequence Renderer Engine`  [INFERRED]
  apps/playground/src/content/docs/explanation/overview.md → apps/playground/src/content/docs/explanation/engines.md

## Hyperedges (group relationships)
- **Rule → Sequence → Visualization → Canvas Pipeline** — recaman_rule, fibonacci_rule, primes_rule, triangular_rule, collatz_rule, line_graph_viz, scatter_plot_viz, bars_viz, sequence_renderer_engine [EXTRACTED 1.00]
- **Creative Playground Design Principles** — stable_shell_volatile_engines, stateless_first, composable_ui [EXTRACTED 1.00]
- **Monorepo Shell Architecture** — app_playground, package_ui, package_sequence_renderer, astro, react, tailwind_css, typescript, zustand [EXTRACTED 1.00]

## Communities (49 total, 13 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (47): Controls(), PaletteControls(), Props, SliderControls(), Shape, TILE_REGISTRY, TileDefinition, Dimensions (+39 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (35): Badge(), BadgeProps, BadgeVariant, Button(), ButtonProps, Card(), CardContent(), CardDescription() (+27 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (32): Axis, ColorSpaceDef, hsl, hsv, oklab, oklch, clip01(), cube() (+24 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (19): ColorPicker(), ColorPickerProps, ColorSpaceCanvas(), ColorSpaceCanvasProps, ColorSliceProps, ColorSpaceControls(), Controls(), COLOR_SPACES (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (28): apps/playground, Bars Visualization, Button, Card, Collatz Rule, Composable UI, CVA Variants Pattern, Explicit Named Exports (+20 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (16): handleChange(), generateSequence(), CanvasRenderer(), SequenceDisplay(), generateInitial(), SequenceState, setSequenceRule(), setSteps() (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (11): BaseColor, exampleRule, Palette, Rule, rules, AnalogousForm(), ComplementaryForm(), Generators() (+3 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (15): Adding Components, Checklist, code:block1 (packages/ui/src/components/MyComponent/), code:typescript (// myComponentVariants.ts), code:typescript (// MyComponent.tsx), code:typescript (// index.ts), code:typescript (import type { Meta, StoryObj } from "@storybook/react-vite";), code:typescript (export { MyComponent } from "./components/MyComponent/MyComp) (+7 more)

### Community 8 - "Community 8"
Cohesion: 0.19
Nodes (9): getPixelColor(), useColorPicker(), hexToHSL(), hexToRGB(), HSLToHex(), HSLToRGB(), hueToRGB(), RGBToHex() (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (14): Available Rules, Available Visualizations, code:block1 (Rule (math) → Sequence → Visualization (draw) → Canvas), code:typescript (type SequenceRule = {), code:typescript (type Visualization = {), code:typescript (const { value, setValue } = useStore();), Data Structures, Engines (+6 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (13): code:ts (// packages/ui/src/index.ts), code:ts (// Do not use this in package public APIs), code:ts (export type { SidebarProps } from "./components/widgets/side), code:ts (import { Card, CardHeader, CardTitle } from "@repo/ui";), code:ts (import { Card } from "@repo/ui/src/components/card/Card";), Consumer Imports, Core Rules, Import and Export Strategy (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (13): Available Components, Button, code:tsx (import { Button } from "@repo/ui";), code:tsx (import { Input } from "@repo/ui";), code:tsx (import { Slider } from "@repo/ui";), code:tsx (import { Sidebar } from "@repo/ui";), Input with Label, Patterns (+5 more)

### Community 12 - "Community 12"
Cohesion: 0.24
Nodes (12): SCHEMES, SCHEMES_WITH_ANGLE, clamp(), generateHues(), generatePalette(), GeneratorParams, interpolatePalette(), normHue() (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.18
Nodes (3): PieChart, Point, strToDom()

### Community 14 - "Community 14"
Cohesion: 0.26
Nodes (8): calculateImageDimensions(), drawImageToCanvas(), ImageDimensions, initParticles(), Particle, useImageUpload(), ImageToParticles(), Particle

### Community 15 - "Community 15"
Cohesion: 0.17
Nodes (11): Adding a Visualization, Checklist, code:typescript (type Visualization = {), code:typescript (export function drawMyViz(canvas: HTMLCanvasElement, sequenc), code:typescript (import { drawMyViz } from "./my-viz.js";), code:bash (pnpm --filter @repo/sequence-renderer build), Step 1: Create the Draw Function, Step 2: Export the Visualization (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.17
Nodes (11): Adding a Sequence Rule, Checklist, code:typescript (type SequenceRule = {), code:typescript (const myRule: SequenceRule = {), code:typescript (getNext: ({ index, current, seen }) => {), code:typescript (export const sequencesRule: SequenceRule[] = [), code:bash (pnpm --filter @repo/sequence-renderer build), Step 1: Define the Rule (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.18
Nodes (10): code:typescript (export function drawLineGraph(canvas: HTMLCanvasElement, seq), code:typescript (import { drawLineGraph } from "./line-graph.js";), code:bash (pnpm --filter @repo/sequence-renderer build), Key Takeaways, Step 1: Create the Visualization, Step 2: Export the Visualization, Step 3: Run It, What's Next? (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.2
Nodes (9): Apps, Architecture, Built With, code:block1 (User Action → Engine Rule → Data → Visualization → Canvas/DO), Creative Playground, Data Flow, Next Steps, Packages (+1 more)

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (6): Add a Project, Adding Projects, code:typescript (export const projects: Record<string, Project> = {), code:astro (---), That's It, The Data Model

### Community 20 - "Community 20"
Cohesion: 0.52
Nodes (4): animate(), createCircularBuffer(), drawGrid(), drawWaveform()

### Community 21 - "Community 21"
Cohesion: 0.33
Nodes (7): Adding Projects, Adding a Sequence Rule, Adding a Visualization, Creative Playground, Engines, Your First Visualization, UI Components

### Community 22 - "Community 22"
Cohesion: 0.4
Nodes (5): Background SVG Image, Blue-to-Purple Linear Gradient, Bottom Organic Blob Shape, Top Organic Blob Shape, Red-to-Magenta Linear Gradient

## Knowledge Gaps
- **135 isolated node(s):** `Particle`, `ImageDimensions`, `Particle`, `Props`, `MOSAIC_STYLES` (+130 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `React 19` connect `Community 1` to `Community 0`, `Community 3`, `Community 5`, `Community 6`, `Community 8`, `Community 14`, `Community 20`?**
  _High betweenness centrality (0.234) - this node is a cross-community bridge._
- **Why does `Zustand` connect `Community 4` to `Community 0`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **What connects `Particle`, `ImageDimensions`, `Particle` to the rest of the system?**
  _135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._