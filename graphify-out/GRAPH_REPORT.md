# Graph Report - .  (2026-05-19)

## Corpus Check
- 194 files · ~131,711 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1013 nodes · 1297 edges · 88 communities (76 shown, 12 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Components|UI Components]]
- [[_COMMUNITY_Astro Pages & Content|Astro Pages & Content]]
- [[_COMMUNITY_Color Space Controls|Color Space Controls]]
- [[_COMMUNITY_Package Dependencies (ui)|Package Dependencies (ui)]]
- [[_COMMUNITY_Package Dependencies (image-to-particles)|Package Dependencies (image-to-particles)]]
- [[_COMMUNITY_Package Dependencies (mosaic-maker)|Package Dependencies (mosaic-maker)]]
- [[_COMMUNITY_Package Dependencies (palette-generator)|Package Dependencies (palette-generator)]]
- [[_COMMUNITY_Sequence Generation Rules|Sequence Generation Rules]]
- [[_COMMUNITY_Package Dependencies (dev configs)|Package Dependencies (dev configs)]]
- [[_COMMUNITY_ESLint & Graph Config|ESLint & Graph Config]]
- [[_COMMUNITY_Turbo Pipeline Config|Turbo Pipeline Config]]
- [[_COMMUNITY_Docs Schema|Docs Schema]]
- [[_COMMUNITY_Content Type System|Content Type System]]
- [[_COMMUNITY_Astro ESLint Stack|Astro ESLint Stack]]
- [[_COMMUNITY_ESLint Plugin Config|ESLint Plugin Config]]
- [[_COMMUNITY_TypeScript Base Config|TypeScript Base Config]]
- [[_COMMUNITY_Astro Runtime Dependencies|Astro Runtime Dependencies]]
- [[_COMMUNITY_Navbar Components|Navbar Components]]
- [[_COMMUNITY_Palette Fetching Utils|Palette Fetching Utils]]
- [[_COMMUNITY_UI Component Catalog|UI Component Catalog]]
- [[_COMMUNITY_Monorepo Architecture|Monorepo Architecture]]
- [[_COMMUNITY_Mosaic Controls|Mosaic Controls]]
- [[_COMMUNITY_Dev Container Config|Dev Container Config]]
- [[_COMMUNITY_Sequence Visualizations|Sequence Visualizations]]
- [[_COMMUNITY_TypeScript App Config|TypeScript App Config]]
- [[_COMMUNITY_Particle System|Particle System]]
- [[_COMMUNITY_PostCSS & Tailwind Config|PostCSS & Tailwind Config]]
- [[_COMMUNITY_PieChart Web Component|PieChart Web Component]]
- [[_COMMUNITY_Package Scripts|Package Scripts]]
- [[_COMMUNITY_Mosaic Store State|Mosaic Store State]]
- [[_COMMUNITY_Mosaic Default Config|Mosaic Default Config]]
- [[_COMMUNITY_UI Component Variants|UI Component Variants]]
- [[_COMMUNITY_Root Package Config|Root Package Config]]
- [[_COMMUNITY_Mosaic Style Utils|Mosaic Style Utils]]
- [[_COMMUNITY_Sequence Renderer Package|Sequence Renderer Package]]
- [[_COMMUNITY_TypeScript Library Config|TypeScript Library Config]]
- [[_COMMUNITY_Tile System|Tile System]]
- [[_COMMUNITY_Footer & Palette Helpers|Footer & Palette Helpers]]
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
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
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
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 32 edges
2. `compilerOptions` - 22 edges
3. `../../../../layouts/base-layout.astro` - 21 edges
4. `Overview` - 18 edges
5. `Creative Playground` - 16 edges
6. `@repo/ui` - 16 edges
7. `Engines` - 15 edges
8. `scripts` - 13 edges
9. `../../../components/ui/experiment-card/index.astro` - 12 edges
10. `useMosaicStore` - 11 edges

## Surprising Connections (you probably didn't know these)
- `pnpm --filter Convention` --conceptually_related_to--> `Creative Playground`  [INFERRED]
  AGENTS.md → README.md
- `Knowledge Graph Visualization` --conceptually_related_to--> `Creative Playground`  [INFERRED]
  apps/playground/public/graphify/graph.html → README.md
- `@repo/tailwind-config` --conceptually_related_to--> `Creative Playground`  [INFERRED]
  packages/tailwind-config/README.md → README.md
- `@repo/eslint-config` --conceptually_related_to--> `Creative Playground`  [INFERRED]
  packages/eslint-config/README.md → README.md
- `@repo/typescript-config` --conceptually_related_to--> `Creative Playground`  [INFERRED]
  packages/typescript-config/README.md → README.md

