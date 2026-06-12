# Phase 4 — Performance & Polish

> **Theme:** Handle the full scale. 4113 nodes, 6204 edges, 339 communities — the app should feel fast and not overwhelm.
> **Dependencies:** Phase 0–3 complete (encoding, discovery, interactions, insights are all in place).

---

## 4.1 — Community clustering at zoom-out

**Why:** At overview zoom, 339 spheres fill the viewport. Many are tiny (communities with 1–5 nodes). Clustering them into a "small communities" group when the camera is far reduces visual clutter and makes the graph readable at a distance. As the user zooms in, clusters split into individual communities.

### Strategy

Aggregate communities below a **dynamic size threshold** into a single "Other communities" group when the camera is beyond a certain distance.

The threshold is distance-dependent:
- At default zoom (distance ~60): show communities with >= 3 nodes, cluster the rest
- At max zoom-out: show communities with >= 10 nodes, cluster the rest
- At close zoom (distance < 30): show all communities

### Config changes (`src/config.ts`)

```tsx
export const clustering = {
  enabled: true,
  minClusterSize: 3,              // communities smaller than this may be clustered
  clusterDistanceThreshold: 40,   // camera distance below which all communities show
  clusterLabel: 'Other communities',
  clusterColor: '#555555',
  clusterOpacity: 0.3,
} as const;
```

### Scene changes (`src/components/Scene.tsx`)

Derive a clustered community list based on camera distance:

```tsx
// In overview mode, after computing visibleCommunityIds:
const clusteredCommunities = (() => {
  if (viewMode !== 'overview' || !clustering.enabled) return null;

  const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
  if (distance < clustering.clusterDistanceThreshold) return null; // no clustering when close

  const threshold = Math.max(
    clustering.minClusterSize,
    Math.floor(distance / 10)  // scale threshold with distance
  );

  const regular: CommunityData[] = [];
  const small: CommunityData[] = [];

  for (const c of communities.values()) {
    if (visibleCommunityIds && !visibleCommunityIds.has(c.id)) continue;
    if (c.nodeCount >= threshold) {
      regular.push(c);
    } else {
      small.push(c);
    }
  }

  if (small.length === 0) return null; // no small communities to cluster

  // Compute cluster centroid as the average of all small community centroids
  const clusterCentroid: [number, number, number] = [0, 0, 0];
  for (const c of small) {
    clusterCentroid[0] += c.centroid[0];
    clusterCentroid[1] += c.centroid[1];
    clusterCentroid[2] += c.centroid[2];
  }
  clusterCentroid[0] /= small.length;
  clusterCentroid[1] /= small.length;
  clusterCentroid[2] /= small.length;

  // Total node count in cluster
  const clusterNodeCount = small.reduce((sum, c) => sum + c.nodeCount, 0);

  return {
    regular,
    cluster: {
      centroid: clusterCentroid,
      nodeCount: clusterNodeCount,
      count: small.length,
    },
  };
})();
```

Then pass the clustered data to `GraphCommunitySpheres`:

```tsx
<GraphCommunitySpheres
  visibleIds={clusteredCommunities
    ? new Set(clusteredCommunities.regular.map(c => c.id))
    : visibleCommunityIds}
  cluster={clusteredCommunities?.cluster}
/>
```

### GraphCommunitySpheres changes

Accept an optional `cluster` prop:

```tsx
type ClusterInfo = {
  centroid: [number, number, number];
  nodeCount: number;
  count: number;
};

type GraphCommunitySpheresProps = {
  ghost?: boolean;
  visibleIds?: Set<number> | null;
  cluster?: ClusterInfo;  // new
};
```

When `cluster` is provided, render an additional larger, dim sphere at the cluster centroid:

```tsx
// In the useEffect, after rendering regular communities:
if (cluster) {
  // Set the last instance to the cluster sphere
  const i = communityList.length; // the (N+1)th instance
  dummy.position.set(cluster.centroid[0], cluster.centroid[1], cluster.centroid[2]);
  const clusterRadius = Math.cbrt(cluster.nodeCount) * 0.5; // approximate visual size
  dummy.scale.setScalar(clusterRadius);
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
  // Set a neutral gray color
  color.set(clustering.clusterColor);
  mesh.setColorAt(i, color);
}
```

