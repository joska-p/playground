# Phase 3 — Codebase Health Insights

> **Theme:** Answer the questions the graph is built for — coupling, hotspots, dead code, coverage.
> **Dependencies:** Phase 0–2 complete (visual encoding + discovery + interaction quality).

---

## 3.1 — Coupling heatmap

**Why:** Inter-community edges are uniformly rendered today — one color, one opacity (with a vertex gradient between the two communities). You can't tell a tight coupling (100+ edges between two communities) from a weak reference (1–2 edges). Coupling strength is the single most important architectural signal — it needs to pop visually.

### Strategy

Encode inter-community edge count as **line thickness**. Since `LineSegments` in Three.js support `linewidth` only on some platforms (WebGL limitation), use **opacity bands** instead — render multiple segments per edge pair, each representing a "tier" of coupling.

More practical alternative: **Render a single line per pair but vary its opacity and emissive color** based on the edge count relative to the max across all pairs.

### Config changes (`src/config.ts`)

```tsx
export const communityEdge = {
  minCount: 2,
  opacity: 0.3,
  // New coupling encoding
  coupling: {
    minOpacity: 0.1,
    maxOpacity: 0.9,
    thicknessTiers: 3, // render N parallel lines for heavy coupling
    tierThresholds: [1, 10, 50] // counts per tier
  }
} as const;
```

### Component changes (`src/components/CommunityEdges.tsx`)

Current: single geometry with all inter-community edges at uniform opacity + vertex colors.

New approach: Build multiple geometries based on coupling tiers.

```tsx
// Group edges by coupling tier
type Tier = 0 | 1 | 2;
const tierEdges: Record<Tier, InterCommunityEdge[]> = { 0: [], 1: [], 2: [] };

for (const edge of interCommunityEdges.values()) {
  if (edge.count < communityEdge.minCount) continue;
  if (
    !visibleIds ||
    (visibleIds.has(edge.sourceCid) && visibleIds.has(edge.targetCid))
  ) {
    if (edge.count >= communityEdge.coupling.tierThresholds[2]) {
      tierEdges[2].push(edge);
    } else if (edge.count >= communityEdge.coupling.tierThresholds[1]) {
      tierEdges[1].push(edge);
    } else {
      tierEdges[0].push(edge);
    }
  }
}
```

Then render each tier with different visual properties:

```tsx
<>
  {/* Tier 0 — weak coupling, thin + faint */}
  <lineSegments geometry={geometries[0]}>
    <lineBasicMaterial
      vertexColors
      transparent
      opacity={0.1}
      depthWrite={false}
    />
  </lineSegments>

  {/* Tier 1 — medium coupling, medium opacity */}
  <lineSegments geometry={geometries[1]}>
    <lineBasicMaterial
      vertexColors
      transparent
      opacity={0.4}
      depthWrite={false}
    />
  </lineSegments>

  {/* Tier 2 — strong coupling, thick + bright */}
  <lineSegments geometry={geometries[2]}>
    <lineBasicMaterial
      vertexColors
      transparent
      opacity={0.8}
      depthWrite={false}
    />
  </lineSegments>
</>
```

**Alternative (simpler):** Calculate a normalized opacity per edge instead of bucketing:

```tsx
// Find max count for normalization
let maxCount = 0;
for (const edge of interCommunityEdges.values()) {
  if (edge.count > maxCount) maxCount = edge.count;
}

// Per-edge opacity:
const normalizedOpacity =
  communityEdge.coupling.minOpacity +
  (edge.count / maxCount) *
    (communityEdge.coupling.maxOpacity - communityEdge.coupling.minOpacity);
```

This gives a smoother visual but requires per-edge opacity, which `lineBasicMaterial` can't do per-segment easily. You'd need individual `lineSegments` per edge (too many draw calls) or vertex colors with alpha.

**Recommendation:** Use the tiered approach. It's fewer draw calls (at most 3) and creates perceptually distinct categories, which is more useful for "at a glance" reading than a continuous gradient.

### Data store addition

The inter-community edges already have `count` — no new data needed.

### Files touched