## Hyperedges (group relationships)
- **Creative Playground Engines** — readme_mosaic_maker, readme_sequence_renderer, readme_palette_generator, readme_image_to_particles [EXTRACTED 1.00]
- **Sequence Renderer Rules** — explanation_engines_recamanrule, explanation_engines_fibonaccirule, explanation_engines_primesrule, explanation_engines_triangularrule, explanation_engines_collatzrule [EXTRACTED 1.00]
- **Sequence Renderer Visualizations** — explanation_engines_linegraphviz, explanation_engines_scatterplotviz, explanation_engines_barsviz [EXTRACTED 1.00]
- **Data Processing Pipeline** — howto_adding_sequence_rule_seqenceruleinterface, howto_adding_visualization_visualizationinterface, explanation_engines_seqpattern [INFERRED 0.85]
- **Creative Playground Monorepo Components** — explanation_overview_appsplayground, explanation_overview_appsstorybook, explanation_overview_packagesui, explanation_overview_packagesmosaicmaker, explanation_overview_packagessequencerenderer, explanation_overview_packagespalettegenerator, explanation_overview_packagesimagetoparticles, explanation_overview_packagestailwindconfig [EXTRACTED 1.00]
- **Creative Playground Design Principles** — explanation_overview_stableshell, explanation_overview_statelessfirst, explanation_overview_composableui [EXTRACTED 1.00]
- **ESLint Config Variants** — eslint_config_readme_base, eslint_config_readme_react_internal, eslint_config_readme_astro, eslint_config_readme_storybook [EXTRACTED 1.00]
- **TypeScript Config Variants** — typescript_config_readme_base, typescript_config_readme_react_library, typescript_config_readme_astro, typescript_config_readme_vite [EXTRACTED 1.00]
- **Actions Components** — ui_button [EXTRACTED 1.00]
- **Forms Components** — ui_input, ui_slider, ui_switch, ui_select, ui_label [EXTRACTED 1.00]
- **Layout Components** — ui_card, ui_sidebar, ui_breadcrumb [EXTRACTED 1.00]
- **Widgets Components** — ui_colorpalette, ui_callout, ui_doccard [EXTRACTED 1.00]

## Communities (88 total, 12 thin omitted)

### Community 0 - "UI Components"
Cohesion: 0.06
Nodes (44): Badge(), BadgeProps, BadgeVariant, badgeVariants, Button(), ButtonProps, buttonVariants, Card() (+36 more)

### Community 1 - "Astro Pages & Content"
Cohesion: 0.07
Nodes (37): ../../../../components/data-viz/piechart/piechart.astro, ../../components/ui/doc-card/index.astro, ../../components/ui/docs-nav/index.astro, ../../../components/ui/experiment-card/index.astro, ../../components/ui/section-header/index.astro, ../../../../layouts/base-layout.astro, ../../layouts/docs/docs-layout.astro, docSchema (+29 more)

### Community 2 - "Color Space Controls"
Cohesion: 0.08
Nodes (31): ColorSpaceCanvas(), ColorSpaceCanvasProps, ColorSliceProps, ColorSpaceControls(), Controls(), Axis, ColorSpaceDef, colorSpaces (+23 more)

### Community 3 - "Package Dependencies (ui)"
Cohesion: 0.05
Nodes (38): default, dependencies, class-variance-authority, clsx, @repo/ui, tailwind-merge, zod, zustand (+30 more)

### Community 4 - "Package Dependencies (image-to-particles)"
Cohesion: 0.05
Nodes (38): default, dependencies, class-variance-authority, clsx, @repo/ui, tailwind-merge, zod, zustand (+30 more)

### Community 5 - "Package Dependencies (mosaic-maker)"
Cohesion: 0.06
Nodes (36): default, dependencies, class-variance-authority, clsx, lucide-react, tailwind-merge, devDependencies, eslint (+28 more)

### Community 6 - "Package Dependencies (palette-generator)"
Cohesion: 0.06
Nodes (36): default, dependencies, class-variance-authority, colorjs.io, @repo/ui, zustand, devDependencies, eslint (+28 more)

### Community 7 - "Sequence Generation Rules"
Cohesion: 0.10
Nodes (25): SequenceSelector(), generateSequence(), collatzRule, fibonacciRule, NextStepParams, primesRule, recamanRule, SequenceRule (+17 more)

### Community 8 - "Package Dependencies (dev configs)"
Cohesion: 0.06
Nodes (32): default, dependencies, @repo/ui, devDependencies, eslint, @repo/eslint-config, @repo/tailwind-config, @repo/typescript-config (+24 more)