### Files touched
- `src/config.ts` — add `clustering` config
- `src/components/Scene.tsx` — derive `clusteredCommunities` from camera distance
- `src/components/GraphCommunitySpheres.tsx` — accept and render `cluster` prop

---

## 4.2 — Loading progress

**Why:** The force layout worker runs for a non-trivial time on 4113 nodes. Currently the user sees a single spinner with no indication of progress. They don't know if it's 10% or 90% done. Showing progress builds trust and sets expectations.

### Strategy

The worker sends periodic progress messages back to the main thread. The `WorkerPool`'s `deserialize` function is extended to handle progress messages alongside the final result.

### Worker changes (`src/workers/force-layout.worker.ts`)

The worker already iterates with adaptive cooling (early stopping). Add `postMessage` calls at each iteration:

```tsx
// Inside the layout loop, after each iteration:
const progress = Math.min(iterationCount / maxIterations, 1);
postMessage({ type: 'progress', progress, energy: totalEnergy });

// At the end:
postMessage({ type: 'result', positions: finalPositions });
```

### WorkerPool usage changes (`src/components/GraphCanvas.tsx`)

The current WorkerPool setup expects a single result message. We need to handle multiple messages per task.

**Option A: Extend WorkerPool** to support `onProgress` callback. This is the cleanest solution but touches the shared `@repo/worker-pool` package.

**Option B: Bypass WorkerPool** for progress and use a direct worker message listener. Simpler but bypasses the abstraction.

**Option C: After WorkerPool completes, the progress is lost.** We could track the response.

**Recommendation:** Option A — extend `WorkerPool` to support progress messages:

```tsx
// In @repo/worker-pool
type WorkerTask<TInput, TOutput> = {
  input: TInput;
  onProgress?: (progress: number) => void;  // new
};
```

But this is a cross-package change. For speed, **Option B** is pragmatic:

```tsx
// In GraphCanvas.tsx, set up a direct message listener on the worker
const progressRef = useRef<{ setProgress: (p: number) => void }>(null);
const [loadingProgress, setLoadingProgress] = useState(0);

useEffect(() => {
  if (!graphData) return;

  const worker = new Worker(
    new URL('../workers/force-layout.worker', import.meta.url),
    { type: 'module' }
  );

  worker.postMessage({ message: { nodes: graphData.nodes, links: graphData.links, center: [0,0,0], radius: 30 } });

  worker.onmessage = (event) => {
    const msg = event.data;
    if (msg.type === 'progress') {
      setLoadingProgress(msg.progress);
    } else if (msg.type === 'result') {
      setPositions(msg.positions);
      worker.terminate();
    }
  };

  return () => worker.terminate();
}, [graphData, setPositions]);
```

**Wait** — this bypasses `WorkerPool` entirely. The current code uses `WorkerPool` with `maxPoolSize: 1`. For a single worker, the pool abstraction adds little value. But the pool is used elsewhere in the repo.

**Better approach:** Keep `WorkerPool` for the non-progress case. Handle progress via a separate direct worker when we want progress. Actually, let me look at the current code again:

```tsx
const pool = new WorkerPool<LayoutInput, Float32Array>({
  workerFactory: () =>
    new Worker(new URL('../workers/force-layout.worker', import.meta.url), {
      type: 'module'
    }),
  maxPoolSize: 1,
  serialize: (task) => ({ message: task }),
  deserialize: (event) => ({ ok: true, value: event.data as Float32Array })
});
```

The `WorkerPool.deserialize` function currently casts `event.data` directly to `Float32Array`. To support progress messages, we'd need to check `event.data.type`.

**Simplest path:** Modify the worker to send typed messages, and update the `deserialize` to filter out progress:

