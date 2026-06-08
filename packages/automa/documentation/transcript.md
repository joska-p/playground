in the game of life there is a "bestiaire" of creatures (shapes or substate i don't know how to call them) i would like to have some kind of a brush that allow me ta place such creatures on the board on look a they behave. i want the same kind of registry that we use for the rules or for the shaders

1. **Types**: A simple `type` with `id` and `name` plus domain-specific fields
2. **Registry**: A `Map<string, T>` with `register`, `get`, `getAll` functions
3. **Built-in entries**: Each in its own file, imported and registered

### 1. Define the Creature type (`core/palette/types.ts`)

A creature is a pattern defined as a 2D grid of cell states:

```ts
type Creature = {
  id: string;
  name: string;
  cells: number[][]; // rows, each row is an array of cell states
  category: string; // "still life", "oscillator", "spaceship", etc.
};
```

### 2. Create the registry (`core/palette/registry.ts`)

Following the exact same pattern as rules and shaders:

- `registerCreature(creature)`
- `getCreature(id)`
- `getAllCreatures()`

### 3. Define built-in creatures

Common Game of Life patterns:

- **Still lifes**: Block, Beehive, Loaf, Boat, Tub
- **Oscillators**: Blinker (period 2), Toad (period 2), Beacon (period 2), Pulsar (period 3)
- **Spaceships**: Glider, Lightweight Spaceship (LWSS)
- **Methuselahs**: R-pentomino, Diehard

### 4. Update the store

Add `creatureId` to the UI store (or maybe a separate palette store).

Actually, looking at how the existing code works, the UI store already has `toolMode: BrushMode`. I could expand `BrushMode` to include a creature-placing mode, or add a separate `creatureBrushId` state.

Looking at the flow:

- Currently `toolMode` is `'draw' | 'erase'`
- When placing creatures, we want a mode that places the pattern at the click point
- I could add `'place'` as a mode, plus a `creatureId` selector

But actually, I think a cleaner approach is:

- Keep the brush modes as they are
- Add a new concept: `paletteBrush` which when set, overrides the draw behavior
- When `paletteBrush` is `null`, draw/erase paints individual cells
- When `paletteBrush` is set (a creature ID), clicking places the creature pattern at the cursor position

Wait, but this might overcomplicate the UI. Let me think about a simpler approach.

Looking at the BrushModeSelector - it has draw/erase buttons. I could add a third mode that uses the selected creature. But that adds complexity to the painting logic.

Actually, the simplest approach: keep existing modes, and add a separate `CreatureSelector` that:

1. Shows a dropdown of available creatures
2. When a creature is selected, clicking the grid places it centered on the cursor
3. If no creature is selected, normal draw/erase behavior applies

For the store, I'll add `paletteBrush: string | null` to the UI store. When non-null, the painting hook places the creature pattern instead of a single cell.

But wait, the painting hooks receives `brushMode` and `paintCell`. The `paintCell` function only sets one cell at a time. To place a pattern, I need to write multiple cells at once.

Let me look at how `useCellPainting` currently works:

```ts
const useCellPainting = (cols, rows, brushMode, paintCell) => {
  const paintAtGridPosition = (point, shiftKey) => {
    const col = Math.floor(point.x + cols / 2);
    const row = Math.floor(point.y + rows / 2);
    if (col < 0 || col >= cols || row < 0 || row >= rows) return;
    if (shiftKey) return;
    const index = row * cols + col;
    paintCell(index, brushMode === 'erase' ? 0 : 1);
  };
```

I need to change this so that when a creature brush is active, it paints the entire pattern at the click position. There are a few ways to do this:

1. **New action `placePattern`**: Add `placePattern(col, row, creature)` to simulation actions
2. **Change `useCellPainting`**: Accept an optional creature and paint the pattern

Let me think about the cleanest approach...

I think the cleanest approach is:

1. Add `paletteBrush: string | null` to uiStore (null = normal brush)
2. Add a `setPaletteBrush` action
3. Add a `usePaletteBrush` selector
4. In `useCellPainting`, read the palette brush and if set, place the pattern instead of single cell
5. The `paintAtGridPosition` function needs access to the creature data to place the pattern

But `useCellPainting` currently receives `paintCell` as a prop. For creature painting, it needs to call a different function or the same `paintCell` multiple times.

Actually, wait. Let me look at `paintCell` in `actions.ts`:

```ts
const paintCell = (index: number, value: CellValue): void => {
  const state = simulationStore.getState();
  if (index >= 0 && index < state.grid.length) {
    state.grid[index] = value;
    simulationStore.setState({ generation: state.generation + 1 });
  }
};
```

This writes one cell at a time. For a creature pattern, I'd need to write multiple cells. I could:

1. Add a new `placePattern` action that writes the entire pattern and increments generation once
2. Or just call `paintCell` in a loop (but that increments generation N times)

Option 1 is cleaner: write all cells, increment generation once.

So my plan is:

### Files to create/modify:

1. **`core/palette/types.ts`** - Creature type
2. **`core/palette/registry.ts`** - Registry (register, get, getAll)
3. **`core/palette/glider.ts`** - Glider pattern
4. **`core/palette/blinker.ts`** - Blinker oscillator
5. **`core/palette/block.ts`** - Block still life
6. ... more patterns
7. **`core/palette/creatures.ts`** - Module that preloads all built-in creatures (like `rules/conway.ts`)
8. **`stores/ui/actions.ts`** - Add `setPaletteBrush`
9. **`stores/ui/store.ts`** - Add `paletteBrush` to state
10. **`stores/ui/selectors.ts`** - Add `usePaletteBrush`
11. **`components/controls/CreatureSelector.tsx`** - New UI component
12. **`components/controls/Controls.tsx`** - Add CreatureSelector
13. **`hooks/useCellPainting.ts`** - Modify to place patterns when paletteBrush is set
14. **`stores/simulation/actions.ts`** - Add `placePattern` action

Wait, let me reconsider the architecture. The current flow is:

```
CellMesh
  → useCellPainting(cols, rows, brushMode, paintCell)
    → on pointer event: paintCell(index, value)
```

If I want to add creature painting, I could:

Option A: Pass the creature to `useCellPainting` and let it call `paintCell` for each cell
Option B: Pass a `placePattern` function to `useCellPainting`
Option C: Read the creature inside `useCellPainting` from the store

Let me go with Option C - keep it consistent with how `brushMode` is read. But wait, `brushMode` is passed as a parameter, not read from the store. So let me pass the creature as a parameter too.

Actually, the simplest approach: read the `paletteBrush` inside `useCellPainting` from the store (using `useStore` directly), similar to how `paintCell` accesses the store.

Hmm, but `useCellPainting` isn't currently reading from any store. It's a pure hook that receives everything externally. Let me keep that pattern and pass the creature in.

Revised plan:

**`useCellPainting`** gets a new parameter: `creature: Creature | null`. When non-null and brushMode is 'draw', clicking places the creature pattern. When null, single-cell draw/erase behavior.

But wait, there's a subtlety. The `creature` info comes from the palette registry. How does `CellMesh` know which creature is selected? It reads it from the store via `usePaletteBrush()` which returns a creature ID, then looks it up in the registry.

Actually, let me look at this from the CellMesh perspective:

```tsx
function CellMesh() {
  const cols = useCols();
  const rows = useRows();
  const brushMode = useBrushMode();
  const shaderId = useShaderId();
  const shader = getShader(shaderId);

  const { uniforms } = useGridTexture({ cols, rows });

  const { meshRef, onPointerDown, onPointerMove, onPointerUp, onContextMenu } =
    useCellPainting(cols, rows, brushMode, paintCell);

  if (!shader) return null;
  ...
}
```

I need to read the active creature and pass it to `useCellPainting`. Let me keep it simple:

```tsx
const paletteBrushId = usePaletteBrush();
const creature = paletteBrushId ? getCreature(paletteBrushId) : null;

const { ... } = useCellPainting(cols, rows, brushMode, paintCell, creature, paintCreature);
```

Where `paintCreature` is a new action that places all cells of a pattern at once.

Actually, I realize I'm overcomplicating this. Let me simplify:

1. `useCellPainting` stays as-is
2. In `paintAtGridPosition`, when a creature is active, we place the creature pattern using multiple `paintCell` calls OR a new `placePattern` function

But to keep `useCellPainting` clean, let me pass the creature and a handler to place it:

```ts
const useCellPainting = (
  cols, rows,
  brushMode,
  paintCell,        // (index, value) => void
  creatureBrush,    // Creature | null
  paintCreature,    // (col, row, creature) => void
)
```

And in `paintAtGridPosition`:

```ts
if (creatureBrush && brushMode === 'draw') {
  paintCreature(col, row, creatureBrush);
  return;
}
// else normal paintCell
```

This is clean and extensible.

Now, for the `paintCreature` function, I need it to:

1. Write all cells of the pattern to the grid
2. Offset so the pattern is roughly centered on the click point
3. Increment generation once

Let me define the creature data format. A creature is a 2D array of cell states, where 0 = dead, 1 = alive, etc. The pattern is placed with the top-left at the click position (or centered).

Actually, for better UX, let me center the pattern on the click point by offsetting by half the pattern dimensions.

```ts
const placePattern = (col: number, row: number, creature: Creature): void => {
  const state = simulationStore.getState();
  const grid = state.grid;
  const cols = state.cols;
  const rows = state.rows;

  const offsetX = Math.floor(creature.width / 2);
  const offsetY = Math.floor(creature.height / 2);

  for (let y = 0; y < creature.height; y++) {
    for (let x = 0; x < creature.width; x++) {
      const cellValue = creature.cells[y][x];
      if (cellValue === 0) continue; // skip dead cells to avoid overwriting
      const gx = col - offsetX + x;
      const gy = row - offsetY + y;
      if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
      const index = gy * cols + gx;
      grid[index] = cellValue;
    }
  }

  simulationStore.setState({ generation: state.generation + 1 });
};
```

Wait, but `paintCell` mutates the grid directly and increments generation. The `placePattern` function should do the same but for the whole pattern at once.

Actually, looking at the existing `paintCell`:

```ts
const paintCell = (index: number, value: CellValue): void => {
  const state = simulationStore.getState();
  if (index >= 0 && index < state.grid.length) {
    state.grid[index] = value;
    simulationStore.setState({ generation: state.generation + 1 });
  }
};
```

It mutates the grid directly (via the reference in the store state) and then notifies React by setting generation. For a pattern, I should do the same but for multiple cells:

```ts
const placePattern = (col: number, row: number, creature: Creature): void => {
  const state = simulationStore.getState();
  const grid = state.grid;
  const ccols = state.cols;
  const rrows = state.rows;
  const offsetX = Math.floor(creature.width / 2);
  const offsetY = Math.floor(creature.height / 2);

  let changed = false;
  for (let y = 0; y < creature.height; y++) {
    for (let x = 0; x < creature.width; x++) {
      const val = creature.cells[y][x];
      if (val === 0) continue;
      const gx = col - offsetX + x;
      const gy = row - offsetY + y;
      if (gx < 0 || gx >= ccols || gy < 0 || gy >= rrows) continue;
      grid[gy * ccols + gx] = val;
      changed = true;
    }
  }

  if (changed) {
    simulationStore.setState({ generation: state.generation + 1 });
  }
};
```

OK let me now plan the full file list and build this.

Let me think about what creatures to include. Famous Conway's Game of Life patterns:

**Still Lifes** (don't change):

- Block (2x2)
- Beehive (3x4)
- Loaf (4x4)
- Boat (3x3)
- Tub (3x3)

**Oscillators** (cycle through states):

- Blinker (period 2, 3x1 or 1x3)
- Toad (period 2, 4x2)
- Beacon (period 2, 4x4)
- Pulsar (period 3, 9x9)
- Pentadecathlon (period 15, 10x3)

**Spaceships** (move across the grid):

- Glider (period 4, 3x3)
- Lightweight Spaceship (LWSS, period 4, 5x4)
- Middleweight Spaceship (MWSS, period 4, 6x5)
- Heavyweight Spaceship (HWSS, period 4, 7x5)

**Methuselahs** (long-lived patterns):

- R-pentomino (5 cells)
- Diehard (7 cells)
- Acorn (7 cells)

Let me include a good set but not too many. I'll add:

- Block, Beehive, Loaf, Boat (still lifes)
- Blinker, Toad, Beacon (simple oscillators)
- Glider, LWSS (spaceships)
- R-pentomino, Diehard (methuselahs)

For each pattern, I'll define them as text grids in individual files.

Actually, to keep things simple, I'll put them all in one file since they're small data definitions. Following the existing conventions... actually, rules have individual files. Let me follow that pattern.

But with many small patterns, individual files get unwieldy. Let me put them all in a single file `builtin.ts` in the palette directory, similar to how each rule file is separate. Actually, rules are separated because each file exports a single rule object. For patterns, I could have a single file that exports an array of creatures.

Let me keep it simple: one `palette/` directory with:

- `types.ts`
- `registry.ts`
- `builtin.ts` (all built-in creatures)

Wait, I should also consider: the pattern cells need to be defined for each rule. But the most common patterns are designed for Conway's Game of Life (2-state, B3/S23). For multi-state rules, the patterns would be different. Let me just define them for 2-state (0 = dead, 1 = alive, like Conway) to start. Higher-state rules would need their own patterns.

### Files to create:

1. `packages/automa/src/core/palette/types.ts` - Creature type
2. `packages/automa/src/core/palette/registry.ts` - Registry
3. `packages/automa/src/core/palette/builtin.ts` - Built-in creatures
4. `packages/automa/src/components/controls/CreatureSelector.tsx` - UI component

### Files to modify:

1. `packages/automa/src/stores/ui/store.ts` - Add `paletteBrush`
2. `packages/automa/src/stores/ui/actions.ts` - Add `setPaletteBrush`
3. `packages/automa/src/stores/ui/selectors.ts` - Add `usePaletteBrush`
4. `packages/automa/src/hooks/useCellPainting.ts` - Accept creature and placePattern
5. `packages/automa/src/stores/simulation/actions.ts` - Add `placePattern`
6. `packages/automa/src/components/canvas/CellMesh.tsx` - Pass creature/palette to hook
7. `packages/automa/src/components/controls/Controls.tsx` - Add CreatureSelector
8. `packages/automa/README.md` - Document palette feature

Let me start implementing.

For the creature format, I'll define patterns as 2D arrays of numbers:

```ts
type Creature = {
  id: string;
  name: string;
  category: 'still-life' | 'oscillator' | 'spaceship' | 'methuselah';
  cells: number[][]; // rows, each row is an array of cell states (0, 1, ...)
  period?: number; // for oscillators/spaceships
};
```

Wait, I should keep it simple. Let me just use `width`, `height`, and a flat array of cells. Or a 2D array is clearer.

Actually, looking at how I'll use it in `placePattern`, a 2D array (`cells[row][col]`) is most natural.
