# Multi-State Orchestration Refactor

The engine (`engine.ts`) already supports N-state rules via `stateCount`, aging logic (`cellState > 1`), and lookup-based birth/survive. But the orchestration layer (stores, hooks, components) still hardcodes a 2-state model.

## Scope

Replace `aliveColor`/`deadColor` (fixed 2-state fields) with a `stateColors: string[]` array indexed by state number. Everything that reads those fields must be updated. `glowColor` stays as-is (rendering effect, not a state color).

## Files to change

### 1. `core/config.ts`

| Remove | Add |
|---|---|
| `COLOR_ALIVE = '#d97706'` | `DEFAULT_STATE_COLORS = ['#070a14', '#d97706']` |
| `COLOR_DEAD = '#070a14'` | |
| `COLOR_GLOW = '#fbbf24'` | Keep as-is |

State 0 = dead, State 1 = alive.

### 2. `stores/ui/store.ts`

```diff
- aliveColor: string;
- deadColor: string;
+ stateColors: string[];

- aliveColor: COLOR_ALIVE,
- deadColor: COLOR_DEAD,
+ stateColors: [...DEFAULT_STATE_COLORS],
```

### 3. `stores/ui/actions.ts`

Add:

```ts
const setStateColor = (index: number, color: string): void => {
  uiStore.setState((s) => {
    const next = [...s.stateColors];
    next[index] = color;
    return { stateColors: next };
  });
};
```

Rename existing `setGlowColor` (to be added in same style).

### 4. `stores/ui/selectors.ts`

```diff
- const useAliveColor = () => useStore(uiStore, (s) => s.aliveColor);
- const useDeadColor = () => useStore(uiStore, (s) => s.deadColor);
+ const useStateColors = () => useStore(uiStore, (s) => s.stateColors);
```

Keep `useGlowColor`.

### 5. `hooks/useGridTexture.ts`

Read `stateColors` instead of individual fields:

```diff
- const aliveColor = useStore(uiStore, (s) => s.aliveColor);
- const deadColor = useStore(uiStore, (s) => s.deadColor);
+ const stateColors = useStore(uiStore, (s) => s.stateColors);
```

Pass to `createGridUniforms` as a single array argument; inside, map `stateColors[1] → aliveColor uniform`, `stateColors[0] → deadColor uniform`.

The 2-element destructure in `useMemo` and `useEffect` deps becomes `stateColors` (shallow-compared by zustand). Update the reactive `useEffect` to push array values.

### 6. `components/canvas/AutomatonCanvas.tsx`

Read `stateColors` from store instead of config constants:

```diff
- import { COLOR_ALIVE, COLOR_DEAD } from '../../core/config.ts';
+ import { useStore } from 'zustand';
+ import { uiStore } from '../../stores/ui/store.ts';
```

Set CSS vars from `stateColors[0]` and `stateColors[1]`.

### 7. NEW: `components/controls/ColorPicker.tsx`

```tsx
function ColorPicker() {
  const ruleId = useRuleId();
  const rule = getRule(ruleId);
  const stateColors = useStateColors();
  const glowColor = useGlowColor();
  const setStateColor = ...
  const setGlowColor = ...

  return (
    <div>
      {stateColors.slice(0, rule.stateCount).map((color, i) => (
        <label key={i}>
          {i === 0 ? 'Dead' : i === 1 ? 'Alive' : `State ${i}`}
          <input type="color" value={color}
            onChange={e => setStateColor(i, e.target.value)} />
          <span>{color}</span>
        </label>
      ))}
      <label>
        Glow
        <input type="color" value={glowColor}
          onChange={e => setGlowColor(e.target.value)} />
        <span>{glowColor}</span>
      </label>
    </div>
  );
}
```

Layout: compact inline rows (swatch, hex label). No borders/panels — plain `<span>` style using `font-mono` for the hex value.

### 8. `components/controls/Controls.tsx`

Insert `<ColorPicker />` after `<RuleSelector />`.

## What stays unchanged

- `glowColor` — rendering effect, keeps its own field/action/selector
- Shaders — still receive `aliveColor`/`deadColor` uniforms; hook maps array → uniform
- `utils/grid-to-texture.ts` — binary (state 1 = 255, else 0) is correct for 2-state rules; multi-state texture encoding is a separate task
- `CellValue` type — already `number` (not `0 | 1`), so compat with N states
- `paintCell` — already accepts any `number`; brush logic unchanged
- `stores/simulation/` — `ruleId` field, `setRule` action, worker message — all rule-agnostic and already generic

## Not in scope

- Multi-state brush painting (paint state 2 vs 1)
- Multi-state texture encoding
- Additional shader uniforms for N states
- CSS variable sync for N states (AutomatonCanvas only sets 0/1)
