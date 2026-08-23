# Glaze Refactor Inventory

Audit of implicitly assumed mathematical invariants in `packages/glaze/src/core/`, with proposals
to enforce them at compile time via Branded Types. **Pass 1 scope: `core/` only. No code was
changed.**

---

## Section 1: Pass 1 — Mathematical Invariants & Branded Types

### Summary Table

| # | File | Invariant Violated | Proposed Brand | Priority |
|---|------|--------------------|----------------|----------|
| 1 | `Camera.ts` | `zoom` may be `0`/negative/NaN → division by zero | `ZoomFactor` | 🔴 High |
| 2 | `CameraControls.ts` | `Object.assign` patch bypasses zoom clamping | `ZoomFactor` (patch type) | 🔴 High |
| 3 | `Clock.ts` | Duration ≤ 0 guarded at 3 sites against div-by-zero | `DurationSeconds` | 🔴 High |
| 4 | `FrameLoop.ts` / `Clock.ts` | Seconds vs milliseconds encoded in comments only | `Seconds` | 🔴 High |
| 5 | `Camera.ts` | Screen vs world points share one bare type | `ScreenPoint` / `WorldPoint` | 🟠 Medium |
| 6 | `Camera.ts` | `clamp` is NaN-transparent, min/max unordered | `BoundedNumber<T>` helper | 🟠 Medium |
| 7 | `gestures.ts` | Wheel speed accepts 0/negative/NaN | `WheelSpeed` | 🟠 Medium |
| 8 | `InputStore.ts` | `wheelDelta` mixes DOM scroll units (pixel/line/page) | `WheelPixelDelta` | 🟠 Medium |
| 9 | `InputStore.ts` | CSS px vs device px distinguished by comment only | `CssPoint` | 🟡 Low |
| 10 | `FrameLoop.ts` | Delta can be `0` or negative (first tick, clock jumps) | `NonNegativeSeconds` | 🟡 Low |

---

### Finding 1 — Unvalidated `zoom` enables division by zero in every transform

- **File & Line**: `packages/glaze/src/core/Camera.ts:24-28` (constructor), consumed at `Camera.ts:32-33`
- **Current Code / Issue**:
  ```ts
  constructor(x = 0, y = 0, zoom = 1) {
      this.x = x;
      this.y = y;
      this.zoom = zoom;
  }
  ```
  `new Camera(0, 0, 0)` compiles and instantiates. `screenToWorld` then computes
  `(screen.x - this.x) / this.zoom` → `Infinity`/`NaN`, poisoning every downstream coordinate.
  The invariant *“zoom is strictly positive”* exists only implicitly.
- **Proposed Branded Type**: `type ZoomFactor = number & { readonly __brand: 'ZoomFactor' }`
  with factory `zoomFactor(n: number): ZoomFactor` that throws on `n <= 0 || !Number.isFinite(n)`.
  Field becomes `zoom: ZoomFactor`; public constructor made private, replaced by
  `createCamera(x: number, y: number, zoom: ZoomFactor)`.
- **Impact**: Eliminates the division-by-zero class at its root; every call site that currently
  would need a runtime `if (zoom === 0)` guard is provably safe. `defaultCamera()` unchanged.

### Finding 2 — `CameraControls.update()` bypasses zoom clamping

- **File & Line**: `packages/glaze/src/core/CameraControls.ts:67-69`
- **Current Code / Issue**:
  ```ts
  update(partial: Partial<Camera>): void {
      Object.assign(camera, partial);
  }
  ```
  All other mutations funnel through `clampZoom` (lines 25, 28, 53), but `update({ zoom: -3 })`
  injects any value post-construction, breaking the invariant `zoom ∈ [minZoom, maxZoom]` that
  the rest of the module maintains. This is the single unguarded mutation path.
- **Proposed Branded Type**: Replace `Partial<Camera>` with an explicit patch interface
  `{ x?: number; y?: number; zoom?: ZoomFactor }`. Optionally add
  `NormalizedZoom = ZoomFactor & { within(bounds) }` if bounds-checked construction is desired.
- **Impact**: Closes the invariant leak; makes the “all mutation goes through here” contract
  (doc comment, line 3-5) actually true at the type level.

### Finding 3 — Clock duration guard duplicated 3× against zero-division

- **File & Line**: `packages/glaze/src/core/Clock.ts:56`, `:88`, `:113`
- **Current Code / Issue**:
  ```ts
  if (this.#duration === undefined || this.#duration <= 0) return 0;   // progress getter, :56
  this.#duration !== undefined && this.#duration > 0                    // seek(), :88
  if (this.#duration === undefined || this.#duration <= 0) {            // update(), :113
  ```
  Three runtime guards defend `progress`'s `this.#time / this.#duration` against zero/negative
  duration. Side effect: `new Clock({ duration: -5 })` silently *reinterprets* the input as
  “no duration” instead of failing. The implicit invariant is
  *“duration is either absent (free-running) or strictly positive”*.
- **Proposed Branded Type**: `type DurationSeconds = number & { readonly __brand: 'DurationSeconds' }`
  (strictly positive, finite), validated once in the `ClockOptions` factory. Internally the state
  becomes `#duration: DurationSeconds | undefined`, collapsing each guard to a plain
  `undefined` check — or further, a discriminated union `FreeClock | TimedClock`.
