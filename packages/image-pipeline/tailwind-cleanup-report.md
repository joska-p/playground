# Tailwind Cleanup Report — @repo/image-pipeline

Generated: Sat May 30 2026
Directory: packages/image-pipeline

---

## External Dependencies (black boxes)

| Component      | Imported from       | Used in               |
| -------------- | ------------------- | --------------------- |
| `<Card>`       | `@repo/ui/Card`     | ManipCard.tsx         |
| `<CardContent>`| `@repo/ui/Card`     | ManipCard.tsx         |
| `<Slider>`     | `@repo/ui/Slider`   | ManipCard.tsx         |
| `<Button>`     | `@repo/ui/Button`   | ResizeDemo.tsx        |

---

## Usage Map Summary

The package is a demo/documentation site for an image manipulation pipeline. Files with Tailwind classes live under `src/components/pipeline-docs/`. The main layout (`PipelineDocs.tsx`) uses a single-column `space-y-16` shell with `mx-auto max-w-6xl px-4 py-12`. Sections contain either a grid of `ManipCard` components (`grid gap-6 sm:grid-cols-2 lg:grid-cols-3` or `sm:grid-cols-2`) or a demo component (`SnapshotDemo`, `ResizeDemo`, `ChainDemo`, `CustomDemo`). Demo components share a common pattern: a `flex flex-wrap items-start gap-6` row containing two `w-36` image columns with an arrow indicator between them.

No parent context forces inherited layout values that children redundantly repeat. The codebase is generally clean — most classes are locally justified.

---

## Proposed Changes

### [App.tsx]

No issues.

### [PipelineDocs.tsx]

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason                         |
| --- | ---- | ------- | --------- | ------------------------------ |
| C1  | 40   | `<p>`   | `text-base` | Tailwind default on `<p>`; no ancestor overrides font-size |

### [ChainDemo.tsx]

#### Wrappers to remove

| ID  | Line | Description                    | Classes to relocate             |
| --- | ---- | ------------------------------ | ------------------------------- |
| W1  | 41   | Arrow indicator wrapper div    | move `self-center` to child `<span>`; drop `flex items-center` |

#### Classes to remove — intra-component

| ID  | Line | Element            | Class(es)    | Reason                                                |
| --- | ---- | ------------------ | ------------ | ----------------------------------------------------- |
| C2  | 41   | arrow wrapper div  | `items-center` | Single child, no explicit height — no visible effect |

### [CustomDemo.tsx]

#### Wrappers to remove

| ID  | Line | Description                    | Classes to relocate             |
| --- | ---- | ------------------------------ | ------------------------------- |
| W2  | 39   | Arrow indicator wrapper div    | move `self-center` to child `<span>`; drop `flex items-center` |

#### Classes to remove — intra-component

| ID  | Line | Element            | Class(es)    | Reason                                                |
| --- | ---- | ------------------ | ------------ | ----------------------------------------------------- |
| C3  | 39   | arrow wrapper div  | `items-center` | Single child, no explicit height — no visible effect |

### [CodeBlock.tsx]

No issues.

### [ManipCard.tsx]

#### Classes to remove — intra-component

| ID  | Line | Element      | Class(es) | Reason                                         |
| --- | ---- | ------------ | --------- | ---------------------------------------------- |
| C4  | 109  | `<details>`  | `group`   | No `group-*` variant used anywhere in subtree — dead code |

#### Flags — do not touch, requires review

| ID  | Line | Class(es)                         | Reason                                                  |
| --- | ---- | --------------------------------- | ------------------------------------------------------- |
| F1  | 60   | `overflow-hidden rounded-xl flex flex-col` passed to `<Card>` | External component `@repo/ui/Card` — cannot verify overlap with default Card styles |

### [ResizeDemo.tsx]

No issues.

### [SectionHeader.tsx]

No issues.

### [SnapshotDemo.tsx]

No issues.

---

## Summary Table

| File             | Wrappers | Intra classes | Heritage classes | Flags |
| ---------------- | -------- | ------------- | ---------------- | ----- |
| App.tsx          | 0        | 0             | 0                | 0     |
| PipelineDocs.tsx | 0        | 1             | 0                | 0     |
| ChainDemo.tsx    | 1        | 1             | 0                | 0     |
| CustomDemo.tsx   | 1        | 1             | 0                | 0     |
| CodeBlock.tsx    | 0        | 0             | 0                | 0     |
| ManipCard.tsx    | 0        | 1             | 0                | 1     |
| ResizeDemo.tsx   | 0        | 0             | 0                | 0     |
| SectionHeader.tsx| 0        | 0             | 0                | 0     |
| SnapshotDemo.tsx | 0        | 0             | 0                | 0     |
| **Total**        | **2**    | **3**         | **0**            | **1** |

---

## Notes for Review

1. **Arrow wrapper pattern (ChainDemo + CustomDemo)** — Both files have an identical `<div className="flex items-center self-center">` wrapping a single `<span>→</span>`. The `items-center` has no visible effect (single child, no fixed height), and the wrapper can be unwrapped by moving `self-center` onto the `<span>`. Consider extracting into a shared helper component if this pattern expands.

2. **`text-base` default** — The `<p>` on PipelineDocs.tsx:40 uses `text-base` which matches the browser default. Only flagged as a minor observation; keeping it is harmless defensive styling.

3. **`group` on `<details>`** — The `group` class in ManipCard.tsx:109 is unused (no `group-hover:*`/`group-open:*` in descendants). Likely a copy-paste artifact or planned for future use.

4. **External `@repo/ui` components** — `Card`, `CardContent`, `Slider`, and `Button` receive Tailwind classes via `className`. A separate cleanup pass of `@repo/ui` itself could reveal internal redundancies, but those are out of scope here.
