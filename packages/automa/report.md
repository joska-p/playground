@repo/automa + @repo/graphics Analysis Report

1. Critical Bug: Cannot Draw on Canvas
   Root cause: canvasRef not passed to useCellPainting.
   In CellMesh.tsx:43-50, the call to useCellPainting omits the 7th argument (canvasRef). The hook creates its own useRef that's never attached to any DOM element, so activeCanvasRef.current is always null.
   Flow:
1. useCellPainting.ts:23 — localCanvasRef is created but never connected to a <canvas>
1. useCellPainting.ts:24 — activeCanvasRef = canvasRef ?? localCanvasRef → undefined ?? localRef → localRef
1. useCellPainting.ts:32 — paintAtEvent checks if (!canvas) → always returns early
   Fix: Pass canvasRef from useShaderRunner as the 7th argument to useCellPainting in CellMesh.tsx.
1. Performance: Animation Loop Restarts Every Render
   Root cause: useGridTexture returns a new onBeforeRender function reference on every render. CellMesh.tsx:30-41 has a useEffect that depends on onBeforeRender, so it calls runner.stop() + runner.start() on every React render cycle.
   Impact: Frame drops, potential flickering, wasted RAF registrations.
   With React 19 compiler: The compiler won't help here because the dependency is a function created in a hook body, not a useCallback. The fix requires architectural change (see Section 4).
1. Performance: buildStateColorArray Allocates Every Render
   Location: useGridTexture.ts:42 — const stateColorsArray = buildStateColorArray(stateColors);
   Creates a new Float32Array(MAX_STATE_COUNT * 3) on every render of CellMesh. The stateColors array rarely changes (only when the user picks a new color).
   Fix: Move into a ref or use the texture's own color array that only updates when stateColors actually changes.
1. Suggestion: useFrame Hook for @repo/graphics
   The Problem
   The current pattern in CellMesh.tsx manually wires the render loop:
   useEffect(() => {
   runner.start((time) => { onBeforeRender(time); });
   return () => runner.stop();
   }, [onBeforeRender, runnerRef]); // ← depends on unstable reference
   This is fragile because:

- The callback reference changes on every render → loop restarts
- Only one component can own the loop
- Start/stop lifecycle is manual
  R3F's useFrame Design
  R3F's useFrame solves this by:

1. A shared FrameLoop that drives all registered callbacks via RAF
2. Subscribe/unsubscribe is automatic on mount/unmount
3. Callbacks stored in refs (no re-renders, no dependency arrays)
4. Priority ordering for execution order
   // R3F pattern
   function Foo() {
   useFrame((state, delta) => {
   // runs every frame, no re-renders
   });
   }
   Proposed useFrame for @repo/graphics
   New class — FrameLoop:
   export class FrameLoop {
   private callbacks = new Set<(time: number) => void>();
   private rafId = 0;
   private running = false;

subscribe(cb: (time: number) => void): () => void {
this.callbacks.add(cb);
if (!this.running) this.start();
return () => {
this.callbacks.delete(cb);
if (this.callbacks.size === 0) this.stop();
};
}

private start() { /* RAF loop _/ }
private stop() { /_ cancel RAF */ }
}
New hook — useFrame:
export function useFrame(
loopRef: React.RefObject<FrameLoop | null>,
callback: (time: number) => void
): void {
const ref = useRef(callback);
ref.current = callback; // always latest, no stale closures
useEffect(() => {
return loopRef.current?.subscribe((t) => ref.current(t));
}, [loopRef]);
}
Modify useShaderRunner to expose loopRef:
The runner creates a FrameLoop internally and subscribes its own pipeline.render() to it. Returns { canvasRef, runnerRef, loopRef }.
How Automa Would Use It
function CellMesh() {
const { canvasRef, loopRef } = useShaderRunner(fragmentShader);

// Texture upload — runs every frame, no re-renders
useFrame(loopRef, (time) => {
onBeforeRender(time); // upload grid texture, set uniforms
});

useInteractiveCanvas(canvasRef);

return <canvas ref={canvasRef} ... />;
}
Benefits:

- No more useEffect with unstable dependencies for the render loop
- Multiple components can register frame callbacks on the same loop
- Loop auto-starts/stops based on subscriber count
- React 19 compiler doesn't need to intervene — refs handle it
  What Changes in @repo/graphics
  File Change
  webgl/FrameLoop.ts New — shared RAF scheduler
  react/useFrame.ts New — hook for frame callbacks
  react/useShaderRunner.ts Modify to create FrameLoop, expose loopRef
  webgl/ShaderRunner.ts Remove internal RAF loop, delegate to FrameLoop
  package.json Add exports for ./react/useFrame and ./webgl/FrameLoop
  What Changes in @repo/automa
  File Change
  components/canvas/CellMesh.tsx Replace manual useEffect + runner.start() with useFrame(loopRef, ...)
  hooks/useGridTexture.ts Return a stable callback (ref-based), memoize buildStateColorArray
  hooks/useCellPainting.ts No change needed (just pass canvasRef from parent)

5. Graphics Library Suitability Assessment
   Aspect Verdict Notes
   WebGL2 texture-based rendering Excellent fit Single-channel R8 texture + NEAREST filtering is optimal for grid data
   Fullscreen quad pattern Excellent fit No geometry overhead, clean uniform-based color mapping
   CSS transform pan/zoom Good Works correctly — getBoundingClientRect() accounts for transforms
   FBOManager Available, unused Could enable GPGPU simulation (move step computation to GPU)
   InstancedBatch Not relevant Designed for instanced geometry, not texture-based rendering
   ShaderCanvas Not used Automa needs direct canvasRef for interaction — manual wiring is correct
6. Additional Suggestions
7. Grid texture color array caching — buildStateColorArray should only recompute when stateColors changes. Store the result in a ref and compare before reallocating.
8. eventToGridPoint pan/zoom awareness — Currently works correctly because getBoundingClientRect() reflects CSS transforms. No change needed.
9. Future: GPGPU simulation — The FBOManager in @repo/graphics could enable running the cellular automaton rule on the GPU via ping-pong FBOs, eliminating the worker pool overhead for the simulation step. This would be a significant architectural change but would enable much larger grids.