- **Impact**: Removes 3 duplicated runtime comparisons; invalid durations rejected at the
  boundary instead of silently reinterpreted; division safety guaranteed by construction.

### Finding 4 — Time units (seconds vs ms) enforced by comments only

- **File & Line**: `packages/glaze/src/core/FrameLoop.ts:1-2` (comment), `:59-62`;
  `packages/glaze/src/core/Clock.ts:102` (`update(rawDelta: number)`)
- **Current Code / Issue**:
  ```ts
  /** `time` and `delta` are in seconds. */       // FrameLoop.ts:1
  export type FrameCallback = (time: number, delta: number) => void;
  ```
  `performance.now()` returns **milliseconds**; FrameLoop divides by 1000 (lines 59, 62) to honor
  the comment. But `Clock.update(rawDelta: number)` accepts a bare `number` with no unit marker —
  feeding it a raw ms delta (a one-character mistake) runs the clock 1000× fast, compiles clean,
  and produces plausible-looking animation until someone notices the timeline.
- **Proposed Branded Type**:
  `type Seconds = number & { readonly __brand: 'Seconds' }` and
  `type Milliseconds = number & { readonly __brand: 'Milliseconds' }`, plus explicit conversion
  functions `msToSeconds()` / `secondsToMs()`. `FrameCallback` becomes
  `(time: Seconds, delta: Seconds) => void`; `Clock.update(rawDelta: Seconds)`.
- **Impact**: Mixing time domains becomes a compile error — the highest-frequency bug class in
  frame-loop code, eliminated structurally rather than by convention.

### Finding 5 — Screen and world points share one bare vector type

- **File & Line**: `packages/glaze/src/core/Camera.ts:1-4` (`Point2D`); consumed at
  `Camera.ts:30` / `:37`, `CameraControls.ts:8-12`, `InputStore.ts:16-21`, `gestures.ts:17`
- **Current Code / Issue**:
  ```ts
  export interface Point2D { x: number; y: number; }
  ```
  `screenToWorld(screen: Point2D)` and `worldToScreen(world: Point2D)` are exact inverses;
  passing a world point to `screenToWorld` (or vice-versa) compiles and returns garbage with no
  error. Same conflation between *positions* and *deltas*: `InputStore.pointerDelta` (a delta)
  and `pointer` (a position) are both `Point2D`, and `PanGesture.onMove` feeds the delta straight
  into `panBy(dx, dy)` (`gestures.ts:55`) with nothing distinguishing the semantics.
- **Proposed Branded Type**:
  `ScreenPoint`, `WorldPoint`, `ScreenDelta`, `WorldDelta` — all nominal flavors over
  `{ x, y }`. Signatures become `screenToWorld(screen: ScreenPoint): WorldPoint` and
  `worldToScreen(world: WorldPoint): ScreenPoint`.
- **Impact**: Swapping frames of reference becomes a type error. This core has no
  normalized-direction math yet, but these four brands are the prerequisite vocabulary for any
  future normals/reflection work (e.g., a `NormalizedVec2` would derive from `WorldDelta`).

### Finding 6 — `clamp` helper is NaN-transparent and order-blind

- **File & Line**: `packages/glaze/src/core/Camera.ts:13-16`; relied on at
  `CameraControls.ts:25` with unvalidated `minZoom`/`maxZoom` params (`:20-21`)
- **Current Code / Issue**:
  ```ts
  export const clamp = (min: number, max: number) => (value: number): number =>
      Math.max(min, Math.min(max, value));
  ```
  Two holes: (a) `clamp(0, 64)(NaN)` → `NaN` — clamping does **not** sanitize NaN, so
  `zoomBy(NaN)` (`CameraControls.ts:57-58`) sets `camera.zoom = NaN` despite the clamp; (b)
  `createCameraControls(cam, 64, 0.05)` (swapped bounds) silently inverts semantics, and
  `minZoom: 0` reopens Finding 1's division-by-zero through the sanctioned path.
- **Proposed Branded Type**: A generic validated-range helper
  `bounded(min: PositiveNumber, max: PositiveNumber)` requiring `min < max` at creation,
  returning `(value: number) => BoundedValue<Min, Max>`; `createCameraControls` parameters typed
  `PositiveNumber` with the `min < max` relation checked in the factory.
- **Impact**: Removes both the NaN-propagation hole and the inverted-bounds hazard; the runtime
  check moves from “every clamp call, implicitly” to “one factory, explicitly”.

### Finding 7 — Wheel zoom speed accepts degenerate values

- **File & Line**: `packages/glaze/src/core/gestures.ts:5` (`DEFAULT_WHEEL_SPEED`), `:76`
  (constructor), `:81` (`Math.exp(-deltaY * speed)`)
- **Current Code / Issue**:
  ```ts
  this.#speed = options.speed ?? DEFAULT_WHEEL_SPEED;
  ```
  `speed: 0` → zoom permanently dead; negative speed → exp grows when it should shrink (inverted
  zoom axis); NaN → `Math.exp(NaN)` → NaN zoom fed to `zoomAt`. The implicit invariant is
  *“speed is strictly positive”*, and the magic constant `0.002` carries an unstated unit
  (“per wheel pixel”, see Finding 8).
