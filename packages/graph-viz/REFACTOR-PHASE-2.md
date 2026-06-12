# Phase 2 — Interaction Quality

> **Theme:** Make the graph pleasant to use. Smooth transitions, sensible defaults, organized controls.
> **Dependencies:** Phase 0–1 complete (visual encoding + discovery are in place).

---

## 2.1 — Animate camera fly-to

**Why:** Today, switching from overview to detail mode teleports the camera instantly. The user loses spatial context — where was that community in relation to the whole graph? A smooth fly-to animation preserves orientation and feels polished.

### Strategy

Use a simple lerp (linear interpolation) in `useFrame` to animate the camera position and OrbitControls target over ~600ms when the view mode changes. During the animation, disable OrbitControls input to prevent fighting the user.

### Scene changes (`src/components/Scene.tsx`)

Replace the current instant camera positioning (lines 98–110 for overview return, lines 138–183 for detail fly-to) with an animated approach.

**New animation state:**

```tsx
const flyAnimation = useRef<{
  active: boolean;
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  startTarget: THREE.Vector3;
  endTarget: THREE.Vector3;
  progress: number;
  duration: number;
} | null>(null);
```

**Triggering the animation (detail mode):**

When `selectedCommunityId` changes and we're entering detail mode, compute the target camera position (same logic as today) and start the animation:

```tsx
useEffect(() => {
  if (!controlsRef.current || selectedCommunityId === null || !detailData) return;
  if (lastDetailCommunityRef.current === selectedCommunityId) return;
  lastDetailCommunityRef.current = selectedCommunityId;

  // Compute target position (same logic as current code)
  const { spread, distance, pos } = computeCameraTarget(detailData.positions);

  flyAnimation.current = {
    active: true,
    startPos: camera.position.clone(),
    endPos: new THREE.Vector3(
      distance * cameraConfig.detailXRatio,
      distance * cameraConfig.detailYRatio,
      distance
    ),
    startTarget: controlsRef.current.target.clone(),
    endTarget: new THREE.Vector3(0, 0, 0),
    progress: 0,
    duration: 600, // ms
  };
}, [selectedCommunityId, camera, detailData]);
```

**Triggering the animation (overview return):**

```tsx
useEffect(() => {
  if (!controlsRef.current || viewMode !== 'overview') return;
  if (cameraState.current === 'overview') return;

  flyAnimation.current = {
    active: true,
    startPos: camera.position.clone(),
    endPos: new THREE.Vector3(...cameraConfig.overviewPosition),
    startTarget: controlsRef.current.target.clone(),
    endTarget: new THREE.Vector3(0, 0, 0),
    progress: 0,
    duration: 600,
  };
  lastDetailCommunityRef.current = null;
}, [viewMode, camera]);
```

**Animation loop in `useFrame`:**

```tsx
useFrame((_, delta) => {
  if (!flyAnimation.current?.active || !controlsRef.current) return;

  const anim = flyAnimation.current;
  anim.progress += delta * 1000; // ms

  const t = Math.min(anim.progress / anim.duration, 1);
  // Ease-out cubic for a natural feel
  const ease = 1 - Math.pow(1 - t, 3);

  camera.position.lerpVectors(anim.startPos, anim.endPos, ease);
  controlsRef.current.target.lerpVectors(anim.startTarget, anim.endTarget, ease);
  controlsRef.current.update();

  if (t >= 1) {
    anim.active = false;
    cameraState.current = selectedCommunityId !== null ? 'detail' : 'overview';
  }
});
```

**Disable controls during animation:**

```tsx
<OrbitControls
  ref={controlsRef}
  enableDamping
  dampingFactor={controls.dampingFactor}
  autoRotate={!flyAnimation.current?.active && autoRotate}  // pause auto-rotate during fly
  // ... other props
  enabled={!flyAnimation.current?.active}  // disable input during fly
/>
```

### Config changes (`src/config.ts`)

```tsx
export const camera = {
  // ... existing ...
  flyDuration: 600,        // ms
  flyEasing: 'ease-out-cubic', // for documentation; implementation uses lerp with cubic ease
} as const;
```

### Files touched
- `src/components/Scene.tsx` — replace instant camera set with animated fly-to
- `src/config.ts` — add `flyDuration`

---

## 2.2 — Auto-rotate off by default

**Why:** Auto-rotate is currently `true` by default. For a first-time user, the spinning scene is disorienting and makes labels hard to read. The user must find the toggle in the panel and turn it off before they can explore. Auto-rotate should be opt-in.

### Store changes (`src/stores/uiStore.ts`)

Simple flip:

```tsx
export const useUiStore = create<UiStore>((set) => ({
  // ...
  autoRotate: false,  // was: true
  // ...
}));
```

