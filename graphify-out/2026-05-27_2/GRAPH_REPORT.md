# Graph Report - . (2026-05-27)

## Corpus Check

- 351 files · ~90,447 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 591 nodes · 720 edges · 85 communities (48 shown, 37 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.83)
- Token cost: 32,500 input · 8,200 output

## Community Hubs (Navigation)

- [[_COMMUNITY_Graph Viz & Palette Store|Graph Viz & Palette Store]]
- [[_COMMUNITY_Content & Layout Components|Content & Layout Components]]
- [[_COMMUNITY_ESLint Configuration|ESLint Configuration]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Astro Pages|Astro Pages]]
- [[_COMMUNITY_Math SVG Components|Math SVG Components]]
- [[_COMMUNITY_Color Space Tools|Color Space Tools]]
- [[_COMMUNITY_Playground Config|Playground Config]]
- [[_COMMUNITY_Formatting & Linting|Formatting & Linting]]
- [[_COMMUNITY_Doc Navigation|Doc Navigation]]
- [[_COMMUNITY_Number Systems|Number Systems]]
- [[_COMMUNITY_Content Collections|Content Collections]]
- [[_COMMUNITY_Doc Cards & Nav|Doc Cards & Nav]]
- [[_COMMUNITY_Palette Generation|Palette Generation]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Card Stories|Card Stories]]
- [[_COMMUNITY_Input Stories|Input Stories]]
- [[_COMMUNITY_Notebook Math Pages|Notebook Math Pages]]
- [[_COMMUNITY_Canvas & Visual Utilities|Canvas & Visual Utilities]]
- [[_COMMUNITY_Storybook Config|Storybook Config]]
- [[_COMMUNITY_Landing Page Sections|Landing Page Sections]]
- [[_COMMUNITY_Footer & Error Pages|Footer & Error Pages]]
- [[_COMMUNITY_Clean Script|Clean Script]]
- [[_COMMUNITY_Number Philosophy|Number Philosophy]]
- [[_COMMUNITY_Sequence Rules|Sequence Rules]]
- [[_COMMUNITY_Button Stories|Button Stories]]
- [[_COMMUNITY_Tile Layout CSS|Tile Layout CSS]]
- [[_COMMUNITY_Navbar|Navbar]]
- [[_COMMUNITY_Storybook Testing|Storybook Testing]]
- [[_COMMUNITY_Growth & Logarithms|Growth & Logarithms]]
- [[_COMMUNITY_Storybook Addons|Storybook Addons]]
- [[_COMMUNITY_TypeScript Configs|TypeScript Configs]]
- [[_COMMUNITY_Number Set Diagrams|Number Set Diagrams]]
- [[_COMMUNITY_Random Utilities|Random Utilities]]
- [[_COMMUNITY_Palette Utilities|Palette Utilities]]
- [[_COMMUNITY_Visualization Guides|Visualization Guides]]
- [[_COMMUNITY_Growth Charts|Growth Charts]]
- [[_COMMUNITY_Complex Plane|Complex Plane]]
- [[_COMMUNITY_Masterpiece Illustrations|Masterpiece Illustrations]]
- [[_COMMUNITY_Tailwind CSS|Tailwind CSS]]
- [[_COMMUNITY_Root TSConfigs|Root TSConfigs]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]

## God Nodes (most connected - your core abstractions)

1. `../../layouts/base-layout.astro` - 22 edges
2. `graphStore` - 21 edges
3. `useGraphSimulation` - 18 edges
4. `./common-animations.css` - 15 edges
5. `@repo/storybook` - 13 edges
6. `./figure.astro` - 12 edges
7. `../../components/ui/features/hero.astro` - 11 edges
8. `scripts` - 10 edges
9. `Controls` - 10 edges
10. `../../components/ui/cards/doc-card.astro` - 9 edges

## Surprising Connections (you probably didn't know these)

- `Recamán Rule` --implements--> `SequenceRule` [EXTRACTED]
  apps/playground/src/content/docs/explanation/engines.md → packages/sequence-renderer/src/core/rules.ts
- `Fibonacci Rule` --implements--> `SequenceRule` [EXTRACTED]
  apps/playground/src/content/docs/explanation/engines.md → packages/sequence-renderer/src/core/rules.ts
