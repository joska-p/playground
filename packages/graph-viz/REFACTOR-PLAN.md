# Refactor Plan — `@repo/graph-viz`

> Goal: Turn the prototype into a readable, explorable codebase health visualization.
> These phases are sequenced by dependency — each builds on the previous.

## Principles

- **No regressions.** Every phase must leave the app in a working state. No long-lived branches.
- **Small commits.** Each phase is a mergeable unit.
- **Visual encoding over UI controls.** The graph should *show* you insights, not force you to query for them.
- **Config-first.** Visual parameters stay in `src/config.ts`. Components don't hardcode values.

---

## Phase 0 — Visual Encoding Foundation

**Theme: Make the graph readable.**
The richest signals (relation type, confidence, file type) are invisible. This phase encodes them visually so the graph communicates meaning without panel cross-referencing.

| Step | Change | Files Affected |
|------|--------|---------------|
| 0.1 | **Edge color by relation type** — `imports`, `calls`, `references`, etc. get distinct colors. Add relation palette to config. | `config.ts`, `GraphEdges.tsx`, `CommunityEdges.tsx` |
| 0.2 | **Edge opacity by confidence** — `CONFIDENT` edges solid, `INFERRED` edges faint. Dead-code candidates become visually distinct. | `GraphEdges.tsx`, `HighlightedEdges.tsx` |
| 0.3 | **Node ring/icon by file type** — `code` / `document` / `image` nodes get a visual indicator (e.g., a ring mesh around the sphere, or different emissive tint). | `GraphNodes.tsx`, `config.ts` |
| 0.4 | **Color legend component** — renders the 24 palette swatches with community labels in the panel. Essential for "at a glance" reading. | `GraphPanel.tsx`, new `ColorLegend.tsx` |
| 0.5 | **Smarter community labels** — replace fixed top-K with dynamic threshold: label communities above `N` nodes, collapse when camera zooms out. | `Scene.tsx`, `config.ts` |

**Risks:** Edge color mapping must handle 11 relation types without visual chaos. Mitigation: group related relations (e.g., `imports` / `imports_from` / `re_exports` → one hue family).

**Test:** Load the app — can you tell imports from calls at a glance? Can you spot low-confidence nodes?

---

## Phase 1 — Discovery & Navigation

**Theme: Make the graph explorable.**
Users need to find specific things and understand what they're looking at without panel-scrolling.

| Step | Change | Files Affected |
|------|--------|---------------|
| 1.1 | **Search highlights in 3D** — matching nodes/spheres brighten, non-matching dim. Search becomes a discovery tool, not a panel filter. | `GraphNodes.tsx`, `GraphCommunitySpheres.tsx`, `Scene.tsx` |
| 1.2 | **Community search in panel** — text field filters the community list by label. Essential with 339 entries. | `GraphPanel.tsx` |
| 1.3 | **Node hover tooltip** — thin floating card on hover showing label, file type, degree count. Avoids panel lookup for basic info. | New `NodeTooltip.tsx`, `Scene.tsx` |
| 1.4 | **Better node info panel** — show degree count, community label, top-N neighbors when a node is selected. | `GraphPanel.tsx` |
| 1.5 | **Keyboard shortcuts** — `Escape` to go back to overview, `Ctrl+F` to focus search, `↑/↓` to navigate community list. | `GraphPanel.tsx` or new `useKeyboard.ts` |

**Risks:** 3D search highlighting requires passing query state down to R3F components. Cleanest approach: derive a `highlightSet` from the search query in Scene and pass it as a prop.

**Test:** Search "react" — do related nodes pop in the 3D scene? Can you navigate with keyboard alone?

---

## Phase 2 — Interaction Quality

**Theme: Make the graph pleasant to use.**
Smooth transitions, sensible defaults, organized controls.

| Step | Change | Files Affected |
|------|--------|---------------|
| 2.1 | **Animate camera fly-to** — lerp camera position between overview and detail instead of instant teleport. | `Scene.tsx` |
| 2.2 | **Auto-rotate off by default** — on by disorienting. Add a brief first-time overlay or just flip the default. | `uiStore.ts` |
| 2.3 | **Panel reorganization** — separate into collapsible sections: Search & Filter / Display / Selection. | `GraphPanel.tsx` |
| 2.4 | **Consistent cursor feedback** — all clickable objects (spheres, nodes) set `cursor: pointer`. | `GraphNodes.tsx`, `GraphCommunitySpheres.tsx` |
| 2.5 | **Node-to-community navigation** — from a selected node, jump to its community (detail mode for that community). | `GraphPanel.tsx`, `Scene.tsx` |

**Risks:** Camera animation with OrbitControls needs care — don't fight user input mid-flight. Use a flag to suppress controls during transition.

**Test:** Click a sphere → smooth fly-in. Press Escape → smooth fly-out. Panel is navigable without scrolling.

---

## Phase 3 — Codebase Health Insights

**Theme: Answer the questions the graph is built for.**
Coupling metrics, dead-code candidates, documentation coverage, hotspots.

| Step | Change | Files Affected |
|------|--------|---------------|
| 3.1 | **Coupling heatmap** — inter-community edge thickness encodes count. Strongly coupled pairs visually pop. | `CommunityEdges.tsx`, `config.ts` |
| 3.2 | **Hyperedge layer** — render conceptual groupings as labeled wireframe halos or translucent hulls. | New `HyperedgeLayer.tsx`, `Scene.tsx` |
| 3.3 | **Dead-code visualization** — nodes with only low-confidence edges get a distinct style (desaturated, dashed outline). | `GraphNodes.tsx`, `utils/nodes.ts` |
| 3.4 | **Stats → insights** — replace raw counts with meaningful metrics: "Top 10 communities contain 60% of nodes", "Average coupling: 3.2 edges/community". | `GraphPanel.tsx` |
| 3.5 | **Directional edges** — show arrowheads on directed edges. Makes "who depends on who" visible. | `GraphEdges.tsx`, `config.ts` |

**Risks:** Hyperedge rendering is the riskiest — translucent hulls in 3D are expensive and can look messy with 339 overlapping communities. Consider wireframe or dashed connecting arcs instead of full hulls.

**Test:** Open the app — spot the most tightly coupled communities immediately. Find a dead-code candidate in under 10 seconds.

---

## Phase 4 — Performance & Polish

**Theme: Handle the full scale.**
4113 nodes, 6204 edges, 339 communities — the app should feel fast and not overwhelm.

| Step | Change | Files Affected |
|------|--------|---------------|
| 4.1 | **Community clustering at zoom-out** — aggregate small communities into "other" groups when camera is far. | `Scene.tsx`, `utils/communities.ts` |
| 4.2 | **Loading progress** — worker sends progress messages. Show a progress bar instead of a spinner. | `GraphCanvas.tsx`, `LoadingFallback.tsx`, worker |
| 4.3 | **Frustum culling audit** — ensure instances far from camera are skipped. | `GraphNodes.tsx`, `GraphCommunitySpheres.tsx` |
| 4.4 | **LOD for community spheres** — reduce geometry segments for distant spheres. | `GraphCommunitySpheres.tsx` |

**Risks:** Clustering changes the data model — communities become dynamic rather than static. Consider whether this is needed before implementing (test with current scale first).

---

## Execution Order

```
Phase 0 ──► Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4
   │            │            │            │
   └── merge    └── merge    └── merge    └── merge
        ✓            ✓            ✓            ✓
```

Each phase is a self-contained chunk. Phases can be reordered if priorities shift.
Phase 2 (interaction) can start in parallel with Phase 3 (insights) — they touch different files.
