Exactly. I think your last message identifies the real problem.

We were trying to design the _final architecture_ before understanding the simplest possible lifecycle.

Let's throw away the hooks for a moment.

## Start from the only thing `CpuCanvas` needs to do

The component's job is:

> **Take a React `<canvas>` and turn it into a `CpuSurface`.**

Everything else is secondary.

So let's imagine there are **no hooks whatsoever**.

```tsx
function CpuCanvas(props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 1. Create camera
    // 2. Create controls
    // 3. Create surface
    // 4. Configure surface
    // 5. Configure interactions
    // 6. Start/stop lifecycle

    return <canvas ref={canvasRef} />;
}
```

That is the path we should understand first.

---

# The important distinction: construction vs configuration

I think this is where the current design became tangled.

Your current `useCpuCanvas` is doing all of these things simultaneously:

```text
React lifecycle
     │
     ├── canvas ref
     │
     ├── camera ownership
     │
     ├── controls ownership
     │
     ├── surface construction
     │
     ├── draw callback
     │
     └── surface callback
```

And then `useCanvasActions` adds another lifecycle around the already-created surface:

```text
surface
   ↓
InputRouter
   ↓
gestures
```

That's why composition feels difficult.

There isn't one obvious path through the component.

---

# Let's make the path explicit

I would temporarily write the component as if it were a little imperative program:

```text
                    <CpuCanvas>
                         │
                         ▼
                   HTMLCanvasElement
                         │
                         ▼
                      Camera
                         │
                         ▼
                   CameraControls
                         │
                         ▼
                    CpuSurface
                         │
                         ▼
                    InputRouter
                         │
                         ▼
                      Gestures
```

And **that's the whole thing**.

No React abstractions in our mental model.

React is just responsible for making this program happen at the right time and cleaning it up.

---

# Step 1 — canvas

Start with:

```tsx
function CpuCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return <canvas ref={canvasRef} />;
}
```

Nothing else.

---

# Step 2 — camera

Then:

```tsx
const [camera, controls] = useCamera(initialCamera);
```

And now we have:

```text
canvas
camera
controls
```

These are three independent imperative objects.

That's already much clearer.

---

# Step 3 — surface

Then:

```tsx
const surface = createCpuSurface({
    canvas,
    camera,
    dpr
});
```

Now:

```text
canvas
   │
   ▼
CpuSurface
   │
   ├── camera
   └── input
```

And notice something important:

**`CpuSurface` already owns the relationship between canvas, camera and input.**

That means the React facade shouldn't invent another abstraction around those things.

---

# Step 4 — rendering

Then:

```tsx
surface.setDraw(onFrame);
```

That's it.

There is no reason for React to have a "draw hook".

The surface already has a draw lifecycle.

Your existing hook currently translates the React prop into that imperative API:

```ts
surface.setDraw(onFrame ? draw : null);
```

That's useful, but it doesn't need to become its own abstraction.

---

# Step 5 — interaction

Now we get to the interesting part.

We have:

```text
surface
camera
controls
```

Your interaction system needs:

```ts
new InputRouter({
    input: surface.input,
    controls,
    getSurface: () => surface,
    gestures: ...
});
```

And suddenly the architecture makes sense.

The router isn't a "canvas action".

It is:

> **An adapter between input and camera/surface behavior.**

Your existing `InputRouter` is already designed exactly this way.

So we shouldn't wrap it in another conceptual layer.

---

# Therefore the component lifecycle becomes

This is the thing I'd implement **before extracting anything**:

```tsx
useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
        return;
    }

    const [camera, controls] = createCamera(...);

    const surface = createCpuSurface({
        canvas,
        camera,
        ...
    });

    surface.setDraw(onFrame);

    const router = new InputRouter({
        input: surface.input,
        controls,
        getSurface: () => surface,
        gestures: createInteractionAdapter(interactions)
    });

    return () => {
        router.dispose();
        surface.destroy();
    };
}, []);
```

Obviously that's not yet correct React code because we haven't dealt with changing props.

**And that's precisely why I think this exercise is useful.**

We can now ask one question at a time.

---

# The first boundary question

