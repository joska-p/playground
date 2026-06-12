# UI/UX Review — `@repo/graph-viz`

> Reviewed: 2026-06-12

## Goal-by-Goal Assessment

### 1. "Transform `graph.json` → interactive 3D scene"

✅ **Achieved.** The data pipeline works — JSON loads, Web Worker force-layout runs, R3F scene renders.

### 2. "Overview mode — community spheres, inter-community edges, hover labels"

⚠️ **Partial.** Spheres, inter-community edges, and hover labels exist mechanically, but:

- **Only the top 25 communities by node count get persistent labels** (`detailView.topLabelMaxCount`). The remaining ~314 spheres float in space with no label at all — you have to hover each one individually to know what it is.
- **No color legend.** The 24-color palette maps to communities arbitrarily, but there's no key. You see `🔵` `🟣` `🟡` but don't know which is which without cross-referencing the panel.
- **Sphere size has no scale.** Node count is encoded in sphere radius, but there's no visual legend saying "this size = ~X nodes". The cue is qualitative only.

### 3. "Detail mode — drill into nodes, size/brightness = degree, cross-community links"

⚠️ **Partial.** The mechanics work, but the UX is flat:

- **Cross-community links are unlabeled.** You see a colored line from A to B but not _how many edges_ or _what relation type_. That info is in the panel's "Connected to" section, but you must look away from the 3D scene.
- **Node labels are off by default** (`showNodeLabels: false`). New users won't discover the toggle.
- **Node info panel omits key data.** When a node is selected, the panel shows `id`, `file_type`, `source_file` — but not its **degree** (connection count), its **community label**, or what it **connects to**.
- **No up-level navigation.** Once on a node, you can't jump to "show me this node's community" or "show me related communities".
- **Edges are all-or-nothing.** The "show edges" toggle is global — the already-computed `HighlightedEdges` component exists but only renders when `showEdges` is on globally, not as a separate overlay.

### 4. "Understand architecture at a glance"

❌ **Not achieved.** The data model has 339 communities, 6204 edges, 11 relation types — but the UI doesn't help you read the architecture:

- **339 spheres is not "at a glance".** Most are tiny. There's no aggregation tier (show top 20, collapse rest).
- **Edge thickness/opacity is uniform.** A tight coupling (100+ edges) looks identical to a weak reference (1 edge).
- **Relation types are invisible.** `imports`, `calls`, `references`, `semantically_similar_to` — all rendered identically despite very different architectural meaning.
- **File types look the same.** A `README.md` node (`type: document`) is visually identical to an `App.tsx` node (`type: code`).
- **Hyperedge concepts are invisible.** 8 conceptual groupings (e.g., "Creative Engines System") exist in the graph data but are not rendered.

### 5. "Answer questions about codebase health: coupling, hotspots, dead code, coverage"

❌ **Not achieved.** None of these insights are surfaced:

| Question                   | What's Missing                                                                                                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Package coupling**       | Inter-community edge count is hidden in the panel. No visual encoding of coupling strength. Direction of coupling is not shown.                                                           |
| **Complexity hotspots**    | Degree ≠ complexity. A file that imports many things is large, but a file that is _heavily depended on_ is the real hotspot. Direction matters — the graph has it, the UI doesn't use it. |
| **Dead code traces**       | `confidence`/`confidence_score` exists on every edge but is not visualized. Isolated nodes or nodes with only `INFERRED`-confidence edges are dead-code candidates — entirely invisible.  |
| **Documentation coverage** | `file_type: document` nodes exist but are not visually distinct from `code` nodes. No way to see "these files have docs, these don't".                                                    |

## Key UX Gaps (by severity)

### 🔴 High

| Gap                                      | Why It Hurts                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **No visual legend**                     | 24 colors, 339 communities, zero mapping. Must cross-reference panel constantly.                                   |
| **~314 communities unlabeled**           | Only 25 get permanent labels. Hover-to-label is discovery by exhaustion.                                           |
| **Edge type invisible**                  | 11 relation types all look the same. The graph's richest signal is hidden.                                         |
| **Confidence not surfaced**              | Dead-code signal (`INFERRED` vs `CONFIDENT`) exists in data but is not rendered. This is the app's stated purpose. |
| **Search doesn't highlight in 3D**       | Search only filters the panel list. The 3D scene ignores it.                                                       |
| **No community search**                  | Panel shows 50 communities sorted by size but no search field. With 339 entries, scrolling is impractical.         |
| **No type filtering**                    | Can't show "only code" or "only documents" despite `file_type` on every node.                                      |
| **Node info omits degree & connections** | Panel shows id/type/path but not connection count — the most relevant metric.                                      |

