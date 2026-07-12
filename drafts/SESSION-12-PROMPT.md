# Session 12 prompt — graph-viz README

Read these files first:
- `drafts/PLAN.md` — Phase 2 template, tone rules, creative packages table
- `packages/graph-viz/README.md` — 408-line Three.js + R3F + Zustand 3D force-directed graph visualizer
- `packages/sequence-renderer/README.md` — reference for voice and two-package split handling
- `packages/palette-generator/README.md` — reference for single-package voice

**Scope:** Rewrite `packages/graph-viz/README.md` (408 lines) — the largest creative package. A Three.js + React Three Fiber + Zustand app that renders a codebase dependency graph as an interactive 3D scene. Nodes are spheres (code) or boxes (documents), edges are line segments, community groups are color-coded with floating labels.

**Key characteristics:**
- Standalone app (not a library component) — consumed via `<App />` export
- Two-phase lifecycle: build-time data pipeline (graphify → parse → simulate → normalize → build) then runtime React render
- Dual InstancedMesh rendering (spheres + boxes) with strategy pattern for node visuals
- Two Zustand stores: content (static graph data) and view (interaction state)
- Community-based filtering, node selection with connected/disconnected edge highlighting
- Zod validation at entry point; config frozen with `as const`
- 24-color PALETTE for community assignment

**Validation:** `pnpm sync-package-docs`

**After completing, update `drafts/PLAN.md`:**
- Mark Session 12 as done
- Produce the new prompt for Session 13 (three-stage README)
