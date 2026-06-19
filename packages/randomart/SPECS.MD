Starting from scratch allows you to design the architecture cleanly, using the hard-won insights from your current version.

Based on your existing architecture—generating deterministic, mathematical procedural textures via randomly generated expression trees rendered simultaneously on both CPU (Web Workers) and GPU (WebGL)—here is how your formal **Use Cases** and **System Specifications** would be structured.

---

## Part 1: Architecture Core Concept (The Blueprint)

The application is a **Deterministic Procedural Texturing Engine** based on genetic/evolutionary programming grammar. It uses a hashed string (seed) to generate random syntax trees built from mathematical primitives, producing a normalized 2D coordinate map $(-1 \leq x, y \leq 1)$ over time $(t)$.

---

## Part 2: User Use Cases (Functional Requirements)

### 1. Generating & Customizing Random Art

- **UC-1.1: Generate from Text String (Seed Hash)**
- _Actor:_ End User
- _Flow:_ User types a phrase/hash into a text input. The system hashes the string and immediately generates a completely deterministic, reproducible image unique to that text string.

- **UC-1.2: Mutate Depth (Complexity Control)**
- _Actor:_ End User
- _Flow:_ User adjusts a "Max Depth" slider or input. The system limits the deep tree expansion loops, altering structural density (e.g., lower depth yields minimalist geometric bands; higher depth yields intricate chaotic noise).

- **UC-1.3: Toggle Math Primitives (Grammar Curation)**
- _Actor:_ End User
- _Flow:_ User clicks on active/inactive math rules (e.g., enabling `sin` and `multiply`, disabling `pow` and `if`). The system instantly regenerates the syntax tree utilizing only the user's selected math pool.

### 2. Controlling Color Space & Composition

- **UC-2.1: Independent RGB Channels**
- _Actor:_ End User
- _Flow:_ User disables color correlation. The system creates three isolated syntax trees using independent random offsets (`_red`, `_green`, `_blue`), generating asynchronous textures that blend into complex multi-colored arrays.

- **UC-2.2: Synchronized/Correlated Color (Structural Uniformity)**
- _Actor:_ End User
- _Flow:_ User enables "Correlated RGB". The system creates a single structural `vec3` container mapping identically calculated coordinate trees into all three color paths, yielding monochromatic or tightly harmonized layouts.

### 3. Rendering Platforms & Playback

- **UC-3.1: Animate Over Time**
- _Actor:_ End User
- _Flow:_ User presses a "Play" toggle. The system boots up a high-precision animation clock loop, continuous feeding a ticking uniform variable ($t$) into the math engine to create fluid dynamic motion.

- **UC-3.2: Hot-Swap Render Execution Target**
- _Actor:_ End User
- _Flow:_ User flips between a Canvas (CPU) and GLSL (GPU) rendering mode. The image must look **mathematically identical** regardless of execution engine target.

---

## Part 3: Technical Specifications

### 1. Mathematical Workspace Specifications

- **Coordinate Mapping Workspace:** All operations must take place inside a uniform normalized space spanning $x \in [-1, 1]$ and $y \in [-1, 1]$.
- **Color Boundary Bounds:** Final outputs of expression trees must map accurately between $[-1, 1]$, which are then normalized via $(value + 1.0) / 2.0$ to feed clean 8-bit unsigned integer canvas values $[0, 255]$ or standard GLSL fragment output bounds $[0.0, 1.0]$.
- **Platform Invariance Rule:** Every mathematical primitive must be completely bulletproofed against floating point divergence between JavaScript math and WebGL float structures:
- _Trigonometry:_ Domain scale normalized to $\pi$ multiplication factor (e.g., `Math.cos(Math.PI * x)` $\leftrightarrow$ `cos(3.14159265 * x)`).
- _Singularities & Crash Protections:_ Avoid division or square-roots of zero by clamping inputs or adding micro-offsets (e.g., adding `1e-10` or wrapping `pow` operations in a `sign()` retention block).

### 2. State & Tree Management Specifications

- **Zustand Action-Driven Flow:** Global parameters (`seed`, `maxDepth`, `correlatedRGB`, `enabledRuleIds`) reside in a central store. Any change to these properties must programmatically dispatch an automated calculation side-effect (`subscribe` listener) that recreates the underlying AST (Abstract Syntax Tree) nodes.
- **Lazy Expression Evaluation:** The tree node logic must process elements sequentially from left to right using evaluation callback wrappers (`() => number`). This ensures shortcut branching logic (`if` conditions) doesn't waste CPU cycles iterating through dead syntax branches.

### 3. Parallel Execution Framework (Multi-Threaded Rendering)

- **GPU (WebGL Renderer):**
- String compiles directly into raw GLSL text.
- _Optimization Constraint:_ Do **not** recompile programs, shaders, or look up attributes during frame updates. Compile once during structural AST transformations; handle animation frames strictly by injecting updating values to `gl.uniform1f(u_time)`.

- **CPU (Web Worker Multi-Threading Renderer):**
- Offloads heavy image processing arrays off the main UI thread.
- Image frame buffers use a standard `Uint8ClampedArray` chunk layout that passes data chunks back to the master thread via ultra-fast **Transferable Objects** (`transfer: [buffer.buffer]`) to completely prevent memory leaks or main thread UI lockups.