### Community 9 - "ESLint & Graph Config"
Cohesion: 0.07
Nodes (33): pnpm --filter Convention, ESLint Astro Config, ESLint Base Config, @repo/eslint-config, ESLint React Internal Config, ESLint Storybook Config, vis-network, Knowledge Graph Visualization (+25 more)

### Community 10 - "Turbo Pipeline Config"
Cohesion: 0.06
Nodes (30): dependsOn, inputs, outputs, inputs, dependsOn, cache, dependsOn, persistent (+22 more)

### Community 11 - "Docs Schema"
Cohesion: 0.08
Nodes (25): type, default, type, default, type, enum, type, default (+17 more)

### Community 12 - "Content Type System"
Cohesion: 0.08
Nodes (23): AllValuesOf, CollectionEntry, CollectionKey, ContentConfig, DataEntryMap, ExtractCollectionFilterType, ExtractEntryFilterType, ExtractErrorType (+15 more)

### Community 13 - "Astro ESLint Stack"
Cohesion: 0.08
Nodes (24): devDependencies, astro-eslint-parser, @astrojs/check, autoprefixer, eslint, @eslint/js, eslint-plugin-astro, eslint-plugin-jsx-a11y (+16 more)

### Community 14 - "ESLint Plugin Config"
Cohesion: 0.08
Nodes (23): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-astro, eslint-plugin-jsx-a11y, eslint-plugin-only-warn, eslint-plugin-react (+15 more)

### Community 15 - "TypeScript Base Config"
Cohesion: 0.08
Nodes (23): compilerOptions, declaration, declarationMap, esModuleInterop, exactOptionalPropertyTypes, forceConsistentCasingInFileNames, isolatedModules, lib (+15 more)

### Community 16 - "Astro Runtime Dependencies"
Cohesion: 0.10
Nodes (21): dependencies, astro, @astrojs/react, @astrojs/ts-plugin, babel-plugin-react-compiler, class-variance-authority, lucide-react, react (+13 more)

### Community 17 - "Navbar Components"
Cohesion: 0.12
Nodes (12): ./MobileMenu.astro, ./MobileMenuToggle.astro, mainRoutes, [], githubButton, isLinkActive(), isTopLevelActive(), menuIconClose (+4 more)

### Community 18 - "Palette Fetching Utils"
Cohesion: 0.16
Nodes (14): Palette, generateTileRotation(), CachedPalettes, cachePalettes(), colorNames, fetchPalettes(), getCachedPalettes(), isCacheValid() (+6 more)

### Community 19 - "UI Component Catalog"
Cohesion: 0.12
Nodes (17): Breadcrumb, Button, Callout, Card, ColorPalette, Creative Playground, CVA (Class Variance Authority), DocCard (+9 more)

### Community 20 - "Monorepo Architecture"
Cohesion: 0.17
Nodes (16): apps/playground, apps/storybook, Composable UI, Creative Playground, Overview, Monorepo Architecture, packages/image-to-particles, packages/mosaic-maker (+8 more)

### Community 21 - "Mosaic Controls"
Cohesion: 0.20
Nodes (8): Controls(), PaletteControls(), Props, SliderControls(), TileSetControls(), updateCurrentPalettes(), useMosaicStore, @repo/ui

### Community 22 - "Dev Container Config"
Cohesion: 0.13
Nodes (14): appPorts, build, context, dockerfile, containerName, containerUser, forwardPorts, initializeCommand (+6 more)

### Community 23 - "Sequence Visualizations"
Cohesion: 0.16
Nodes (15): Bars, Collatz Rule, Engines, Fibonacci Rule, Line Graph Visualization, Pluggable Architecture, Primes Rule, Recamán Rule (+7 more)

### Community 24 - "TypeScript App Config"
Cohesion: 0.14
Nodes (13): compilerOptions, isolatedModules, jsx, jsxImportSource, module, moduleResolution, plugins, skipLibCheck (+5 more)

### Community 25 - "Particle System"
Cohesion: 0.24
Nodes (10): INITIAL_VELOCITY, PARTICLE_SIZE, calculateImageDimensions(), drawImageToCanvas(), ImageDimensions, initParticles(), Particle, useImageUpload() (+2 more)

### Community 26 - "PostCSS & Tailwind Config"
Cohesion: 0.14
Nodes (13): devDependencies, postcss, tailwindcss, exports, ./gruvbox, ./material, ./postcss, name (+5 more)

### Community 27 - "PieChart Web Component"
Cohesion: 0.18
Nodes (3): PieChart, Point, strToDom()

### Community 28 - "Package Scripts"
Cohesion: 0.17
Nodes (12): scripts, astro, build, check-types, clean, deploy:vercel, dev, format (+4 more)