- `src/config.ts` — add `coupling` config
- `src/components/CommunityEdges.tsx` — split rendering by coupling tier

---

## 3.2 — Hyperedge layer

**Why:** The graph data includes 8 conceptual hyperedge groupings (e.g., "Creative Engines System", "Sequence Renderer Contract") that represent high-level architecture concepts. These are completely invisible in the current UI. Surfacing them turns the graph from "here are 339 blobs" into "here are the 8 major architectural concepts and how they connect."

### Strategy

Render hyperedges as translucent wireframe hulls or dashed connecting arcs between the nodes they group. The hyperedge has a label, a set of node IDs, and a confidence score.

Since nodes are positioned in 3D space, compute the **convex hull** of each hyperedge's member nodes and render it as a translucent wireframe mesh. This follows the principle of "show the shape of the concept."

### Data model

Hyperedge data from `graph.json`:

```ts
type Hyperedge = {
  id: string;
  label: string;
  nodes: string[]; // node IDs
  relation: string;
  confidence?: string;
  confidence_score?: number;
  source_file?: string;
};
```

### New utility: `src/utils/hyperedges.ts`

```tsx
import * as THREE from 'three';

type HyperedgeData = {
  id: string;
  label: string;
  confidence?: string;
  nodeIndices: number[]; // resolved indices into positions array
};

function computeHyperedgeHull(
  positions: Float32Array,
  nodeIndices: number[]
): THREE.BufferGeometry | null {
  if (nodeIndices.length < 3) return null;

  // Collect world positions
  const points: THREE.Vector3[] = nodeIndices.map((idx) => {
    return new THREE.Vector3(
      positions[idx * 3],
      positions[idx * 3 + 1],
      positions[idx * 3 + 2]
    );
  });

  // Compute convex hull
  // For Three.js: use ConvexGeometry from three/examples/jsm/geometries/ConvexGeometry
  // Or compute manually with a quick hull algorithm
  const geometry = new ConvexGeometry(points);
  return geometry;
}
```

**Important:** `ConvexGeometry` is available from `three/addons/geometries/ConvexGeometry.js` (or `three/examples/jsm/geometries/ConvexGeometry`). Verify the import path works with the project's bundler setup.

### New component: `src/components/HyperedgeLayer.tsx`

```tsx
import { useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useDataStore } from '../stores/dataStore';

function HyperedgeLayer() {
  const graphData = useDataStore((s) => s.graphData);
  const positions = useDataStore((s) => s.positions);
  const nodeIndex = useDataStore((s) => s.nodeIndex);

  const hyperedges = graphData?.graph?.hyperedges ?? [];

  const meshes = useMemo(() => {
    if (!positions || !graphData) return [];

    return hyperedges
      .map((he) => {
        const indices = he.nodes
          .map((nid) => nodeIndex.get(nid))
          .filter((idx): idx is number => idx !== undefined);

        if (indices.length < 3) return null;

        const points = indices.map(
          (idx) =>
            new THREE.Vector3(
              positions[idx * 3],
              positions[idx * 3 + 1],
              positions[idx * 3 + 2]
            )
        );

        // Compute centroid for label position
        const centroid = new THREE.Vector3();
        for (const pt of points) centroid.add(pt);
        centroid.divideScalar(points.length);

        // Compute convex hull for the wireframe
        const {
          ConvexGeometry
        } = require('three/addons/geometries/ConvexGeometry.js');
        const geometry = new ConvexGeometry(points);
        const edges = new THREE.EdgesGeometry(geometry);

        return { edges, centroid, label: he.label, id: he.id };
      })
      .filter((m): m is NonNullable<typeof m> => m !== null);
  }, [hyperedges, positions, nodeIndex, graphData]);

  if (meshes.length === 0) return null;

  // Config for hyperedge visuals
  const hullOpacity = 0.08;
  const hullColor = '#8888ff';
  const wireColor = '#aaaaff';

  return (
    <>
      {meshes.map((m) => (
        <group key={m.id}>
          {/* Translucent hull */}
          <mesh
            geometry={m.edges}
            frustumCulled={false}
          >
            <meshBasicMaterial
              color={hullColor}
              transparent
              opacity={hullOpacity}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          {/* Wireframe overlay */}
          <lineSegments
            geometry={m.edges}
            frustumCulled={false}
          >
            <lineBasicMaterial
              color={wireColor}
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </lineSegments>
          {/* Label */}
          <Text
            position={[m.centroid.x, m.centroid.y, m.centroid.z]}
            fontSize={0.8}
            color="#aaaaff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
            outlineOpacity={0.8}
          >
            {m.label}
          </Text>
        </group>
      ))}
    </>
  );
}
```

