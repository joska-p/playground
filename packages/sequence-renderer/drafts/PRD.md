Here is your finalized, highly targeted Product Requirement Document (PRD). It is custom-tailored to plug directly into your existing Sequencer Renderer architecture, your flat-array sequence structure, and your new `@repo/worker-pool` package for background processing.

---

# Product Requirement Document (PRD)

## Project: Fourier Epicycle Modules (Sequencer Integration)

### 1. Executive Summary

This project introduces a deterministic Fourier Epicycle path generator and a high-performance visualizer component into the existing modular Sequencer Renderer application. Utilizing the project's monorepo infrastructure, the system will map a string/hash seed into a 2D parametric shape, process it using an $O(N^2)$ Discrete Fourier Transform (DFT), and render the resulting rotating vector chains onto an HTML5 Canvas.

### 2. Core Objectives

- **Modular Integration:** Seamlessly adapt to the existing system architecture by creating an agnostic `SequenceRule` and a decoupled visualizer layout.
- **Seed-Driven Determinism:** Inject a user-configurable `seed` string into the generation sequence so that identical strings consistently yield identical visual paths.
- **Main-Thread Optimization:** Offload heavy algebraic transformation tasks away from the UI runtime loop to maintain a stutter-free 60fps presentation layer.

---

### 3. System Architecture & Boundaries

```
[ UI State / Input ]
       │
       ▼ (Passes Seed)
[ engine.ts (generateSequence) ] ──(Runs Rule)──► [ fourierPathRule ]
       │                                                   │
       ▼ (Outputs Flat number[])                           ▼
[ FourierEpicycleVisualizer ] ──(Offloads)──► [ @repo/worker-pool ]
       │                                                   │
       ▼ (Draws 60fps Loop)                                ▼ (Returns Epicycle[])
[ HTML5 Canvas Render ] ◄──────────────────────────────────┘

```

---

### 4. Detailed Feature Requirements

#### 4.1 Seed-Enabled Sequence Engine

- **Context Upgrades:** `NextStepOptions` is extended to include an optional `seed?: string` parameter.
- **Execution Pipeline:** The main loop inside `engine.ts` safely feeds the active UI context seed down through the `SequenceRule.getNext` hook on every iteration step.

#### 4.2 The Fourier Path Generator Module (`fourierPathRule`)

- **Data Protocol:** Emits a flat 1D sequence array following an alternating coordinate pattern: `[x0, y0, x1, y1, x2, y2, ...]`.
- **Algorithmic Logic:** \* Uses the step `index` to isolate individual coordinate pairs and map them to a normalized progress timeline $t \in [0, 1]$.
- Consumes the context `seed` using a deterministic random number generator to construct distinct, closed parametric vector curves (e.g., custom harmonic loops).

#### 4.3 The Background Math Engine (`@repo/worker-pool`)

- **Asynchronous Offloading:** Multi-threaded execution is managed via the monorepo's `@repo/worker-pool` package.
- **The Worker Payload:** Coordinates are zero-copy transferred as binary float buffers directly into a worker to compute the Discrete Fourier Transform (DFT).
- **The Transform Output:** Resolves an ordered array of epicycle profiles detailing frequency speeds, vector lengths (amplitudes), and initial entry angles (phases).

#### 4.4 The Epicycle Visualizer Layer (`FourierEpicycleVisualizer`)

- **Independent Framework Ticking:** Employs an internal `requestAnimationFrame` loop that mutates local reference pointers (`useRef`) to bypass the React 19 Compiler reconciliation cycle entirely during active drawing frames.
- **Canvas Interactivity & User Dials:**
- **Precision Throttling:** A real-time slider to limit how many epicycle vectors are chained together (truncating the shape approximation).
- **Chassis Toggle:** A checkbox configuration option to show or hide the raw orbiting circle mechanisms while maintaining trace-line visibility.

---

### 5. Non-Functional Requirements & Performance

- **Zero Main-Thread Blocking:** Calculating paths up to $N = 1000$ coordinate pairs must run entirely inside a web worker thread to eliminate UI input lagging.
- **React 19 Rendering Hygiene:** Frame time iterations must never cause component re-renders. Component updates are strictly reserved for structural option changes (like precision sliders and circle visibility toggles).

---

The document is officially complete, verified, and perfectly synchronized with your project setup. Let me know whenever you're ready to spin up the code workspace!
