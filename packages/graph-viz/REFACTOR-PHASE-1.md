# Phase 1 — Discovery & Navigation

> **Theme:** Make the graph explorable. Users need to find specific things and understand what they're looking at without panel-scrolling.
> **Dependencies:** Phase 0 complete (visual encoding is in place).

---

## 1.1 — Search highlights in 3D

**Why:** Today, the search input in the panel filters the community list but has **no effect on the 3D scene**. The user types a query, sees the list narrow, but the 3D spheres and nodes don't respond. The graph should react to search — matching objects should pop, non-matching should recede.

### Strategy

Search becomes a cross-cutting concern. When `searchQuery` changes, the Scene computes two sets:
- `matchingNodeIds` — nodes whose label or id contains the query (case-insensitive)
- `matchingCommunityIds` — communities whose label or id contains the query

These sets are **derived** in Scene and passed down to components. Non-matching objects get dimmed/brightened.

### Store changes

No new state needed — `searchQuery` already exists in `uiStore`.

### Scene changes (`src/components/Scene.tsx`)

Add derived sets from the existing `searchQuery`:

```tsx
const searchQuery = useUiStore((s) => s.searchQuery);

// Derive matching IDs from the search query
const searchMatch = (() => {
  if (!searchQuery.trim()) return null;
  const q = searchQuery.toLowerCase();

  const matchingNodeIds = new Set<string>();
  const matchingCommunityIds = new Set<number>();

  // Match against nodes
  for (const node of graphData?.nodes ?? []) {
    if (
      node.label.toLowerCase().includes(q) ||
      node.id.toLowerCase().includes(q)
    ) {
      matchingNodeIds.add(node.id);
      // Also include their community
      matchingCommunityIds.add(node.community);
    }
  }

  // Match against communities
  for (const [cid, comm] of communities) {
    if (comm.label.toLowerCase().includes(q)) {
      matchingCommunityIds.add(cid);
    }
  }

  return { matchingNodeIds, matchingCommunityIds };
})();
```

### Component changes

**`GraphCommunitySpheres.tsx`** — accept a `highlightIds?: Set<number>` prop:
- When `highlightIds` is set, non-matching spheres get `ghostOpacity` (0.12)
- Matching spheres stay at full opacity

```tsx
// In the useEffect that sets up instances:
const isHighlighted = highlightIds === null || highlightIds.has(c.id);
const opacity = isHighlighted ? 1 : communitySphere.ghostOpacity;
// Apply opacity per instance... 
```

**Problem:** InstancedMesh doesn't support per-instance opacity easily (it's a material property, not per-instance). Options:

- **Option A (recommended):** Render two instancedMeshes — one for highlighted spheres (opacity 1), one for dimmed (ghostOpacity). The dimmed set gets all communities NOT in the match set. Requires re-sorting instances when the query changes.

- **Option B:** Use a custom shader that reads instance opacity. More complex but more flexible.

Option A is simpler and the toggle happens infrequently (on search query change, not every frame). The mesh is rebuilt in the `useEffect` when `communities` or `highlightIds` change:

```tsx
function GraphCommunitySpheres({ ghost, visibleIds, highlightIds }: Props) {
  const ref = useRef<THREE.InstancedMesh>(null);
  
  // Split into two groups when highlightIds is active
  const { regularIds, dimmedIds } = useMemo(() => {
    if (!highlightIds) return { regularIds: null, dimmedIds: null };
    const reg: number[] = [];
    const dim: number[] = [];
    for (const c of communityList) {
      if (highlightIds.has(c.id)) reg.push(c.id);
      else dim.push(c.id);
    }
    return { regularIds: reg, dimmedIds: dim };
  }, [communityList, highlightIds]);

  // If no highlight filter, render single mesh (current behavior)
  if (!highlightIds) {
    return <SingleMesh communities={communityList} ghost={ghost} />;
  }

  // If highlight filter is active, render two meshes
  return (
    <>
      <InstanceMeshGroup communities={communityList.filter(c => highlightIds.has(c.id))} opacity={1} ghost={ghost} />
      <InstanceMeshGroup communities={communityList.filter(c => !highlightIds.has(c.id))} opacity={ghostOpacity} ghost={ghost} />
    </>
  );
}
```

