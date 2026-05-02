# Graph Report - .  (2026-05-02)

## Corpus Check
- Corpus is ~41,066 words - fits in a single context window. You may not need a graph.

## Summary
- 368 nodes · 428 edges · 39 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Mosaic Maker Core|Mosaic Maker Core]]
- [[_COMMUNITY_UI Component Library|UI Component Library]]
- [[_COMMUNITY_Palette Generator Forms|Palette Generator Forms]]
- [[_COMMUNITY_CVA Variant System|CVA Variant System]]
- [[_COMMUNITY_Sequence Renderer Core|Sequence Renderer Core]]
- [[_COMMUNITY_AI Usage Tracker|AI Usage Tracker]]
- [[_COMMUNITY_Architecture Patterns|Architecture Patterns]]
- [[_COMMUNITY_Mosaic Maker Controls|Mosaic Maker Controls]]
- [[_COMMUNITY_PieChart Web Component|PieChart Web Component]]
- [[_COMMUNITY_Image to Particles Pipeline|Image to Particles Pipeline]]
- [[_COMMUNITY_Sequence Renderer Components|Sequence Renderer Components]]
- [[_COMMUNITY_Content Collections|Content Collections]]
- [[_COMMUNITY_Color Picker System|Color Picker System]]
- [[_COMMUNITY_Particle Image Processing|Particle Image Processing]]
- [[_COMMUNITY_AI Usage CLI|AI Usage CLI]]
- [[_COMMUNITY_Monorepo Architecture|Monorepo Architecture]]
- [[_COMMUNITY_Mosaic Palette Controls|Mosaic Palette Controls]]
- [[_COMMUNITY_Component Patterns|Component Patterns]]
- [[_COMMUNITY_Robots.txt Route|Robots.txt Route]]
- [[_COMMUNITY_Astro Config|Astro Config]]
- [[_COMMUNITY_Robots.txt API|Robots.txt API]]
- [[_COMMUNITY_ESLint Config Chain|ESLint Config Chain]]
- [[_COMMUNITY_Particle Utils|Particle Utils]]
- [[_COMMUNITY_Image Upload Hook|Image Upload Hook]]
- [[_COMMUNITY_Sidebar Composite|Sidebar Composite]]
- [[_COMMUNITY_Form Components|Form Components]]
- [[_COMMUNITY_Design System|Design System]]
- [[_COMMUNITY_Config Consumers|Config Consumers]]
- [[_COMMUNITY_Build Configuration|Build Configuration]]
- [[_COMMUNITY_Controls Subcomponents|Controls Subcomponents]]
- [[_COMMUNITY_Tile Rendering|Tile Rendering]]
- [[_COMMUNITY_Store Actions|Store Actions]]
- [[_COMMUNITY_Palette Management|Palette Management]]
- [[_COMMUNITY_State Management|State Management]]
- [[_COMMUNITY_Component Composition|Component Composition]]
- [[_COMMUNITY_Sequence Engine|Sequence Engine]]
- [[_COMMUNITY_Shared Infrastructure|Shared Infrastructure]]
- [[_COMMUNITY_Component Variant Pattern|Component Variant Pattern]]
- [[_COMMUNITY_ESLint Chain|ESLint Chain]]