- **Proposed Branded Type**: `type WheelSpeed = number & { readonly __brand: 'WheelSpeed' }`,
  positive & finite, created via `wheelSpeed(n)` factory; `ZoomOptions.speed?: WheelSpeed`.
- **Impact**: Degenerate configurations fail at gesture construction, not as mysterious
  mid-interaction dead/inverted zooms.

### Finding 8 — `wheelDelta` conflates DOM scroll units

- **File & Line**: `packages/glaze/src/core/InputStore.ts:151` (`this.wheelDelta += event.deltaY`),
  consumed at `gestures.ts:81`
- **Current Code / Issue**: `WheelEvent.deltaY` units depend on `event.deltaMode`
  (`DOM_DELTA_PIXEL` / `DOM_DELTA_LINE` / `DOM_DELTA_PAGE`). The store accumulates raw values, so
  on Firefox-with-lines settings `ZoomGesture`'s `exp(-deltaY * 0.002)` behaves ~100× stronger
  than on pixel-mode browsers. The normalization step simply doesn't exist.
- **Proposed Branded Type**: Normalize at ingestion to `type WheelPixelDelta = number & {...}`
  (pixels, applying the `deltaMode` multiplier at the single ingestion point in `#onWheel`);
  `wheelDelta: WheelPixelDelta`.
- **Impact**: Cross-browser zoom consistency becomes structural; the brand documents the unit at
  every consumption site.

### Finding 9 — Coordinate space (CSS px vs device px) is comment-only knowledge

- **File & Line**: `packages/glaze/src/core/InputStore.ts:14` (comment), `:100-106` and `:147-150`
  (`getBoundingClientRect` arithmetic)
- **Current Code / Issue**:
  ```ts
  /** `point` is canvas-relative, in CSS pixels. */
  ```
  Pointer positions are computed as `clientX - rect.left` (CSS px), but any consumer doing
  canvas backing-store math needs device px (`cssPx × devicePixelRatio`). Nothing in the types
  distinguishes the two spaces; a missing scale factor silently offsets hit-testing on HiDPI
  displays.
- **Proposed Branded Type**: `CssPoint` / `DevicePoint` (brands over `Point2D`), with explicit
  `toDevicePixels(ratio: DevicePixelRatio)` conversion. `InputHandlers` callbacks receive
  `CssPoint`.
- **Impact**: HiDPI scaling mistakes become compile errors; intent currently living in a JSDoc
  line migrates into signatures.

### Finding 10 — Frame delta can be `0` or negative; consumers self-guard

- **File & Line**: `packages/glaze/src/core/FrameLoop.ts:44` (`#tick(this.#lastTime)` — first tick),
  `:59` (`const delta = (now - lastTime) / 1000`)
- **Current Code / Issue**: The synchronous first tick passes the identical timestamp, so the
  first callback receives `delta === 0`; background-tab throttling or clock adjustments can yield
  negative deltas. Any consumer integrating velocity (`x += v * delta`) must invent its own
  `if (delta === 0) return` guard — none exists centrally.
- **Proposed Branded Type**: `type NonNegativeSeconds = Seconds & { ... }` produced by the loop
  (clamping negatives to `0` at the single production point), optionally `DeltaTimeSeconds` with a
  documented epsilon floor for integrators.
- **Impact**: Downstream physics/integration code can trust the delta's domain and drop local
  guards; the fix lives where the value is born instead of scattered across subscribers.

---

### Cross-Cutting Observation