**`GraphNodes.tsx`** — accept a `highlightIndices?: Set<number>` prop (already exists for selected-node highlighting):
- Extend the existing highlight mechanism
- When a search query is active AND no node is selected, use the search match set as the highlight
- Non-matching nodes get dimmed (brightness 0.15 instead of the normal brightness)

```tsx
// In the useEffect that sets up instances — already uses highlightIndices:
const isHighlighted = highlightIndices?.has(i) ?? false;
const brightness = isHighlighted
  ? 1
  : degreeToBrightness(deg, maxDegree, degree.brightnessMin);
// When search is active and nothing selected, highlightIndices contains matches
// All non-matches get minimum brightness
```

### Files touched
- `src/components/Scene.tsx` — compute `searchMatch` derived sets from `searchQuery`
- `src/components/GraphCommunitySpheres.tsx` — accept `highlightIds` prop, render dimmed layer when active
- `src/components/GraphNodes.tsx` — existing `highlightIndices` already handles the behavior, just needs the right data passed

---

## 1.2 — Community search in panel

**Why:** The panel shows 50 communities sorted by size. With 339 communities, finding a specific one by scrolling is impractical. A text filter on the community list makes targeted navigation possible.

### GraphPanel changes (`src/components/GraphPanel.tsx`)

Add a local search state for communities, separate from the global node search:

```tsx
const [communitySearch, setCommunitySearch] = useState('');

// In the render, before the community list / ColorLegend:
{viewMode === 'overview' && (
  <>
    <Input
      placeholder="Filter communities..."
      value={communitySearch}
      onChange={(e) => setCommunitySearch(e.target.value)}
      fullWidth
    />
    {/* The community list / ColorLegend */}
    <ColorLegend searchFilter={communitySearch} />
  </>
)}
```

**Note:** The community search is a **local** `useState` in `GraphPanel`, not in the store. It's a panel-only concern — no need to add it to `uiStore`.

However, if we want the color legend to be reusable, we should add the search filter there. Let me update the Phase 0 `ColorLegend.tsx`:

```tsx
type ColorLegendProps = {
  searchFilter?: string;
};

function ColorLegend({ searchFilter = '' }: ColorLegendProps) {
  // ...
  const list = [...communities.values()]
    .filter(c => c.nodeCount >= minCommunitySize)
    .filter(c => {
      if (!searchFilter) return true;
      const q = searchFilter.toLowerCase();
      return (
        c.label.toLowerCase().includes(q) ||
        String(c.id).includes(q)
      );
    })
    .sort((a, b) => b.nodeCount - a.nodeCount)
    .slice(0, 50);
  // ...
}
```

**UI placement:** The community search should sit directly above the ColorLegend, visually grouped. This makes it clear the filter applies to the legend below.

```
┌─────────────────────────────────┐
│ Legend ▾                        │
│ [Filter communities...]         │  ← new
│ 🔵 @repo/ui (142)              │
│ 🟣 @repo/graph-viz (68)        │
│ ...                             │
└─────────────────────────────────┘
```

### Files touched
- `src/components/GraphPanel.tsx` — add community search Input + state
- `src/components/ColorLegend.tsx` — accept `searchFilter` prop and apply it

---

## 1.3 — Node hover tooltip

**Why:** Today, hovering a node in detail mode shows its label as a 3D text sprite. To see file type, community, or degree count, the user must click the node and look at the panel. A tooltip overlay in the corner of the screen provides instant context without obscuring the 3D scene.

### Strategy

A DOM overlay (not a 3D element) that appears when a node is hovered. It shows:
- Node label (short)
- File type (with icon/color)
- Community label
- Degree count (number of connections)

Position: fixed to the bottom-right or near the cursor (using pointer position from the R3F event).

Since the hover info already exists in Scene (`hoveredNode`, `hoveredNodePos`), we just need to render a DOM overlay that reads this state.

### Store changes

The hover state is already in `uiStore`:
- `hoveredNodeIndex: number | null`
- `selectors` can derive the node data from `dataStore`

