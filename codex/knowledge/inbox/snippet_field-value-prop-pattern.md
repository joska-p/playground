## title: 'Field value prop replaces ControlRow'

date: 2026-08-26
type: snippet
tags: [controls, field, tlc, migration]

**Context:** @repo/ui's `ControlRow` had `label` + `value` (trailing readout like "32px") + `children`. TLC's `Field` only had `label` + `hint`. Adding `value` to Field covers the ControlRow use case.

**Corps:**
```tsx
import { Field, Slider } from '@repo/tlc/controls';

// value shows as mono readout next to label
<Field label="Tile:" value={`${tileSize}px`}>
  <Slider value={tileSize} min={32} max={256} onChange={setTileSize} showValue={false} />
</Field>
```
`value` renders as `text-[10px] font-mono tabular-nums` beside the label. `hint` still works alongside it.

**Lien codebase:** `packages/tlc/src/controls/field.tsx`
