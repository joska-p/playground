# Phase 0 — Visual Encoding Foundation

> **Theme:** Make the graph readable at a glance.
> The richest signals (relation type, confidence, file type) are invisible today.
> This phase encodes them visually so the graph communicates meaning without panel cross-referencing.

---

## 0.1 — Edge color by relation type

**Why:** 11 relation types (`imports`, `calls`, `references`, etc.) all render as `#888888` lines. The user can't tell *how* two things are connected without clicking and checking the panel. This is the single highest-leverage visual change.

### Config changes (`src/config.ts`)

Add a relation-to-color palette. Group related types into hue families so the eye can pattern-match without memorizing 11 colors:

```ts
// Grouped by semantic family — import-related, call-related, structure, similarity
export const relationPalette: Record<string, string> = {
  // Import family — blues
  imports:            '#4cc9f0',
  imports_from:       '#3aa8d0',
  re_exports:         '#2d8bb5',

  // Call/use family — greens
  calls:              '#06d6a0',
  references:         '#2a9d8f',
  uses:               '#81b29a',

  // Structure family — oranges/yellows
  contains:           '#f77f00',
  method:             '#ffd166',
  implements:         '#e85d04',

  // Similarity family — purples
  conceptually_related_to: '#9b5de5',
  semantically_similar_to: '#7b3bc0',
} as const;

// Fallback for unknown relations
export const relationFallbackColor = '#666666';
```

Add a config for the opacity base:
```ts
export const graphEdge = {
  color: '#888888',         // kept as fallback
  opacity: 0.25,            // kept
  opacityByConfidence: {
    CONFIDENT: 0.3,
    INFERRED: 0.1,
    default: 0.15,
  },
} as const;
```

### Component changes (`src/components/GraphEdges.tsx`)

Currently: one `BufferGeometry` with all edge vertices → one `lineSegments` with uniform color.

**Rewrite:** Build per-edge vertex colors alongside positions. Use `lineBasicMaterial` with `vertexColors: true`.

```ts
// New approach:
// For each valid link:
//   - Look up relation → color from relationPalette
//   - Apply confidence-based opacity
//   - Set both vertices of the line segment to that color
//   - (For opacity: split into confident/inferred batches or use per-edge approach)

// Option A (recommended): Single geometry with vertex colors + single material opacity
// This keeps one draw call and is simpler.
// Confidence is encoded via a separate alpha pass (0.3).

// Option B: Split into multiple lineSegments by confidence level
// Two draw calls. Simpler to implement but more overhead.
// Use Option A unless per-edge alpha proves necessary.
```

Vertex color approach:

```ts
const verts = new Float32Array(validLinks.length * 6);
const colors = new Float32Array(validLinks.length * 6);
const color = new THREE.Color();

for (let i = 0; i < validLinks.length; i++) {
  const link = validLinks[i]!;
  const si = nodeIndex.get(link.source)!;
  const ti = nodeIndex.get(link.target)!;

  // Position
  verts[i * 6]     = positions[si * 3];
  verts[i * 6 + 1] = positions[si * 3 + 1];
  verts[i * 6 + 2] = positions[si * 3 + 2];
  verts[i * 6 + 3] = positions[ti * 3];
  verts[i * 6 + 4] = positions[ti * 3 + 1];
  verts[i * 6 + 5] = positions[ti * 3 + 2];

  // Color from relation type
  const hex = relationPalette[link.relation] ?? relationFallbackColor;
  color.set(hex);
  colors[i * 6]     = color.r;
  colors[i * 6 + 1] = color.g;
  colors[i * 6 + 2] = color.b;
  colors[i * 6 + 3] = color.r;
  colors[i * 6 + 4] = color.g;
  colors[i * 6 + 5] = color.b;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
```

Keep the material but switch to `vertexColors`:
```tsx
<lineBasicMaterial
  vertexColors
  transparent
  opacity={graphEdge.opacity}
  depthWrite={false}
/>
```

The `opacity` will be the base; confidence adjustments happen in 0.2.

**Also update `HighlightedEdges.tsx`** similarly — use the relation color of the highlighted edge instead of white.

### Files touched
- `src/config.ts` — add `relationPalette`, `relationFallbackColor`, extend `graphEdge`
- `src/components/GraphEdges.tsx` — add vertex colors from relation type
- `src/components/HighlightedEdges.tsx` — use relation color instead of hardcoded white

