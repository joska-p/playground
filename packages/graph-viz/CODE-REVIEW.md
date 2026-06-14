# Code Review — `@repo/graph-viz`

> Reviewed: 2026-06-13

## Overall Assessment

**Approve with findings.** The architecture is sound, the build-time data pipeline is well thought out, and the rendering choices (InstancedMesh, LineSegments, Zustand selectors) are appropriate for the scale. A handful of correctness bugs and efficiency issues should be addressed.

---

## Goal-by-Goal Assessment

| Goal | Status | Notes |
| ---- | ------ | ----- |
| Transform `graph.json` → interactive 3D scene | Achieved | Clean pipeline: enrich → layout → communities → JSON |
| Overview mode — community spheres, edges, labels | Achieved | `SceneOverview`, `GraphCommunitySpheres`, `CommunityEdges` |
| Detail mode — drill into nodes, size/brightness = degree | Achieved | `SceneDetail`, `GraphNodes`, `useDetailData` |
| Answer questions about codebase health | Partial | Insights panel exists but coupling density and node health classification have correctness issues (see below) |

---

## Findings by Priority

### Critical

**Redundant `.getState()` calls inside render — `GraphPanel.tsx:359-360`**

`useDataStore.getState()` is called inside a conditional IIFE in the middle of the component render path. `nodeIndex` and `degrees` are already read via proper hook calls at lines 26-27 at the top of the component. Using `.getState()` to re-read the same values creates a stale-data risk if the store updates between the two reads, and will break immediately if the call site is ever refactored into a hook.

```ts
// Current — lines 359-360
const nodeIndex = useDataStore.getState().nodeIndex;
const degrees = useDataStore.getState().degrees;

// Fix — use the already-declared values from lines 26-27
const degrees = useDataStore((s) => s.degrees);
const nodeIndex = useDataStore((s) => s.nodeIndex);
```

---

### High Priority

**`classifyNodeHealth` is O(N × L) per render — `nodes.ts:62-65`, `useNodeHealthGroups.ts:22-31`**

`classifyNodeHealth` does `links.filter(l => l.source === nodeId || l.target === nodeId)` for every single node. With 3,108 nodes and 4,712 links this is approximately 14.6 million comparisons per render of `GraphNodes`. The `useNodeHealthGroups` hook runs this loop unconditionally on every render with no adjacency pre-index.

Fix: build a `nodeId → GraphLink[]` adjacency map once at the start of `useNodeHealthGroups`, then look up per node in O(1).

```ts
const linksByNode = new Map<string, GraphLink[]>();
for (const l of allLinks) {
  if (!linksByNode.has(l.source)) linksByNode.set(l.source, []);
  if (!linksByNode.has(l.target)) linksByNode.set(l.target, []);
  linksByNode.get(l.source)!.push(l);
  linksByNode.get(l.target)!.push(l);
}
```

---

**`BufferGeometry` objects leak on every re-render — `edgeGeometry.ts:64`, `GraphEdges.tsx`**

`buildEdgeGroups` creates `new BufferGeometry()` on every call from inside `GraphEdges`. R3F does not auto-dispose geometries. Every filter change or re-render accumulates leaked GPU objects.

Fix: dispose the previous geometry in a `useEffect` cleanup before creating a new one, or store the geometry in a `useRef` and call `.dispose()` explicitly.

---

**`classifyEntity` misclassifies constants — `enrich.ts:19,32`**

`CONSTANT_RE = /^[A-Z][A-Z0-9_]+$/` matches uppercase constants (e.g. `MAX_DEGREE`, `RADIUS`, `SAMPLES_PER_NODE`) and returns `'variable'` at line 32. The intent was to match screaming-case constants, but `'variable'` is semantically wrong — the convention doc defines variables as lowercase identifiers. This causes the Entity Types filter in the panel to mislabel code constants.

Fix: either rename the return value to a new `'constant'` entity type, or fold these tokens into `'config-key'` (the closest existing bucket).

---

### Architecture

**Inline IIFE filtering in `SceneDetail.tsx:59-100`**

The entity-type filter (building `filteredPositions`, `filteredNodes`, `filteredDegrees`, `filteredNodeIndex`, `filteredLinks`) is 40 lines of dense computation done inline as an IIFE in the render body. This is hard to test in isolation and makes the component difficult to read.

The README states "no useMemo wrappers needed (React 19)" — but React Compiler needs stable function identity and inputs to cache inline work reliably. An IIFE does not give it that.

Fix: extract into a `useFilteredByEntityType(detailData, entityTypeFilter)` hook.

---

## Data Preparation

### What works well

- Build-time only: zero runtime computation cost on load.
- Flat arrays (`Float32Array` serialized as `number[]`) are the correct JSON serialization strategy.
- `spread` is precomputed per community and stored — avoids recomputing bounding boxes at runtime.
- Inter-community edges precomputed with directionality counts (`sourceToTargetCount`, `targetToSourceCount`).
- `nodeIndex` is rebuilt at load time from the JSON array — correct, since `Map` cannot be serialized.

### Issues

**`dominant_package` computed twice per community — `enrich.ts:162-184` and `enrich.ts:215-224`**

`buildCommunityLabel` runs the full `extractPackage` + frequency count loop to find the dominant package for the label string. `enrichCommunities` then runs the exact same loop immediately after to set `comm.dominant_package`. The first result could be returned from `buildCommunityLabel` and reused directly.

---

**Layout is non-deterministic — `layout.ts:81`**

Sampled repulsion picks random pairs via `Math.random()`. Every `prepare-data` run produces a slightly different `graph-prepared.json`, making git diffs of that file noisy and reproducible builds impossible.

Fix: replace `Math.random()` with a seeded pseudo-random number generator so the same input always produces the same layout.

---

**`graph-prepared.json` is committed to source — `src/data/graph-prepared.json`**

At 3,108 nodes this is a large generated file in source control. It should either be excluded from git and generated in CI, or its generation should be part of the build task so it is never stale. Committing both `graph.json` and `graph-prepared.json` means two files must stay in sync manually.

---

## Efficiency Summary

| Area | Verdict |
| ---- | ------- |
| Rendering | Good — InstancedMesh for nodes, LineSegments for edges, single draw calls |
| Store selectors | Good — fine-grained Zustand selectors prevent unnecessary re-renders |
| Data loading | Good — static JSON import, no fetch, no runtime layout |
| Node health classification | Poor — O(N × L) loop every render, fixable with an adjacency map |
| Edge geometry | Poor — BufferGeometry leaked on every re-render |
| Detail entity filter | Moderate — inline IIFE in render body, unoptimized but small dataset |
| `dominant_package` computation | Minor — computed twice per community at build time |

---

## Recommended Next Steps

1. `GraphPanel.tsx:359-360` — remove `.getState()` calls, use the already-declared hook values from lines 26-27.
2. `useNodeHealthGroups.ts` — pre-build adjacency map to reduce health classification from O(N × L) to O(N + L).
3. `GraphEdges.tsx` / `edgeGeometry.ts` — dispose `BufferGeometry` in a `useEffect` cleanup.
4. `enrich.ts:32` — fix `CONSTANT_RE` return value from `'variable'` to a semantically correct type.
5. `enrich.ts:buildCommunityLabel` — return the computed dominant package so `enrichCommunities` can reuse it instead of recomputing.
6. `layout.ts:81` — replace `Math.random()` with a seeded PRNG for reproducible builds.
7. `SceneDetail.tsx:59-100` — extract entity-type filter logic into a `useFilteredByEntityType` hook.
