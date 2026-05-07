# Graph Report - .  (2026-05-07)

## Corpus Check
- Corpus is ~19,270 words - fits in a single context window. You may not need a graph.

## Summary
- 249 nodes · 352 edges · 40 communities (27 shown, 13 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Component Library|UI Component Library]]
- [[_COMMUNITY_Mosaic Maker Core|Mosaic Maker Core]]
- [[_COMMUNITY_Architecture & Concepts|Architecture & Concepts]]
- [[_COMMUNITY_Color Palette Generators|Color Palette Generators]]
- [[_COMMUNITY_Sequence Renderer Engine|Sequence Renderer Engine]]
- [[_COMMUNITY_Color Picker & Conversions|Color Picker & Conversions]]
- [[_COMMUNITY_Data Fetching & Utilities|Data Fetching & Utilities]]
- [[_COMMUNITY_Pie Chart Web Component|Pie Chart Web Component]]
- [[_COMMUNITY_Image to Particles|Image to Particles]]
- [[_COMMUNITY_Oscillograph Visualization|Oscillograph Visualization]]
- [[_COMMUNITY_User Documentation|User Documentation]]
- [[_COMMUNITY_Recamán Visualization|Recamán Visualization]]
- [[_COMMUNITY_Background SVG Assets|Background SVG Assets]]
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
- [[_COMMUNITY_Community 39|Community 39]]

## God Nodes (most connected - your core abstractions)
1. `React 19` - 31 edges
2. `cn()` - 14 edges
3. `Sequence Renderer Engine` - 14 edges
4. `PieChart` - 7 edges
5. `fetchPalettes()` - 7 edges
6. `computeNumberOfTiles()` - 7 edges
7. `@repo/ui` - 7 edges
8. `_updateTiles()` - 5 edges
9. `addPalette()` - 5 edges
10. `generateSequence()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `initPalettes()` --calls--> `fetchPalettes()`  [INFERRED]
  packages/mosaic-maker/src/store/useMosaicStore.tsx → packages/mosaic-maker/src/utils/fetch-palettes.ts
- `generateInitial()` --calls--> `generateSequence()`  [INFERRED]
  packages/sequence-renderer/src/store/useSequenceStore.tsx → packages/sequence-renderer/src/core/generator.ts
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

## Communities (40 total, 13 thin omitted)

### Community 0 - "UI Component Library"
Cohesion: 0.08
Nodes (5): React 19, useSidebarContext(), SidebarMain(), SidebarPanel(), cn()

### Community 1 - "Mosaic Maker Core"
Cohesion: 0.14
Nodes (20): PaletteControls(), SliderControls(), computeInitialTiles(), initPalettes(), setMosaicRef(), setPaletteStock(), updateCurrentPalettes(), updatePalette() (+12 more)

### Community 2 - "Architecture & Concepts"
Cohesion: 0.08
Nodes (27): apps/playground, Bars Visualization, Button, Card, Collatz Rule, Composable UI, CVA Variants Pattern, Explicit Named Exports (+19 more)

### Community 3 - "Color Palette Generators"
Cohesion: 0.14
Nodes (7): AnalogousForm(), ComplementaryForm(), Generators(), MonochromaticForm(), XadicForm(), addPalette(), Zustand

### Community 4 - "Sequence Renderer Engine"
Cohesion: 0.15
Nodes (9): Controls(), handleChange(), generateSequence(), CanvasRenderer(), SequenceDisplay(), generateInitial(), setSequenceRule(), setSteps() (+1 more)

### Community 5 - "Color Picker & Conversions"
Cohesion: 0.18
Nodes (10): getPixelColor(), useColorPicker(), setBaseColor(), hexToHSL(), hexToRGB(), HSLToHex(), HSLToRGB(), hueToRGB() (+2 more)

### Community 6 - "Data Fetching & Utilities"
Cohesion: 0.22
Nodes (10): generateTileRotation(), cachePalettes(), fetchPalettes(), getCachedPalettes(), isCacheValid(), getRandom(), getRandomValue(), safeFetch() (+2 more)

### Community 7 - "Pie Chart Web Component"
Cohesion: 0.18
Nodes (3): PieChart, Point, strToDom()

### Community 8 - "Image to Particles"
Cohesion: 0.39
Nodes (5): calculateImageDimensions(), drawImageToCanvas(), initParticles(), useImageUpload(), ImageToParticles()

### Community 9 - "Oscillograph Visualization"
Cohesion: 0.52
Nodes (4): animate(), createCircularBuffer(), drawGrid(), drawWaveform()

### Community 10 - "User Documentation"
Cohesion: 0.33
Nodes (7): Adding Projects, Adding a Sequence Rule, Adding a Visualization, Creative Playground, Engines, Your First Visualization, UI Components

### Community 11 - "Recamán Visualization"
Cohesion: 0.6
Nodes (4): findBiggestInterval(), calculateValueScale(), draw(), drawSequence()

### Community 12 - "Background SVG Assets"
Cohesion: 0.4
Nodes (5): Background SVG Image, Blue-to-Purple Linear Gradient, Bottom Organic Blob Shape, Top Organic Blob Shape, Red-to-Magenta Linear Gradient

## Knowledge Gaps
- **38 isolated node(s):** `Adding a Sequence Rule`, `Adding a Visualization`, `Adding Components`, `Adding Projects`, `UI Components` (+33 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `React 19` connect `UI Component Library` to `Mosaic Maker Core`, `Color Palette Generators`, `Sequence Renderer Engine`, `Color Picker & Conversions`, `Image to Particles`, `Oscillograph Visualization`?**
  _High betweenness centrality (0.339) - this node is a cross-community bridge._
- **Why does `Zustand` connect `Color Palette Generators` to `Mosaic Maker Core`, `Architecture & Concepts`, `Sequence Renderer Engine`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Why does `Sequence Renderer Engine` connect `Architecture & Concepts` to `Color Palette Generators`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `fetchPalettes()` (e.g. with `initPalettes()` and `safeFetch()`) actually correct?**
  _`fetchPalettes()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Adding a Sequence Rule`, `Adding a Visualization`, `Adding Components` to the rest of the system?**
  _38 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Component Library` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Mosaic Maker Core` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._