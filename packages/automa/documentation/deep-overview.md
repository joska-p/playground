# @repo/automa — Architecture Reference

## File layout (post-refactor)

```
src/
  App.tsx                          Entry point — calls init() on mount

  core/
    gpu/
      SimulationEngine.ts          WebGL2 GPGPU pipeline wrapper
      engineRegistry.ts            Module-level singleton for SimulationEngine access

  stores/                          Zustand vanilla stores
    simulation/
      store.ts                     simulationStore: generation, cols, rows, seed, ruleId
      selectors.ts                 useCols, useRows, useGeneration, useRuleId
      actions.ts                   init, destroy, step, setRule       ← simulation lifecycle
      gridActions.ts               clear, randomize, paintCell, placePattern  ← grid editing
      playback.ts                  pause, setSpeed, toggleRunning     ← playback control (bridges UI + sim)
    ui/
      store.ts                     uiStore: running, speedMs, toolMode, showDebug, stateColors, paletteBrush
      selectors.ts                 useBrushMode, usePaletteBrush, useRunning, useShowDebug, useSpeedMs, useStateColors
      actions.ts                   setToolMode, setStateColor, setShowDebug, setPaletteBrush

  hooks/
    useCellPainting.ts             Pointer events → grid coordinates → paintCell/placePattern
    useSimulationUniforms.ts       Sets QuadPipeline uniforms each frame (gridTexture, stateColors, texelSize)
    color-utils.ts                 HEX → Float32Array conversion for GPU color arrays
    useStepTimer.ts                Performance measurement per generation (debug)

  components/
    canvas/
      AutomatonCanvas.tsx          Wraps CellMesh in GraphicsProvider, conditionally shows GridLines
      CellMesh.tsx                 Creates SimulationEngine, owns render loop, wires painting
      GridLines.tsx                Debug CSS grid overlay
    controls/
      ControlsPanel.tsx            Container for control sections
      PlaybackSection.tsx          Play/Pause/Step buttons + speed slider
      EditSection.tsx              Randomize/Clear + Draw/Erase toggle
      CreatureSection.tsx          Creature pattern selector
      RuleSection.tsx              Rule selector + per-state color pickers
      DebugSection.tsx             Debug overlay toggle + stats display

  shaders/                         Raw GLSL loaded via ?raw Vite imports
    sim-step.frag                  GPGPU compute: applies rule (birth/survive) to each cell
    gpu-paint.frag                 GPGPU compute: paints cells within brush radius
    cell-mesh.frag                 Display: maps state → color via stateColors[], handles aspect ratio
```

## Responsibility boundaries

| Layer                | Files                              | Job                                                              |
| -------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| **Simulation core**  | `stores/simulation/actions.ts`     | Init/teardown, single-step execution, rule switching             |
| **Grid editing**     | `stores/simulation/gridActions.ts` | Mutate grid state (paint, clear, randomize, place patterns)      |
| **Playback control** | `stores/simulation/playback.ts`    | Start/stop the step loop, adjust speed (bridges UI + sim stores) |
| **UI state**         | `stores/ui/`                       | Tool mode, debug overlay, colors, playback toggles               |
| **Render bridge**    | `hooks/useSimulationUniforms.ts`   | Per-frame: reads GPU texture → sets uniforms on QuadPipeline     |
| **Input**            | `hooks/useCellPainting.ts`         | Pointer events → grid coordinates, dispatches to gridActions     |
| **WebGL engine**     | `core/gpu/SimulationEngine.ts`     | GPGPU pipeline lifecycle (step, paint, init, resize)             |
| **Engine access**    | `core/gpu/engineRegistry.ts`       | Global singleton: `setEngine`/`getEngine`/`onEngineReady`        |

## Data flow

```
User clicks Play
  → PlaybackSection → toggleRunning() [playback.ts]
    → uiStore.setState({ running: true })
    → loop: step() [actions.ts] → engine.step(rule) → simulationStore.setState({ generation: +1 })
      → await setTimeout(speedMs)

User draws on canvas
  → CellMesh pointer handlers → useCellPainting
    → eventToGridPoint() → paintCell() [gridActions.ts]
      → engine.paint() → generation +1

Render loop (every anim frame via GraphicsProvider's useFrame)
  → useSimulationUniforms' onBeforeRenderRef
    → getEngine().getDisplayTexture()
    → runner.pipeline.setUniforms({ gridTexture, stateColors, texelSize, time })
  → runner.render() → fullscreen quad with cell-mesh.frag

State lives on GPU — the grid (Uint8Array) is uploaded once in init(),
then transformed in-place by GPGPU shaders. Zero-copy to display.
```

## Store cross-references

- `actions.ts` reads/writes `uiStore` for `setRule` (extends `stateColors`)
- `playback.ts` reads `uiStore` for `running`, `speedMs`; writes `running`/`speedMs`
- `gridActions.ts` reads `simulationStore` only
- `ui/actions.ts` reads/writes `uiStore` only
