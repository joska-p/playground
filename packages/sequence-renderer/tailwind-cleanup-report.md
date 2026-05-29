# Tailwind Cleanup Report — @repo/sequence-renderer

Generated: 2026-05-29
Directory: packages/sequence-renderer

---

## External Dependencies (black boxes)

Heritage analysis was skipped for these — they may be worth a separate cleanup session.

| Component          | Imported from           | Used in                        |
| ------------------ | ----------------------- | ------------------------------ |
| `<Sidebar>`        | `@repo/ui/Sidebar`      | SequenceRenderer.tsx           |
| `<Sidebar.Main>`   | `@repo/ui/Sidebar`      | SequenceRenderer.tsx           |
| `<Sidebar.Panel>`  | `@repo/ui/Sidebar`      | SequenceRenderer.tsx           |
| `<Card>`           | `@repo/ui/Card`         | Controls.tsx                   |
| `<Select>`         | `@repo/ui/Select`       | Controls.tsx, SequenceSelector.tsx |
| `<Slider>`         | `@repo/ui/Slider`       | Controls.tsx                   |

Theme is imported from `@repo/ui/gruvbox-theme` — tokens `bg-background` and `text-foreground` originate there.

---

## Usage Map Summary

The package is a single-page app with three layers:

1. **App.tsx** — full-viewport `grid` shell wrapping `<SequenceRenderer />`
2. **SequenceRenderer.tsx** — uses external `<Sidebar>` (desktop/mobile bottom) with `<Sidebar.Main>` (canvas) and `<Sidebar.Panel>` (controls)
3. **Controls.tsx** — horizontal `Card` with three children: `<SequenceSelector />`, `<Slider />`, and a `<div>` wrapping a `<span>` + `<Select>`

No component is called from multiple sites (each has exactly one call site), so all inheritance is linear and unambiguous.

---

## Proposed Changes

### [App.tsx](src/App.tsx)

#### Classes to remove — intra-component

| ID | Line | Element  | Class(es) | Reason                                                       |
| -- | ---- | -------- | --------- | ------------------------------------------------------------ |
| C1 | 5    | root div | `grid`    | Single child (`<SequenceRenderer />`), no grid-template-columns/rows, no gap, no placement properties. `grid` with one unconfigured cell behaves identically to `block`. Safe to remove. |

### [Controls.tsx](src/components/controls/Controls.tsx)

#### Classes to remove — intra-component

| ID | Line | Element     | Class(es) | Reason                                                                      |
| -- | ---- | ----------- | --------- | --------------------------------------------------------------------------- |
| C2 | 20   | `<Card>`    | `flex-row`| Redundant with `flex` — `display: flex` defaults to `flex-direction: row`.  |

#### Flags — do not touch, requires review

| ID | Line | Class(es)    | Reason                                                                                                     |
| -- | ---- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| F1 | 20   | `items-cente`| **Typo/bug.** Not a valid Tailwind class. Likely meant `items-center`. Verify intent before fixing.         |

#### Notes

- If F1 is fixed to `items-center`, the `justify-center` + `items-center` + `flex-row` + `gap-8` on the Card creates a centered row layout. No further issues if the intent is correct.

### [SequenceSelector.tsx](src/components/controls/SequenceSelector.tsx)

No changes proposed. All classes are valid and non-redundant.

### [SequenceDisplay.tsx](src/components/sequence-display/SequenceDisplay.tsx)

No changes proposed. Canvas with `h-full w-full` is the standard pattern.

### [SequenceRenderer.tsx](src/components/SequenceRenderer.tsx)

No Tailwind classes in this file. Pure composition of external `<Sidebar>` components.

### [All other files](src/store/, src/core/, src/utils/)

No Tailwind classes present. No changes.

---

## Summary Table

| File               | Wrappers | Intra classes | Heritage classes | Flags |
| ------------------ | -------- | ------------- | ---------------- | ----- |
| App.tsx            | 0        | 1             | 0                | 0     |
| Controls.tsx       | 0        | 1             | 0                | 1     |
| SequenceSelector.tsx | 0      | 0             | 0                | 0     |
| SequenceDisplay.tsx  | 0      | 0             | 0                | 0     |
| SequenceRenderer.tsx | 0      | 0             | 0                | 0     |
| **Total**          | **0**    | **2**         | **0**            | **1** |

---

## Notes for Review

1. **`items-cente` typo (F1)** — This is almost certainly a typo for `items-center`. The visual result is that the children of the Card (SequenceSelector, Slider, and the Visualization wrapper div) are *not* vertically centered as intended (they default to `align-items: normal`). This should be fixed before any other CSS cleanup, as it may affect whether other classes (e.g. `justify-center`, `py-2`) are still needed.

2. **No cross-component heritage issues** — Every component has exactly one call site, and the package is shallow (only 2 levels of nesting: App → SequenceRenderer → Controls/SequenceDisplay). All layout context is either provided within the same file or by external black-box components (`Sidebar`), so heritage redundancy is minimal.

3. **No unnecessary wrapper divs** — The only non-component wrapper is in Controls.tsx line 35 (`<div className="flex items-center gap-2">`) which provides a distinct `gap-2` spacing (parent Card uses `gap-8`), so it is not redundant.

4. **External theme tokens `bg-background` and `text-foreground`** — These are provided by the imported gruvbox theme from `@repo/ui`. They are not standard Tailwind utilities but look correct for the theme. Verified by the `@import "@repo/ui/gruvbox-theme"` in styles.css.