Suppose we have:

```tsx
<CpuCanvas
    initialCamera={{ zoom: 2 }}
    onFrame={draw}
    interactions={{
        pan: true,
        zoom: true
    }}
/>
```

What happens after mount?

I would say:

### Construction

```text
initialCamera
      ↓
Camera
      ↓
CameraControls
      ↓
CpuSurface
      ↓
InputRouter
```

### Configuration

```text
onFrame
   ↓
surface.setDraw()

interactions
   ↓
createInteractionAdapter()
   ↓
InputRouter
```

### Cleanup

```text
InputRouter.dispose()
        ↓
CpuSurface.destroy()
```

That's it.

That's the **happy path**.

---

# And then we ask: which things can change?

This is where I think our previous design got ahead of itself.

Let's classify the props.

### Construction-time

Probably:

```ts
initialCamera;
dpr;
```

because your current `createCpuSurface` receives `camera` and `dpr` during construction.

### External imperative ownership

```ts
camera;
cameraControls;
```

These aren't configuration values.

They're objects.

### Runtime configuration

```ts
onFrame;
interactions;
```

These can naturally change.

### DOM configuration

```ts
className;
style;
```

React handles these.

This gives us a much more coherent model.

---

# And now the real question emerges

I think **this is the friction you were feeling**:

You currently have several levels of control mixed together:

```text
                  CpuCanvas
                     │
       ┌─────────────┼─────────────┐
       │             │             │
   declarative   imperative     imperative
      props        Camera        Surface
       │          Controls       InputRouter
       │
       └──────────────┬──────────────┘
                      │
                   React
```

The component doesn't know whether it is:

> configuring the library

or

> exposing the library.

That's the ambiguity.

---

# I would therefore make one strong rule

## The React component does not abstract the library.

It **composes the library**.

That is a subtle but important difference.

Instead of:

```text
React API
   ↓
React hook abstraction
   ↓
another React hook
   ↓
library
```

we want:

```text
React component
       ↓
library objects
       ↓
library API
```

The component is glue.

**Not architecture.**

---

# And this also answers your ref idea

The consumer can simply own the DOM canvas:

```tsx
const canvasRef = useRef<HTMLCanvasElement>(null);

<CpuCanvas ref={canvasRef} />;
```

But the consumer doesn't need a special `CanvasRef` abstraction.

The library itself remains accessible through its normal imperative API if they need deeper control.

That means:

```text
React user
   │
   ├── simple → <CpuCanvas />
   │
   └── advanced → Camera / Surface / InputRouter
```

rather than trying to make `<CpuCanvas>` expose every level of the library.

---

# So I agree: don't extract anything yet

I would actually **delete the hooks temporarily** and implement `CpuCanvas` in one file.

Not because one-file components are inherently better.

But because right now we need to discover the actual lifecycle.

Something like:

```tsx
export function CpuCanvas({
    ref,
    initialCamera,
    camera,
    cameraControls,
    onFrame,
    interactions,
    dpr,
    className,
    style
}: CpuCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        // 1. establish camera
        // 2. establish controls
        // 3. create surface
        // 4. configure draw
        // 5. configure interactions
        // 6. cleanup
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={style}
        />
    );
}
```

Then we solve the **actual lifecycle**, one problem at a time.

Only after that do we look at the code and ask:

> "Is there a piece here that is genuinely reusable?"

If yes, extract it.

If not, **leave it in the component**.

---

## And I think that's the right next step

Not `CpuCanvas + GpuCanvas + generic Canvas + lifecycle hook + interaction hook`.

Just:

**`CpuCanvas`, from top to bottom, imperatively.**

Once that feels obvious, we'll do the GPU version and see what actually deserves extraction between them.

That should get us back to the original goal: **simplification, not a cleaner-looking abstraction maze.**

I think the useful part of the discussion is **how we arrived at the conclusion**.

## 1. The starting problem

You started with a fairly clean, class-based graphics library.

The underlying library has its own concepts:

- `CpuSurface` / `GpuSurface`
- `Camera`
- `CameraControls`
- `InputRouter`
- `Gesture`
- `Program`
- etc.

