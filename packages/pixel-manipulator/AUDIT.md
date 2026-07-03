# Package Audit: `@repo/pixel-manipulator`

> Generated: Code Health Knowledge Base Entry

---

## Overview

This package implements a full image manipulation UI: file upload (drag-and-drop + file picker), a composable workflow pipeline builder (add/reorder/remove manipulation steps with arg sliders), execution via the `@repo/pixel` worker-pool API, and side-by-side compare output. Architecture is cleanly separated into a Zustand store (`manipulator/`), a core IO layer (`core/`), and presentational components. No local `eslint-disable` or `@ts-*` escape hatches were found.

---

### 📄 File: `src/components/output/CompareSlider/useCompareSlider.ts`

- **Type of Smell:** React Compiler Friction + Runtime Bug
- **Complexity Score:** Medium
- **Architectural Observation:** This hook manages a split-slider between source and result images using mouse/touch drag. It maintains two offscreen `<canvas>` elements in a ref, rebuilds them via `useEffect` when source/result change, and renders the clipped slider view. **It wraps 5 callback handlers in `useCallback`** (`updateSliderPosition`, `handleMouseDown/Up/Move/Start/End`), all of which are trivially inlineable — with React Compiler active, every `useCallback` is dead weight that obscures the plain functions. The `useEffect` on line 28 mixes two responsibilities: rebuilding offscreen canvases AND rendering the compare slider to the visible canvas; during rebuild the offscreen canvases are recreated and the visible canvas is re-drawn in a single effect, meaning the rebuild's `putImageData` writes to the offscreen canvases while the visible draw of the slider must complete in the same frame. The effect's dependency array `[source, result, sliderPos, width, height]` is propped up to stabilize the dep graph but `prevSourceRef`/`prevResultRef` are manually compared anyway. Additionally, **line 41 contains a bug**: `const rContext = s.getContext('2d')` reads the context from the _source_ canvas `s` instead of the _result_ canvas `r`, so the result canvas `r` is never populated with its ImageData and will render blank or stale data on every rebuild. The offscreen-source and offscreen-result creation blocks (lines 33–50) share nearly identical structure but are written as separate imperative blocks instead of extracted into a helper, making the bug easy to miss.
- **Impact on Strictness:** None.

---

### 📄 File: `src/components/upload/UploadZone/useUploadZone.ts`

- **Type of Smell:** React Compiler Friction
- **Complexity Score:** Low
- **Architectural Observation:** The hook wires up drag-and-drop state using a `dragCounter` ref (to handle nested drag enter/leave events). All four drag event handlers + `handleDrop` are wrapped in `useCallback`. These handlers are small (1–5 lines each), have no expensive computations, and are passed only to `<UploadDropzone>`. With React Compiler active, the `useCallback` wrappers add syntactic noise without benefit — the compiler would memoize the component and handlers automatically. The `dragCounter` pattern itself is a valid workaround for the native `dragenter`/`dragleave` event-bubbling problem, but the manual ref management duplicates what the React compiler could handle via reactive values.
- **Impact on Strictness:** None.

---

### 📄 File: `src/stores/manipulator/actions.ts`

- **Type of Smell:** Hyper-Generic Abstraction / Type Escape
- **Complexity Score:** Low
- **Architectural Observation:** The `setWorkflowSteps` function (line 69) unconditionally spread-copies its input (`[...steps]`) into state, even though callers like `WorkflowList`'s preset loader already construct fresh arrays. This is an unnecessary O(n) copy on every call. More critically, `updateStepOptions` (line 59) receives `options: Record<string, number>` but the function body spreads `step.options` (a `Record<string, unknown>` from the `WorkflowStep` type) into the call to `setState`, then overlays with `[def.key]: value`. The caller in `WorkflowNode.tsx` (line 56) needs `as Record<string, number>` to bridge the type mismatch — this type escape is caused by `WorkflowStep.options` being typed as `Record<string, unknown>` rather than a constrained shape. The `executeWorkflow` loop (lines 84–92) builds output objects with hardcoded description strings (`"Step 1"`, `"Step 2"`, etc.) using a manual index counter; this would benefit from including the actual step name from `pixel.manipulations`.
- **Impact on Strictness:** `WorkflowNode.tsx:56` uses `as Record<string, number>` to cast step options, bypassing the strict type mismatch between `Record<string, unknown>` and `Record<string, number>`.