- `The Emergence of Complexity` --conceptually_related_to--> `The Classical Tower of Numbers` [INFERRED]
  apps/playground/src/content/notebook/emergence-complexite/index.mdx → apps/playground/src/assets/numbers/masterpiece.svg
- `The Emergence of Complexity` --conceptually_related_to--> `Nested Number Systems Diagram` [INFERRED]
  apps/playground/src/content/notebook/emergence-complexite/index.mdx → apps/playground/src/assets/numbers/graphic.svg
- `The Emergence of Complexity` --conceptually_related_to--> `Expansion of Numbers Banner` [INFERRED]
  apps/playground/src/content/notebook/emergence-complexite/index.mdx → apps/playground/src/assets/numbers/text.svg

## Hyperedges (group relationships)

- **Creative Engines System** — sequence_engine, recaman_rule, fibonacci_rule, zustand_state_management [INFERRED 0.75]
- **Sequence Renderer Contract** — sequence_rule_interface, visualization_interface, adding_sequence_rule_guide, adding_visualization_guide [INFERRED 0.75]
- **Emergence-Complexite Notebook Visuals** — TheOneVisual, SuccessorVisual, ZeroVisual, IntegersVisual, DivisionVisual, RotationCycle, NotebookHero, FigureComponent, MathBox, StepDivider [INFERRED 0.90]
- **Card Component Family** — BaseCard, DocCard, ExperimentCard [INFERRED 0.90]
- **Number System Evolution Narrative** — emergence-complexite_the-naturals, emergence-complexite_the-rationals, emergence-complexite_the-nested-sets-diagram, emergence-complexite_the-transgression, emergence-complexite_the-imaginary-unit, emergence-complexite_the-complex-plane, emergence-complexite_the-masterpiece [INFERRED 0.90]
- **Growth Function Illustrations** — emergence-complexite_the-exponentiation, emergence-complexite_the-logarithm, emergence-complexite_the-linear-vs-logarithmic-growth [INFERRED 0.90]
- **Number Tower Visualizations** — number_expansion_tower, masterpiece_svg, text_svg, graphic_svg, emergence_complexite_notebook [INFERRED 0.85]
- **Sequence Rule Implementations** — sequencerule_interface, recaman_rule, fibonacci_rule, primes_rule, triangular_rule, collatz_rule [EXTRACTED 1.00]

## Communities (85 total, 37 thin omitted)

### Community 0 - "Graph Viz & Palette Store"

Cohesion: 0.07
Nodes (38): COMMUNITY_PALETTE, ColorMode, FT_COLOR, GraphData, GraphStats, RAW_GRAPH, REL_COLORS, RawHyperedge (+30 more)

### Community 1 - "Content & Layout Components"

Cohesion: 0.11
Nodes (31): Base Card, BaseLayout, Project Categories, Doc Category Metadata, Notebook Category Metadata, Content Collections, Doc Card, Doc Navigation (+23 more)

### Community 2 - "ESLint Configuration"

Cohesion: 0.07
Nodes (30): defineConfig, eslint/config, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, eslint-plugin-storybook, globalIgnores, globals (+22 more)

### Community 3 - "Package Dependencies"

Cohesion: 0.07
Nodes (29): dependencies, class-variance-authority, clsx, lucide-react, react, react-dom, tailwind-merge, exports (+21 more)

### Community 4 - "Astro Pages"

Cohesion: 0.14
Nodes (14): ../../../components/ui/cards/experiment-card.astro, ../../components/ui/features/hero.astro, ../../layouts/base-layout.astro, @repo/graph-viz, @repo/image-to-particles, canonicalURL, @repo/mosaic-maker, @repo/palette-generator (+6 more)

### Community 5 - "Math SVG Components"

Cohesion: 0.11
Nodes (9): ./figure.astro, resizeCanvas(), canvas, ctx, particles, resize(), nodes, ./canvas-utils (+1 more)

### Community 6 - "Color Space Tools"

Cohesion: 0.12
Nodes (27): colorjs.io, analogous rule, App, color utils, ColorSpaceCanvas, ColorSpaceControls, colorSpaces, complementary rule (+19 more)

