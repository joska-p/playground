Here’s a focused response covering your points, then a concrete implementation package.

### 1. `useCanvasInteraction` review

The ref-based design is good: listeners are attached only when `target` / `input` change, while camera, controls, handlers, pan/zoom flags are updated via refs so you avoid thrashing the DOM.

**Strengths**

- Clean separation of attachment lifetime vs. option mutation.
- `getContext` correctly pulls the latest frame snapshot and falls back for DPR/time.
- `input.attach` / `detach` is correctly paired with the listener lifecycle.
- `{ passive: false }` on wheel is required and present.

**Minor notes**

- The first `useEffect` (no dependency array) mutates `controllerOptionsRef` every render. That is intentional and fine, but a short comment helps future readers.
- If `options.pointerHandlers` is recreated every render (common with inline objects), you still only mutate the ref — good.
- `input` is required for the effect to run. If `door` is still `null`, interaction stays dormant until the door appears; that matches the current CPU/GPU door lifecycle.

### 2. Candidate for `useEffectEvent`?

Yes, partially.

`useEffectEvent` shines when you want an always-fresh callback that does **not** appear in effect dependency arrays and does not cause re-subscription.

In this file the places that would benefit:

- The `getContext` function (it already closes over refs, but `useEffectEvent` would make the intent clearer).
- The option-syncing logic that currently lives in a bare `useEffect`.

You do **not** need it for the main attachment effect — that one correctly depends only on `[target, input]`.

### 5. FrameLoopProvider null explanation

```ts
const FrameLoopContext = createContext<FrameLoop | null>(null);
```

`useFrame` does:

```ts
const loop = useContext(FrameLoopContext);
useEffect(() => {
        if (!loop) return;
        return loop.subscribe(cb);
}, [loop]);
```

If a component calls `useFrame` outside a `FrameLoopProvider`, the subscription simply never happens. There is no error and no warning. That is a deliberate silent no-op.

Pros: flexible (you can use the canvas components without a global loop).  
Cons: easy to forget the provider and wonder why animation callbacks never fire.

Recommendation: keep the null default, but consider a development-only warning inside `useFrame` when `loop === null`.

### 7. React 19 / modern hooks usage in this layer

| Location                                          | Current                                      | React 19 opportunity                                                                      |
| ------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `useCpuCanvas` / `useGpuCanvas` init              | `useEffectEvent` already used for `initDoor` | Keep it — this is the textbook case                                                       |
| Draw registration effects                         | bare `useEffect` (no deps)                   | Can stay, or be tightened with a stable `useEffectEvent` wrapper around the draw function |
| `useCanvasInteraction` option sync + `getContext` | refs + bare effect                           | `useEffectEvent` for `getContext` and for the option mutator                              |
| `useFrame`                                        | classic ref + effect                         | Fine; could use `useEffectEvent` for the callback if desired                              |
| Context                                           | `createContext` + `value={}`                 | React 19 `use` is not needed here                                                         |
| Refs as props                                     | not used                                     | Canvas already accepts `canvasRef`; React 19 “ref as prop” is optional                    |

`useEffectEvent` is the main modern tool that fits this graphics layer well.

---

### 8. Pipeline explanation + improved API + concrete code

#### Current `onDoor` / door lifecycle (what actually happens)

```
mount
  └─ useCpuCanvas / useGpuCanvas
       ├─ effect [canvasRef] → createXxxDoor(canvas) → setDoor(instance)
       ├─ effect [door, onDoor] → onDoor(door) ; cleanup → onDoor(null)
       └─ effect (no deps) → door.setDraw(...)   // every render

unmount / canvas change
  └─ destroy door → setDoor(null) → onDoor(null)
```

`onDoor` is essentially a “door became available / became unavailable” callback. It is useful when the parent needs the imperative door handle (to call methods, read input, etc.), but the double-effect + null-on-cleanup pattern is a bit noisy and easy to misuse (stale closures, forgetting the cleanup, etc.).

#### Suggested improvements

1. Prefer a **ref callback** style for the door (`onDoorRef`) — same idea as React’s `ref` callback, runs with the instance or `null`.
2. Keep the existing `onDoor` for backward compatibility if you want.
3. Make the draw registration effect explicit about its dependencies (or wrap the latest draw in `useEffectEvent`).
4. Document that `dpr` is fixed at door creation time (or recreate the door when it changes).
5. Clean up the leftover `bindGestures` / `attachWheel` on `CameraControls` (or mark them low-level).
6. Add a tiny development warning in `useFrame` when used outside a provider.

Below is a ready-to-apply set of changes.

---

### Concrete code changes

#### A. `interaction.ts` — small clarity improvement (optional)

No functional change required; the controller is already solid.