### Alternative (softer approach)

If auto-rotate is considered a "look how cool this is" demo feature, keep it on but add a brief "Press R to stop rotation" toast that fades after 3 seconds. This teaches the shortcut while showing off the 3D effect.

Add a one-time hint:

```tsx
// In GraphCanvas or a new FirstTimeHint component
const [showHint, setShowHint] = useState(true);

useEffect(() => {
  if (!showHint) return;
  const timer = setTimeout(() => setShowHint(false), 4000);
  return () => clearTimeout(timer);
}, [showHint]);

return showHint ? (
  <div className="pointer-events-none absolute top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-background/80 px-4 py-2 text-xs shadow-lg backdrop-blur-sm animate-fade-out">
    Press <kbd className="rounded border px-1 font-mono">R</kbd> to toggle rotation
  </div>
) : null;
```

**Recommendation:** Flip the default AND add the hint. Users who open the app get a stable scene first. The hint teaches the shortcut if they want rotation.

### Files touched
- `src/stores/uiStore.ts` — `autoRotate: false`

---

## 2.3 — Panel reorganization

**Why:** The panel is a single scroll list mixing navigation, search, filters, display toggles, stats, selection info, and community list. This is high cognitive load. Grouping controls into collapsible sections makes the panel scannable and keeps related controls together.

### Current layout (single flat list):

```
[Toggle button]
[Back to overview]         ← navigation
[Search nodes...]           ← search
[Min community size]        ← filter
[Community IDs]             ← filter
[Auto-rotate]               ← display
[Show edges]                ← display
[Show labels]               ← display
[Stats badges]              ← info
[Selected community]        ← selection
[Communities list]          ← navigation
[Selected node]             ← selection
```

### Redesigned layout (collapsible sections):

```
[Toggle button]

┌─ Navigation ──────────────┐
│ [Back to overview]        │  ← only in detail mode
│ [Community search]        │
│ Legend ▾                  │
│   🔵 @repo/ui (142)      │
│   🟣 @repo/graph-viz (68)│
└───────────────────────────┘

┌─ Search & Filter ▾ ───────┐
│ [Search nodes...]         │
│ [Min community size]      │
│ [Community IDs]           │
└───────────────────────────┘

┌─ Display ▾ ───────────────┐
│ [Auto-rotate]             │
│ [Show edges]              │
│ [Show labels]             │
└───────────────────────────┘

┌─ Selection ───────────────┐
│ Stats: 24/339 comms       │
│ 4113 nodes · 6204 edges   │
│ [Selected community info] │  ← when applicable
│ [Selected node info]      │  ← when applicable
└───────────────────────────┘
```

### Implementation

Create a reusable accordion section component:

**New component: `src/components/PanelSection.tsx`**

```tsx
import { useState, type ReactNode } from 'react';

type PanelSectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

function PanelSection({ title, defaultOpen = true, children }: PanelSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase"
      >
        {open ? '▾' : '▸'} {title}
      </button>
      {open && children}
    </div>
  );
}
```

**GraphPanel changes:** Wrap existing content groups into `PanelSection` components:

```tsx
<Card className="...">
  <div className="flex flex-col gap-4 p-4">

    {/* Navigation / Legend section — always open */}
    <PanelSection title="Navigation" defaultOpen={true}>
      {viewMode === 'detail' && (
        <Button variant="ghost" onClick={() => setCommunityFilter('')} ...>
          ← Back to overview
        </Button>
      )}
      <Input placeholder="Filter communities..." ... />
      <ColorLegend searchFilter={communitySearch} />
    </PanelSection>

    {/* Search & Filter section */}
    <PanelSection title="Search & Filter" defaultOpen={false}>
      <Input placeholder="Search nodes..." ... />
      <Slider label="Min community size" ... />
      <Input label="Community IDs" ... />
    </PanelSection>

    {/* Display section */}
    <PanelSection title="Display" defaultOpen={false}>
      <Switch label="Auto-rotate" ... />
      <Switch label="Show edges" ... />
      {viewMode === 'detail' && (
        <Switch label="Show labels" ... />
      )}
    </PanelSection>

    {/* Selection section — always open when there's something to show */}
    <PanelSection title="Selection" defaultOpen={true}>
      <div className="flex flex-wrap gap-1.5">
        <Badge ...>{communityStats}</Badge>
        <Badge ...>{nodeStats}</Badge>
        <Badge ...>{edgeStats}</Badge>
      </div>
      {selectedCommunity && <SelectedCommunityInfo ... />}
      {selectedNode && <SelectedNodeInfo ... />}
    </PanelSection>

  </div>
</Card>
```

This is a large internal restructure of the panel render tree but the actual logic stays the same — just grouped differently. The section headers make it trivial to find what you need.

