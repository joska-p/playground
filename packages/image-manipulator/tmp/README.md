# Image Manipulator — UX/UI Overhaul Plan

## Approach

Each issue is a **vertical slice**: independently implementable, testable, and mergable.
They build on each other but don't block — any can be started independently.

In scope: only `packages/image-manipulator/src/components/` and `src/store/`.
No changes to `@repo/ui`, the Astro page, or other packages.

---

## Issue 1 — Upload Drop Zone ✅

**Problem:** Plain `<input type="file">` — no drag-and-drop, no visual affordance.

**Solution:** Replace `ImageSourceControls` with a full-bleed drop zone:

- Dashed border, centered upload icon, "Drop image here or click to browse" text
- Drag-over state: border turns `--color-primary`, subtle bg pulse
- After upload: show thumbnail + filename pill inside the zone
- Reuses existing `useImageUpload` hook
- Keep "Clear Outputs" button as ghost small below the zone

**Files:** `src/components/controls/ImageSourceControls.tsx`
**New:** `src/components/controls/upload-zone/UploadZone.tsx`
**Modified:** `src/hooks/useImageUpload.ts`, `src/store/pipelineStore.ts`
**Estimate:** 1-2h

---

## Issue 2 — Execution Loading Overlay

**Problem:** Pipeline execution blocks with no visual feedback.

**Solution:** Global loading state + overlay:

- Add `isProcessing: boolean` to `pipelineStore`
- `WorkflowControls` sets `isProcessing = true` before `executeWorkflow()`, false in `finally`
- Overlay shades the output area, shows spinner + "Processing step N/M…" text
- Disable buttons during execution

**Files:** `src/store/pipelineStore.ts`, `src/components/controls/WorkflowControls.tsx`, `src/components/display/Outputs.tsx`
**Estimate:** 1-2h

---

## Issue 3 — Collapsible Control Sections

**Problem:** All controls crammed into a flat 2-col grid.

**Solution:** Group into accordion sections:

- **Source** — upload zone + clear
- **Presets** — preset selector + load button
- **Manipulations** — manipulation selector + add to workflow
- **Workflow** — step list + execute/clear buttons

One section open at a time, default to Source if empty, Workflow if steps exist.

**Files:** `src/components/controls/Controls.tsx`
**New:** `src/components/controls/sections/ControlSection.tsx`
**Estimate:** 2-3h

---

## Issue 4 — Visual Workflow Pipeline

**Problem:** Workflow steps are a flat list with ↑↓✕ buttons.

**Solution:** Horizontal flow visualization:

- Steps as connected chips/nodes with arrows between
- Each node shows step number + manipulation name
- Argument sliders live below the node (collapsed by default, expand on click)
- Drag-to-reorder instead of ↑↓ buttons (nice-to-have, fallback to arrows)
- Empty state: "Add manipulations to build your pipeline"

**Files:** `src/components/controls/workflow/Workflow.tsx`, `WorkflowStepItem.tsx`
**New:** `src/components/controls/workflow/WorkflowNode.tsx`
**Estimate:** 3-4h

---

## Issue 5 — Output Gallery Improvements

**Problem:** Canvases in a plain grid, no metadata, no actions.

**Solution:** Upgrade `OutputCard`:

- Show image dimensions (wxh) as badge
- "Download" button → saves canvas as PNG via `canvas.toBlob()`
- "Zoom" button → opens image in a lightbox overlay
- Hover: slight scale + shadow lift
- Source image pinning: source is always first, visually distinct (e.g. "Original" tag)

**Files:** `src/components/display/OutputCard.tsx`, `Output.tsx`
**New:** `src/components/display/download.ts` (utility), `src/components/display/ImageLightbox.tsx`
**Estimate:** 3-4h

---

## Issue 6 — Before/After Comparison

**Problem:** Source is just another card — no way to compare.

**Solution:** Toggle between "grid" and "compare" modes:

- Compare mode: source vs selected output, side-by-side or slider overlay
- Slider: draggable vertical divider, left = original, right = result
- Use a canvas-based split approach (no extra library needed)

**Files:** `src/components/display/Outputs.tsx`
**New:** `src/components/display/CompareSlider.tsx`, `src/components/display/CompareToggle.tsx`
**Estimate:** 3-4h

---

## Issue 7 — Preset Previews

**Problem:** Presets are names in a dropdown — no clue what they do.

**Solution:** Show a small preview thumbnail per preset:

- Run each preset on a small downscaled version of the source image
- Show thumbnails in a horizontal scrollable strip below the preset selector
- Active preset gets a `--color-primary` border
- Cache preview results so re-selecting is instant
- Base64 encode previews, store in a `previewCache` map in store

**Files:** `src/components/controls/PresetSelector.tsx`
**New:** `src/components/controls/presets/PresetPreviewStrip.tsx`, `src/store/previewStore.ts`
**Estimate:** 4-5h

---

## Issue 8 — Download All & Reset

**Problem:** No batch download, no clear reset flow.

**Solution:**

- "Download All" button → zip all outputs + source as individual PNGs (use JSZip or manual)
- "Reset" button → clears source, outputs, workflow, presets — full clean slate
- Confirmation dialog for Reset ("This will clear everything")

**Files:** `src/components/controls/ImageSourceControls.tsx`, `src/components/display/Outputs.tsx`
**Estimate:** 2-3h

---

## Dependency Graph

```
Issue 1 (Upload) ───────────────┐
Issue 2 (Loading) ──────────────┤
Issue 3 (Sections) ─────────────┤
                                 ├── all independent, can be parallel
Issue 4 (Workflow Viz) ─────────┤
Issue 5 (Gallery) ──────────────┤
Issue 7 (Preset Previews) ──────┘

Issue 6 (Before/After) ─── depends on Issue 5 (Gallery)
Issue 8 (Download All) ──── depends on Issue 5 (Gallery)
```

---

## How to run

```bash
pnpm --filter @repo/image-manipulator dev
```

The package runs standalone at `http://localhost:5173` (Vite dev server).
After changes, verify at the Astro page too:

```bash
pnpm --filter @repo/playground dev
```