### New component: `src/components/NodeTooltip.tsx`

```tsx
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';

function NodeTooltip() {
  const hoveredNodeIndex = useUiStore((s) => s.hoveredNodeIndex);
  const graphData = useDataStore((s) => s.graphData);
  const positions = useDataStore((s) => s.positions);
  const degrees = useDataStore((s) => s.degrees);
  const communities = useDataStore((s) => s.communities);

  if (hoveredNodeIndex === null || !graphData) return null;

  const node = graphData.nodes[hoveredNodeIndex];
  if (!node) return null;

  const deg = degrees?.[hoveredNodeIndex] ?? 0;
  const community = communities.get(node.community);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 rounded-lg border bg-background/80 p-3 text-xs shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {community && (
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: community.color }}
          />
        )}
        <span className="font-medium">{node.label}</span>
      </div>
      <div className="text-muted-foreground mt-1 flex flex-col gap-0.5">
        <span>Type: {node.file_type}</span>
        {community && <span>Community: {community.label}</span>}
        <span>Connections: {deg}</span>
      </div>
    </div>
  );
}
```

### Integration

In `GraphCanvas.tsx`, add the tooltip as a sibling to `GraphPanel`:

```tsx
return (
  <div className="relative h-full w-full">
    <Canvas ...>
      <Scene />
    </Canvas>
    <GraphPanel />
    <NodeTooltip />   {/* ← new */}
  </div>
);
```

Note: The tooltip uses `pointer-events-none` so it doesn't steal clicks from the panel or canvas.

### Files touched
- `src/components/NodeTooltip.tsx` — new file
- `src/components/GraphCanvas.tsx` — add NodeTooltip

---

## 1.4 — Better node info panel

**Why:** When a node is selected, the panel shows `id`, `file_type`, `source_file`. It omits:
- Degree count (number of connections)
- Community label and color
- Connected neighbors (top-N)

These are the most relevant pieces of information for understanding a node's role in the codebase.

### GraphPanel changes (`src/components/GraphPanel.tsx`)

Replace the current "Selected node info" section (lines 249-278) with an enriched version:

```tsx
{selectedNode && (() => {
  const idx = nodeIndex.get(selectedNode.id);
  const deg = idx !== undefined && degrees ? degrees[idx] : 0;
  const community = communities.get(selectedNode.community);

  // Find connected neighbors
  const neighbors: Array<{ node: GraphNode; relation: string }> = [];
  for (const link of graphData.links) {
    if (link.source === selectedNode.id) {
      const targetIdx = nodeIndex.get(link.target);
      if (targetIdx !== undefined) {
        neighbors.push({ node: graphData.nodes[targetIdx]!, relation: link.relation });
      }
    } else if (link.target === selectedNode.id) {
      const sourceIdx = nodeIndex.get(link.source);
      if (sourceIdx !== undefined) {
        neighbors.push({ node: graphData.nodes[sourceIdx]!, relation: link.relation });
      }
    }
  }
  neighbors.sort((a, b) => {
    const degA = degrees?.[nodeIndex.get(a.node.id)!] ?? 0;
    const degB = degrees?.[nodeIndex.get(b.node.id)!] ?? 0;
    return degB - degA;
  });

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-3 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {community && (
            <span
              className="inline-block h-3 w-3 flex-shrink-0 rounded-full"
              style={{ backgroundColor: community.color }}
            />
          )}
          <span className="truncate font-medium">{selectedNode.label}</span>
        </div>
        <Button size="icon" variant="ghost" onClick={() => selectNode(null)} ...>
          <Icon name="close" className="h-3 w-3" />
        </Button>
      </div>

      {/* Metadata */}
      <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
        <span>ID: {selectedNode.id}</span>
        <span>Type: {selectedNode.file_type}</span>
        <span>Degree: {deg}</span>
        {community && (
          <span>Community: {community.label} ({community.id})</span>
        )}
        <span className="truncate">File: {selectedNode.source_file}</span>
      </div>

      {/* Connected neighbors (top 8) */}
      {neighbors.length > 0 && (
        <div className="mt-1 flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Connected to ({neighbors.length})
          </span>
          <div className="flex flex-col gap-0.5">
            {neighbors.slice(0, 8).map((n) => (
              <button
                key={n.node.id}
                type="button"
                onClick={() => selectNode(n.node)}
                className="hover:bg-accent flex items-center gap-1.5 rounded px-1 py-0.5 transition-colors"
              >
                <span className="flex-1 truncate text-left">{n.node.label}</span>
                <span className="text-muted-foreground flex-shrink-0 text-[10px]">
                  {n.relation}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
})()}
```

