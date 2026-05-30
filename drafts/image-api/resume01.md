- Purpose
  - Personal, single-user learning project and a React app feature.
  - Primary goals: learn by building a clean, ergonomic fluent API for image manipulation and optimize pixel-iteration performance. You may reimplement in Rust/WASM later but start in TypeScript.

- Environment
  - React browser app (Node ok for testing). Input images come from user files rendered to an offscreen/offline canvas to produce ImageData.

- Execution model & ergonomics
  - Declarative pipeline: you build a workflow (a list/array of manipulation IDs/steps) then execute it.
  - Workflows are linear arrays of manipulations; multiple workflows can run in parallel only if they share the same source image.
  - No conditional branches in chains.
  - Prefer a concise, left-to-right fluent API (e.g., Image.from(imageData).resize(800).filter('sepia').run()).
  - The API should emit intermediate outputs (ImageData) for each step by default for previewing.

- Manipulation types and fusion goals
  - Each manipulation is an object with metadata and a callback/implementation.
  - There are three operation classes:
    - Pixel-local: per-pixel mapping that only needs the value of the current pixel (fuseable).
    - Neighborhood: convolution-like ops that need a radius/neighbor access; may be separable or multi-pass.
    - Whole-image: ops that need the entire image (histogram, global transforms) and must act as barriers.
  - The runtime should minimize pixel loops by fusing consecutive Pixel-local ops into a single pass where safe, while handling Neighborhood and Whole-image ops as separate stages (barriers).
  - Some manipulations will be implemented in JS (hot fused path); JS per-pixel callbacks are allowed for prototyping but will run slower and should not be used if high performance is needed.

- Data model & memory strategy
  - Use copy-on-write / ping-pong buffers to avoid unnecessary allocations.
  - Snapshots for intermediate outputs are created only when requested (for UI preview), to limit memory/copy overhead.
  - For large images, implement tiling/chunking fallback to avoid crashing the browser.
  - Start single-threaded; design to add worker-based parallelization by tiles later if needed.

- API surface (TypeScript-first, small & practical)
  - Pipeline builder:
    - ImagePipeline.from(imageData)
    - pipeline.resize(w,h,opts)
    - pipeline.filter(name, opts)
    - pipeline.mapPixel(fn) — JS-only per-pixel prototype step (not fused with WASM later)
    - pipeline.step(opId, opts) — low-level registration use
    - pipeline.exportIntermediate(true/false)
    - pipeline.run() -> Promise<{ final: ImageData, intermediates?: ImageData[] }>
  - Op registration:
    - registerOp({ id, type: 'pixel'|'neighborhood'|'whole', radius?, fn }) where fn is a fast JS implementation for now.

- Extensibility & developer workflow
  - Start with a small built-in op set (brightness, contrast, invert, sepia, grayscale, resize bilinear, gaussian blur).
  - Allow JS-only ops for prototyping; later replace hot ops with Rust/WASM versions if you reimplement.
  - Provide metadata per-op so the runtime can decide fusion/splitting.

- Performance tradeoffs & rules of thumb
  - Fuse pixel-local ops to reduce loops and memory passes.
  - Avoid calling JS per pixel for heavy workflows; if you keep everything in TypeScript, optimize hot loops and use typed arrays (Uint8ClampedArray) and minimize per-pixel allocations.
  - Allow tile processing to enable future parallelization.

- MVP prioritized features
  - Load ImageData and return final ImageData.
  - Fluent TS builder that records steps and emits intermediate ImageData.
  - Implement fused Pixel-local ops (brightness, contrast, invert, sepia, grayscale).
  - Resize (bilinear).
  - A neighborhood op: gaussian blur (separable if possible).
  - Ping/pong buffer reuse and intermediate snapshotting.
