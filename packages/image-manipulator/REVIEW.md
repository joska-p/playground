# TypeScript + React 19 Code Review Report

| Entry                  | Details                                                       |
| :--------------------- | :------------------------------------------------------------ |
| **Date**               | 2026-06-03 14:05                                              |
| **Reviewer**           | AI (typescript-react-reviewer)                                |
| **Scope**              | Full source audit — `packages/image-manipulator/src/`         |
| **Project Stack**      | React 19 + TypeScript (strictest) + Zustand + Tailwind CSS v4 |
| **Overall Assessment** | **REQUEST_CHANGES**                                           |

---

## Summary

| Metric              | Value           |
| ------------------- | --------------- |
| Files Reviewed      | 18 source files |
| Lines Changed       | — (full audit)  |
| Critical Issues     | 1               |
| High Priority       | 2               |
| Architecture Issues | 3               |

---

## Findings by Priority

### 🚫 Critical

#### 1. `key={index}` in reorderable list — state corruption on reorder/remove

- **File:** `src/components/controls/workflow/Workflow.tsx:24`
- **Severity:** P0 — Block Merge

Using `key={index}` in a list that supports `moveWorkflowStep` (reorder) and `removeWorkflowStep` (filter) causes React to mismatch component instances with the wrong data. Dragging step C to index 0 will swap state between components instead of reordering.

```tsx
// ❌ Current (Workflow.tsx:24)
{steps.map((step, index) => (
  <WorkflowStepItem key={index} ... />
))}
```

`WorkflowStep` only has `{ id, options }` — `id` is the manipulation type (e.g. `"brightness"`) so duplicates exist. **Add a unique per-step identifier.**

**Recommended fix:**

Add a unique ID to `WorkflowStep`:

```ts
// store/workflowStore.ts
type WorkflowStep = {
  uid: string; // unique-instance ID
  id: string; // manipulation type
  options: Record<string, number>;
};
```

Use `crypto.randomUUID()` when creating steps:

```ts
function addToWorkflow(id: string) {
  const workflow = workflowStore.getState().workflow;
  const manipData = manipulations[id];
  workflowStore.setState({
    workflow: [
      ...workflow,
      {
        uid: crypto.randomUUID(),
        id,
        options: { ...(manipData?.defaultArgs ?? {}) },
      },
    ],
  });
}
```

Then in `Workflow.tsx`:

```tsx
{steps.map((step) => (
  <WorkflowStepItem key={step.uid} step={step} index={...} ... />
))}
```

---

### ⚠️ High Priority

#### 2. "Edge Ink" preset — missing `energyMap` step (logical bug)

- **File:** `src/core/workflows/workflows.ts:89-92`
- **Severity:** P1

The "Edge Ink" preset description says "Sobel edge detection on grayscale" but the steps only include `grayscale` — the `energyMap` (Sobel) step is missing. Users get a grayscale image instead of edge detection.

```ts
// ❌ Current — grayscale only, not edge detection
{
  name: "Edge Ink",
  description: "Sobel edge detection on grayscale",
  steps: [{ id: "grayscale", options: {} }],
},
```

**Fix:** Add the `energyMap` step:

```ts
{
  name: "Edge Ink",
  description: "Sobel edge detection on grayscale",
  steps: [
    { id: "grayscale", options: {} },
    { id: "energyMap", options: {} },
  ],
},
```

#### 3. Missing Error Boundary — no fallback for render crashes

- **File:** `src/main.tsx` + all component files
- **Severity:** P1

No `<ErrorBoundary>` wraps the app. If `putImageData`, `imageElementToImageData`, or any render throws, the entire app unmounts with a white screen and no recovery.

**Fix:** Wrap the root with an error boundary:

```tsx
// main.tsx
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
```

---

### 📝 Architecture/Style

#### 4. `ArgDefinition` type duplicated across files

- **Files:** `src/core/manipulations/manipulations.ts:19` and `src/components/controls/workflow/WorkflowStepArgSlider.tsx:1`
- **Severity:** P3

The exact same shape `{ key: string; label: string; min: number; max: number; step: number }` is defined inline in `manipulations.ts` and as a local type in `WorkflowStepArgSlider.tsx`. Extract to a shared type export.

#### 5. `Output.tsx` — unnecessary optional chaining on `ImageData` fields

- **File:** `src/components/display/Output.tsx:19-20`
- **Severity:** P3

`imageData` is typed as required `ImageData` in props, so `imageData?.width` and `imageData?.height` are unnecessary. Use `imageData.width` directly.

#### 6. `clearPipelineOutputs` — index access without empty-array guard

- **File:** `src/store/pipelineStore.ts:61-64`
- **Severity:** P3

```ts
export function clearPipelineOutputs() {
  const outputs = pipelineStore.getState().outputs;
  pipelineStore.setState({
    outputs: [outputs[0]], // [undefined] when outputs is empty
  });
}
```

If outputs are empty, this sets `outputs: [undefined]`. Add a guard:

```ts
outputs: outputs.length > 0 ? [outputs[0]] : [],
```

---

## Recommended Next Steps

1. **Fix `key={index}` in `Workflow.tsx`** — add unique `uid` field, use as key (P0)
2. **Fix "Edge Ink" preset** — add the missing `energyMap` step (P1)
3. **Add an Error Boundary** — wrap the app root (P1)
4. **Extract shared `ArgDefinition` type** — DRY up the type (P3)
5. **Clean up `Output.tsx` and `clearPipelineOutputs`** — minor polish (P3)