#### B. `useCanvasInteraction.ts` — with `useEffectEvent`

```tsx
// src/react/useCanvasInteraction.ts
import { useEffect, useEffectEvent, useRef, type RefObject } from 'react';
import type { InputStore } from '../cpu/input';
import type { Camera } from '../core/coords/camera';
import {
        createInteractionController,
        type FrameSnapshot,
        type InteractionContextBase,
        type InteractionControllerOptions,
        type InteractionOptions
} from './interaction';
import type { CameraControls } from './useCamera';

export type CanvasInteraction = {
        camera: Camera;
        controls: CameraControls;
        input: InputStore | null;
        getFrame(): FrameSnapshot | null;
};

export function useCanvasInteraction(
        target: RefObject<HTMLCanvasElement | null>,
        interaction: CanvasInteraction,
        options: InteractionOptions = {}
): void {
        const { camera, controls, input } = interaction;

        const controllerOptionsRef = useRef<InteractionControllerOptions | null>(null);
        const cameraRef = useRef(camera);
        const controlsRef = useRef(controls);
        const interactionRef = useRef(interaction);

        // Always-fresh context builder (does not participate in effect deps)
        const getContext = useEffectEvent((): InteractionContextBase => {
                const canvas = target.current!;
                const frame = interactionRef.current.getFrame();
                return {
                        camera: cameraRef.current,
                        input: input!,
                        width: canvas.clientWidth,
                        height: canvas.clientHeight,
                        dpr:
                                frame?.dpr ??
                                (typeof window === 'undefined' ? 1 : window.devicePixelRatio),
                        time: frame?.time ?? 0,
                        deltaTime: frame?.deltaTime ?? 0,
                        frameCount: frame?.frameCount ?? 0
                };
        });

        // Keep refs + live options in sync without re-attaching listeners
        useEffect(() => {
                interactionRef.current = interaction;
                cameraRef.current = camera;
                controlsRef.current = controls;

                const opts = controllerOptionsRef.current;
                if (opts) {
                        opts.handlers = options.pointerHandlers ?? {};
                        opts.pan = options.pan ?? true;
                        opts.zoom = options.zoom ?? true;
                        opts.panButton = options.panButton;
                }
        });

        useEffect(() => {
                const canvas = target.current;
                if (!canvas || !input) return;

                input.attach(canvas);

                const opts: InteractionControllerOptions = {
                        handlers: options.pointerHandlers ?? {},
                        pan: options.pan ?? true,
                        zoom: options.zoom ?? true,
                        panButton: options.panButton,
                        getContext,
                        onPan: (dx, dy) => {
                                const cam = cameraRef.current;
                                cam.x += dx;
                                cam.y += dy;
                        },
                        onZoom: (deltaY, focalPoint) => {
                                const cam = cameraRef.current;
                                controlsRef.current.zoomTo(
                                        cam.zoom * Math.exp(-deltaY * 0.002),
                                        focalPoint
                                );
                        }
                };
                controllerOptionsRef.current = opts;

                const controller = createInteractionController(opts);

                canvas.addEventListener('pointerdown', controller.onPointerDown);
                canvas.addEventListener('pointermove', controller.onPointerMove);
                canvas.addEventListener('pointerup', controller.onPointerUp);
                canvas.addEventListener('pointercancel', controller.onPointerCancel);
                canvas.addEventListener('wheel', controller.onWheel, { passive: false });
                canvas.addEventListener('contextmenu', controller.onContextMenu);

                return () => {
                        canvas.removeEventListener('pointerdown', controller.onPointerDown);
                        canvas.removeEventListener('pointermove', controller.onPointerMove);
                        canvas.removeEventListener('pointerup', controller.onPointerUp);
                        canvas.removeEventListener('pointercancel', controller.onPointerCancel);
                        canvas.removeEventListener('wheel', controller.onWheel);
                        canvas.removeEventListener('contextmenu', controller.onContextMenu);
                        input.detach();
                        controllerOptionsRef.current = null;
                };
        }, [target, input, getContext]);
}
```

#### C. Improved `useCpuCanvas` (draw registration + clearer door callback)

