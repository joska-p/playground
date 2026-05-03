# Graph Report - playground  (2026-05-03)

## Corpus Check
- 128 files · ~49,856 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 370 nodes · 467 edges · 14 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 16|Community 16]]

## God Nodes (most connected - your core abstractions)
1. `PieChart` - 7 edges
2. `PieChart` - 7 edges
3. `fetchPalettes()` - 6 edges
4. `computeNumberOfTiles()` - 6 edges
5. `usePaletteContext()` - 6 edges
6. `computeNumberOfTiles()` - 6 edges
7. `fetchPalettes()` - 6 edges
8. `usePaletteContext()` - 6 edges
9. `Point` - 4 edges
10. `Controls()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `computeInitialTiles()` --calls--> `computeNumberOfTiles()`  [INFERRED]
  packages/mosaic-maker/src/store/useMosaicStore.tsx → packages/mosaic-maker/src/utils/style-utils.ts
- `fetchPalettes()` --calls--> `safeFetch()`  [INFERRED]
  packages/mosaic-maker/src/utils/fetch-palettes.ts → packages/mosaic-maker/src/utils/utils.ts
- `AnalogousForm()` --calls--> `usePaletteContext()`  [INFERRED]
  packages/palette-generator/src/components/controls/generators/AnalogousForm.tsx → packages/palette-generator/src/context/paletteContext.tsx
- `ComplementaryForm()` --calls--> `usePaletteContext()`  [INFERRED]
  packages/palette-generator/src/components/controls/generators/ComplementaryForm.tsx → packages/palette-generator/src/context/paletteContext.tsx
- `MonochromaticForm()` --calls--> `usePaletteContext()`  [INFERRED]
  packages/palette-generator/src/components/controls/generators/MonochromaticForm.tsx → packages/palette-generator/src/context/paletteContext.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (36): cachePalettes(), fetchPalettes(), getCachedPalettes(), isCacheValid(), computeInitialTiles(), generateTileRotation(), initPalettes(), setMosaicRef() (+28 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (14): buildCpuContext(), generateCpu(), buildCursorContext(), generateCursor(), buildMemoryContext(), generateMemory(), buildNetworkContext(), generateNetwork() (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (12): AnalogousForm(), ComplementaryForm(), usePaletteContext(), AnalogousForm(), ComplementaryForm(), MonochromaticForm(), XadicForm(), useColorPicker() (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (6): PieChart, PieChart, Point, strToDom(), Point, strToDom()

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (17): hexToHSL(), hexToRGB(), HSLToHex(), HSLToRGB(), hueToRGB(), RGBToHex(), RGBToHSL(), getPixelColor() (+9 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (10): Controls(), Controls(), generateData(), Dashboard(), useDashboardLoop(), CrazyDashboard(), setMode(), setTheme() (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.2
Nodes (10): handleChange(), generateSequence(), generateSequence(), handleChange(), generateInitial(), setSequenceRule(), setSteps(), generateInitial() (+2 more)

### Community 8 - "Community 8"
Cohesion: 0.32
Nodes (14): computeDimension(), computeGap(), computeNumberOfTiles(), computeTileHeight(), computeTileWidth(), getComputedPropertyValue(), parseNumericValue(), computeDimension() (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.18
Nodes (4): useImageUpload(), ImageToParticles(), ImageToParticles(), useImageUpload()

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (4): arePalettesEqual(), getPaletteId(), arePalettesEqual(), getPaletteId()

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (8): findBiggestInterval(), calculateValueScale(), draw(), drawSequence(), findBiggestInterval(), calculateValueScale(), draw(), drawSequence()

### Community 13 - "Community 13"
Cohesion: 0.38
Nodes (5): GET(), getRobotsTxt(), GET(), getRobotsTxt(), process_graph()

### Community 14 - "Community 14"
Cohesion: 0.4
Nodes (4): useSidebarContext(), SidebarPanel(), useSidebarContext(), SidebarPanel()

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (1): remarkBaseUrl()

## Knowledge Gaps
- **Thin community `Community 16`** (4 nodes): `astro.config.mjs`, `remark-base-url.mjs`, `remarkBaseUrl()`, `remarkBaseUrl()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `fetchPalettes()` (e.g. with `initPalettes()` and `safeFetch()`) actually correct?**
  _`fetchPalettes()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `usePaletteContext()` (e.g. with `AnalogousForm()` and `ComplementaryForm()`) actually correct?**
  _`usePaletteContext()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._