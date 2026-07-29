# @repo/automa — Architecture Reference

## File layout

```
src/
  App.tsx                          Entry point — calls init() on mount

  engine/
    SimulationEngine.ts            WebGL2 GPGPU pipeline wrapper
    registry.ts                    Module-level singleton for SimulationEngine access

  stores/
    automa.ts                      Single Zustand store + all selectors + all actions + playback

  hooks/
    useCellPainting.ts             Pointer events → grid coordinates → paintCell/placePattern
    useSimulationUniforms.ts       Sets QuadPipeline uniforms each frame (gridTexture, stateColors, texelSize)
    useStepTimer.ts                Performance measurement per generation (debug)

  lib/
    colors.ts                      HEX → Float32Array conversion for GPU color arrays
    coordinates.ts                 Canvas ↔ grid coordinate transforms
    constants.ts                   App-level speed/color defaults

  components/
    canvas/
      Canvas.tsx                   Wraps CellMesh in GraphicsProvider, conditionally shows GridLines
      CellMesh.tsx                 Creates SimulationEngine, owns render loop, wires painting
      GridLines.tsx                Debug CSS grid overlay
    controls/
      Panel.tsx                    Container for control sections
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

| Layer                | Files                            | Job                                                          |
| -------------------- | -------------------------------- | ------------------------------------------------------------ |
| **Simulation core**  | `stores/automa.ts`               | Init/teardown, single-step execution, rule switching         |
| **Grid editing**     | `stores/automa.ts`               | Mutate grid state (paint, clear, randomize, place patterns)  |
| **Playback control** | `stores/automa.ts`               | Start/stop the step loop, adjust speed                       |
| **UI state**         | `stores/automa.ts`               | Tool mode, debug overlay, colors, playback toggles           |
| **Render bridge**    | `hooks/useSimulationUniforms.ts` | Per-frame: reads GPU texture → sets uniforms on QuadPipeline |
| **Input**            | `hooks/useCellPainting.ts`       | Pointer events → grid coordinates, dispatches to gridActions |
| **WebGL engine**     | `engine/SimulationEngine.ts`     | GPGPU pipeline lifecycle (step, paint, init, resize)         |
| **Engine access**    | `engine/registry.ts`             | Global singleton: `setEngine`/`getEngine`/`onEngineReady`    |

## Data flow

```
User clicks Play
  → PlaybackSection → toggleRunning()
    → automaStore.setState({ running: true })
    → loop: step() → engine.step(rule) → automaStore.setState({ generation: +1 })
      → await setTimeout(speedMs)

User draws on canvas
  → CellMesh pointer handlers → useCellPainting
    → eventToGridPoint() → paintCell()
      → engine.paint() → generation +1

Render loop (every anim frame via GraphicsProvider's useFrame)
  → useSimulationUniforms' onBeforeRenderRef
    → getEngine().getDisplayTexture()
    → runner.pipeline.setUniforms({ gridTexture, stateColors, texelSize, time })
  → runner.render() → fullscreen quad with cell-mesh.frag

State lives on GPU — the grid (Uint8Array) is uploaded once in init(),
then transformed in-place by GPGPU shaders. Zero-copy to display.
```

All state is in a single `automaStore` (Zustand vanilla). Selectors are React hooks
that subscribe to individual slices. Actions mutate the store directly.