```tsx
// key parts only — full file follows the same structure as your original

export type UseCpuCanvasOptions = {
        onFrame?: CpuDraw | null | undefined;
        /** Called with the door instance when it becomes ready, and with null on teardown.
         *  Prefer this over storing the door in React state unless you need re-renders. */
        onDoor?: ((door: CpuRuntime | null) => void) | undefined;
        camera?: Camera | undefined;
        cameraControls?: CameraControls | undefined;
        initialCamera?: CameraOptions | undefined;
        dpr?: number | undefined;
        canvasRef?: RefObject<HTMLCanvasElement | null> | undefined;
};

export function useCpuCanvas(options: UseCpuCanvasOptions): UseCpuCanvasResult {
        // ... same setup as before ...

        const initDoor = useEffectEvent((canvas: HTMLCanvasElement) => {
                return createCpuRuntime({
                        canvas,
                        camera,
                        ...(dpr !== undefined ? { dpr } : {})
                });
        });

        // Door lifetime tied to the canvas element
        useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const instance = initDoor(canvas);
                setDoor(instance);

                return () => {
                        instance.destroy();
                        setDoor(null);
                        frameRef.current = null;
                };
        }, [canvasRef]); // initDoor is stable (useEffectEvent)

        // Notify parent of door availability (ref-callback style)
        useEffect(() => {
                onDoor?.(door);
                return () => {
                        // Only fire null if we previously had a door, or always — both are valid.
                        // Always is simpler and matches React ref-callback semantics.
                        onDoor?.(null);
                };
        }, [door, onDoor]);

        // Keep the latest draw function without re-creating the door
        const latestDraw = useEffectEvent((ctx: Parameters<CpuDraw>[0]) => {
                frameRef.current = ctx;
                onFrame?.(ctx);
        });

        useEffect(() => {
                if (!door) return;
                door.setDraw(onFrame ? latestDraw : null);
        }, [door, onFrame, latestDraw]);

        return { door, canvasRef, camera, controls, frameRef };
}
```

Do the analogous change in `useGpuCanvas` (same `latestDraw` / `useEffectEvent` pattern, keep the program effect as-is).

#### D. `useFrame` — optional development warning

```tsx
export function useFrame(callback: (time: number, delta: number) => void): void {
        const loop = useContext(FrameLoopContext);
        const ref = useRef(callback);

        useEffect(() => {
                ref.current = callback;
        });

        useEffect(() => {
                if (!loop) {
                        if (process.env.NODE_ENV !== 'production') {
                                console.warn(
                                        'useFrame() was called outside a <FrameLoopProvider>. ' +
                                                'The callback will never run.'
                                );
                        }
                        return;
                }
                const cb = (time: number, delta: number) => ref.current(time, delta);
                return loop.subscribe(cb);
        }, [loop]);
}
```

#### E. Camera controls cleanup (documentation / deprecation)

In `useCamera.ts` add a short JSDoc on the older methods:

```ts
/**
 * Low-level gesture helpers. Prefer the interaction system used by
 * CpuCanvas / GpuCanvas (createInteractionController) for new code.
 * These remain available for custom surfaces that do not use the canvas hooks.
 */
bindGestures(options?: { pan?: boolean }): GestureHandlers;
attachWheel(target: HTMLElement): () => void;
```

#### F. DPR lifetime (documentation + optional recreate)

Add a comment in both canvas hooks:

```ts
/** Device pixel ratio. Fixed at door creation time.
 *  Changing this prop after mount has no effect unless you also change the canvas identity. */
dpr?: number | undefined;
```

If you want dynamic DPR later, the cleanest path is to include `dpr` in the door-creation effect dependency array and recreate the door (destroy + create). That is a bigger change and usually unnecessary.

---

### Improved mental model for the door / `onDoor` side

Recommended usage patterns going forward:

```tsx
// 1. Fire-and-forget (most common)
<CpuCanvas
        onFrame={(ctx) => {
                /* draw */
        }}
/>;

// 2. Need the imperative handle (input, extra methods, etc.)
const doorRef = useRef<CpuRuntime | null>(null);

<CpuCanvas
        onDoor={(d) => {
                doorRef.current = d;
        }}
        onFrame={(ctx) => {
                /* ... */
        }}
/>;

// later
doorRef.current?.input.whatever();
```

Or, if you ever want React to re-render when the door appears:

```tsx
const [door, setDoor] = useState<CpuRuntime | null>(null);
<CpuCanvas onDoor={setDoor} ... />
```

The `onDoor(null)` cleanup on unmount (or when the door is destroyed) keeps the parent’s ref / state honest.

---

### Summary of recommended next steps

1. Apply the `useEffectEvent` version of `useCanvasInteraction`.
2. Apply the same `latestDraw` + explicit draw-registration effect in both `useCpuCanvas` and `useGpuCanvas`.
3. Keep `onDoor` but treat it as a ref-callback (document the null-on-teardown contract).
4. Add the optional `useFrame` warning.
5. Mark the older camera gesture helpers as low-level.
6. Document that `dpr` is fixed at creation time.

Would you like me to spit out the full rewritten files (`useCpuCanvas.ts`, `useGpuCanvas.ts`, `useCanvasInteraction.ts`, `useFrame.ts`) ready to paste, or a single markdown “migration notes” document you can keep in the repo?