### Community 29 - "Mosaic Store State"
Cohesion: 0.24
Nodes (10): computeInitialTiles(), initPalettes(), MosaicState, setMosaicRef(), setPaletteStock(), TileInstance, updatePalette(), _updateTiles() (+2 more)

### Community 30 - "Mosaic Default Config"
Cohesion: 0.20
Nodes (9): CSS_VARS, defaultGapSize, defaultPalette, defaultRotations, defaultTileSet, defaultTileSize, TileNames, TileSet (+1 more)

### Community 31 - "UI Component Variants"
Cohesion: 0.20
Nodes (10): Badge, Card, ColorPalette, UI Components, Input, Label, Select, Sidebar (+2 more)

### Community 32 - "Root Package Config"
Cohesion: 0.20
Nodes (8): engines, node, license, name, packageManager, private, type, version

### Community 33 - "Mosaic Style Utils"
Cohesion: 0.42
Nodes (9): computeDimension(), ComputedStyles, computeGap(), computeNumberOfTiles(), computeTileHeight(), computeTileWidth(), getComputedPropertyValue(), parseNumericValue() (+1 more)

### Community 34 - "Sequence Renderer Package"
Cohesion: 0.22
Nodes (8): license, name, private, publishConfig, access, scripts, format, version

### Community 35 - "TypeScript Library Config"
Cohesion: 0.25
Nodes (7): compilerOptions, jsx, lib, module, moduleResolution, extends, $schema

### Community 36 - "Tile System"
Cohesion: 0.32
Nodes (5): Shape, TILE_REGISTRY, TileDefinition, Props, Tile()

### Community 37 - "Footer & Palette Helpers"
Cohesion: 0.32
Nodes (6): ../components/ui/footer-links/index.astro, [], credits, utilityLinks, arePalettesEqual(), getPaletteId()

### Community 39 - "Community 39"
Cohesion: 0.47
Nodes (3): config, config, config

### Community 40 - "Community 40"
Cohesion: 0.33
Nodes (6): Rule→Sequence→Visualization→Canvas, Data Flow Pipeline, SequenceRule Interface, Your First Visualization, Line Graph, Sequence Renderer

### Community 41 - "Community 41"
Cohesion: 0.40
Nodes (4): dependsOn, extends, tasks, check-types

### Community 42 - "Community 42"
Cohesion: 0.40
Nodes (4): compilerOptions, outDir, extends, include

### Community 43 - "Community 43"
Cohesion: 0.40
Nodes (4): dependsOn, extends, tasks, check-types

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (4): compilerOptions, outDir, extends, include

### Community 45 - "Community 45"
Cohesion: 0.40
Nodes (4): compilerOptions, outDir, extends, include

### Community 46 - "Community 46"
Cohesion: 0.40
Nodes (4): dependsOn, extends, tasks, check-types

### Community 47 - "Community 47"
Cohesion: 0.40
Nodes (4): compilerOptions, outDir, extends, include

### Community 48 - "Community 48"
Cohesion: 0.40
Nodes (4): compilerOptions, outDir, extends, include

### Community 49 - "Community 49"
Cohesion: 0.40
Nodes (4): dependsOn, extends, tasks, build

### Community 50 - "Community 50"
Cohesion: 0.50
Nodes (3): data, expires, version

### Community 51 - "Community 51"
Cohesion: 0.50
Nodes (4): CVA Variants, Adding Components, MyComponent, Button

### Community 52 - "Community 52"
Cohesion: 0.50
Nodes (3): data, expires, version

### Community 53 - "Community 53"
Cohesion: 0.50
Nodes (3): Dimensions, useResizeObserver(), MosaicDisplay()

### Community 58 - "Community 58"
Cohesion: 0.67
Nodes (3): Import and Export Strategy, ESM Path Suffix Convention, Explicit Named Exports

## Knowledge Gaps
- **532 isolated node(s):** `private`, `license`, `deploy:vercel`, `build`, `dev` (+527 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Astro Runtime Dependencies` to `Root Package Config`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `react` connect `Astro Runtime Dependencies` to `Astro Pages & Content`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `react` connect `Package Dependencies (dev configs)` to `Astro Pages & Content`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `private`, `license`, `deploy:vercel` to the rest of the system?**
  _539 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05583972719522592 - nodes in this community are weakly interconnected._
- **Should `Astro Pages & Content` be split into smaller, more focused modules?**
  _Cohesion score 0.06656426011264721 - nodes in this community are weakly interconnected._
- **Should `Color Space Controls` be split into smaller, more focused modules?**
  _Cohesion score 0.07624113475177305 - nodes in this community are weakly interconnected._