### Integration in Scene

In `src/components/Scene.tsx`, add `HyperedgeLayer` in overview mode:

```tsx
{
  viewMode === 'overview' && (
    <>
      <GraphCommunitySpheres visibleIds={visibleCommunityIds} />
      {showEdges && <CommunityEdges visibleIds={visibleCommunityIds} />}

      {/* New: hyperedge layer */}
      <HyperedgeLayer />

      {/* Labels ... */}
    </>
  );
}
```

### Toggle for hyperedges

Add a `showHyperedges` toggle to `uiStore`:

```tsx
// uiStore.ts
showHyperedges: boolean;  // default: false (opt-in, can be overwhelming)
setShowHyperedges: (on: boolean) => void;
```

Add a switch in the Display section of the panel:

```tsx
<Switch
  label="Show hyperedges"
  checked={showHyperedges}
  onCheckedChange={setShowHyperedges}
/>
```

### Config changes (`src/config.ts`)

```tsx
export const hyperedge = {
  hullOpacity: 0.08,
  hullColor: '#8888ff',
  wireColor: '#aaaaff',
  labelFontSize: 0.8,
  labelColor: '#aaaaff'
} as const;
```

### Files touched

- `src/utils/hyperedges.ts` — new file (hull computation helper)
- `src/components/HyperedgeLayer.tsx` — new file
- `src/components/Scene.tsx` — add HyperedgeLayer in overview mode
- `src/stores/uiStore.ts` — add `showHyperedges` toggle
- `src/components/GraphPanel.tsx` — add toggle switch
- `src/config.ts` — add hyperedge visual config

---

## 3.3 — Dead-code visualization

**Why:** The graph's `confidence` and `confidence_score` on edges are the exact signal for dead vs active code. An isolated node (zero edges) or a node whose only connections are `INFERRED` (speculative/LLM-inferred) is a dead-code candidate. This should be visually obvious.

### Strategy

Two visual cues:

1. **Isolated nodes** (degree = 0) — render with a dashed outline or a distinct desaturated color
2. **Low-confidence nodes** (all edges are `INFERRED`) — render with reduced opacity and a warning indicator

### Utility changes (`src/utils/nodes.ts`)

Add a helper to classify node health:

```tsx
export type NodeHealth = 'active' | 'low-confidence' | 'isolated';

export function classifyNodeHealth(
  nodeId: string,
  links: GraphLink[],
  degrees: Float32Array | null,
  nodeIndex: Map<string, number>,
  idx: number
): NodeHealth {
  const deg = degrees?.[idx] ?? 0;
  if (deg === 0) return 'isolated';

  // Check if all edges for this node are INFERRED
  const nodeLinks = links.filter(
    (l) => l.source === nodeId || l.target === nodeId
  );
  const allInferred =
    nodeLinks.length > 0 &&
    nodeLinks.every(
      (l) =>
        l.confidence === 'INFERRED' ||
        (l.confidence_score !== undefined && l.confidence_score < 0.3)
    );
  if (allInferred) return 'low-confidence';

  return 'active';
}
```

### Config changes (`src/config.ts`)

```tsx
export const nodeHealth = {
  isolated: {
    opacity: 0.4,
    desaturate: 0.8, // how much to fade the community color
    ringColor: '#ff4444'
  },
  lowConfidence: {
    opacity: 0.6,
    ringColor: '#ffaa00'
  },
  active: {
    // normal rendering — no changes
  }
} as const;
```

### Component changes

**Modify `GraphNodes.tsx`** to apply health-based visual changes:

```tsx
// In the per-instance setup loop:
const health = classifyNodeHealth(nodes[i]!.id, links, degrees, nodeIndex, i);

let opacity = 1;
let healthRing: string | null = null;

if (health === 'isolated') {
  opacity = nodeHealth.isolated.opacity;
  healthRing = nodeHealth.isolated.ringColor;
} else if (health === 'low-confidence') {
  opacity = nodeHealth.lowConfidence.opacity;
  healthRing = nodeHealth.lowConfidence.ringColor;
}

// Apply opacity — since InstancedMesh doesn't support per-instance opacity,
// render sick nodes as a separate instancedMesh with lower material opacity.
```

**The InstancedMesh opacity problem again.** Same as 1.1 — we can't do per-instance opacity easily.

**Solution:** Split into two (or three) instancedMeshes:

- Health group `active` — full opacity (the default)
- Health group `low-confidence` — reduced opacity
- Health group `isolated` — further reduced opacity

The `GraphNodes` component already handles similar splitting for search highlights (Phase 1.1). Generalize the approach:

```tsx
// Group nodes by health
const healthGroups = useMemo(() => {
  const groups: Record<NodeHealth, number[]> = {
    active: [],
    'low-confidence': [],
    isolated: []
  };

  for (let i = 0; i < nodes.length; i++) {
    const health = classifyNodeHealth(
      nodes[i]!.id,
      links,
      degrees,
      nodeIndex,
      i
    );
    groups[health].push(i);
  }
  return groups;
}, [nodes, links, degrees, nodeIndex]);
```

Then render each group:

```tsx
<>
  {healthGroups.active.length > 0 && (
    <GraphNodesGroup
      indices={healthGroups.active}
      opacity={1}
      highlightIndices={highlightIndices}
      ...
    />
  )}
  {healthGroups['low-confidence'].length > 0 && (
    <GraphNodesGroup
      indices={healthGroups['low-confidence']}
      opacity={0.6}
      highlightIndices={highlightIndices}
      ringColor="#ffaa00"
      ...
    />
  )}
  {healthGroups.isolated.length > 0 && (
    <GraphNodesGroup
      indices={healthGroups.isolated}
      opacity={0.35}
      highlightIndices={highlightIndices}
      ringColor="#ff4444"
      ...
    />
  )}
</>
```

**Refactored `GraphNodes.tsx`:** Extract the per-instance rendering into an inner `GraphNodesGroup` component that accepts `indices`, `opacity`, and optional `ringColor`. This component handles the instancedMesh setup for its subset of nodes.