### Community 7 - "Playground Config"

Cohesion: 0.08
Nodes (26): paletteSchema, dependencies, astro, @astrojs/check, @astrojs/mdx, @astrojs/react, lucide-react, react (+18 more)

### Community 8 - "Formatting & Linting"

Cohesion: 0.08
Nodes (23): devDependencies, eslint, eslint-plugin-astro, prettier, prettier-plugin-astro, prettier-plugin-tailwindcss, sharp, @typescript-eslint/parser (+15 more)

### Community 9 - "Doc Navigation"

Cohesion: 0.09
Nodes (23): BaseLayout, Book (lucide-react), CATEGORY_METADATA, Code (lucide-react), DocCard, DocNav, docs (Astro content collection), src/data/docs.ts (+15 more)

### Community 10 - "Number Systems"

Cohesion: 0.22
Nodes (17): Complex Numbers ℂ, Division, Imaginary Unit i, Integers ℤ, Natural Numbers ℕ, Rational Numbers ℚ, Real Numbers ℝ, SVG Node (+9 more)

### Community 11 - "Content Collections"

Cohesion: 0.15
Nodes (10): docSchema, categoriesIds, CATEGORY_METADATA, CategoryId, getNotesByCategory(), notebookSchema, collections, docs (+2 more)

### Community 12 - "Doc Cards & Nav"

Cohesion: 0.19
Nodes (12): ./base-card.astro, ../../components/ui/cards/doc-card.astro, ../../components/ui/docs/doc-nav.astro, formattedType, { Icon }, CATEGORY_METADATA, CategoryId, categoryIds (+4 more)

### Community 13 - "Palette Generation"

Cohesion: 0.18
Nodes (14): addPalette, Analogous, colorSpaces, Complementary, generatePalette, HSL, Monochromatic, OKLab (+6 more)

### Community 14 - "Project Documentation"

Cohesion: 0.18
Nodes (13): Adding Projects Guide, Collatz, Engines Documentation, Fibonacci Rule, Monorepo Architecture, Overview Documentation, Primes, Recamán Rule (+5 more)

### Community 15 - "Card Stories"

Cohesion: 0.15
Nodes (12): Card Accent Story, Card Ghost Story, Card Muted Story, Card Outline Story, Card Primary Story, Card Secondary Story, Card, CardContent (+4 more)

### Community 16 - "Input Stories"

Cohesion: 0.15
Nodes (12): Input, Input Accent Story, Input Destructive Story, Input Disabled Story, Input WithEndIcon Story, Input Ghost Story, Input Loading Story, Input Outline Story (+4 more)

### Community 17 - "Notebook Math Pages"

Cohesion: 0.24
Nodes (12): Callout, The Emergence of Complexity, Figure, Hero, ResizeCanvas, SVG Node, The Nested Sets, The Rationals (+4 more)

### Community 18 - "Canvas & Visual Utilities"

Cohesion: 0.38
Nodes (11): Canvas Utilities, Common Animations CSS, The Division Visual, Figure Component, The Integers Visual, Notebook Hero, Rotation Cycle, Successor Visual (+3 more)

### Community 19 - "Storybook Config"

Cohesion: 0.24
Nodes (7): @storybook/addon-themes, Gruvbox Theme, @repo/storybook, Dark Theme, Live Storybook URL, .storybook/manager.ts, .storybook/preview.tsx

### Community 20 - "Landing Page Sections"

Cohesion: 0.29
Nodes (5): ../components/ui/docs/featured-docs.astro, ../../components/ui/features/section-header.astro, ../components/ui/features/stats.astro, ../components/ui/projects/featured-projects.astro, featuredProjects

### Community 21 - "Footer & Error Pages"

Cohesion: 0.22
Nodes (6): ../../layouts/footer.astro, [], credits, date, formatedDate, options

### Community 22 - "Clean Script"

Cohesion: 0.22
Nodes (9): CONFIRM_TOKEN, child_process, pnpm, process, readline, run, Clean Script, spawnSync (+1 more)

### Community 23 - "Number Philosophy"

