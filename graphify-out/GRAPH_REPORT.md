# Graph Report - .  (2026-05-08)

## Corpus Check
- 0 files · ~99,999 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 279 nodes · 412 edges · 39 communities (26 shown, 13 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]

## God Nodes (most connected - your core abstractions)
1. `React 19` - 31 edges
2. `cn()` - 14 edges
3. `Sequence Renderer Engine` - 14 edges
4. `PieChart` - 7 edges
5. `Controls()` - 7 edges
6. `fetchPalettes()` - 7 edges
7. `computeNumberOfTiles()` - 7 edges
8. `addPalette()` - 7 edges
9. `@repo/ui` - 7 edges
10. `usePaletteStore` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Controls()` --calls--> `usePaletteStore`  [EXTRACTED]
  components/controls/Controls.tsx → store/usePaletteStore.ts
- `generateSequence()` --calls--> `generateInitial()`  [INFERRED]
  packages/sequence-renderer/src/core/generator.ts → packages/sequence-renderer/src/store/useSequenceStore.tsx
- `Stable Shell / Volatile Engines` --semantically_similar_to--> `Pluggable Architecture`  [INFERRED] [semantically similar]
  apps/playground/src/content/docs/explanation/overview.md → apps/playground/src/content/docs/explanation/engines.md
- `Stateless First` --conceptually_related_to--> `Sequence Renderer Engine`  [INFERRED]
  apps/playground/src/content/docs/explanation/overview.md → apps/playground/src/content/docs/explanation/engines.md
- `Composable UI` --semantically_similar_to--> `CVA Variants Pattern`  [INFERRED] [semantically similar]
  apps/playground/src/content/docs/explanation/overview.md → apps/playground/src/content/docs/how-to/adding-components.md

## Hyperedges (group relationships)
- **Rule → Sequence → Visualization → Canvas Pipeline** — recaman_rule, fibonacci_rule, primes_rule, triangular_rule, collatz_rule, line_graph_viz, scatter_plot_viz, bars_viz, sequence_renderer_engine [EXTRACTED 1.00]
- **Creative Playground Design Principles** — stable_shell_volatile_engines, stateless_first, composable_ui [EXTRACTED 1.00]
- **Monorepo Shell Architecture** — app_playground, package_ui, package_sequence_renderer, astro, react, tailwind_css, typescript, zustand [EXTRACTED 1.00]

## Communities (39 total, 13 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (30): PaletteControls(), SliderControls(), computeInitialTiles(), generateTileRotation(), initPalettes(), setMosaicRef(), setPaletteStock(), updateCurrentPalettes() (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (5): React 19, useSidebarContext(), SidebarMain(), SidebarPanel(), cn()

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (24): ColorPicker(), ColorPickerProps, Controls(), SCHEMES, SCHEMES_WITH_ANGLE, BaseColor, initialBaseColor, Palette (+16 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (27): apps/playground, Bars Visualization, Button, Card, Collatz Rule, Composable UI, CVA Variants Pattern, Explicit Named Exports (+19 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (13): handleChange(), generateSequence(), CanvasRenderer(), SequenceDisplay(), generateInitial(), setSequenceRule(), setSteps(), setVisualizationId() (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (7): AnalogousForm(), ComplementaryForm(), Generators(), MonochromaticForm(), XadicForm(), PaletteGenerator(), addPalette()

### Community 6 - "Community 6"
Cohesion: 0.19
Nodes (9): getPixelColor(), useColorPicker(), hexToHSL(), hexToRGB(), HSLToHex(), HSLToRGB(), hueToRGB(), RGBToHex() (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (3): PieChart, Point, strToDom()

### Community 8 - "Community 8"
Cohesion: 0.39
Nodes (5): calculateImageDimensions(), drawImageToCanvas(), initParticles(), useImageUpload(), ImageToParticles()

### Community 9 - "Community 9"
Cohesion: 0.52
Nodes (4): animate(), createCircularBuffer(), drawGrid(), drawWaveform()

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (7): Adding Projects, Adding a Sequence Rule, Adding a Visualization, Creative Playground, Engines, Your First Visualization, UI Components

### Community 11 - "Community 11"
Cohesion: 0.4
Nodes (5): Background SVG Image, Blue-to-Purple Linear Gradient, Bottom Organic Blob Shape, Top Organic Blob Shape, Red-to-Magenta Linear Gradient

## Knowledge Gaps
- **42 isolated node(s):** `Adding a Sequence Rule`, `Adding a Visualization`, `Adding Components`, `Adding Projects`, `UI Components` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.