# Graph Report - playground  (2026-04-28)

## Corpus Check
- 94 files · ~31,520 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 198 nodes · 210 edges · 11 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
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

## God Nodes (most connected - your core abstractions)
1. `PieChart` - 7 edges
2. `computeNumberOfTiles()` - 6 edges
3. `fetchPalettes()` - 6 edges
4. `usePaletteContext()` - 6 edges
5. `getComputedPropertyValue()` - 4 edges
6. `parseNumericValue()` - 4 edges
7. `computeTileHeight()` - 4 edges
8. `computeTileWidth()` - 4 edges
9. `computeGap()` - 4 edges
10. `_updateTiles()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `process_graph()` --calls--> `GET()`  [INFERRED]
  scripts/update_graph_communities.py → apps/playground/src/pages/robots.txt.ts
- `computeNumberOfTiles()` --calls--> `computeInitialTiles()`  [INFERRED]
  packages/mosaic-maker/src/utils/style-utils.ts → packages/mosaic-maker/src/store/useMosaicStore.tsx
- `safeFetch()` --calls--> `fetchPalettes()`  [INFERRED]
  packages/mosaic-maker/src/utils/utils.ts → packages/mosaic-maker/src/utils/fetch-palettes.ts
- `usePaletteContext()` --calls--> `useColorPicker()`  [INFERRED]
  packages/palette-generator/src/context/paletteContext.tsx → packages/palette-generator/src/hooks/useColorPicker.ts
- `usePaletteContext()` --calls--> `ComplementaryForm()`  [INFERRED]
  packages/palette-generator/src/context/paletteContext.tsx → packages/palette-generator/src/components/controls/generators/ComplementaryForm.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (2): useSidebarContext(), SidebarPanel()

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (18): cachePalettes(), fetchPalettes(), getCachedPalettes(), isCacheValid(), updateElementStyles(), computeInitialTiles(), generateTileRotation(), initPalettes() (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (6): AnalogousForm(), ComplementaryForm(), MonochromaticForm(), usePaletteContext(), useColorPicker(), XadicForm()

### Community 3 - "Community 3"
Cohesion: 0.19
Nodes (9): hexToHSL(), hexToRGB(), HSLToHex(), HSLToRGB(), hueToRGB(), RGBToHex(), RGBToHSL(), getPixelColor() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.26
Nodes (8): Controls(), computeDimension(), computeGap(), computeNumberOfTiles(), computeTileHeight(), computeTileWidth(), getComputedPropertyValue(), parseNumericValue()

### Community 5 - "Community 5"
Cohesion: 0.18
Nodes (3): PieChart, Point, strToDom()

### Community 6 - "Community 6"
Cohesion: 0.31
Nodes (5): generateSequence(), handleChange(), generateInitial(), setSequenceRule(), setSteps()

### Community 7 - "Community 7"
Cohesion: 0.28
Nodes (2): ImageToParticles(), useImageUpload()

### Community 8 - "Community 8"
Cohesion: 0.31
Nodes (4): findBiggestInterval(), calculateValueScale(), draw(), drawSequence()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (2): arePalettesEqual(), getPaletteId()

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (3): GET(), getRobotsTxt(), process_graph()

## Knowledge Gaps
- **Thin community `Community 0`** (34 nodes): `CardDescription()`, `CardHeader()`, `cn()`, `Label()`, `Badge.tsx`, `badgeVariants.ts`, `Button.tsx`, `buttonVariants.ts`, `Card.tsx`, `cardVariants.ts`, `Input.tsx`, `inputVariants.ts`, `Label.tsx`, `labelVariants.ts`, `Select.tsx`, `selectVariants.ts`, `Slider.tsx`, `sliderVariants.ts`, `Switch.tsx`, `switchVariants.ts`, `ColorPalette.tsx`, `colorPaletteVariants.ts`, `Sidebar.tsx`, `SidebarContext.tsx`, `SidebarMain.tsx`, `SidebarPanel.tsx`, `SidebarToggle.tsx`, `sidebarVariants.ts`, `cn.ts`, `Sidebar()`, `useSidebarContext()`, `SidebarMain()`, `SidebarPanel()`, `handleChange()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (9 nodes): `ImageToParticles()`, `config.ts`, `utils.ts`, `use-image-upload.ts`, `index.tsx`, `useImageUpload()`, `calculateImageDimensions()`, `drawImageToCanvas()`, `initParticles()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (5 nodes): `PaletteControls.tsx`, `palette-utils.ts`, `arePalettesEqual()`, `getPaletteId()`, `PaletteControls()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useColorPicker()` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `fetchPalettes()` (e.g. with `safeFetch()` and `initPalettes()`) actually correct?**
  _`fetchPalettes()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `usePaletteContext()` (e.g. with `useColorPicker()` and `ComplementaryForm()`) actually correct?**
  _`usePaletteContext()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._