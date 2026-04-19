# Mosaic Maker Architecture Audit

**Date:** April 19, 2026  
**Status:** In Review  
**Objective:** Analyze the structure, logic flows, and UI components of the `packages/mosaic-maker` to identify areas for refactoring, performance optimization, and UI extraction into the shared library.

---

## 🏗️ Current Architecture

The Mosaic Maker is a complex interactive tool that generates generative art using SVG tiles and external color palettes.

### Data & Logic Flow
1.  **State Management:** Orchestrated by `MosaicMakerContext`. It handles:
    -   **Palette Stock:** Fetches 1,000 palettes from the `nice-color-palettes` API.
    -   **Active Tile Set:** Manages which SVG patterns (Cube, Diamond, etc.) are available for randomization.
    -   **Tile Grid:** Stores the array of tile names currently displayed.
2.  **Rendering:**
    -   `MosaicDisplay` calculates the number of tiles that fit the current container using DOM measurements (`offsetHeight`/`offsetWidth`).
    -   It maps over the `tiles` array and renders individual `Tile` components.
    -   **Randomization:** Colors and rotations are currently generated *during* the render loop using `Math.random()`.

---

## 🔍 Identified Issues

### 1. Performance & Stability
-   **Rendering Flickering:** Because colors and rotations are generated inside the `map` function in `MosaicDisplay.tsx`, every React re-render (even unrelated ones) causes the entire grid to "flash" with new colors.
-   **Direct DOM Manipulation:** The use of `element.style.setProperty` in `Slider-controls.tsx` and `Mosaic-context.tsx` bypasses React's state. While performant, it can lead to synchronization issues between the UI and the underlying state.
-   **Resize Lag:** The grid only recalculates its size on manual "New Tiles" clicks or initial mount. It does not automatically respond to window resizing.

### 2. Component Coupling
-   **UI Primitives:** Several components (like `SliderControls` and `PaletteButton`) contain generic UI logic that is currently locked inside the `mosaic-maker` package.
-   **Logic Entanglement:** The `Tile` component handles both the selection logic and the base styling, making it harder to test individual SVG patterns.

---

## 🎯 Proposed Improvements

### Phase 1: Performance Optimization (Refactoring Logic)
-   **Deterministic State:** Move the random color and rotation selection into the `tiles` state in the context. Instead of an array of strings (`TileNames[]`), store an array of objects:
    ```ts
    interface TileInstance {
      name: TileNames;
      colors: string[];
      rotation: string;
    }
    ```
-   **Resize Observer:** Implement a `useResizeObserver` hook to automatically trigger a grid recalculation when the container size changes.

### Phase 2: UI Extraction (Moving to `@repo/ui`)
The following components are candidates for the shared library:
-   **`ControlGroup`**: A standardized wrapper for Label + Input + Value display.
-   **`ColorPreview`**: A generic version of the `PaletteButton`.
-   **`TilePrimitive`**: A base component for rendering SVGs with consistent sizing.

### Phase 3: Developer Experience (DX)
-   **Tile Registry:** Centralize the tile definitions in `config.ts` to allow for easy extension.
-   **Type Safety:** Strengthen the Zod schemas for the external API response and move them to a dedicated `schema.ts`.

---

## 📈 Next Steps
1.  **Refactor `MosaicMakerContext`** to hold complete tile instances (prevents flickering).
2.  **Extract `SliderControls`** logic into a reusable `Fieldset` component in `@repo/ui`.
3.  **Implement `useResizeObserver`** to make the grid truly responsive.

---

*This audit report provides a roadmap for modernizing the Mosaic Maker and improving its integration with the broader monorepo architecture.*