Those abstractions are imperative and, importantly, **they already make sense independently of React**.

The problem appeared at the React boundary.

The React facade had accumulated several hooks:

- `useCpuCanvas`
- `useGpuCanvas`
- `useCamera`
- `useCanvasActions`

Each hook was individually reasonable, but together they created another architecture on top of the graphics library.

So instead of:

```text
React → graphics library
```

we were getting closer to:

```text
React
  ↓
React hooks
  ↓
React abstractions
  ↓
graphics library
```

And you started feeling that the facade was **abstracting away things that were already at the right abstraction level**.

---

# 2. The first insight: the canvas itself is the entry point

We identified that `CpuCanvas` / `GpuCanvas` should probably not try to become a second graphics API.

Their fundamental responsibility is simply:

> Take a React canvas and connect it to the graphics library.

That led to a much simpler mental model:

```text
<CpuCanvas>
      ↓
HTMLCanvasElement
      ↓
CpuSurface
```

Everything else should be composed around that.

The React component should be a **bridge**, not another architecture.

---

# 3. We identified that the ref should be ordinary React

You proposed an important simplification:

Instead of the facade inventing things like:

```text
canvasRef
CanvasRef
```

the consumer should simply be able to provide the normal React `ref`.

That reinforces the idea that the component is fundamentally just a canvas:

```text
<CpuCanvas ref={...} />
        ↓
     <canvas />
```

And the component should return **only the canvas**.

No wrapper.

No children.

No layout responsibilities.

Layout belongs to the consumer.

---

# 4. We then tried to design the "clean" architecture

This is where things started getting interesting.

We initially tried to turn the simplification into a more formal architecture:

- shared canvas lifecycle
- shared surface hook
- interaction hook
- CPU component
- GPU component
- camera hook
- interaction adapter
- etc.

It looked cleaner on paper.

But it started becoming **spaghetti again**.

We were essentially recreating the same problem at a different level.

Instead of removing abstraction, we were carefully designing a _better abstraction system_.

And that was the warning sign.

---

# 5. The loop we encountered

The loop was roughly:

```text
"The hooks are too complicated."
        ↓
"Let's extract the common lifecycle."
        ↓
"Now we need a shared canvas hook."
        ↓
"But interactions have their own lifecycle."
        ↓
"Let's make an interaction hook."
        ↓
"But camera ownership is different."
        ↓
"Let's make camera state explicit."
        ↓
"Now CPU and GPU need slightly different versions."
        ↓
"Let's make the shared abstraction generic."
        ↓
"Now the facade has many abstractions again."
```

So we were solving the wrong problem.

We were asking:

> **What is the best architecture for this React facade?**

when the more fundamental question was:

> **What does this component actually need to do?**

---

# 6. We then stepped back

This is where your last message was particularly important.

You suggested:

> Start by removing the hooks. Let the component build the surface and control everything imperatively, step by step.

I think that's the correct reset.

Instead of trying to design the final abstraction, we should first write down the **actual lifecycle**.

Something conceptually like:

```text
React mounts canvas
       ↓
get HTMLCanvasElement
       ↓
establish Camera
       ↓
establish CameraControls
       ↓
create CpuSurface
       ↓
configure drawing
       ↓
configure interactions
       ↓
run
       ↓
cleanup
```

That's the path.

No abstraction decisions yet.

---

# 7. This exposed the real architectural question

The important thing we discovered is that there are **different levels of control**:

```text
React
  │
  ├── canvas
  │
  └── props
        │
        ├── camera configuration
        ├── camera object
        ├── camera controls
        ├── surface
        └── input / gestures
```

Those aren't all the same kind of thing.

Some are:

### Configuration

For example:

```text
initialCamera
dpr
```

Some are:

### Imperative objects owned by the consumer

For example:

```text
camera
cameraControls
```

Some are:

### Runtime behavior

For example:

```text
onFrame
interactions
```

And some are:

### Internal library objects

For example:

```text
CpuSurface
InputRouter
Gesture
```

The friction came from trying to make all of those feel like ordinary React props.

---

# 8. The key insight about the boundary

The React facade should **not flatten all those levels into one abstraction**.

