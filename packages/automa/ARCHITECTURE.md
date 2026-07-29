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
    gpu-paint.frag                 GPGPU compute: paints cells at exact integer coordinates
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
      → engine.paint(col, row, value) → generation +1

Render loop (every anim frame via GraphicsProvider's useFrame)
  → useSimulationUniforms' onBeforeRenderRef
    → getEngine().getDisplayTexture()
    → runner.pipeline.setUniforms({ gridTexture, stateColors, texelSize, time })
  → runner.render() → fullscreen quad with cell-mesh.frag

State lives on GPU — the grid (Uint8Array) is uploaded once in init(),
then transformed in-place by GPGPU shaders. Zero-copy to display.
```

## Coordinate domains

Six coordinate systems interact in the automa pipeline:

```
Screen (CSS pixels, top-left origin, Y-down)
  ↓  subtract bounds.left/top
Canvas (CSS pixels, top-left origin, Y-down)
  ↓  Y-flip + aspect-fit scale+offset
Grid world (continuous [0, cols] × [0, rows], Y-up)
  ↓  floor()
Grid cell (integer col, row)
  ↓  engine.paint(col, row, value)
GPU compute (FBO: cols × rows pixels)
  ↓  texture bind
Display (canvas buffer: CSS × DPR pixels)
```

### Gput compute vs display: different addressing modes

| Pipeline | Addressing | Shader primitive                | Purpose                    |
| -------- | ---------- | ------------------------------- | -------------------------- |
| GPGPU    | Integer    | `gl_FragCoord.xy`, `texelFetch` | Cell simulation & painting |
| Display  | Float UV   | `vUv`, `texture`                | Render grid to screen      |

The GPGPU pipeline addresses cells by integer `(col, row)` — one pixel in
the FBO per cell. The display pipeline reads the resulting texture by UV
at arbitrary resolution. **The domain boundary is the texture bind**:
the GPGPU writes state at pixel `(col, row)`, the display reads it via
`texture(gridTexture, uv)` where `uv = (col/cols, row/rows)`. Never
cross this boundary with math inside a shader.

### Screen → grid coordinate pipeline

```
Screen event (clientX, clientY)
  ↓  canvas.getBoundingClientRect()
Canvas-local (localX, localY)
  ↓  Y-flip: bounds.height - localY
Aspect-corrected grid-space (worldX, worldY)
  ↓  floor()
Grid cell (col, row)
```

See [`docs/coordinate-mapping.md`](docs/coordinate-mapping.md) for a
detailed postmortem of a float32 precision bug in the old paint shader
that involved an implicit domain crossing inside GLSL, and the
architectural recommendations that follow from it.

A staged refactor plan is in [`docs/refactor-plan.md`](docs/refactor-plan.md)
— three independent sessions, each with its own prompt and deliverables,
designed to be picked up in a fresh context window.

All state is in a single `automaStore` (Zustand vanilla). Selectors are React hooks
that subscribe to individual slices. Actions mutate the store directly.