## God Nodes (most connected - your core abstractions)
1. `cn CSS Class Merge Utility` - 14 edges
2. `UI Package Entry Point` - 12 edges
3. `trackUsage()` - 9 edges
4. `Zustand State Store for Mosaic` - 9 edges
5. `ImageToParticles React Component` - 8 edges
6. `Controls Panel Component` - 8 edges
7. `Core Configuration Constants` - 8 edges
8. `PieChart` - 7 edges
9. `Particle Physics and Canvas Constants` - 7 edges
10. `Sidebar Widget Component` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AI Usage Tracker Implementation Plan` --references--> `D3 + React integration pattern`  [INFERRED]
  PLAN.md → packages/ai-usage-tracker/src/visualization/charts.tsx
- `AI Usage Tracker Implementation Plan` --conceptually_related_to--> `ai-usage-tracker main exports (index.ts)`  [INFERRED]
  PLAN.md → packages/ai-usage-tracker/src/index.ts
- `AI Usage Tracker Implementation Plan` --references--> `Tracking types (UsageRecord, BudgetConfig, SessionData)`  [INFERRED]
  PLAN.md → packages/ai-usage-tracker/src/tracking/types.ts
- `Tracking API (initTracker, trackUsage, getUsageData, getBudgets, setBudget)` --implements--> `File-based JSON storage (~/.ai-usage-tracker/)`  [INFERRED]
  packages/ai-usage-tracker/src/tracking/index.ts → PLAN.md
- `Zustand usageStore` --implements--> `Zustand state management pattern`  [INFERRED]
  packages/ai-usage-tracker/src/visualization/store.ts → apps/playground/src/content/docs/explanation/engines.md

## Hyperedges (group relationships)
- **Astro Application Configuration** — astro_config_mjs, eslint_config_mjs, content_config_ts, env_d_ts [INFERRED 0.80]
- **Data Visualization Components** — piechart_ts, piechart_ts_class_Point, piechart_ts_class_PieChart, projects_ts_projects [INFERRED 0.75]
- **Content Management System** — content_config_ts, docs_ts, docs_ts_docSchema, docs_ts_TAG_METADATA, concept_divio_taxonomy [INFERRED 0.85]
- **ESLint Configuration Inheritance Chain** — eslint_config_base, eslint_config_react_internal, eslint_config_mjs_image_to_particles [EXTRACTED 1.00]
- **Particle Animation Pipeline** — index_ImageToParticles, entity_calculateImageDimensions, entity_drawImageToCanvas, entity_initParticles, entity_animate [EXTRACTED 1.00]
- **Particle Physics Configuration** — core_config_image_to_particles, core_utils_image_to_particles, index_ImageToParticles [EXTRACTED 1.00]
- **Particle Interface Dual Definitions** — entity_Particle_interface_index, entity_Particle_interface_utils [EXTRACTED 1.00]
- **Particle Reset and Replay** — entity_resetParticles, core_config_image_to_particles, entity_Particle_interface_index [INFERRED 0.80]
- **Controls Panel Subcomponents** — Controls, PaletteControls, SliderControls, TileSetControls [EXTRACTED 1.00]
- **Tile Rendering Pipeline** — MosaicDisplay, Tile, ShapeRenderer, tile_registry [EXTRACTED 1.00]
- **Store Action Functions** — useMosaicStore, fetch_palettes, style_utils, utils_mosaic [EXTRACTED 1.00]
- **Config Constants Consumers** — config_mosaic, Controls, TileSetControls, MosaicDisplay, useMosaicStore, fetch_palettes, palette_utils, style_utils [EXTRACTED 1.00]
- **Palette Management Flow** — fetch_palettes, useMosaicStore, palette_utils, PaletteControls [INFERRED 0.85]
- **Palette Generator Application Composition** — index_PaletteGenerator, paletteContext, ColorPicker, Generators, PaletteDisplay [EXTRACTED 1.00]
- **Palette Generator Form Components** — Generators, AnalogousForm, ComplementaryForm, MonochromaticForm, XadicForm [EXTRACTED 1.00]
- **Sequence Rules Collection** — rules_recamanRule, rules_sequencesRule [EXTRACTED 1.00]
- **Visualization Registry** — visualizations_recamanArcs, visualizations_index [EXTRACTED 1.00]
- **Zustand State Management Layer** — store_useSequenceStore, generator_generateSequence [EXTRACTED 1.00]
- **Component Composition Tree** — index_SequenceRenderer, controls_SequenceControls, controls_SequenceSelector, display_SequenceDisplay, renderer_CanvasRenderer [EXTRACTED 1.00]
- **CVA Component-Variant Pattern** — badge_Badge, badge_badgeVariants, button_Button, button_buttonVariants, card_Card, card_cardVariants, input_Input, input_inputVariants, label_Label, label_labelVariants, select_Select, select_selectVariants, slider_Slider, slider_sliderVariants, switch_Switch, switch_switchVariants, colorPalette_ColorPalette, sidebar_Sidebar, sidebar_sidebarVariants [EXTRACTED 1.00]
- **Sidebar Composite Widget** — sidebar_Sidebar, sidebar_SidebarContext, sidebar_SidebarMain, sidebar_SidebarPanel, sidebar_SidebarToggle [EXTRACTED 1.00]
- **Form Input Components** — input_Input, select_Select, slider_Slider, switch_Switch, label_Label [INFERRED 0.85]
- **Shared CVA Variant System** — badge_badgeVariants, button_buttonVariants, card_cardVariants, input_inputVariants, label_labelVariants, select_selectVariants, slider_sliderVariants, switch_switchVariants, sidebar_sidebarVariants [EXTRACTED 1.00]
- **UI Build Configuration Stack** — babel_config_ui, eslint_config_ui, postcss_config [INFERRED 0.75]
- **AI Usage Tracker Package** — ai_usage_tracker_index, tracking_types, tracking_index, visualization_store, visualization_charts, visualization_components, cli_index [EXTRACTED 1.00]
- **Tracking Layer (data persistence)** — tracking_types, tracking_index, File_based_storage, cli_index [EXTRACTED 1.00]
- **Visualization Layer (React + D3)** — visualization_store, visualization_charts, visualization_components, D3_React_integration, Zustand_pattern [EXTRACTED 1.00]
- **Sequence Renderer Engine** — SequenceRule, Visualization_interface, engines_doc, adding_sequence_rule_doc, adding_visualization_doc, first_viz_doc [EXTRACTED 1.00]
- **Shared Infrastructure Packages** — pnpm_workspace, eslint_config_ui, postcss_config [EXTRACTED 1.00]
- **Gruvbox Design System** — Gruvbox_theme, tailwind-config, ui_components_doc [INFERRED 0.90]
- **UI Component Patterns** — CVA_pattern, Explicit_named_exports, adding_components_doc [INFERRED 0.85]

## Communities

### Community 0 - "Mosaic Maker Core"
Cohesion: 0.09
Nodes (26): Controls(), computeInitialTiles(), generateTileRotation(), initPalettes(), setMosaicRef(), setPaletteStock(), updatePalette(), _updateTiles() (+18 more)

### Community 1 - "UI Component Library"
Cohesion: 0.06
Nodes (2): useSidebarContext(), SidebarPanel()

### Community 2 - "Palette Generator Forms"
Cohesion: 0.09
Nodes (14): usePaletteContext(), AnalogousForm(), ComplementaryForm(), MonochromaticForm(), XadicForm(), getPixelColor(), useColorPicker(), hexToHSL() (+6 more)

### Community 3 - "CVA Variant System"
Cohesion: 0.13
Nodes (26): Badge Component, Badge Variants Definition, Button Component, Button Variants Definition, Card Component, Card Variants Definition, ColorPalette Widget Component, useResizeObserver Hook (+18 more)

### Community 4 - "Sequence Renderer Core"
Cohesion: 0.14
Nodes (9): handleChange(), generateSequence(), generateInitial(), setSequenceRule(), setSteps(), findBiggestInterval(), calculateValueScale(), draw() (+1 more)

### Community 5 - "AI Usage Tracker"
Cohesion: 0.19
Nodes (14): getBudgets(), getUsageData(), initTracker(), loadData(), saveData(), setBudget(), trackUsage(), D3LineChart() (+6 more)

### Community 6 - "Architecture Patterns"
Cohesion: 0.19
Nodes (18): D3 + React integration pattern, File-based JSON storage (~/.ai-usage-tracker/), Pluggable architecture pattern, SequenceRule interface, Visualization interface (draw function), Zustand state management pattern, Adding a Sequence Rule guide, Adding a Visualization guide (+10 more)

### Community 7 - "Mosaic Maker Controls"
Cohesion: 0.28
Nodes (15): Controls Panel Component, Mosaic Display Container, Palette Selection Controls, SVG Shape Renderer Sub-component, Slider Control for CSS Variables, Tile SVG Component, Tile Set Toggle Controls, Core Configuration Constants (+7 more)

### Community 8 - "PieChart Web Component"
Cohesion: 0.18
Nodes (3): PieChart, Point, strToDom()

### Community 9 - "Image to Particles Pipeline"
Cohesion: 0.23
Nodes (13): Babel Configuration with React Compiler, Particle Physics and Canvas Constants, Image and Particle Utility Functions, ImageDimensions Interface, Particle Interface (index.tsx), Particle Interface (utils.ts), animate Animation Loop, calculateImageDimensions Function (+5 more)

### Community 10 - "Sequence Renderer Components"
Cohesion: 0.18
Nodes (13): Controls UI Component, Sequence Selector Dropdown, Sequence Display Container, Sequence Generation Function, SequenceRenderer Root Component, Find Biggest Interval Utility, Canvas Rendering Component, SequenceRule Type Definition (+5 more)

### Community 11 - "Content Collections"
Cohesion: 0.21
Nodes (12): Diátaxis documentation taxonomy (tutorials, how-to, explanation, reference), Content Collection Configuration, Docs Data and Schema Definitions, TAG_METADATA for documentation categories, docSchema Zod validation schema, PieChart Web Component, PieChart custom element class, Point class (2D coordinate with SVG utilities) (+4 more)

### Community 12 - "Color Picker System"
Cohesion: 0.24
Nodes (11): AnalogousForm UI for analogous color generation, ColorPicker canvas-based interactive component, ComplementaryForm UI for complementary color generation, Generators container composes all palette generator forms, MonochromaticForm UI for monochromatic color generation, PaletteDisplay component renders palettes as colored divs, XadicForm UI for X-adic (evenly spaced) color generation, Pure color conversion utilities (RGB/HSL/Hex) (+3 more)

### Community 13 - "Particle Image Processing"
Cohesion: 0.28
Nodes (2): useImageUpload(), ImageToParticles()

### Community 14 - "AI Usage CLI"
Cohesion: 0.6
Nodes (5): loadBudgets(), loadData(), printBudgets(), printList(), printSummary()

### Community 15 - "Monorepo Architecture"
Cohesion: 0.33
Nodes (6): Data flow: User Action to Engine Rule to Data to Visualization to Canvas/DOM, Monorepo structure (apps/packages), Principle: Stable Shell / Volatile Engines, Overview documentation, pnpm workspace configuration, Creative Playground README

### Community 16 - "Mosaic Palette Controls"
Cohesion: 0.5
Nodes (2): arePalettesEqual(), getPaletteId()

### Community 18 - "Component Patterns"
Cohesion: 0.5
Nodes (4): CVA (class-variance-authority) variant pattern, Explicit named exports pattern (no export star), Adding Components guide, Import and Export Strategy reference

### Community 21 - "Robots.txt Route"
Cohesion: 1.0
Nodes (2): GET(), getRobotsTxt()

### Community 23 - "Astro Config"
Cohesion: 0.67
Nodes (3): Astro Configuration, Remark Base URL Plugin, remarkBaseUrl function

### Community 24 - "Robots.txt API"
Cohesion: 0.67
Nodes (3): Robots.txt API Route, GET API route handler, getRobotsTxt function

### Community 25 - "ESLint Config Chain"
Cohesion: 0.67
Nodes (3): Base ESLint Configuration, Image-to-Particles ESLint Config, React Internal ESLint Configuration

### Community 54 - "Particle Utils"
Cohesion: 1.0
Nodes (1): ESLint Configuration

### Community 55 - "Image Upload Hook"
Cohesion: 1.0
Nodes (1): TypeScript Environment Declarations

### Community 56 - "Sidebar Composite"
Cohesion: 1.0
Nodes (1): Babel Configuration with React Compiler

### Community 57 - "Form Components"
Cohesion: 1.0
Nodes (1): ESLint Configuration extending repo config

### Community 58 - "Design System"
Cohesion: 1.0
Nodes (1): Babel Configuration with React Compiler

### Community 59 - "Config Consumers"
Cohesion: 1.0
Nodes (1): ESLint Configuration extending repo preset

### Community 60 - "Build Configuration"
Cohesion: 1.0
Nodes (1): Generators barrel export

### Community 61 - "Controls Subcomponents"
Cohesion: 1.0
Nodes (1): Babel Configuration with React Compiler

### Community 62 - "Tile Rendering"
Cohesion: 1.0
Nodes (1): ESLint Configuration

### Community 63 - "Store Actions"
Cohesion: 1.0
Nodes (1): PostCSS Configuration

### Community 64 - "Palette Management"
Cohesion: 1.0
Nodes (1): Babel Configuration

### Community 65 - "State Management"
Cohesion: 1.0
Nodes (1): ESLint Configuration

### Community 67 - "Component Composition"
Cohesion: 1.0
Nodes (1): Playground Astro App README

### Community 68 - "Sequence Engine"
Cohesion: 1.0
Nodes (1): Graphify visualization (vis-network)

### Community 69 - "Shared Infrastructure"
Cohesion: 1.0
Nodes (1): Adding Projects guide

### Community 70 - "Component Variant Pattern"
Cohesion: 1.0
Nodes (1): UI Components reference

### Community 71 - "ESLint Chain"
Cohesion: 1.0
Nodes (1): Gruvbox design system theme

## Knowledge Gaps
- **56 isolated node(s):** `Astro Configuration`, `ESLint Configuration`, `Content Collection Configuration`, `TypeScript Environment Declarations`, `Project interface` (+51 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `UI Component Library`** (34 nodes): `CardDescription()`, `CardHeader()`, `Label()`, `Badge.tsx`, `badgeVariants.ts`, `Button.tsx`, `buttonVariants.ts`, `Card.tsx`, `cardVariants.ts`, `Input.tsx`, `inputVariants.ts`, `Label.tsx`, `labelVariants.ts`, `Select.tsx`, `selectVariants.ts`, `Slider.tsx`, `sliderVariants.ts`, `Switch.tsx`, `switchVariants.ts`, `ColorPalette.tsx`, `colorPaletteVariants.ts`, `Sidebar.tsx`, `SidebarContext.tsx`, `SidebarMain.tsx`, `SidebarPanel.tsx`, `SidebarToggle.tsx`, `sidebarVariants.ts`, `cn.ts`, `Sidebar()`, `useSidebarContext()`, `SidebarMain()`, `SidebarPanel()`, `handleChange()`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Particle Image Processing`** (9 nodes): `calculateImageDimensions()`, `drawImageToCanvas()`, `initParticles()`, `useImageUpload()`, `config.ts`, `utils.ts`, `use-image-upload.ts`, `index.tsx`, `ImageToParticles()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mosaic Palette Controls`** (5 nodes): `PaletteControls()`, `PaletteControls.tsx`, `palette-utils.ts`, `arePalettesEqual()`, `getPaletteId()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Robots.txt Route`** (3 nodes): `robots.txt.ts`, `GET()`, `getRobotsTxt()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Particle Utils`** (1 nodes): `ESLint Configuration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Image Upload Hook`** (1 nodes): `TypeScript Environment Declarations`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sidebar Composite`** (1 nodes): `Babel Configuration with React Compiler`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Components`** (1 nodes): `ESLint Configuration extending repo config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Design System`** (1 nodes): `Babel Configuration with React Compiler`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Config Consumers`** (1 nodes): `ESLint Configuration extending repo preset`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Build Configuration`** (1 nodes): `Generators barrel export`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Controls Subcomponents`** (1 nodes): `Babel Configuration with React Compiler`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tile Rendering`** (1 nodes): `ESLint Configuration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Store Actions`** (1 nodes): `PostCSS Configuration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Palette Management`** (1 nodes): `Babel Configuration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `State Management`** (1 nodes): `ESLint Configuration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Component Composition`** (1 nodes): `Playground Astro App README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sequence Engine`** (1 nodes): `Graphify visualization (vis-network)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared Infrastructure`** (1 nodes): `Adding Projects guide`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Component Variant Pattern`** (1 nodes): `UI Components reference`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Chain`** (1 nodes): `Gruvbox design system theme`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Controls()` connect `Mosaic Maker Core` to `Sequence Renderer Core`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `trackUsage()` (e.g. with `CostByProvider()` and `UsageOverTime()`) actually correct?**
  _`trackUsage()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `ImageToParticles React Component` (e.g. with `Image Upload React Hook` and `resetParticles Callback`) actually correct?**
  _`ImageToParticles React Component` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Astro Configuration`, `ESLint Configuration`, `Content Collection Configuration` to the rest of the system?**
  _56 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Mosaic Maker Core` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `UI Component Library` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Palette Generator Forms` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._