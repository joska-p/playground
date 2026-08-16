# Rapport — Utilisation de la lib UI (`@repo/ui`)

Analyse statique du monorepo (`/workspaces/playground`), hors `node_modules`, `dist`, `.astro`,
`storybook-static` et historique VSCode local. Date : 2026-08-16.

## Sommaire

- [Résumé exécutif](#résumé-exécutif)
- [1. Packages / apps consommateurs](#1-packages--apps-consommateurs)
- [2. Composants → fichiers importeurs](#2-composants--fichiers-importeurs)
- [3. Classes Tailwind hors tokens de thème](#3-classes-tailwind-hors-tokens-de-thème)
- [4. Anomalies détectées](#4-anomalies-détectées)

---

## Résumé exécutif

- **21 packages/apps** déclarent `@repo/ui` en dépendance ; **18** l'importent réellement (source ou CSS).
- Le **site Astro** = `apps/playground` (11 fichiers `.astro`/`.ts` + CSS), c'est le plus gros consommateur avec `apps/storybook` (37 fichiers).
- Le composant le plus utilisé est **`Button` (50 importeurs)**, suivi du trio control-panel **`ControlGrid`/`ControlSection`/`ControlPanel`** (~58 importeurs cumulés). `ErrorBoundary` est câblé dans 14 `App.tsx`.
- **≈ 25 composants/hooks exportés n'ont aucun importeur hors storybook** (Dialog, Carousel, Popover, Sidebar*…). À priori « dead weight » à courtiser.
- **67 classes Tailwind hors tokens** (palette par défaut + `white`/`black` + couleurs brutes + arbitraires `var(--)`, catégories 3.1→3.4), auxquelles s'ajoutent **33 couleurs hex/oklch en dur** en CSS/SVG (3.6). Les plus gros foyers : `AtlasControls.tsx` (slate/teal), `NavLogo.astro` (oklch en dur), graphiques `radu-machine-learning` (gray).
- **2 bugs réels** repérés : typo `var(--primar)` + classe invalide `hover:text--glow-color` dans `NavLinks.astro` ; imports cassés (`CardFooter`, etc.) dans le template `Demo.tsx`.

---

## 1. Packages / apps consommateurs

Légende : **src** = fichiers `.ts/.tsx/.astro` qui importent au moins un composant/hook ;
**CSS** = importe `@repo/ui/gruvbox-theme` (et/ou `@source`).

| Package | Déclare `@repo/ui` | Fichiers (src) | Notes |
|---|---|---|---|
| `apps/playground` (**site Astro**) | ✅ (deps) | 11 | Pages `.astro`, layouts, docs UI, cards |
| `apps/storybook` | ✅ (dev) | 37 | Un story par composant |
| `packages/art-canvas` | ✅ | 6 | ErrorBoundary + control-panel + data-entry |
| `packages/automa` | ✅ | 7 | control-panel + data-entry + ErrorBoundary |
| `packages/fracture` | ✅ | 1 | ControlPanel |
| `packages/glaze` | ✅ | 3 | data-display (docs) |
| `packages/graph-viz` | ✅ | 5 | Sidebar, Badge, data-entry, Icon |
| `packages/image-to-particles` | ✅ | 2 | Button/Input + ErrorBoundary |
| `packages/mandelbrot` | ✅ | 2 | control-panel, ErrorBoundary |
| `packages/mosaic-maker` | ✅ | 4 | control-panel + ColorPalette + ErrorBoundary |
| `packages/palette-generator` | ✅ | 4 | Sidebar, ErrorBoundary, data-entry |
| `packages/pixel` | ✅ | 7 | Card, Sidebar, data-entry, ErrorBoundary, `lib/cn` |
| `packages/pixel-manipulator` | ✅ | 12 | control-panel + data-entry + output |
| `packages/radu-machine-learning` | ✅ | 5 | control-panel, ColorSwatch, Card, `lib/cn` |
| `packages/randomart` | ✅ | 16 | gros consommateur control-panel + data-entry |
| `packages/randomart-next` | ✅ | 12 | idem + `lib/cn` |
| `packages/sequence-renderer` | ✅ | 7 | control-panel + data-entry + `@repo/ui/button` |
| `packages/three-stage` | ✅ | 1 | ErrorBoundary uniquement |
| `packages/real-life` | ✅ | 0 | **CSS uniquement** (aucun composant) |
| `packages/l-system` | ✅ | 0 | **CSS uniquement** |
| `packages/oeis-signal` | ✅ | 0 | **CSS uniquement** |

À noter : `turbo/generators/templates/new-package/src/components/Demo.tsx` (gabarit de génération de
package) importe aussi la lib — avec des erreurs, voir [§4](#4-anomalies-détectées).

**Sous-modules non-composants utilisés** :
- `@repo/ui/lib/cn` → 9 fichiers (mosaic-maker, pixel, pixel-manipulator, radu-machine-learning, randomart, randomart-next).
- `@repo/ui/hooks/useToastQueue` → 1 (storybook, type uniquement).
- `@repo/ui/ui` (`App`) → 1 (page `/discoveries/ui` du site Astro).
- CSS de thème `@repo/ui/gruvbox-theme` → site Astro + 5 packages (real-life, l-system, oeis-signal, randomart-next, three-stage).

---

## 2. Composants → fichiers importeurs

Comptages **hors storybook et hors template turbo** sauf mention. Les entrées marquées
*(storybook seul)* n'ont aucun importeur de production.

### data-entry
| Composant | Nb | Fichiers |
|---|---|---|
| **Button** | 50 | storybook (7) · `art-canvas` : AtlasControls, ManualControls, SpiraleControls · `automa` : EditSection, PlaybackSection · `graph-viz` : FilterControls · `image-to-particles` : ImageToParticles · `mandelbrot` : control-panel · `mosaic-maker` : MosaicControlsPanel · `palette-generator` : controls/Controls · `pixel` : demos/ResizeDemo · `pixel-manipulator` : layout/ControlsPanel, output/CompareToggle, output/OutputCard, upload/ImageSourceControls, upload/UploadedPreview, workflow/ManipulationSelector, workflow/PresetSelector, workflow/WorkflowNodeControls · `radu-machine-learning` : Sketchpad · `randomart` : controls/AnimationSection, controls/ConfigSection, controls/DisplaySection, controls/GrammarSection, inspector/ChannelTabs, testMode/controls/RenderSection, testMode/controls/SearchSection, testMode/controls/SeedSection, testMode/grammar/DetailPanel, testMode/grammar/SpecimenCard, weights/FloatingWeightPanel · `randomart-next` : controls/ActionControls, controls/BehaviorControls, controls/ConfigControls, controls/DownloadButton, controls/OperatorControls, controls/PlaybackControls, controls/StateIOButtons, inspector/ChannelTabs · `sequence-renderer` : controls/ViewportSection, layers/LayerRowSection, layers/LayerStackEditor · turbo template |
| **Input** | 10 | storybook · `art-canvas` : modules/seed/SeedControls · `image-to-particles` : ImageToParticles · `radu-machine-learning` : Sketchpad · `randomart` : controls/ConfigSection, testMode/controls/SearchSection, testMode/controls/SeedSection · `sequence-renderer` : controls/SequenceSection, layers/LayerOptionSection · turbo template |
| **Slider** | 19 | storybook (2) · `art-canvas` : AtlasControls, ManualControls, SeedControls, SpiraleControls · `automa` : PlaybackSection · `fracture` : ControlPanel · `mosaic-maker` : MosaicControlsPanel · `palette-generator` : color-picker/ColorSpaceControls · `pixel` : demos/TryItOut · `pixel-manipulator` : workflow/WorkflowNode · `randomart` : controls/ConfigSection, testMode/controls/ConfigSection, weights/WeightSliders · `randomart-next` : controls/DepthControls, controls/PlaybackControls · `sequence-renderer` : controls/SequenceSection, layers/LayerOptionSection |
| **Select** | 13 | storybook (2) · `art-canvas` : controls/ControlsPanel, modules/seed/SeedControls · `automa` : CreatureSection, RuleSection · `fracture` : ControlPanel · `pixel-manipulator` : layout/ControlsPanel, workflow/ManipulationSelector · `randomart` : testMode/controls/ConfigSection, testMode/controls/RenderSection · `randomart-next` : controls/RuleControls · `sequence-renderer` : controls/SequenceSection |
| **Checkbox** | 4 | storybook · `automa` : controls/DebugSection · `randomart-next` : controls/RuleControls · `sequence-renderer` : layers/LayerOptionSection |
| **Switch** | 5 | storybook · `graph-viz` : controls/FilterControls · `randomart` : controls/DisplaySection, testMode/controls/RenderSection · `sequence-renderer` : layers/LayerRowSection |
| **Textarea** | 4 | storybook · `art-canvas` : AtlasControls · `randomart` : controls/ConfigSection · `randomart-next` : controls/ConfigControls |
| **Label** | 2 | storybook · `radu-machine-learning` : Sketchpad |
| **HelperText** | 1 | *(storybook seul)* |
| **Radio** | 1 | *(storybook seul)* |
| `buttonVariants` | 1 | `apps/playground` : pages/404.astro |

### data-display
| Composant | Nb | Fichiers |
|---|---|---|
| **Badge** | 8 | storybook · `glaze` : docs/DemoGallery · `graph-viz` : controls/FilterControls, details-panel/graph-overview/GraphOverview, details-panel/node-details/NodeDetails · `pixel-manipulator` : output/OutputCard · `randomart` : testMode/grammar/ui/Badge · turbo template |
| **Card** | 6 | storybook · `pixel` : views/ManipView, views/PipelineView · `pixel-manipulator` : output/OutputCard · `radu-machine-learning` : components/Samples (via `@repo/ui/card`) · turbo template |
| **Hero** | 6 | `apps/playground` : pages/404, pages/docs/[...slug], pages/index, pages/notes/[...slug] · storybook · `glaze` : docs/GlazeDocs |
| **Accordion** | 3 | storybook · `glaze` : docs/DemoGallery, docs/LifecycleReport |
| **AccordionItem** | 3 | storybook · `glaze` : docs/DemoGallery, docs/LifecycleReport |
| **ColorSwatch** | 2 | storybook · `radu-machine-learning` : Sketchpad |
| **SectionHeader** | 2 | `apps/playground` : pages/index · storybook |
| **SectionHeading** | 2 | storybook · `glaze` : docs/GlazeDocs |
| **Carousel** / **CarouselSlide** | 1 | *(storybook seul)* |
| **ChangelogItem** | 1 | *(storybook seul)* |
| **MenuItem** | 1 | *(storybook seul)* |
| **NotificationItem** | 1 | *(storybook seul)* |
| **Popover** | 1 | *(storybook seul)* |

### control-panel (la brique la plus partagée)
| Composant | Nb | Fichiers |
|---|---|---|
| **ControlGrid** | 23 | `art-canvas` : AtlasControls, ManualControls, SpiraleControls · `automa` : DebugSection, EditSection, PlaybackSection · `fracture` : ControlPanel · `mosaic-maker` : MosaicControlsPanel · `pixel-manipulator` : layout/ControlsPanel, workflow/PresetSelector, workflow/WorkflowNodeControls · `radu-machine-learning` : Sketchpad · `randomart` : controls/AnimationSection, controls/ConfigSection, controls/DisplaySection, controls/GrammarSection · `randomart-next` : controls/ActionControls, controls/BehaviorControls, controls/ConfigControls, controls/OperatorControls, controls/PlaybackControls, controls/RuleControls · `sequence-renderer` : layers/LayerRowSection |
| **ControlSection** | 25 | `art-canvas` : AtlasControls, ManualControls, SpiraleControls · `automa` : CreatureSection, EditSection, PlaybackSection, RuleSection · `mosaic-maker` : MosaicControlsPanel · `pixel-manipulator` : layout/ControlsPanel, upload/ImageSourceControls, workflow/WorkflowControls · `randomart` : controls/AnimationSection, controls/ControlPanel, controls/GrammarSection, testMode/controls/ConfigSection, testMode/controls/RenderSection, testMode/controls/SearchSection, testMode/controls/SeedSection · `randomart-next` : controls/BehaviorControls, controls/DepthControls, controls/OperatorControls · `sequence-renderer` : controls/SequenceSection, controls/ViewportSection, layers/LayerStackEditor |
| **ControlRow** | 16 | `art-canvas` : controls/ControlsPanel, AtlasControls, ManualControls, SeedControls · `automa` : CreatureSection, RuleSection · `fracture` : ControlPanel · `mosaic-maker` : MosaicControlsPanel · `pixel-manipulator` : workflow/ManipulationSelector, workflow/WorkflowNode · `randomart` : testMode/controls/ConfigSection, testMode/controls/RenderSection · `randomart-next` : controls/DepthControls · `sequence-renderer` : controls/SequenceSection, layers/LayerOptionSection |
| **ControlPanel** | 10 | storybook · `art-canvas` : controls/ControlsPanel · `automa` : controls/ControlPanel · `fracture` : ControlPanel · `mosaic-maker` : MosaicControlsPanel · `pixel-manipulator` : layout/ControlsPanel · `radu-machine-learning` : ControlPanel · `randomart` : controls/ControlPanel · `randomart-next` : controls/ControlPanel · `sequence-renderer` : controls/ControlsPanel |
| **ControlSubsection** | 2 | `pixel-manipulator` : workflow/WorkflowNode · `sequence-renderer` : layers/LayerRowSection |
| **ControlConditional** | 1 | `art-canvas` : controls/ControlsPanel |

### feedback
| Composant | Nb | Fichiers |
|---|---|---|
| **ErrorBoundary** | 15 | storybook · `art-canvas`, `automa`, `image-to-particles`, `mandelbrot`, `mosaic-maker`, `palette-generator`, `pixel`, `radu-machine-learning`, `randomart`, `randomart-next`, `sequence-renderer`, `three-stage` : chacun `App.tsx` (ou layout) · turbo template |
| **Alert** | 1 | *(storybook seul)* |
| **DefaultFallback** | 1 | *(storybook seul)* |
| **Dialog** + DialogActions/Body/Description/Title | 1 | *(storybook seul)* |
| **ToastProvider** / **ToastViewport** | 1 | *(storybook seul)* |
| `useToast` | 0 | aucun importeur (hook exposé non consommé) |

### navigation
| Composant | Nb | Fichiers |
|---|---|---|
| **FloatingNav** | 1 | *(storybook seul)* |
| **Tabs** (+ TabsContent/TabsList/TabsTrigger) | 1 | *(storybook seul)* |

### widgets
| Composant | Nb | Fichiers |
|---|---|---|
| **Sidebar** | 4 | storybook · `graph-viz` : App · `palette-generator` : PaletteGenerator · `pixel` : components/Docs |
| **ColorPalette** | 2 | storybook · `mosaic-maker` : MosaicControlsPanel |
| **SidebarMain / SidebarPanel / SidebarToggle** | 0 | aucun importeur externe |
| **EdgeField\*** (Canvas/Mask/Original/Svg) | 0 | aucun importeur externe |
| **Spinner** | 0 | utilisé en interne (ex. `Switch.tsx`), aucun importeur externe |
| **SvgExportPanel** | 0 | aucun importeur externe |

### cards
| Composant | Nb | Fichiers |
|---|---|---|
| **SciFiCard** | 3 | `apps/playground` : components/NotesList, components/ProjectsList · storybook |
| **DocCard** | 2 | `apps/playground` : components/DocumentsList · storybook |
| **CategoryCard** | 1 | *(storybook seul)* |
| **ProjectCard** | 1 | *(storybook seul)* |
| **CardDescription / CardTitle** | 1 | turbo template (import invalide, voir §4) |
| **CardBodyWithAccent / CardLink** | 0 | aucun importeur externe |

### icons
| Export | Nb | Fichiers |
|---|---|---|
| **Icon** | 6 | `apps/playground` : components/ui/docs/NavCategory, layouts/nav-bar/NavActions, pages/404 · storybook (2) · `graph-viz` : ConnectionRow |
| **iconNames** | 1 | `apps/playground` : content.config.ts |
| **iconArray** | 1 | storybook |
| **iconMap / createIcon** | 0 | aucun importeur externe |

---

## 3. Classes Tailwind hors tokens de thème

Tokens existants (thème `gruvbox`, Tailwind v4) : couleurs sémantiques (`background`, `surface`,
`surface-raised`, `foreground*`, `border`, `primary*`, `secondary*`, `destructive*`, `accent*`,
`warning*`), palette (`red`, `green`, `yellow`, `blue`, `purple`, `aqua`, `orange`), `tags-*`, fonts
`sans`/`mono`. Tout ce qui suit **ne passe pas par ces tokens**.

### 3.1 Couleurs de la palette Tailwind par défaut (31 occurrences) — à migrer vers les tokens

| Fichier | Classes |
|---|---|
| `packages/art-canvas/src/modules/atlas/controls/AtlasControls.tsx` | `border-slate-800/80` `bg-slate-900/70` `text-slate-400` `text-teal-400` `text-slate-200` `text-teal-500` `text-teal-400/90` `text-slate-500` |
| `packages/glaze/src/docs/demos/gpu/DropIn.tsx` | `text-neutral-500` `accent-amber-300` |
| `packages/pixel/src/components/demos/TryItOut.tsx` | `border-red-400/30` `bg-red-950/20` |
| `packages/radu-machine-learning/src/components/chart/Xaxis.tsx` | `text-gray-300` `text-gray-500` `text-gray-600` |
| `packages/radu-machine-learning/src/components/chart/Yaxis.tsx` | `text-gray-300` `text-gray-500` `text-gray-600` |
| `packages/randomart/src/components/inspector/ChannelTabs.tsx` | `text-amber-500` `text-blue-400` |
| `packages/randomart-next/src/components/inspector/ChannelTabs.tsx` | `text-amber-500` `text-blue-400` |
| `packages/randomart/src/components/testMode/grammar/canvas/RuleCanvas.tsx` | `text-neutral-500` |
| `packages/randomart/src/components/testMode/grammar/canvas/ValueCanvasCPU.tsx` | `text-red-400` |
| `packages/randomart/src/components/testMode/grammar/canvas/ValueCanvasGPU.tsx` | `text-red-400` |

Pistes : `slate-*`/`neutral-*`/`gray-*` → `foreground-dim`/`foreground-muted`/`surface-raised` ;
`teal-*`/`amber-500`/`blue-400` → palette de thème (`aqua`/`yellow`/`blue`) ou tokens `tags-*` ;
`red-400`/`red-950` → `destructive`/`red`.

### 3.2 Couleurs de base hardcodées `white`/`black` (8 occurrences)

| Fichier | Classes |
|---|---|
| `packages/image-to-particles/src/components/ImageToParticles.tsx` | `bg-black` |
| `packages/pixel-manipulator/src/components/output/ImageLightbox.tsx` | `bg-black/70` |
| `packages/pixel/src/components/views/ManipView.tsx` | `text-white` |
| `packages/pixel/src/components/views/PipelineView.tsx` | `text-white` |
| `packages/randomart/src/components/testMode/grammar/canvas/ValueCanvasCPU.tsx` | `bg-black/70` |
| `packages/randomart/src/components/testMode/grammar/canvas/ValueCanvasGPU.tsx` | `bg-black/70` |
| `packages/glaze/src/docs/demos/gpu/DropIn.tsx` | `border-white/10` |
| **LIB** `packages/ui/src/components/data-entry/switch/Switch.tsx` | `text-white` (knob du switch : `text-primary-foreground`) |

Les `bg-black/70` des overlays canvas/lightbox et les `text-white` des vues canvas sont sans doute
volontaires (contraste sur canvas sombre) — mais restent hors système de tokens ; un token
`overlay`/`on-canvas` serait plus cohérent.

### 3.3 Valeurs de couleur brutes en dur dans des classes arbitraires (8 occurrences)

| Fichier | Classes |
|---|---|
| `apps/playground/src/layouts/nav-bar/NavLogo.astro` | `text-[oklch(0.894_0.057_89.24)]` `hover:text-[oklch(0.75_0.15_90)]` `border-[oklch(0.75_0.15_90)]` `before:bg-[oklch(0.75_0.15_90)]` `before:shadow-[0_0_4px_oklch(0.75_0.15_90)]` `after:bg-[oklch(0.75_0.15_90)]` `after:shadow-[0_0_4px_oklch(0.75_0.15_90)]` |
| `apps/playground/src/layouts/nav-bar/MobileMenu.astro` | `shadow-[…0_25px_50px_-12px_rgb(0_0_0/0.35)]` |
| **LIB** `packages/ui/src/components/feedback/dialog/Dialog.module.css` | backdrop `oklch(0 0 0 / 0.6)` |

Note : `oklch(0.894 0.057 89.24)` ≈ `--surface-raised`, et `oklch(0.75 0.15 90)` ≈ `--glow-color`
— ces valeurs **dupliquent des tokens existants**.

### 3.4 Arbitraires basés `var(--…)` (20 occurrences) — borderline

Ils utilisent les variables de thème mais **contournent les utilitaires Tailwind** (pas de
`bg-*`/`text-*` typé). Concentrés sur la **nav du site Astro** et le glow :
`MobileMenu.astro`, `NavActions.astro`, `NavBar.astro`, `NavLinks.astro`, `NavLogo.astro`
(`hover:bg-[color-mix(in_oklch,var(--glow-color)_12%,transparent)]`, `shadow-[…var(--glow-color)…]`, …)
et **LIB** `SciFiCard.tsx` (`drop-shadow-[0_0_6px_var(--variant-color)]`).

À considérer : promouvoir le « glow » en utilitaire de thème (`--shadow-glow`, `--glow-border`) pour
factoriser ces 20 occurrences répétées.

### 3.5 Arbitraires structurels (72 occurrences) — acceptables

Pseudo-éléments (`[&::-webkit-details-marker]:hidden`, `[&_svg]:h-10`, `[&::-webkit-slider-thumb]:…`),
`data-[…]`, et longueurs ponctuelles (`text-[9px]`, `grid-cols-[repeat(auto-fill,…)]`,
`max-h-[90vh]`, `p-[clamp(1.5rem,3vw,2.5rem)]`). Pas liés aux couleurs : **rien à faire** sauf
éventuellement centraliser les `text-[9px]/[10px]` répétés dans des utilitaires de taille.

### 3.6 Couleurs en dur hors classes Tailwind (CSS / style inline)

- **LIB** `SvgExportPanel.tsx` : `#fff`, `#555`, `#ccc`, `#111`, `rgba(…)` (exports SVG — à documenter).
- `packages/automa/src/components/canvas/GridLines.tsx` : `rgba(255,255,255,0.15)` (canvas).
- `packages/image-to-particles/teaching/assets/lesson.css` : ~22 hex en dur (feuille de style HTML autonome, hors Tailwind).

---

## 4. Anomalies détectées

1. **Imports invalides dans le template turbo** `turbo/generators/templates/new-package/src/components/Demo.tsx` :
   `CardDescription`, `CardTitle`, `CardFooter` importés depuis `@repo/ui/data-display`, or seuls
   `Card`, `Badge`, `Button`, `Input`, `ErrorBoundary` y sont exportés ; `CardFooter` n'existe pas du tout
   dans la lib. → importer depuis `@repo/ui/cards` et retirer `CardFooter`.
2. **Typos dans la nav** `apps/playground/src/layouts/nav-bar/NavLinks.astro` (ligne 33) :
   - `data-active:shadow-[…var(--primar)…]` → `--primar` (au lieu de `--primary`) = CSS invalide ;
   - `hover:text--glow-color` → classe invalide (double tiret), probablement `text-[var(--glow-color)]` ou une utilitaire à définir.
3. **LIB** `Switch.tsx` : le Spinner du knob utilise `text-white` → `text-primary-foreground` pour suivre le thème.
4. `NavLogo.astro` duplique `--surface-raised` et `--glow-color` en oklch littéral (voir §3.3).

---

## Méthodologie

- Parsing des imports `@repo/ui*` (tous sous-modules) sur `*.ts/tsx/astro/js` hors `node_modules`/`dist`/`.astro`/`.container_home` (historique VSCode local exclu).
- Matrice composant → fichiers construite via la carte d'exports des `index.ts` de `packages/ui/src/components/*` + exports deep-path (`./button`, `./card`, `./dialog`, `./sidebar`, `./ui`).
- Scan des classes `className`/`class` (chaînes + template literals), blocs `<style>`, et `style={{…}}` ; catégorisation arbitraire/couleur vs structurel, palette Tailwind par défaut vs tokens.