New data store selectors needed:
```tsx
const nodeIndex = useDataStore((s) => s.nodeIndex);
const degrees = useDataStore((s) => s.degrees);
```

### Files touched
- `src/components/GraphPanel.tsx` — enrich the selected node info section

---

## 1.5 — Keyboard shortcuts

**Why:** A 3D explorer should feel navigable. Basic keyboard shortcuts reduce friction and make power users faster.

### New hook: `src/hooks/useKeyboardShortcuts.ts`

```tsx
import { useEffect } from 'react';
import { useUiStore } from '../stores/uiStore';

export function useKeyboardShortcuts() {
  const communityFilter = useUiStore((s) => s.communityFilter);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const selectNode = useUiStore((s) => s.selectNode);
  const togglePanel = useUiStore((s) => s.togglePanel);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const searchQuery = useUiStore((s) => s.searchQuery);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture when typing in inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'Escape':
          // Go back to overview if in detail mode
          if (/^\d+$/.test(communityFilter.trim())) {
            setCommunityFilter('');
            selectNode(null);
            e.preventDefault();
          }
          break;
        case 'f':
        case 'F':
          // Focus search input (only if Ctrl/Cmd not pressed)
          if (!e.ctrlKey && !e.metaKey) {
            // Focus the first input in the panel
            const input = document.querySelector<HTMLInputElement>(
              '[aria-label="Search nodes..."] input, input[placeholder="Search nodes..."]'
            );
            input?.focus();
            e.preventDefault();
          }
          break;
        case 'r':
        case 'R':
          // Toggle auto-rotate
          const store = useUiStore.getState();
          store.setAutoRotate(!store.autoRotate);
          e.preventDefault();
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [communityFilter, setCommunityFilter, selectNode, togglePanel, setSearchQuery, searchQuery]);
}
```

**Shortcuts:**
| Key | Action |
|-----|--------|
| `Escape` | Back to overview (deselect community + node) |
| `f` | Focus the search input |
| `r` | Toggle auto-rotate |

### Integration

In `GraphCanvas.tsx`, add the hook:

```tsx
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

function GraphCanvas() {
  useKeyboardShortcuts();
  // ... rest
}
```

### Files touched
- `src/hooks/useKeyboardShortcuts.ts` — new file
- `src/components/GraphCanvas.tsx` — add hook call

---

## Files Changed Summary

| # | Change | New Files | Modified Files |
|---|--------|-----------|----------------|
| 1.1 | Search highlights in 3D | — | `Scene.tsx`, `GraphCommunitySpheres.tsx`, `GraphNodes.tsx` |
| 1.2 | Community search in panel | — | `GraphPanel.tsx`, `ColorLegend.tsx` |
| 1.3 | Node hover tooltip | `NodeTooltip.tsx` | `GraphCanvas.tsx` |
| 1.4 | Better node info panel | — | `GraphPanel.tsx` |
| 1.5 | Keyboard shortcuts | `useKeyboardShortcuts.ts` | `GraphCanvas.tsx` |

**Total: 2 new files, ~6 files modified.**

## Acceptance Criteria

After Phase 1:
- [ ] Typing a search query dims non-matching communities/nodes in the 3D scene
- [ ] Clearing the search restores full visibility
- [ ] Panel has a text filter for the community list / color legend
- [ ] Hovering a node in detail mode shows a floating tooltip with label, type, community, and degree
- [ ] Selected node panel shows degree, community, and connected neighbors
- [ ] `Escape` returns to overview, `f` focuses search, `r` toggles auto-rotate
- [ ] No visual regressions when search is inactive
