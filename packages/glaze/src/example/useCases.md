Building an example app that progresses from "Hello World" to "Black Magic" is the absolute best way to document a library like `@repo/glaze`. Because it unifies Canvas2D, WebGL shapes, custom shaders, and GPGPU into a single unified camera/input paradigm, your examples should explicitly showcase how these concepts stack on top of each other.

Here is a blueprint for a progressive example suite, ordered from simplest to most complex:

---

## 🟢 Level 1: The Basics (Immediacy & Flow)

### 1. The "Screensaver" (CPU Minimalist)

- **Goal**: Show how easy it is to spin up an interactive canvas with zero boilerplate.

- **What to build**: A basic particle cascade or bouncing shape matrix using `CpuSurface`.

- **Features to showcase**:
- Method chaining (`.clear().circle().text()`) showing zero per-call allocations.

- Using built-in surface variables like `surface.time`, `surface.frameCount`, and `surface.dpr` for smooth animations.

### 2. The Infinite Graph Paper (Camera Foundations)

- **Goal**: Demonstrate that everything happens in world space by default.

- **What to build**: An infinite grid layout. Draw major grid lines every 100 units and minor lines every 20 units using `surface.line`.

- **Features to showcase**:
- Built-in default pan/zoom mechanics.

- How text (`surface.text`) stays crisp because of the underlying texture/LRU cache system, even while moving around the world space.

---

## 🟡 Level 2: Interaction & Input Routing

### 3. The Node Editor / Vector Drawer (Input Interception)

- **Goal**: Teach users how to build structural tools by overriding default camera gestures.

- **What to build**: A simple node-graph system where users can click to place nodes, drag to move them, or drag from node-to-node to connect them with lines.

- **Features to showcase**:
- `surface.pointer` translating raw mouse coordinates seamlessly into world space regardless of zoom level.

- Custom interaction handlers (`onStart`, `onMove`) returning `true` to intercept left-click drags for drawing/moving nodes, while letting middle-clicks fall through to `PanGesture`.

---

## 🟠 Level 3: GPU & Shader Art

### 4. CPU to GPU Drop-in Replacement

- **Goal**: Prove the library's claim that shapes and runtimes speak the same language.

- **What to build**: Take the exact codebase from **Example 1** or **Example 2** and switch the import/component from `CpuCanvas` to `GpuCanvas`.

- **Features to showcase**:
- Identical rendering output but utilizing WebGL2 batching under the hood.

- Performance scaling (e.g., drawing 10,000 batched circles smoothly on the GPU vs the CPU).

### 5. Infinite Procedural Mandlebrot or Noise Terrain

- **Goal**: Show off pure fragment shader capabilities tied directly to world space.

- **What to build**: A beautiful fragment shader landscape (like a Raymarching scene, a Mandelbrot fractal, or Value Noise).

- **Features to showcase**:
- Declarative shader rendering via the `fragmentShader` prop.

- Utilizing the automatic `u_camera` uniform inside the GLSL code. When the user pans or zooms the canvas, the fractal/terrain should infinitely morph and track perfectly because the shader receives the uniform camera matrix automatically.

---

## 🔴 Level 4: The Hybrid Core

### 6. The Cyber-HUD (Shaders + Vector Shapes)

- **Goal**: Highlight the ultimate feature: a shape and a shader are the exact same mechanism.

- **What to build**: A retro futuristic game UI. The background is a moving matrix grid shader; layered directly on top are vector shapes (player health bars, bounding boxes, text labels).

- **Features to showcase**:
- Mixing imperative WebGL shapes (`surface.rect`, `surface.line`) and custom programs in a single frame.

- Creating a shader via `surface.createProgram()`, rendering it as a background pass, and then immediately drawing batched geometry on top of it.

---

## 💀 Level 5: GPGPU & Heavy Simulations

### 7. Interactive Slime Mold (Physarum) or Fluid Ripple Simulation

- **Goal**: Go beyond basic Conway's Game of Life and build a highly complex GPGPU pipeline.

- **What to build**: A interactive fluid surface where clicking/dragging "injects" ripples into a texture buffer, or a slime mold simulation where agents deposit pheromones.

- **Features to showcase**:
- `StateBuffer` running ping-pong texture simulations at 60fps.

- Multi-program state manipulation: using `buffer.useProgram('simulate')` to calculate the next simulation frame, and then passing that live texture into a completely separate visualization shader via `buffer.getTexture()` to apply color mapping and post-processing.

There is already an example. @packages/glaze/src/example. use it. you can remove the current demo if you feel like you have better ideas.
