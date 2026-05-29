# Tailwind Cleanup Report — @repo/image-manipulator

Generated: 2026-05-29
Directory: /workspaces/playground/packages/image-manipulator

---

## External Dependencies (black boxes)

Heritage analysis skipped for these — may be worth a separate cleanup session.

| Component       | Imported from    | Used in                                               |
| --------------- | ---------------- | ----------------------------------------------------- |
| `<Sidebar>`     | `@repo/ui`       | ImageManipulator.tsx                                  |
| `<Sidebar.Main>` | `@repo/ui`      | ImageManipulator.tsx                                  |
| `<Sidebar.Panel>` | `@repo/ui`     | ImageManipulator.tsx                                  |
| `<Button>`      | `@repo/ui`       | Controls.tsx, WorkflowStepItem.tsx                    |
| `<Input>`       | `@repo/ui`       | Controls.tsx                                          |
| `<Select>`      | `@repo/ui`       | Controls.tsx                                          |
| `<Slider>`      | `@repo/ui`       | WorkflowStepArgSlider.tsx                             |
| `cn`            | `@repo/ui/cn`    | Output.tsx                                            |

---

## Usage Map Summary

Layout is a `<Sidebar>` shell (external) with two slots: **Main** contains the outputs grid, **Panel** contains the controls. Controls builds a vertical flex form (`flex flex-col gap-4 p-4`) with buttons grouped in `md:grid md:grid-cols-2` wrappers. Workflow steps stack vertically inside a `flex flex-col gap-3` container. Outputs render in a responsive CSS grid (`grid-cols-2 lg:grid-cols-3`). No single pervasive layout shell drives the whole package — each section manages its own spacing.

The only theme-aware tokens used are `bg-background`, `text-foreground` (App.tsx), and `text-muted-foreground` (Outputs.tsx empty state).

---

## Proposed Changes

### App.tsx

No structural changes. Only flags (see below).

### ImageManipulator.tsx

No actionable changes. All classes and components are external (Sidebar).

### Controls.tsx

#### Classes to remove — intra-component

| ID  | Line | Element   | Class(es) | Reason                                                           |
| --- | ---- | --------- | --------- | ---------------------------------------------------------------- |
| C1  | 74   | wrapper   | `gap-4`   | inert at `<md` — div is not flex/grid on mobile; use `md:gap-4` |
| C2  | 100  | wrapper   | `gap-4`   | inert at `<md` — same pattern as line 74                        |

### Workflow.tsx

No changes needed.

### WorkflowStepItem.tsx

No changes needed.

### WorkflowStepArgSlider.tsx

No changes needed. Single wrapper around external `<Slider>` — all logic black-boxed.

### Outputs.tsx

No structural changes. Only flags (see below).

### OutputCard.tsx

No changes needed.

### Output.tsx

No changes needed.

#### Flags — do not touch, requires review

| ID  | Line | File            | Class(es)      | Reason                                                           |
| --- | ---- | --------------- | -------------- | ---------------------------------------------------------------- |
| F1  | 5    | App.tsx         | `bg-background` | custom theme token — verify in `@repo/ui/gruvbox-theme`         |
| F2  | 5    | App.tsx         | `text-foreground` | custom theme token — verify in `@repo/ui/gruvbox-theme`        |
| F3  | 11   | Outputs.tsx     | `text-muted-foreground` | custom theme token — verify in `@repo/ui/gruvbox-theme` |
| F4  | 27   | Output.tsx      | `className` in `cn()` | dynamic prop — cannot trace all call sites                     |
| F5  | 7    | ImageManipulator.tsx | `min-h-screen flex-1` | passed to external `<Sidebar>` — verify whether Sidebar's root already sets these |

---

## Summary Table

| File                 | Wrappers | Intra classes | Heritage classes | Flags |
| -------------------- | -------- | ------------- | ---------------- | ----- |
| App.tsx              | 0        | 0             | 0                | 2     |
| ImageManipulator.tsx | 0        | 0             | 0                | 1     |
| Controls.tsx         | 0        | 2             | 0                | 0     |
| Workflow.tsx         | 0        | 0             | 0                | 0     |
| WorkflowStepItem.tsx | 0        | 0             | 0                | 0     |
| WorkflowStepArgSlider.tsx | 0   | 0             | 0                | 0     |
| Outputs.tsx          | 0        | 0             | 0                | 1     |
| OutputCard.tsx       | 0        | 0             | 0                | 0     |
| Output.tsx           | 0        | 0             | 0                | 1     |
| **Total**            | **0**    | **2**         | **0**            | **5** |

---

## Notes for Review

1. **Theme tokens need verification.** `bg-background`, `text-foreground`, and `text-muted-foreground` are not standard Tailwind utilities — they are custom tokens defined in `@repo/ui/gruvbox-theme` (outside package boundary, not read). If these tokens don't exist or are misspelled, they silently produce no styling. Verification requires reading the theme file.

2. **`gap-4` on `md:grid` wrappers (Controls.tsx:74, 100).** `gap` only applies to flex/grid containers. Below `md` these divs are neither, so `gap-4` is inert on mobile. The two buttons inside each wrapper stack as block elements with zero gap. Fix: change `gap-4` to `md:gap-4` (or confirm zero-gap-on-mobile is intentional). This is the only concrete Tailwind code-cleanup opportunity found.

3. **`className` prop on `Output.tsx` is never used internally.** The `<Output>` component accepts a `className` prop but every internal call site (`OutputCard.tsx:15`) omits it. The prop exists for external consumers. If removing dead code, the `className` prop + `cn()` call could be simplified, but since the component is part of `@repo/image-manipulator`'s public API (exported in package.json), keeping it is reasonable.

4. **No heritage redundancies found.** Every child component's root classes serve distinct purposes from their parent's context. The codebase is small and components are self-contained with no deep nesting of internal components.

5. **No removable wrapper divs found.** All wrapper divs serve a structural role (grid or flex containers) and cannot be removed without behavioral change.