---

## 0.2 — Edge opacity by confidence

**Why:** The graph has `confidence: 'INFERRED' | 'CONFIDENT'` on edges, plus `confidence_score`. Inferred edges are speculative (e.g., LLM-inferred semantic similarity). Fading them makes dead-code candidates and weak signals visually distinct from hard dependencies.

### Strategy

The simplest approach that avoids per-edge alpha complexity: **render two separate `lineSegments` groups** — one for CONFIDENT edges at normal opacity, one for INFERRED edges at reduced opacity.

```
┌──────────────────────────────────────────────┐
│ GraphEdges.tsx                                │
│                                               │
│  validLinks                                    │
│    ├── confidentLinks → lineSegments (opacity 0.3) │
│    └── inferredLinks → lineSegments (opacity 0.08) │
└──────────────────────────────────────────────┘
```

### Implementation

```ts
// Split links by confidence
const confidentLinks = validLinks.filter(
  l => !l.confidence || l.confidence === 'CONFIDENT'
);
const inferredLinks = validLinks.filter(
  l => l.confidence === 'INFERRED'
);
```

Then render two `<lineSegments>` groups with different opacity:

```tsx
<>
  {confidentVerts.length > 0 && (
    <lineSegments geometry={confidentGeometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={graphEdge.opacityByConfidence.CONFIDENT}
        depthWrite={false}
      />
    </lineSegments>
  )}
  {inferredVerts.length > 0 && (
    <lineSegments geometry={inferredGeometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={graphEdge.opacityByConfidence.INFERRED}
        depthWrite={false}
      />
    </lineSegments>
  )}
</>
```

Both groups use the same vertex-color encoding from 0.1 — the only difference is opacity.

**Future enhancement:** Later (Phase 3), nodes connected only via inferred edges can get a distinct visual treatment (dashed outline, desaturated color).

### Files touched
- `src/config.ts` — already extended in 0.1 with `opacityByConfidence`
- `src/components/GraphEdges.tsx` — split rendering into two confidence tiers

---

## 0.3 — File type visual indicator on nodes

**Why:** The graph has `file_type: 'code' | 'document' | 'image'` on every node. Today all nodes look identical — you can't tell a source file from a markdown document from an image asset. This node metadata is essential for understanding codebase structure (documentation coverage, asset distribution).

### Strategy

Add a **thin torus ring** around each node sphere, colored by file type. This is a separate `instancedMesh` that shares the same positions as the node spheres. The ring sits at the node's equator, providing a clear visual badge without obscuring the node's degree-based size/color.

```
Node sphere (size = degree, color = community)
  ↓
  ⭕ Torus ring at equator (color = file type)
```

### Config changes (`src/config.ts`)

```ts
export const fileTypeIndicator = {
  code:     { color: '#000000', opacity: 0 },     // invisible — code is the default, no badge needed
  document: { color: '#4cc9f0', opacity: 0.7 },    // blue ring
  image:    { color: '#06d6a0', opacity: 0.7 },    // green ring
  torusRadius: 0.7,
  torusTube: 0.04,
} as const;
```

**Design rationale:** Code is the bulk of nodes — making it the "no badge" default keeps the scene clean. Documents and images get colored rings because they're the minority and worth spotting.

### Component changes

**New component:** `src/components/NodeTypeIndicators.tsx`

```tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { fileTypeIndicator } from '../config';
import type { GraphNode } from '../types';

type Props = {
  positions: Float32Array;
  nodes: GraphNode[];
  degrees?: Float32Array | null;
};

function NodeTypeIndicators({ positions, nodes, degrees }: Props) {
  const typeGroups = (() => {
    const groups: Record<string, { indices: number[]; color: string; opacity: number }> = {};
    for (const [type, cfg] of Object.entries(fileTypeIndicator)) {
      if (type === 'torusRadius' || type === 'torusTube') continue;
      const color = (cfg as { color: string; opacity: number }).color;
      const opacity = (cfg as { color: string; opacity: number }).opacity;
      if (opacity === 0) continue;
      groups[type] = { indices: [], color, opacity };
    }
    for (let i = 0; i < nodes.length; i++) {
      const type = nodes[i]!.file_type;
      if (groups[type]) groups[type].indices.push(i);
    }
    return groups;
  })();

  // Shared torus geometry
  const torusGeo = new THREE.TorusGeometry(
    fileTypeIndicator.torusRadius,
    fileTypeIndicator.torusTube,
    8,
    12
  );

  return (
    <>
      {Object.entries(typeGroups).map(([type, group]) => {
        if (group.indices.length === 0) return null;
        return (
          <TypeRing
            key={type}
            positions={positions}
            nodes={nodes}
            indices={group.indices}
            color={group.color}
            opacity={group.opacity}
            geometry={torusGeo}
          />
        );
      })}
    </>
  );
}

// Inner component per type — each gets its own instancedMesh
function TypeRing({ positions, nodes, indices, color, opacity, geometry }: { ... }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();
    const count = indices.length;

    for (let i = 0; i < count; i++) {
      const nodeIdx = indices[i]!;
      const px = positions[nodeIdx * 3]!;
      const py = positions[nodeIdx * 3 + 1]!;
      const pz = positions[nodeIdx * 3 + 2]!;

      dummy.position.set(px, py, pz);
      dummy.rotation.x = Math.PI / 2;  // lay flat at equator
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }

    ref.current.instanceMatrix.needsUpdate = true;
  }, [positions, nodes, indices, geometry]);

  return (
    <instancedMesh ref={ref} args={[geometry, undefined, indices.length]}>
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </instancedMesh>
  );
}
```

Each type (`document`, `image`) gets its own `instancedMesh` — that's 2 extra draw calls. For the node counts involved (documents and images are minorities), this is negligible.

### Integration in Scene

In `src/components/Scene.tsx`, add the component alongside `GraphNodes` in detail mode:

```tsx
{viewMode === 'detail' && detailData && (
  <>
    <GraphNodes ... />
    <NodeTypeIndicators
      positions={detailData.positions}
      nodes={detailData.nodes}
    />
    ...
  </>
)}
```

### Files touched
- `src/config.ts` — add `fileTypeIndicator`
- `src/components/NodeTypeIndicators.tsx` — new file
- `src/components/Scene.tsx` — add NodeTypeIndicators in detail mode

---

## 0.4 — Color legend component

**Why:** 24 palette colors map to communities arbitrarily. Without a legend, the user sees colored spheres but can't map them to community names. This forces constant panel-list cross-referencing.

### Design

A collapsible section in `GraphPanel` showing all visible communities as color swatches + label + node count.

```
┌─────────────────────────────────┐
│ Legend ▾                        │
│                                 │
│ 🔵 @repo/ui (142)              │
│ 🟣 @repo/graph-viz (68)        │
│ 🟡 apps/playground (45)        │
│ 🟢 ...                         │
└─────────────────────────────────┘
```

### Implementation

**New component:** `src/components/ColorLegend.tsx`

```tsx
import { useState } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';

function ColorLegend() {
  const communities = useDataStore((s) => s.communities);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const communityFilter = useUiStore((s) => s.communityFilter);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const [collapsed, setCollapsed] = useState(false);

  const list = [...communities.values()]
    .filter(c => c.nodeCount >= minCommunitySize)
    .sort((a, b) => b.nodeCount - a.nodeCount)
    .slice(0, 50);

  if (list.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-muted-foreground flex items-center gap-1 text-xs font-medium"
      >
        {collapsed ? '▸' : '▾'} Legend
      </button>

      {!collapsed && (
        <div className="flex flex-col gap-0.5">
          {list.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCommunityFilter(String(c.id))}
              className="hover:bg-accent flex items-center gap-2 rounded px-1.5 py-0.5 text-xs transition-colors"
              title={`Community ${c.id} — ${c.nodeCount} nodes`}
            >
              <span
                className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              <span className="flex-1 truncate text-left">{c.label}</span>
              <span className="text-muted-foreground flex-shrink-0">{c.nodeCount}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Key behaviors:**
- Clicking a swatch navigates to that community's detail mode (same as clicking the sphere)
- Collapsible so it doesn't dominate the panel
- Respects `minCommunitySize` filter
- Limited to top 50 (same as the existing community list)
- Swatch + label + node count in a compact row

### Panel integration

In `GraphPanel.tsx`, **replace the existing "Communities" list** (lines 223-246) with the new `ColorLegend` component. The existing list is nearly identical in function but lacks the color-name association in the heading — the legend makes the purpose explicit.

Before:
```
<Communities> list (generic section)
```

After (import + use):
```tsx
<ColorLegend />
```

### Files touched
- `src/components/ColorLegend.tsx` — new file
- `src/components/GraphPanel.tsx` — replace community list with ColorLegend

---

## 0.5 — Smarter community labels

**Why:** Currently the top 25 communities by size get persistent labels in overview mode. This is arbitrary — a community with 26 nodes might get a label while one with 24 doesn't, regardless of whether the camera is close or far. Labels should be **distance-aware** so you see more when zoomed in and fewer when zoomed out.

### Config changes (`src/config.ts`)

Add smart label parameters to `communityLabel`:

```ts
export const communityLabel = {
  // ... existing values ...
  smartLabel: {
    enabled: true,
    baseThreshold: 10,           // show label if nodeCount >= this at default zoom
    distanceScale: 0.05,         // additional threshold per unit of camera distance
    maxLabels: 40,               // absolute cap to prevent clutter
  },
} as const;
```

Formula: `threshold = baseThreshold + cameraDistance * distanceScale`

At default overview distance (~60 units):
`threshold = 10 + 60 * 0.05 = 13` → communities with 13+ nodes get labels
At distance 30 (zoomed in): `threshold = 10 + 30 * 0.05 = 11.5` → more labels
At distance 100 (zoomed out): `threshold = 10 + 100 * 0.05 = 15` → fewer labels

### Scene changes (`src/components/Scene.tsx`)

Currently: `topLabels` computed once using `topLabelMinNodeCount` and `topLabelMaxCount` (fixed values).

**Replace with** dynamic computation that reads camera distance:

```tsx
const camera = useThree((s) => s.camera);