Every runtime numeric guard found in `core/` follows the same shape: **validate-late,
use-early** — bad numbers enter through permissive constructors/factories
(`Camera`, `Clock`, `CameraControls`, `PanGesture`/`ZoomGesture` options) and are defended
against *at each consumption site* (Clock's triple duration check, clamp reliance). Inverting to
**validate-once-at-the-boundary** via branded factories (`zoomFactor()`, `seconds()`,
`durationSeconds()`, `wheelSpeed()`) collapses those guards while making illegal states
unrepresentable. Recommended sequencing for Pass 2: Findings 1→2→3→4 first (correctness class),
then 5 (API-wide signature change), then the rest.

---

## Section 2: Pass 2 — Dishonesty & Side-Effects Isolation

Audit of hidden global reads, argument mutations, and un-injected environment data in
`packages/glaze/src/core/`. **No code was changed.**

### Summary Table

| # | File | Dishonesty | Fix Strategy | Priority |
|---|------|-----------|--------------|----------|
| 1 | `FrameLoop.ts` | Hidden `performance.now()` + hardcoded RAF scheduler | Inject `now()` / `schedule()` | 🔴 High |
| 2 | `InputStore.ts` | Subscribers receive live mutable references | Pass frozen snapshots | 🔴 High |
| 3 | `CameraControls.ts` | Captured camera mutated in place by every method | Pure transforms → new `Camera` | 🔴 High |
| 4 | `InputStore.ts` | `getBoundingClientRect()` re-read per event | Inject/cache bounds | 🟠 Medium |
| 5 | `InputStore.ts` | Implicit `window` + DOM coupling throughout | Explicit adapter interface | 🟠 Medium |
| 6 | `gestures.ts` | `setPointerCapture` side effect inside state handler | Push to router/edge | 🟡 Low |
| 7 | `InputStore.ts` | `readonly` fields are shallow-false-immutability | Freeze or brand as live views | 🟡 Low |

**Positive findings** (honest code worth preserving as-is during refactor): `Clock.update(rawDelta)`
receives its delta explicitly — no hidden time read; `Camera.screenToWorld/worldToScreen` return
fresh objects; `clamp` is pure; `FrameLoop.#tick(now)` receives its timestamp as a parameter from
RAF (only `#start()` cheats, see Finding 1). No `Math.random()` or `Date.now()` anywhere in `core/`.

---

### Finding 1 — FrameLoop reads the global clock and hardcodes the scheduler

- **File & Line**: `packages/glaze/src/core/FrameLoop.ts:43` (`performance.now()`), `:64`
  (`requestAnimationFrame(this.#tick)`), `:51` (`cancelAnimationFrame`)
- **Current Code / Issue**: `#start()` silently reads the ambient clock:
  ```ts
  this.#lastTime = performance.now();
  ```
  and both globals (`performance`, `requestAnimationFrame`) are unreachable for substitution.
  Proof of cost: `FrameLoop.test.ts:11` is forced to `vi.stubGlobal('requestAnimationFrame', ...)`
  — the test suite already pays the indirection tax that dependency injection would remove.
  Ironically `#tick` itself is honest (receives `now` as a parameter); only startup cheats.
- **Fix Strategy**: Constructor-inject two capabilities with defaults:
  ```ts
  constructor(opts?: {
      now?: () => Milliseconds;                                  // default performance.now
      schedule?: (cb: (t: Milliseconds) => void) => () => void;   // default RAF wrapper
  })
  ```
  The injected `now` also becomes the natural place to apply the ms→s conversion from Pass 1
  Finding 4.
- **Impact**: Deterministic frame-loop tests without global stubbing; virtual-time simulation
  (advance 1000 frames instantly) for integration tests; SSR/node-safe (no implicit browser
  assumptions).

### Finding 2 — InputStore hands subscribers a live mutable reference it keeps mutating

- **File & Line**: `packages/glaze/src/core/InputStore.ts:113` (`this.pointer` passed to handlers),
  `:154` (`this.wheelPosition`), mutation source at `:102-106`
- **Current Code / Issue**:
  ```ts
  handlers[handlerName]?.(event, this.pointer);
  ```
  `pointer`, `pointerDelta`, and `wheelPosition` are the *same objects* mutated in place by
  `#updatePointer`. A subscriber that stores `point` (e.g., PanGesture remembering an anchor)
  holds an object that mutates under it on the next event — aliasing bugs that manifest as
  "the drag origin moved". The type system says `Point2D`, the runtime delivers a moving target.
- **Fix Strategy**: Emit frozen snapshots at the notification boundary:
  ```ts
  handlers[handlerName]?.(event, { ...this.pointer });   // or Object.freeze({...})
  ```
  Internal delta math can keep mutating private state; only the published view is copied.
- **Impact**: Gesture code can capture points safely; eliminates a whole class of
  order-dependent bugs; makes subscriber callbacks honest pure-ish functions of their inputs.

### Finding 3 — CameraControls mutates a captured external object in every method

- **File & Line**: `packages/glaze/src/core/CameraControls.ts:17` (doc admits it: “Mutates
  `camera` in place”), all methods `:27-69`; mutation via `Object.assign(camera, partial)` at `:68`
- **Current Code / Issue**:
  ```ts
  export function createCameraControls(camera: Camera, ...): CameraControls
  ```
  Every method silently writes through the closure-captured `camera`: `panTo`, `panBy`, `zoomAt`,
  `zoomTo`, `zoomBy`, `reset`, `update`. Callers see `controls.panTo(p)` return `void` while
  their `Camera` instance changes underneath them — invisible in diffs, untestable without
  inspecting shared state afterward, and incompatible with React-style state flow (where
  transforms should produce values). This compounds Pass 1 Finding 2: the one method that takes
  data (`update`) uses `Object.assign`, i.e. mutation *and* invariant bypass.
- **Fix Strategy**: Refactor to pure command functions:
  ```ts
  const panBy = (c: Camera, dx: number, dy: number): Camera => ({ ...c, x: c.x + dx, y: c.y + dy });
  const zoomAt = (c: Camera, focal: ScreenPoint, zoom: ZoomFactor): Camera => ({ ...c, ... });
  ```
  Keep a thin mutable facade at the edge (React adapter) if desired, but the `core/` layer exports
  `(Camera, input) => Camera` transforms. Bounds clamping applies before construction of the new
  object.
- **Impact**: Camera updates become diffable, time-travel-debuggable, and unit-testable with zero
  setup (`expect(panBy(cam, 5, 0)).toEqual({...})`); unlocks React Compiler-friendly state flow;
  the facade shrinks to a single write point instead of seven.

### Finding 4 — Canvas bounds re-read via forced layout on every pointer/wheel event

- **File & Line**: `packages/glaze/src/core/InputStore.ts:100` (`#updatePointer`),
  `:147` (`#onWheel`) — both call `target.getBoundingClientRect()`
- **Current Code / Issue**: The canvas bounds — an environmental input — are fetched implicitly
  inside event handlers on every event. Beyond being an un-injected hidden read, each call is a
  potential forced synchronous layout (reflow) in the hot input path, and the store cannot be
  unit-tested with synthetic geometry without a real DOM rect.
- **Fix Strategy**: Inject the bounds provider and/or cache with invalidation:
  ```ts
  attach(target: HTMLElement, bounds: () => Rect = () => target.getBoundingClientRect())
  ```
  with a `ResizeObserver`-driven cache so per-event reads become per-resize reads. Signature of
  `#updatePointer(event, rect)` becomes explicit.
- **Impact**: Removes repeated forced reflows from the input path; headless-testable coordinate
  math (feed any `Rect`); bounds become a named concept instead of an incidental DOM query.

### Finding 5 — InputStore binds ambient `window` and element events imperatively

- **File & Line**: `packages/glaze/src/core/InputStore.ts:74-81` (`addEventListener` × 8,
  including `window.addEventListener('keydown'/'keyup')` at `:80-81`), teardown mirrored at
  `:178-185`
- **Current Code / Issue**: `attach(target)` reaches out to the global `window` object directly —
  an undeclared dependency buried mid-method. Keyboard state therefore depends on which window
  happened to be ambient at attach time (fragile under iframes/popups/testing), and nothing in
  the type signature reveals that attaching a canvas also taps the global keyboard stream.
- **Fix Strategy**: Make the environment explicit:
  ```ts
  interface EventSource {
      on(target: HTMLElement, type: string, cb: EventListener, opts?): () => void;
      onWindow(type: string, cb: EventListener): () => void;
  }
  constructor(source: EventSource = domEventSource)
  ```
  The store keeps its behavior but all subscription flows through the injected source.
- **Impact**: Headless tests construct an `InputStore` over a fake event source (no jsdom);
  multi-window/iframe scenarios become configurable; the global footprint of the module is
  visible in its constructor.

### Finding 6 — PanGesture.onStart hides a DOM side effect behind a state toggle

- **File & Line**: `packages/glaze/src/core/gestures.ts:47-49` (`setPointerCapture`)
- **Current Code / Issue**:
  ```ts
  onStart = (event) => {
      if (!matchesButton(...)) return;
      this.active = true;
      (event.nativeEvent.currentTarget as HTMLElement | null)?.setPointerCapture(...);
  };
  ```
  What reads like "mark gesture active" also performs pointer capture — a DOM side effect with
  real behavioral consequences (steals subsequent events from other targets). The cast through
  `as HTMLElement | null` signals that the gesture layer knows too much about DOM specifics.
- **Fix Strategy**: Move capture responsibility up to `InputRouter` (or a dedicated edge
  helper) keyed off whether any gesture activated: `router` decides policy, gestures report
  intent (`handled: boolean` or an `activate()` request).
- **Impact**: Gestures become pure decision logic (trivially testable with plain objects);
  capture policy centralized and consistent across custom gestures replacing built-ins.

### Finding 7 — `readonly` fields expose shallow-immutability theater

- **File & Line**: `packages/glaze/src/core/InputStore.ts:29-32` (`readonly pointer`,
  `readonly pointerDelta`, `readonly wheelPosition`), `:39` (`readonly #lastPointer`)
- **Current Code / Issue**: `readonly pointer: Point2D` prevents reassigning the field but not
  `store.pointer.x = 42` by any consumer holding the store — combined with Finding 2, external
  code can corrupt internal state invisibly. The modifier suggests immutability the type does not
  deliver.
- **Fix Strategy**: Either publish `Readonly<Point2D>` views (with snapshot semantics from
  Finding 2), or keep fields fully private and expose accessor methods returning fresh objects.
  If a "live view" is kept for perf, name it honestly (`livePointerView`) and freeze the object.
- **Impact**: External mutation of core input state becomes impossible at compile time; the
  mutation boundary is exactly one file.

---

### Cross-Cutting Observation

The `core/` folder splits cleanly into two honesty tiers. **Pure computation**
(`Camera`, `clamp`, `Clock.update` given a delta) needs only the branded-type work from Pass 1.
**Environment adapters** (`FrameLoop`, `InputStore`) currently hide their dependencies —
clock, scheduler, window, layout — behind imperative methods. The fix pattern is uniform:
constructor-inject capability interfaces with DOM-backed defaults, so production code changes
zero call sites while tests swap fakes. Combined with Finding 3's shift to
`(state, input) => state` transforms, `core/` converges on a shape where everything below the
adapter seam is deterministic and everything above it is trivially mockable. Recommended
sequencing for Pass 3: Findings 1+5 together (one injection story for FrameLoop/InputStore),
then 2+7 (snapshot publication), then 3 (pure camera commands — largest API surface change).

---

## Section 3: Pass 3 — Lifecycle Guarantees & Abstraction Levels (SLAP)

Audit of temporal contracts, lifecycle ordering hazards, and mixed abstraction levels in
`packages/glaze/src/core/`. **No code was changed.**

### Summary Table

| # | File | Issue | Proposal | Priority |
|---|------|-------|----------|----------|
| 1 | `Clock.ts` | `update()` monolith: 4 time-wrapping strategies inlined in one method | Extract pure `advancePingPong/Looping/Once` | 🔴 High |
| 2 | `InputStore.ts` | `endFrame()` “call once per frame” contract is unenforceable | `FrameToken` proof parameter | 🔴 High |
| 3 | `gestures.ts` | `dispose()` mid-drag leaves gesture state dirty | Router-owned gesture reset on dispose | 🟠 Medium |
| 4 | `InputStore.ts` | Attached/Detached state defended by 3 runtime null checks | Typestate / `AttachedHandle` token | 🟠 Medium |
| 5 | `Clock.ts` | Invalid option combos silently accepted (`pingPong` w/o duration) | Discriminated union config | 🟠 Medium |
| 6 | `InputStore.ts` | `attach`/`#unbind`: 8 mirrored add/removeEventListener calls | Table-driven binding helper | 🟡 Low |
| 7 | `gestures.ts` | InputRouter: event→gesture fan-out loop duplicated ×5 | Extract single `dispatch()` helper | 🟡 Low |
| 8 | `FrameLoop.ts` | Schedule-before-dispatch ordering invariant undocumented | Named `#scheduleThenDispatch` step | 🟡 Low |

**Positive findings**: `matchesButton` (gestures.ts:96-100) is correctly extracted to its own
level; `#updatePointer` vs `#notifyPointer` (InputStore.ts:95-115) shows the right seam already
exists and just needs the same treatment applied elsewhere; `FrameLoop.#tick` is flat
(one statement per level); `Camera`, `clamp`, and all `CameraControls` methods are already
single-level.

---

### Finding 1 — `Clock.update()` is a four-strategy monolith spanning ~58 lines

- **File & Line**: `packages/glaze/src/core/Clock.ts:102-160`
- **Current Code / Issue**: One method mixes four distinct abstraction levels:
  1. Playback gating + bookkeeping (`:103-111`)
  2. Free-running clamp when duration absent (`:113-117`)
  3. Ping-pong reflection math with overflow/underflow juggling and inline direction flips
     (`:121-140`) — the deepest, most bug-prone arithmetic:
     ```ts
     if (t >= duration) {
         const overflow = t - duration;
         t = duration - overflow;
         this.#direction = -1;
         if (t < 0) t = 0;
     } else if (t <= 0) { ... }
     ```
  4. Modulo wrap for looping (`((t % duration) + duration) % duration`, `:144`) and one-shot
     stop-at-end (`:146-157`).
  Reading requires mentally switching between time-domain strategies mid-function; each branch
  interleaves low-level arithmetic with `this.#time`/`#direction`/`#isPlaying` mutation.
- **Proposed Refactoring**: Extract three pure helpers next to the class:
  ```ts
  advanceFree(time: Seconds, delta: Seconds): Seconds;
  advancePingPong(time: Seconds, delta: Seconds, duration: DurationSeconds, dir: 1 | -1): { time; dir };
  advanceLooping(time: Seconds, delta: Seconds, duration: DurationSeconds): Seconds;
  advanceOnce(time: Seconds, delta: Seconds, duration: DurationSeconds): { time; finished: boolean };
  ```
  `update()` shrinks to dispatch on a mode tag + applying results.
- **Impact**: Each strategy becomes independently unit-testable at the boundaries (huge deltas,
  exact-duration hits); ping-pong edge cases get their own test surface instead of sharing one;
  `update()` reads as orchestration only — textbook SLAP.

### Finding 2 — `endFrame()`'s once-per-frame contract is enforced by prose alone

- **File & Line**: `packages/glaze/src/core/InputStore.ts:65-69`
  ```ts
  /** Clears per-frame state; call once per frame. */
  endFrame(): void { this.#pressed.clear(); this.wheelDelta = 0; }
  ```
- **Current Code / Issue**: The doc comment carries a *temporal contract* the compiler knows
  nothing about. Forget the call → `wasKeyPressed` reports a perpetual press (edge detection
  dead), `wheelDelta` grows unboundedly. Call it twice → double-consumed input. Nothing connects
  `InputStore.endFrame()` to an actual frame — it's a convention between two modules that never
  reference each other. This is the clearest `ActiveFrameToken` candidate in `core/`.
- **Proposed Refactoring**: Issue a proof per tick from the frame loop:
  ```ts
  // FrameLoop hands subscribers an opaque token valid for one frame:
  type FrameToken = { readonly __frame: unique symbol };
  // consumers must surrender it:
  input.endFrame(token: FrameToken): void;
  ```
  Minimal variant if coupling is unwanted: rename to `consumeFrameState()` and have it return
  `{ pressedKeys, wheelDelta }` while clearing — making "consumption" explicit and idempotence
  observable.
- **Impact**: Missing/duplicate `endFrame` becomes impossible or immediately visible; the
  FrameLoop↔InputStore handshake becomes a typed protocol instead of a comment.

### Finding 3 — Disposing mid-gesture leaves gesture state dirty

- **File & Line**: `packages/glaze/src/core/gestures.ts:122-124` (`InputRouter.dispose`),
  interacting with `PanGesture.active` (`:36`, set at `:46`, cleared at `:59`)
- **Current Code / Issue**: If the router is disposed between `onStart` and `onEnd` (component
  unmount during a drag), no further events reach the gestures, so `PanGesture.active` stays
  `true`. The same `PanGesture` instance reused under a new router then pans on mere pointer
  movement (`onMove` only checks `this.active`, `:53`) — a phantom drag with no button held.
  Lifecycle ordering hazard: teardown assumes it never happens mid-interaction, but nothing
  demands that proof.
- **Proposed Refactoring**: `InputRouter.dispose()` iterates its gestures and calls a new optional
  lifecycle hook `gesture.onCancel?.()`, which built-in gestures implement as `active = false`.
  Alternatively fold into Pass 2 Finding 6's rework where activation state lives in the router,
  which naturally dies with it.
- **Impact**: Unmount-during-drag can't leak interaction state across router generations;
  gesture lifecycle becomes begin/end-paired by construction.

### Finding 4 — Attached/Detached state guarded by runtime null checks in three places

- **File & Line**: `packages/glaze/src/core/InputStore.ts:96-98` (`#updatePointer`),
  `:143-145` (`#onWheel`), `:174-176` (`#unbind`) — all `const target = this.#attached; if (!target) return;`
- **Current Code / Issue**: The store is a two-state machine (Detached ⇄ Attached) encoded as a
  nullable field checked defensively at every use. In practice events can't fire while detached
  (listeners are removed), so these guards defend a nearly-impossible path — yet the *real*
  hazard goes unguarded: calling `update()`/reading `pointer` before any `attach()` yields
  silently meaningless zeros. State-dependent behavior is invisible in the types.
- **Proposed Refactoring**: Typestate-lite via handle token:
  ```ts
  attach(target): AttachedHandle;   // opaque brand
  detach(handle: AttachedHandle): void;
  ```
  Or a discriminated union internally: `type StoreState = Detached | AttachedTo<HTMLElement>`,
  with pointer-math helpers requiring `AttachedTo`. Public read APIs either throw on detached or
  are typed to require the handle.
- **Impact**: Illegal sequences (detach twice, use-before-attach) become compile errors or
  explicit throws; the three null-checks disappear along with the ambiguity of what a detached
  store's coordinates even mean.

### Finding 5 — `ClockOptions` accepts silently-meaningless combinations

- **File & Line**: `packages/glaze/src/core/Clock.ts:19-25` (constructor derivation),
  `:21` (`loop = options.loop ?? options.duration !== undefined`), `:121` (pingPong only reached
  when duration exists)
- **Current Code / Issue**:
  ```ts
  new Clock({ pingPong: true })        // silently free-runs, pingPong ignored forever
  new Clock({ loop: true })            // loop flag stored but irrelevant without duration
  ```
  Cross-parameter coupling is hidden: `pingPong: true` without `duration` constructs fine and the
  flag is simply never consulted (`update()` reaches the ping-pong branch only inside the
  duration-defined path). Similarly `loop` defaults *derived from another option's presence* —
  an inference rule nobody can see at the call site.
- **Proposed Refactoring**: Split the config into a discriminated union aligned with runtime
  behavior (synergy with Pass 1 Finding 3):
  ```ts
  type ClockOptions =
      | { mode?: 'free' }
      | { mode: 'timed'; duration: DurationSeconds; loop?: boolean; pingPong?: boolean };
  ```
  `pingPong`/`loop` only exist where they take effect; the implicit default `loop = true` becomes
  an explicit choice.
- **Impact**: Impossible configurations rejected at construction; the constructor's hidden
  inference rule surfaces as documentation-by-types; `update()` dispatch keys off the same union
  (completes Finding 1's refactor).

### Finding 6 — `attach`/`#unbind` are mirror-image plumbing walls

- **File & Line**: `packages/glaze/src/core/InputStore.ts:71-82` (8× `addEventListener`) and
  `:173-187` (8× `removeEventListener`)
- **Current Code / Issue**: Sixteen near-identical DOM calls listing event names, handler refs,
  and one stray options object (`{ passive: false }`, `:78`). Adding one event means editing both
  lists in lockstep — a classic drift risk (miss one side and you leak listeners or drop events).
  Two levels interleave: *which events we care about* (policy) and *how to bind/unbind DOM
  events* (mechanism).
- **Proposed Refactoring**: Declare bindings as data, bind/unbind generically:
  ```ts
  const BINDINGS = [
      ['pointermove', '#onPointerMove'],
      ['wheel', '#onWheel', { passive: false }],
      ...
  ] as const;
  #bound: Array<() => void> = BINDINGS.map(([t, h, o]) => source.on(target, t, this[h], o));
  ```
  `#unbind` collapses to running the stored disposers (pairs naturally with Pass 2 Finding 5's
  `EventSource`).
- **Impact**: Single declaration site per event; adding/removing an event is a one-line change;
  listener-leak class eliminated by construction.

### Finding 7 — InputRouter repeats the fan-out loop five times

- **File & Line**: `packages/glaze/src/core/gestures.ts:145-149`, `:151-155`, `:157-161`,
  `:163-167`, `:169-173`
- **Current Code / Issue**: Five handlers with identical shape:
  ```ts
  #onStart = (nativeEvent, point) => {
      const event = this.#interaction(nativeEvent, point);
      for (const gesture of this.#options.gestures) gesture.onStart?.(event);
  };
  ```
  Only the hook name varies. The iteration-and-optional-call pattern (the router's entire job)
  is copy-pasted rather than named.
- **Proposed Refactoring**:
  ```ts
  #dispatch = <K extends keyof Gesture<TSurface>, E>(
      hook: K, nativeEvent: E, point?: Point2D
  ): void => {
      const event = this.#interaction(nativeEvent, point ?? this.#options.input.pointer);
      for (const g of this.#options.gestures) g[hook]?.(event);
  };
  ```
  Handlers reduce to one-liners (`#onStart = (e, p) => this.#dispatch('onStart', e, p)`).
- **Impact**: Gesture-dispatch semantics (ordering, error handling, future consume-protocol)
  live in exactly one place; new hooks cost one line.

### Finding 8 — FrameLoop's schedule-before-dispatch invariant is invisible

- **File & Line**: `packages/glaze/src/core/FrameLoop.ts:64-68`
  ```ts
  this.#rafId = requestAnimationFrame(this.#tick);   // scheduled FIRST...
  for (const cb of this.#callbacks) cb(time, delta);  // ...then callbacks run
  ```
- **Current Code / Issue**: Scheduling the next frame *before* dispatching callbacks is a
  deliberate survival guarantee — a throwing callback cannot kill the loop because the chain is
  already re-linked. But nothing marks this as load-bearing: a future refactor "cleaning up" the
  ordering (schedule after the loop, as most people would write it) silently introduces
  death-by-exception. Secondary subtlety: callbacks run over a live `Set`, so a callback that
  subscribes mid-frame gets invoked in the same pass, and one that unsubscribes another callback
  skips it — both undocumented behaviors.
- **Proposed Refactoring**: Make the invariant structural and named:
  ```ts
  #tick = (now: Milliseconds): void => {
      const batch = [...this.#callbacks];          // stable snapshot
      this.#schedule(this.#tick, now + ...);        // keep-alive first, commented as such
      for (const cb of batch) cb(...);
  };
  ```
  plus a one-line comment stating the ordering contract, and the injected `schedule` from Pass 2
  Finding 1 making the mechanism swappable/testable.
- **Impact**: Loop resilience survives refactors (the invariant is written down and shaped by
  code, not by accident); deterministic callback-set semantics per frame.

---

## Recommended Order of Refactoring for core/

Bottom-up: leaves first (no internal dependencies), adapters last (everything composes into
them). Cross-references point back to findings above.

1. **`core/types.ts` — Branded numeric vocabulary (new file)** *(Pass 1 F1, F3, F4)*
   `ZoomFactor`, `DurationSeconds`, `TimeSpeed`, `Seconds`, `Milliseconds`, `WheelSpeed` +
   validated factories. Everything downstream imports these; zero behavioral risk.

2. **`Camera.ts` — Pure math leaves** *(Pass 1 F5, F6)*
   Fix `clamp` (NaN/bounds), introduce `ScreenPoint`/`WorldPoint`/delta brands, add
   `createCamera` factory with `ZoomFactor` field (private constructor). Still dependency-free.

3. **`Clock.ts` — Config union + extracted advance strategies** *(Pass 3 F5, F1; Pass 1 F3)*
   Discriminated `ClockOptions`, pure `advanceFree/PingPong/Looping/Once` helpers, duration
   guards collapse. Depends only on layer 1 brands.

4. **`CameraControls.ts` — Pure command transforms** *(Pass 2 F3; Pass 1 F2)*
   `(Camera, input) => Camera` functions, validated `ZoomBounds`, patch interface replacing
   `Object.assign`. Depends on layers 1–2; thin mutable facade stays available at the edge.

5. **`gestures.ts` — Decision-only gestures + dispatch extraction** *(Pass 3 F7, F3; Pass 2 F6;
   Pass 1 F7)*
   `WheelSpeed` brand, `dispatch()` fan-out helper, capture policy moved to router, cancel-safe
   dispose. Depends on layers 1–2 (brands, points).

6. **`FrameLoop.ts` — Injected clock/scheduler** *(Pass 2 F1; Pass 1 F10; Pass 3 F8)*
   `now()`/`schedule()` injection, `NonNegativeSeconds` emission, named schedule-before-dispatch
   invariant, issues `FrameToken` per tick (feeds layer 7). First adapter; depends on layer 1.

7. **`InputStore.ts` — Environment made explicit** *(Pass 2 F4, F5, F2, F7; Pass 3 F4, F2, F6)*
   `EventSource` injection, cached bounds provider, snapshot publication, honest readonly views,
   `AttachedHandle` state, table-driven bindings, token-consuming `endFrame()`. Largest adapter;
   consumes `FrameToken` from layer 6.

8. **`InputRouter` (in `gestures.ts`) — Final composition** *(Pass 3 F3 closure)*
   Wire router dispose → gesture reset, own capture policy, sit atop the finished InputStore API.
   Highest position in the dependency graph; changed last so its surface stops moving.

Rationale: steps 1–3 are pure and unit-testable in isolation (no mocks); steps 4–5 introduce the
new value-oriented APIs; steps 6–7 swap environment seams with production defaults preserving
behavior; step 8 is pure wiring. Each layer compiles green before the next begins, and the
branded-type work lands first precisely because everything else wants the vocabulary.