### Files touched
- `src/components/PanelSection.tsx` — new file
- `src/components/GraphPanel.tsx` — reorganize content into collapsible sections

---

## 2.4 — Consistent cursor feedback

**Why:** Currently, community spheres set `cursor: pointer` on hover via `document.body.style.cursor = 'pointer'`. Individual nodes in detail mode do not — they rely on the pointer event firing but don't change the cursor. This inconsistency makes clickable elements hard to discover.

### GraphCommunitySpheres changes

The current approach mutates `document.body.style` directly, which is fragile and can leave the cursor stuck if events don't fire cleanly.

Replace with CSS-based approach or use `onPointerEnter`/`onPointerLeave` on the parent element:

```tsx
function handlePointerOver(event) {
  if (ghost) return;
  event.stopPropagation();
  document.body.style.cursor = 'pointer';  // ← fragile
  // ...
}

function handlePointerOut() {
  if (ghost) return;
  document.body.style.cursor = 'auto';
  // ...
}
```

**Better approach:** Use a `pointerEvents` ref or CSS class.

For R3F, the cleanest is to wrap the canvas area and use `onPointerMissed`:

Actually, the simplest fix is to add `onPointerOver` and `onPointerOut` to the **canvas container** that resets the cursor. But that's global.

Even simpler: Use R3F's `events` prop to manage the cursor at the Canvas level.

Or, the pragmatic path: keep the current approach but add the same `document.body.style.cursor` logic to `GraphNodes.tsx`:

```tsx
function handlePointerMove(e: ThreeEvent<PointerEvent>) {
  document.body.style.cursor = 'pointer';
  if (onPointerMoveNode) {
    onPointerMoveNode(e.instanceId ?? null);
  }
}

function handlePointerOut() {
  document.body.style.cursor = 'auto';
  if (onPointerMoveNode) {
    onPointerMoveNode(null);
  }
}
```

### Files touched
- `src/components/GraphNodes.tsx` — add cursor change on pointer enter/leave

---

## 2.5 — Node-to-community navigation

**Why:** Once in detail mode, the user is confined to one community. If they select a node, there's no way to "go to its connected community" — the cross-community links are visible but not clickable. The user should be able to navigate from a node to a connected community.

### Strategy

In detail mode, when a user selects a node, show its connected communities (already computed in Scene for `CommunityLinks`). Make those link lines clickable — clicking a `CommunityLinks` line navigates to that community.

Alternatively: Add clickable entries in the "Connected to" section of the node info panel (from Phase 1.4) that set the community filter.

The panel approach is simpler and doesn't require 3D raycasting on thin lines:

```tsx
// Already in Phase 1.4 — neighbors list with click-to-navigate-to-node.
// Extend with a "Show community" button or make the community label clickable:

{community && (
  <button
    type="button"
    onClick={() => setCommunityFilter(String(community.id))}
    className="hover:underline"
  >
    <span>Community: {community.label}</span>
  </button>
)}
```

**For the 3D scene:** Make `CommunityLinks` clickable. Currently they're `lineSegments` with no event handlers. To make them interactive:

Option A: Add invisible clickable cylinders around each link line. Complex.

Option B: Render clickable spheres at the midpoint of each link. Acceptable for a prototype.

Option C: In the panel "Connected to" section for the selected community (already exists at line 168), clicking a linked community navigates there. This already works — just make it more prominent.

**Recommendation:** Panel approach only for now. The "Connected to" section in the community info panel already calls `setCommunityFilter(String(otherCid))`. Just move it from the community info to the node info as well, and add the community label as a clickable link.

### Files touched
- `src/components/GraphPanel.tsx` — make community label clickable in node info section

---

## Files Changed Summary

| # | Change | New Files | Modified Files |
|---|--------|-----------|----------------|
| 2.1 | Animate camera fly-to | — | `Scene.tsx`, `config.ts` |
| 2.2 | Auto-rotate off by default | — | `uiStore.ts` |
| 2.3 | Panel reorganization | `PanelSection.tsx` | `GraphPanel.tsx` |
| 2.4 | Consistent cursor feedback | — | `GraphNodes.tsx` |
| 2.5 | Node-to-community navigation | — | `GraphPanel.tsx` |

**Total: 1 new file, ~5 files modified.**

## Acceptance Criteria

After Phase 2:
- [ ] Switching between overview and detail is a smooth camera fly (not instant teleport)
- [ ] Auto-rotate is off by default; the scene is stable on load
- [ ] Panel has collapsible sections (Navigation, Search & Filter, Display, Selection)
- [ ] All clickable objects set `cursor: pointer` on hover
- [ ] Clicking a community label in node info navigates to that community
- [ ] No visual regressions in existing interaction patterns