const topLabels = (() => {
  if (viewMode !== 'overview') return [];

  const { smartLabel } = communityLabel;
  if (!smartLabel.enabled) {
    // Fall back to old fixed-K behavior
    return [...]
  }

  const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
  const threshold = smartLabel.baseThreshold + distance * smartLabel.distanceScale;

  return [...communities.values()]
    .filter((c) => {
      if (!visibleCommunityIds?.has(c.id) && visibleCommunityIds !== null) return false;
      return c.nodeCount >= threshold;
    })
    .sort((a, b) => b.nodeCount - a.nodeCount)
    .slice(0, smartLabel.maxLabels);
})();
```

The `useThree` hook must be at the component level (not inside a derived expression). The cleanest approach:

```tsx
// At the top of Scene, alongside other hooks
const camera = useThree((s) => s.camera);
const [cameraDistance, setCameraDistance] = useState(0);

// Track distance via useFrame
useFrame(() => {
  const dist = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
  setCameraDistance(dist);
});
```

Then `cameraDistance` is available for the label computation. The `useFrame` approach updates the derived threshold every frame, causing labels to appear/disappear smoothly as the user zooms.

**Note:** `useFrame` only fires when the R3F canvas is rendering. This is fine — if the user isn't interacting, labels don't need to recalculate.

### Files touched
- `src/config.ts` — add `smartLabel` config
- `src/components/Scene.tsx` — replace label computation with distance-aware version

---

## Summary of Phase 0 Changes

| # | Change | New Files | Modified Files | Draw Calls Added |
|---|--------|-----------|----------------|-----------------|
| 0.1 | Edge color by relation | — | `config.ts`, `GraphEdges.tsx`, `HighlightedEdges.tsx` | 0 (same geometry, added vertex colors) |
| 0.2 | Edge opacity by confidence | — | `GraphEdges.tsx` | +1 (split into confident/inferred) |
| 0.3 | File type indicators | `NodeTypeIndicators.tsx` | `config.ts`, `Scene.tsx` | +2 (up to 2 instancedMeshes) |
| 0.4 | Color legend | `ColorLegend.tsx` | `GraphPanel.tsx` | 0 (DOM only) |
| 0.5 | Smart labels | — | `config.ts`, `Scene.tsx` | 0 |

**Total: 3 new files, ~7 files modified. At most 3 additional draw calls.**

## Acceptance criteria

After Phase 0:
- [ ] Edge colors distinguish `imports` from `calls` from `references` at a glance
- [ ] Low-confidence edges are visibly fainter than confident ones
- [ ] Document and image nodes have visible rings in detail mode
- [ ] The panel shows a color legend that maps swatches to community labels
- [ ] Community labels appear/disappear as the camera zooms in/out, not as a fixed top-K
- [ ] All existing functionality still works (overview/detail modes, selection, filtering)
- [ ] No visual regressions in the 3D scene
