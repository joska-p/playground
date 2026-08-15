# @repo/graph-viz

> A codebase rendered as a galaxy — files become spheres and boxes floating in 3D space, their dependency edges drawn as luminous threads, community clusters glowing in twenty-four palette colours.
> Current Status: ❄️ On Hold

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Graph Viz transforms a codebase's dependency structure into an interactive 3D galaxy where files become spheres and boxes floating in space, connected by luminous dependency threads and grouped into vibrant community clusters.

The core technical tension lies between _computational density_ and _visual legibility_. Thousands of nodes and edges must coexist without descending into visual noise. To solve this, Graph Viz employs a two-pass architecture:

- **Build-Time Pipeline:** A four-stage pipeline (`parseGraph` → `runSimulation` → `normalizeCoords` → `buildOutput`) uses `d3-force-3d` physics to space nodes apart, quantizing coordinates into a predictable bounding cube before runtime.
- **Runtime Rendering:** Instead of rendering thousands of individual `<mesh>` components, two `InstancedMesh` draw calls efficiently draw code spheres and document boxes, with per-instance color and scale driven by community membership and selection state.
- **State Separation:** Two independent Zustand stores divide the domain cleanly: an immutable content store initialized once at module load containing static graph topology, and a mutable view store tracking user interactions (node selection, community visibility toggles, edge/label visibility). Data validation is enforced strictly at module scope using Zod.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** Galaxy and star system visualizations, 3D network topologies, spatial information landscapes, and codebases visualized as organic nervous systems where interacting clusters light up upon inspection.
- **Math / Papers:** Force-directed graph layout algorithms in three dimensions (`d3-force-3d`), spring-mass physics simulations, and spatial coordinate normalization within bounded bounding volumes.
- **Borrowed Code & Algorithms:** Four-stage pure function pipeline composition pattern, dual `InstancedMesh` rendering with scale culling (scaling hidden nodes to `0.001` to maintain constant draw calls and avoid React re-renders), and strict module-scope Zod validation guarding runtime initialization.

## ⚠️ Patterns & Gotchas

- **Build-Time Simulation:** The heavy force-directed simulation runs strictly at build time via CLI (`prepare.ts`) reading `graphify-out/graph.json` and emitting `src/data/processed-graph.json`. It never executes during client render ticks.
- **Scale Culling over Re-renders:** Toggling community visibility scales hidden nodes down to `0.001` rather than destroying and recreating mesh instances, keeping draw call counts stable and avoiding expensive React re-renders.
- **Strict Zod Validation:** The processed graph payload is validated against a Zod schema immediately at module scope in `App.tsx`. Malformed data triggers an accessible error alert (`role="alert"`) instead of partial rendering.
- **Compiler-Driven Memoization:** Relying on the React Compiler (`no need for useMemo or useCallback`) requires maintaining strict immutability boundaries between the static content store and dynamic view store.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/graph-viz/`._