### 🟡 Medium

| Gap                                     | Why It Hurts                                                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Auto-rotate on by default**           | Disorienting. Must find the toggle before you can read anything.                                      |
| **Back-to-overview is subtle**          | Small ghost button in a busy panel. No Escape shortcut.                                               |
| **Community IDs input is CLI-adjacent** | `"e.g. 1, 5, 12-20"` is a developer affordance, not UI. No visual multi-select.                       |
| **Loading has no progress**             | Single spinner for a multi-second worker computation.                                                 |
| **Camera transition is instant**        | No fly-to animation. Disorienting teleport between modes.                                             |
| **No minimap or orientation helper**    | Easy to get lost in 3D space with 339 objects.                                                        |
| **Panel is a single scroll list**       | Navigation, search, filters, stats, community list, node info — all in one list. High cognitive load. |
| **Hyperedge concepts invisible**        | 8 conceptual groupings exist but are not rendered anywhere.                                           |

### 🟢 Low

| Gap                                | Why It Hurts                                                                |
| ---------------------------------- | --------------------------------------------------------------------------- |
| **No keyboard shortcuts**          | Escape to go back, arrows to navigate — basic 3D viewer ergonomics missing. |
| **No node-to-community jump**      | Detail mode is siloed. Can't navigate up from a node to its community.      |
| **Panel toggle icon is ambiguous** | Wrench icon with no tooltip. Unclear what it does until you click.          |
| **Stats are context-free**         | "24/339 comms, 4113 nodes, 6204 edges" — numbers with no insight.           |
| **Cursor feedback inconsistent**   | Community spheres set `cursor:pointer` on hover, individual nodes don't.    |

## Recommended Improvements (prioritized)

### P0 — Unlock the graph's stated purpose

1. **Surface edge confidence/type visually** — color-code edges by relation type, use opacity for confidence. Dead-code candidates become visible instantly.
2. **Show degree & connections in node info panel** — degree count, top-N connected nodes, community label. The base unit of codebase analysis.
3. **File type visual distinction** — different node geometry or emissive color for `code` vs `document` vs `image`. Makes "documentation coverage" answerable at a glance.
4. **Coupling heatmap on community edges** — encode inter-community edge count as line thickness or opacity banding.

### P1 — Fix fundamental discovery

5. **Add a color legend** — map palette colors to community labels. Essential for "at a glance" comprehension.
6. **Smarter label density** — show labels for communities above a dynamic size threshold, not a fixed top-K. Collapse when camera zooms out.
7. **Search highlights in 3D** — typed query dims non-matching spheres/nodes and brightens matches.
8. **Community search in panel** — text filter on the community list.

### P2 — Interaction quality

9. **Animate camera transitions** — lerp camera between overview/detail. Instant teleport is jarring.
10. **Default auto-rotate to off** — or add a first-time overlay explaining controls.
11. **Escape to go back** — keyboard shortcut to return to overview.
12. **Node hover tooltip** — thin info panel on hover with label + file type + degree.

### P3 — Polish

13. **Hyperedge layer** — render hyperedges as labeled wireframe meshes or halos.
14. **Loading progress** — worker messages progress percentage.
15. **Stats → insights** — replace raw counts with e.g. "Top 10 communities contain 60% of nodes".
16. **Panel section headers** — visually separate Search & Filter / Display / Selection areas.

## Core Problem

The graph-viz app has a solid technical foundation (worker layout, instanced meshes, clean stores, typed config) but it's **rendering data without interpretation**. It shows you the graph — it doesn't help you _read_ it.

The richest signals are in the dark:

- `confidence` → dead vs live code
- `relation` → _how_ things connect (import vs reference vs call)
- `file_type` → code vs docs vs images
- `degree` + direction → hotspots vs hubs
- hyperedges → conceptual architecture
- community edge counts → coupling strength

None of these are visually encoded. The user sees 339 identically-colored spheres connected by identically-colored lines and must cross-reference the panel for every question. That's why "the UI doesn't let me take advantage of this graph."

The fix isn't more controls — it's **better visual encoding** of the data that already exists.