Instead:

> React should compose the existing imperative abstractions.

That's a much smaller responsibility.

So conceptually:

```text
                 React
                   │
             <CpuCanvas>
                   │
          ┌────────┴────────┐
          │                 │
       Camera          CpuSurface
          │                 │
    CameraControls      InputRouter
                            │
                         Gestures
```

The React component isn't responsible for redesigning these relationships.

It just establishes them.

---

# 9. Why the existing interaction system isn't necessarily the problem

We also clarified something important about `InputRouter` and `Gesture`.

Those abstractions actually make sense.

For example:

```text
mouse / touch / wheel
        ↓
    InputStore
        ↓
   InputRouter
        ↓
     Gesture
        ↓
 CameraControls
```

That's a legitimate library architecture.

The mistake would be to wrap all of that again in increasingly elaborate React abstractions.

And your observation about pan/zoom was useful here:

> If you enable zoom, you probably want pinch as well.

That suggests that `zoom` should be understood as a **camera interaction capability**, not a specific mouse-wheel implementation.

Again, that belongs naturally in the graphics/input library, rather than in the React facade.

---

# 10. We also reconsidered what should actually be public

The conclusion was that the React facade should probably expose very little:

```text
CpuCanvas
GpuCanvas
```

plus the necessary public types.

It should **not** expose a parallel React API for every internal concept.

For example, the consumer shouldn't have to understand:

```text
useCpuCanvas
useGpuCanvas
useCanvasActions
```

just to use the canvas.

The normal case should be extremely simple.

---

# 11. The important decision: don't extract yet

This is ultimately where we landed.

Rather than immediately creating:

```text
useCanvasSurface
useCanvasInteractions
useCamera
useWhatever
```

we should deliberately do the opposite.

### Start with one component.

For example:

```text
CpuCanvas.tsx
```

Inside it, temporarily do everything explicitly:

1. Get the canvas.
2. Create/obtain the camera.
3. Create/obtain the controls.
4. Create the surface.
5. Configure drawing.
6. Configure interactions.
7. Clean everything up.

No clever extraction.

No generic abstractions.

No attempt to make CPU and GPU share code yet.

---

# 12. Why this is a better starting point

Because once that imperative path is visible, we can distinguish between:

### Real duplication

Something genuinely shared between CPU and GPU.

→ **Extract it.**

### React lifecycle glue

Something that is only needed because React mounts/unmounts things.

→ Maybe extract it.

### Graphics-library concepts

Something that already has a good abstraction in the core library.

→ **Don't abstract it again.**

### Accidental complexity

Something that exists only because we were trying to make React APIs elegant.

→ **Delete it.**

That gives us an evidence-based architecture rather than an architecture designed in advance.

---

# 13. The React 19/compiler point

Your React 19 + compiler setup reinforces this direction.

We don't need to build a facade around concerns like memoization and stable callback identities just because "React components need hooks".

React's compiler can handle a lot of ordinary React optimization.

And `useEffectEvent` is available for the specific case where we genuinely need a stable event callback into an imperative system.

But neither should dictate the architecture.

The architecture should come from the graphics library first.

---

# 14. So the current plan is deliberately simple

We are **not** currently trying to decide:

> "What is the perfect React graphics architecture?"

We're asking:

> **"What is the smallest correct implementation of `CpuCanvas`?"**

Then:

> **"What is the smallest correct implementation of `GpuCanvas`?"**

And only after seeing both:

> **"What, if anything, do they actually have in common?"**

That reverses the direction we were taking.

Instead of:

```text
abstract → implement
```

we're doing:

```text
implement plainly
       ↓
understand lifecycle
       ↓
identify real duplication
       ↓
extract only what's justified
```

---

## The core principle we ended up with

I think this is the sentence worth keeping:

> **The React facade should compose the graphics library, not re-abstract it.**

And the practical rule follows:

> **Start with the imperative lifecycle in the component. Extract only after the lifecycle is clear.**

That gets us back to your original goal: **make the facade smaller, not merely make its complexity more elegantly distributed.**.
This process will also help use to refine the lib. Or even make big changes.