```tsx
// Worker (add progress):
postMessage({ type: 'progress', progress: 0.5 });
// Final result:
postMessage({ type: 'result', positions: new Float32Array(...) });

// deserialize:
deserialize: (event) => {
  const data = event.data;
  if (data.type === 'progress') {
    // Need a side channel to report progress
    return { ok: false, value: undefined as never }; // skip
  }
  return { ok: true, value: data.positions as Float32Array };
}
```

This is hacky. The `WorkerPool` type might not accept `{ ok: false }`. Let me check — `WorkerPool` likely expects `{ ok: true, value: TOutput }` or `{ ok: false, error: Error }`.

**Cleanest pragmatic path:** Use a second, direct worker connection for progress, separate from `WorkerPool`. Or, skip the pool for this specific task and use a raw worker:

```tsx
const [loadingProgress, setLoadingProgress] = useState(0);

useEffect(() => {
  if (!graphData) return;

  const worker = new Worker(
    new URL('../workers/force-layout.worker', import.meta.url),
    { type: 'module' }
  );

  worker.postMessage({
    nodes: graphData.nodes,
    links: graphData.links,
    center: [0, 0, 0],
    radius: 30
  });

  worker.onmessage = (event) => {
    const msg = event.data;
    if (msg.type === 'progress') {
      setLoadingProgress(msg.progress);
    } else if (msg.type === 'result') {
      setPositions(msg.positions);
      worker.terminate();
    }
  };

  return () => worker.terminate();
}, [graphData, setPositions]);
```

And keep `WorkerPool` for potential future use with multiple workers. Since `maxPoolSize: 1` anyway, the pool overhead is negligible.

### LoadingFallback changes

Replace the simple spinner with a progress bar:

```tsx
type LoadingFallbackProps = {
  progress: number; // 0–1
};

function LoadingFallback({ progress }: LoadingFallbackProps) {
  const percent = Math.round(progress * 100);

  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-muted-foreground text-sm">Computing graph layout...</p>
          <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-muted-foreground text-xs">{percent}%</p>
        </div>
      </div>
    </div>
  );
}
```

### GraphCanvas changes

```tsx
const [loadingProgress, setLoadingProgress] = useState(0);

// Use a ref to avoid stale closure in the worker callback
const setPositionsRef = useRef(setPositions);
setPositionsRef.current = setPositions;

if (!isLoaded) {
  return <LoadingFallback progress={loadingProgress} />;
}
```

### Files touched
- `src/workers/force-layout.worker.ts` — add progress messages
- `src/components/GraphCanvas.tsx` — use raw worker with progress listener
- `src/components/LoadingFallback.tsx` — accept and render progress bar

---

## 4.3 — Frustum culling audit

**Why:** InstancedMesh supports frustum culling natively, but `frustumCulled` is set to `false` on `GraphNodes` (`GraphNodes.tsx:111`). This means every node is rendered regardless of whether it's in the camera's view. For 4113 nodes, that's wasted GPU work.

### Investigation

Check each component's frustum culling setting:

| Component | `frustumCulled` | Should be |
|-----------|----------------|-----------|
| `GraphNodes` | `false` (line 111) | `true` (default) |
| `GraphCommunitySpheres` | not set → default `true` | `true` ✓ |
| `GraphEdges` | `lineSegments` — no frustumCulled property | N/A |
| `CommunityEdges` | `lineSegments` — no frustumCulled property | N/A |

### GraphNodes changes

Remove the `frustumCulled={false}` override. The default is `true`, which is correct.

```tsx
<instancedMesh
  ref={meshRef}
  args={[sphereGeometry, undefined, count]}
  onClick={handleClick}
  onPointerMove={handlePointerMove}
  onPointerOut={handlePointerOut}
  // frustumCulled removed — defaults to true
>
```

**Why was it false?** Possibly because instances that are off-screen but whose labels are visible need to render. Or because instances were disappearing incorrectly. Test after changing — if instances near the edge disappear prematurely, the bounding sphere of the InstancedMesh may need updating.