---

### 📄 File: `src/core/file-reader.ts`

- **Type of Smell:** Linter Workaround / Type Narrowing
- **Complexity Score:** Low
- **Architectural Observation:** The `readFileAsImageData` function uses `reader.result as string` on line 23. `FileReader.result` is typed as `string | ArrayBuffer | null`, but since `readAsDataURL` was called, the result is guaranteed to be a string at that point. The type assertion is safe but represents a narrow escape from the type system — replacing it with a runtime `typeof` guard would eliminate the assertion entirely.
- **Impact on Strictness:** One `as string` type assertion to coerce `FileReader.result` after `readAsDataURL`.

---

### 📄 File: `src/hooks/useEscapeKey.ts`

- **Type of Smell:** React Compiler Friction
- **Complexity Score:** Low
- **Architectural Observation:** A small hook that adds/removes a `keydown` listener for the Escape key. Uses `useEffect` with `[onClose]` in its dependency array. With React Compiler active, the `onClose` callback reference stability is managed by the compiler, and the entire `useEffect` would be hoisted automatically — the manual dependency array is redundant. The hook also doesn't scope the listener to a specific container (attaches to `document`), which is acceptable for escape-key dismissal but precludes having multiple lightbox/modals stacked.
- **Impact on Strictness:** None.

---

### 📄 File: `src/components/output/UploadedPreview.tsx`

- **Type of Smell:** Architectural / Render Inconsistency
- **Complexity Score:** Low
- **Architectural Observation:** The `useEffect` on line 15 sets `canvas.width = canvas.clientWidth` and `canvas.height = canvas.clientHeight` once on mount (when `imageSource` reference changes). If the container's layout changes (e.g., panel resize, orientation change), the canvas dimensions become stale because no resize observer or window resize listener is wired. The canvas will either render at wrong dimensions or letterbox incorrectly. Additionally, the `UploadedPreview` component re-reads `imageSource.imageData` inside the effect but `imageSource` is the full `OutputType` object — any other property change causes unnecessary canvas re-renders.
- **Impact on Strictness:** None.

---

### 📄 File: `src/utils/download.ts`

- **Type of Smell:** Resource Lifecycle
- **Complexity Score:** Low
- **Architectural Observation:** The `downloadCanvas` function creates an anchor element, sets its `href` and `download`, calls `.click()`, but does not remove the element from the document (it was never appended), and it does not call `URL.revokeObjectURL` (though this is irrelevant since `toDataURL` returns a data: URI, not a blob: object URL). The element is garbage-collected when it goes out of scope, so the leak is negligible.
- **Impact on Strictness:** None.

---

### Summary

| Smell                   | File                              | Severity                                                                                                       |
| ----------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| React Compiler Friction | `useCompareSlider.ts`             | Medium — 5× `useCallback`, 1× `useEffect` mixing concerns, **1 runtime bug** (wrong canvas context on line 41) |
| React Compiler Friction | `useUploadZone.ts`                | Low — 5× `useCallback` on trivial handlers                                                                     |
| React Compiler Friction | `useEscapeKey.ts`                 | Low — manual `useEffect` hoisted by compiler                                                                   |
| Type Escape             | `actions.ts` → `WorkflowNode.tsx` | Low — `as Record<string, number>` caused by `WorkflowStep.options: Record<string, unknown>`                    |
| Type Escape             | `file-reader.ts`                  | Low — `as string` on `FileReader.result`                                                                       |
| Architectural           | `UploadedPreview.tsx`             | Low — stale canvas dimensions on layout change                                                                 |
| Resource Lifecycle      | `download.ts`                     | Trivial — unlinked anchor element                                                                              |

No `eslint-disable` comments, no `any`, no `@ts-*` pragmas, and no `ts-expect-error` were found anywhere in the package. The codebase maintains strict type/ESLint hygiene well.