For the **health ring**: Add a torus ring (similar to Phase 0.3's file type indicator) colored by health status. This makes isolated/low-confidence nodes visible even at low opacity.

### Files touched

- `src/utils/nodes.ts` — add `classifyNodeHealth` and `NodeHealth` type
- `src/config.ts` — add `nodeHealth` config
- `src/components/GraphNodes.tsx` — split into health groups, add ring indicators

---

## 3.4 — Stats → insights

**Why:** Current stats are raw counts — "24/339 comms, 4113 nodes, 6204 edges." They communicate nothing about codebase health. Replace with meaningful metrics that answer the questions the graph is designed for.

### GraphPanel changes (`src/components/GraphPanel.tsx`)

Replace the simple badge row with computed insights:

```tsx
// Compute insights from data
const insights = (() => {
  if (!graphData || !positions || !degrees) return null;

  // Top 10 community concentration
  const sortedComms = [...communities.values()].sort(
    (a, b) => b.nodeCount - a.nodeCount
  );
  const top10Nodes = sortedComms
    .slice(0, 10)
    .reduce((sum, c) => sum + c.nodeCount, 0);
  const concentration = ((top10Nodes / graphData.nodes.length) * 100).toFixed(
    0
  );

  // Coupling density
  const totalPossiblePairs = (communities.size * (communities.size - 1)) / 2;
  const actualPairs = interCommunityEdges.size;
  const couplingDensity = ((actualPairs / totalPossiblePairs) * 100).toFixed(1);

  // Isolated nodes
  let isolated = 0;
  let lowConfidence = 0;
  for (let i = 0; i < graphData.nodes.length; i++) {
    const health = classifyNodeHealth(
      graphData.nodes[i]!.id,
      graphData.links,
      degrees,
      nodeIndex,
      i
    );
    if (health === 'isolated') isolated++;
    if (health === 'low-confidence') lowConfidence++;
  }

  // Most coupled community
  let maxCoupling = 0;
  let maxCouplingComm = '';
  for (const [cidStr, edges] of interCommunityEdges) {
    // edges is InterCommunityEdge with .count
    const comm = communities.get(
      edges.sourceCid === cidStr ? edges.sourceCid : edges.targetCid
    );
    if (edges.count > maxCoupling) {
      maxCoupling = edges.count;
      maxCouplingComm = comm?.label ?? `Community ${cidStr}`;
    }
  }

  return {
    concentration,
    couplingDensity,
    isolated,
    lowConfidence,
    maxCoupling,
    maxCouplingComm
  };
})();
```

Render as a compact insight panel:

```tsx
<div className="flex flex-col gap-1.5 rounded-lg border p-2.5 text-[11px]">
  <div className="text-muted-foreground mb-0.5 text-[10px] font-medium tracking-wider uppercase">
    Insights
  </div>
  <div className="flex items-center justify-between">
    <span>Top 10 communities</span>
    <span className="font-medium">{insights.concentration}% of nodes</span>
  </div>
  <div className="flex items-center justify-between">
    <span>Coupling density</span>
    <span className="font-medium">{insights.couplingDensity}%</span>
  </div>
  <div className="flex items-center justify-between">
    <span>Isolated nodes</span>
    <span className="font-medium text-red-400">{insights.isolated}</span>
  </div>
  <div className="flex items-center justify-between">
    <span>Low-confidence</span>
    <span className="font-medium text-amber-400">{insights.lowConfidence}</span>
  </div>
  {insights.maxCoupling > 0 && (
    <div className="mt-0.5 border-t pt-1.5 text-[10px]">
      <span className="text-muted-foreground">Strongest coupling: </span>
      <span className="font-medium">{insights.maxCouplingComm}</span>
      <span className="text-muted-foreground">
        {' '}
        ({insights.maxCoupling} edges)
      </span>
    </div>
  )}
</div>
```

This replaces the raw stat badges, making the panel actually informative about codebase health.

### Files touched

- `src/components/GraphPanel.tsx` — replace stats badges with computed insights

---

## 3.5 — Directional edges

**Why:** The graph's link data has direction (`source` → `target`), and the `GraphData` type has `directed: boolean`. But edges are rendered as undirected lines. For understanding dependencies — who depends on who — direction is critical.

### Strategy

Add arrowhead indicators on inter-community edges and optionally on intra-community edges. Since the graph is undirected in practice (the metadata says `directed: false`), but links have a semantic direction (file A imports file B), we should show direction where it matters most: on the inter-community edges (dependency direction between packages).

### Config changes (`src/config.ts`)

```tsx
export const directedEdge = {
  enabled: true,
  arrowSize: 0.3,
  arrowColor: '#ffffff',
  opacity: 0.5,
  // Only show on edges with directed semantics
  directedRelations: ['imports', 'imports_from', 'calls', 're_exports']
} as const;
```

### Component changes

**New approach:** Instead of modifying `LineSegments` (which don't support arrowheads natively), render arrowheads as small cone meshes positioned at the target end of each directed edge.

For inter-community edges (`CommunityEdges.tsx`), we need to know the directionality of the aggregated edges. Since `InterCommunityEdge` only has `sourceCid` and `targetCid` (and `count`), we can infer direction from the underlying links.

**Data flow:** Extend `InterCommunityEdge` to include a `directedCount`:

```tsx
// In src/utils/communities.ts, extend InterCommunityEdge:
type InterCommunityEdge = {
  sourceCid: number;
  targetCid: number;
  count: number;
  directed: boolean;
  // New:
  sourceToTargetCount: number; // how many edges go sourceCid → targetCid
  targetToSourceCount: number; // how many go targetCid → sourceCid
};
```

**CommunityEdges changes:** For each inter-community edge, if `sourceToTargetCount >> targetToSourceCount` (significantly directed), render an arrowhead at the target end.

**Simpler first pass:** Only show direction on intra-community edges in detail mode, where individual links are rendered and direction is per-link. Add a small cone at the target position:

```tsx
// In a new DirectedArrowhead component:
function DirectedArrowhead({
  from,
  to,
  color
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    // Point from → to
    const direction = new THREE.Vector3(
      to[0] - from[0],
      to[1] - from[1],
      to[2] - from[2]
    ).normalize();
    ref.current.position.set(to[0], to[1], to[2]);
    ref.current.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );
  }, [from, to]);

  return (
    <mesh ref={ref}>
      <coneGeometry args={[0.15, 0.3, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}
```

For inter-community edges, aggregate directionality in the `computeInterCommunityEdges` function:

```tsx
// In utils/communities.ts:
export type InterCommunityEdge = {
  sourceCid: number;
  targetCid: number;
  count: number;
  directed: boolean;
  sourceToTargetCount: number;  // new
  targetToSourceCount: number;  // new
};

export function computeInterCommunityEdges(...) {
  // ... existing logic ...
  // Track direction:
  if (sourceComm === targetComm) continue;
  const key = `${Math.min(sourceComm, targetComm)}-${Math.max(sourceComm, targetComm)}`;

  if (!map.has(key)) {
    map.set(key, {
      sourceCid: sourceComm,
      targetCid: targetComm,
      count: 0,
      directed: false,
      sourceToTargetCount: 0,
      targetToSourceCount: 0,
    });
  }

  const entry = map.get(key)!;
  entry.count++;
  if (link.source === sourceNodeId) {
    // Edge goes from sourceCid → targetCid
    if (sourceComm === entry.sourceCid) entry.sourceToTargetCount++;
    else entry.targetToSourceCount++;
  } else {
    // Edge goes from targetCid → sourceCid
    if (targetComm === entry.sourceCid) entry.sourceToTargetCount++;
    else entry.targetToSourceCount++;
  }
  // ... rest
}
```

**Recommendation:** For Phase 3.5, start with inter-community edge direction only. Intra-community edges are numerous and arrowheads at scale would be visual noise. Inter-community edges (fewer in number) benefit more from showing "who depends on who."

### Files touched

- `src/config.ts` — add `directedEdge` config
- `src/utils/communities.ts` — extend `InterCommunityEdge` type and computation
- `src/components/CommunityEdges.tsx` — add arrowhead rendering at the dominant direction end

---

## Files Changed Summary

| #   | Change                  | New Files                                   | Modified Files                                            |
| --- | ----------------------- | ------------------------------------------- | --------------------------------------------------------- |
| 3.1 | Coupling heatmap        | —                                           | `config.ts`, `CommunityEdges.tsx`                         |
| 3.2 | Hyperedge layer         | `utils/hyperedges.ts`, `HyperedgeLayer.tsx` | `Scene.tsx`, `uiStore.ts`, `GraphPanel.tsx`, `config.ts`  |
| 3.3 | Dead-code visualization | —                                           | `utils/nodes.ts`, `config.ts`, `GraphNodes.tsx`           |
| 3.4 | Stats → insights        | —                                           | `GraphPanel.tsx`                                          |
| 3.5 | Directional edges       | —                                           | `config.ts`, `utils/communities.ts`, `CommunityEdges.tsx` |

**Total: 2 new files, ~9 files modified.**

## Acceptance Criteria

After Phase 3:

- [ ] Inter-community edges visually encode coupling strength (thick/bright vs thin/faint)
- [ ] Hyperedge hulls are visible in overview mode when toggled on
- [ ] Isolated nodes (degree = 0) are visually distinct (dim + red ring)
- [ ] Low-confidence nodes (all edges INFERRED) are visually distinct (dim + amber ring)
- [ ] Panel shows computed insights (concentration, coupling density, isolated count)
- [ ] Strongly directed inter-community edges show arrowheads
- [ ] No visual regressions in basic overview/detail functionality