Cohesion: 0.33
Nodes (9): Cardano and Bombelli, The Emergence of Complexity, Euler's Identity, Nested Number Systems Diagram, Imaginary Unit i, The Classical Tower of Numbers, Number Expansion Tower (1→ℕ→ℤ→ℚ→ℝ→ℂ), What if we reversed that? (+1 more)

### Community 24 - "Sequence Rules"

Cohesion: 0.22
Nodes (8): collatzRule, fibonacciRule, NextStepParams, primesRule, recamanRule, SequenceRule, sequencesRule, triangularRule

### Community 25 - "Button Stories"

Cohesion: 0.22
Nodes (8): Button Accent Story, Button Destructive Story, Button Ghost Story, Button Loading Story, Button Outline Story, Button Primary Story, Button Secondary Story, Button

### Community 26 - "Tile Layout CSS"

Cohesion: 0.43
Nodes (8): CSS_VARS, computeDimension, computeGap, computeNumberOfTiles, computeTileHeight, computeTileWidth, getComputedPropertyValue, parseNumericValue

### Community 28 - "Storybook Testing"

Cohesion: 0.29
Nodes (6): @storybook/addon-vitest, @tailwindcss/vite, @vitejs/plugin-react, @vitest/browser-playwright, Playwright, Vitest

### Community 29 - "Growth & Logarithms"

Cohesion: 0.40
Nodes (6): Exponentiation, Linear vs Logarithmic Growth, Logarithm, The Exponent, The Growth, The Logarithm

### Community 30 - "Storybook Addons"

Cohesion: 0.40
Nodes (5): @storybook/addon-a11y, @chromatic-com/storybook, @storybook/addon-docs, @storybook/react-vite, .storybook/main.ts

### Community 31 - "TypeScript Configs"

Cohesion: 0.40
Nodes (5): node types, storybook/tsconfig.json, storybook/tsconfig.app.json, storybook/tsconfig.node.json, vite/client types

### Community 32 - "Number Set Diagrams"

Cohesion: 0.67
Nodes (4): The Full Architecture of Numbers — Euler's Identity, Natural Numbers (ℕ) — Discrete Points on a Line, Nested Number Sets (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ), Rational Numbers (ℚ) — The Dense Number Line

### Community 33 - "Random Utilities"

Cohesion: 0.50
Nodes (4): getRandom, getRandomValue, shuffleArray, shuffleObject

### Community 34 - "Palette Utilities"

Cohesion: 1.00
Nodes (3): Palette, arePalettesEqual, getPaletteId

### Community 35 - "Visualization Guides"

Cohesion: 0.67
Nodes (3): Adding Visualization Guide, First Visualization Tutorial, Visualization Interface

### Community 36 - "Growth Charts"

Cohesion: 1.00
Nodes (3): Exponential Growth (10ⁿ), Linear vs Logarithmic Growth — Animated Canvas Chart, Logarithmic vs Exponential Growth

### Community 37 - "Complex Plane"

Cohesion: 1.00
Nodes (3): The Complex Plane — Z = 3 + 2i, The Imaginary Unit (i) — 90° Rotation, The Transgression (ℝ → ℂ) — x² + 1 = 0

### Community 39 - "Tailwind CSS"

Cohesion: 0.67
Nodes (3): tailwindcss, Tailwind CSS, tailwindcss

### Community 40 - "Root TSConfigs"

Cohesion: 0.67
Nodes (3): tsconfig (app), tsconfig (node), tsconfig

## Knowledge Gaps

- **283 isolated node(s):** `isVercel`, `name`, `type`, `version`, `node` (+278 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Playground Config` to `Formatting & Linting`, `Color Space Tools`, `Tailwind CSS`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `Tailwind CSS` connect `Tailwind CSS` to `Storybook Config`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `@repo/storybook` connect `Storybook Config` to `Card Stories`, `Input Stories`, `Button Stories`, `Storybook Testing`, `Storybook Addons`, `TypeScript Configs`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **What connects `isVercel`, `name`, `type` to the rest of the system?**
  _283 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Graph Viz & Palette Store` be split into smaller, more focused modules?**
  _Cohesion score 0.06970128022759602 - nodes in this community are weakly interconnected._
- **Should `Content & Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.1053763440860215 - nodes in this community are weakly interconnected._
- **Should `ESLint Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