If instances do disappear incorrectly:

```tsx
useEffect(() => {
  if (!meshRef.current) return;
  // Compute bounding sphere from positions
  const box = new THREE.Box3();
  for (let i = 0; i < count; i++) {
    const p = new THREE.Vector3(
      positions[i * 3],
      positions[i * 3 + 1],
      positions[i * 3 + 2]
    );
    box.expandByPoint(p);
  }
  const sphere = new THREE.Sphere();
  box.getBoundingSphere(sphere);
  meshRef.current.geometry.boundingSphere = sphere;
  meshRef.current.frustumCulled = true;
}, [positions, count]);
```

### Files touched
- `src/components/GraphNodes.tsx` — remove `frustumCulled={false}` (or compute proper bounding sphere)

---

## 4.4 — LOD for community spheres

**Why:** Community spheres at a distance don't need 16x12 segment geometry. Reducing LOD for distant spheres saves GPU vertex throughput.

### Strategy

Use Three.js `LOD` (Level of Detail) object, or simplify: since `InstancedMesh` uses a single geometry, we can't vary it per instance. Instead, **reduce the base geometry resolution** (smaller impact, simpler) or **swap geometry based on camera distance** (larger impact, more complex).

### Config changes

```tsx
export const communitySphere = {
  radius: 1,
  widthSegments: 16,      // was: 16
  heightSegments: 12,     // was: 12
  // LOD settings
  lod: {
    enabled: false,       // opt-in: requires refactoring InstancedMesh
    farSegments: 8,       // segments at distance
    farThreshold: 80,     // switch at this camera distance
  },
} as const;
```

Set `enabled: false` by default — the current sphere geometry is already modest (16x12 segments × 339 instances = ~65K triangles, which is trivial for modern GPUs). Document this as a future optimization path.

**Priority:** Low. The current geometry count is not a bottleneck. This step exists for completeness and for scenarios where the graph grows significantly (e.g., 50K+ nodes).

### Future implementation sketch

If needed:

```tsx
// Split community spheres into two InstancedMeshes:
// - Near group: high-res geometry (16x12)
// - Far group: low-res geometry (8x6)
// Switch between them based on camera distance

// Or use a single geometry with fewer segments:
const communitySphere.geometry = new THREE.SphereGeometry(1, 8, 6);
// Good enough for small distant spheres
```

### Alternative: Just reduce segments

The simplest approach with no code complexity: reduce the default segments since these spheres are small in the viewport anyway:

```tsx
export const communitySphere = {
  radius: 1,
  widthSegments: 8,    // was 16
  heightSegments: 6,   // was 12
  // ...
};
```

Test visually — the spheres at overview scale (< 2% of viewport typically) won't show faceting at 8×6 segments.

### Files touched
- `src/config.ts` — document LOD config, consider reducing default segments
- `src/components/GraphCommunitySpheres.tsx` — if implementing dynamic LOD (low priority)

---

## Files Changed Summary

| # | Change | New Files | Modified Files |
|---|--------|-----------|----------------|
| 4.1 | Community clustering at zoom-out | — | `config.ts`, `Scene.tsx`, `GraphCommunitySpheres.tsx` |
| 4.2 | Loading progress | — | `force-layout.worker.ts`, `GraphCanvas.tsx`, `LoadingFallback.tsx` |
| 4.3 | Frustum culling audit | — | `GraphNodes.tsx` |
| 4.4 | LOD for community spheres | — | `config.ts` (documentation, low priority) |

**Total: 0 new files, ~6 files modified.** (This phase is primarily optimization and polish.)

## Acceptance Criteria

After Phase 4:
- [ ] Small communities cluster into a single "Other" sphere when camera is zoomed out
- [ ] Zooming in reveals individual communities
- [ ] Loading shows a progress bar with percentage
- [ ] Nodes outside the camera view are correctly culled (no visible pop-in or disappearance)
- [ ] Scene performance is measurably better (check with browser DevTools performance tab)
- [ ] No visual regressions at any zoom level
