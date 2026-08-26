import { Accordion, AccordionItem } from '@repo/tlc/components/display';

import type { ReactNode } from 'react';

function Code({ children }: { children: ReactNode }) {
    return (
        <code className="rounded bg-surface-raised/50 px-1.5 py-0.5 font-mono text-[0.9em] text-warning">
            {children}
        </code>
    );
}

function CodeBlock({ label, children }: { label?: string; children: string }) {
    return (
        <div className="overflow-hidden rounded-lg border border-border bg-surface-raised/30">
            {label && (
                <div className="border-b border-border px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground-dim">
                    {label}
                </div>
            )}
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground">
                {children}
            </pre>
        </div>
    );
}

function ReportTable({ rows }: { rows: readonly (readonly string[])[] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse font-mono text-xs leading-relaxed">
                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={row[0] ?? String(index)}
                            className={index === 0 ? 'bg-surface-raised/40' : 'bg-transparent'}
                        >
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={`${row[0] ?? String(index)}-${String(cellIndex)}`}
                                    className={
                                        cellIndex === 0
                                            ? 'border-t border-border px-3 py-1.5 align-top text-warning'
                                            : 'border-t border-border px-3 py-1.5 align-top text-foreground-muted'
                                    }
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const CAST = [
    ['Actor', 'File', 'Owns', 'Plays in the lifecycle'],
    [
        'Surface',
        'cpu/CpuSurface.ts\ngpu/GpuSurface.ts',
        'canvas context, per-frame state (time, deltaTime, frameCount, width, height, dpr), the InputStore, the FrameLoop',
        'The runtime. Runs the rAF loop, applies the camera, executes your draw callback. Owns the input bus it attaches to the canvas.'
    ],
    [
        'Camera',
        'core/Camera.ts:23',
        'x, y, zoom — passive state, never mutates itself',
        'A pure coordinate grid. screenToWorld / worldToScreen are its only behavior; panning/zooming live in CameraControls.'
    ],
    [
        'CameraControls',
        'core/CameraControls.ts:26\n core/CameraControls.ts:92',
        'pure (camera, input) → camera transforms, plus a thin mutable facade over them',
        'The transforms return fresh cameras with every zoom clamped by one policy. The facade commits each result onto a captured camera — its single write point — and holds the reset() snapshot.'
    ],
    [
        'InputStore',
        'core/InputStore.ts:94',
        'DOM listeners via injected EventSource, AttachedHandle lifecycle, pointer/delta/wheel/key state, frozen snapshots, table-driven bindings, a subscriber set',
        'Raw signal capture. Injects all environment dependencies (EventSource, bounds), publishes frozen snapshots to subscribers, and clears transient state per frame via endFrame(token).'
    ],
    [
        'InputRouter',
        'core/gestures.ts:126',
        'a subscription into the InputStore, a live gesture array',
        'Wraps each raw signal into an InteractionEvent { nativeEvent, point, input, cameraControls, surface } and delivers it to every gesture.'
    ],
    [
        'Gestures',
        'core/gestures.ts:51\ncore/gestures.ts:90',
        'PanGesture, ZoomGesture, plus the React lifecycle gesture',
        'The pipeline steps. Each receives every event and either acts (mutation via cameraControls / surface) or ignores it.'
    ],
    [
        'FrameLoop',
        'core/FrameLoop.ts',
        'the requestAnimationFrame scheduler and the onFrame subscriber set',
        'Auto-starts on first subscriber, auto-stops on last. Produces time + delta per frame and fans each frame out to every callback.'
    ],
    [
        'React facade',
        'react/CpuCanvas.tsx\nreact/surfaceStack.ts\nreact/useNodeResource.ts',
        'a <canvas> ref, a live gesture array, and a reactive stack { camera, controls, surface, router }',
        'Mount orchestration. The pure assembly (surfaceStack) builds Camera → CameraControls → Surface → InputRouter; useNodeResource turns node attach/detach into create/dispose with the stack exposed as state; the Canvas bridges the gesture array live via gesturesRef.'
    ]
];

const PIPE =
    'mount (React)\n' +
    '  - <canvas ref={canvasRef}> stores the node     react/useNodeResource.ts\n' +
    '  - createCpuStack(canvas, options)              react/surfaceStack.ts   (pure assembly)\n' +
    '      +- Camera ---- CameraControls(bounds)      core/Camera, core/CameraControls\n' +
    '      +- CpuSurface (owns FrameLoop)              cpu/CpuSurface.ts\n' +
    '      |    `- InputStore.attach(canvas)          core/InputStore.ts   (DOM listeners bound)\n' +
    '      `- InputRouter.subscribe(input)            core/gestures.ts\n' +
    'stack lands as reactive state\n' +
    'effects (post-mount)\n' +
    '  - gesturesRef <- createInteractionAdapter()   pan + zoom gestures go live\n' +
    '  - surface.onFrame(fn) -> FrameLoop starts rAF\n' +
    'frame (every rAF)\n' +
    '  resize -> stamp time/delta/frameCount -> applyCamera -> onFrame callbacks -> input.endFrame()\n' +
    'input -> gesture\n' +
    '  DOM -> InputStore -> InputRouter -> InteractionEvent -> gestures -> cameraControls\n' +
    'unmount / detach\n' +
    '  effect cleanup: router.dispose() -> surface.destroy() -> rAF cancelled, listeners unbound';

export function LifecycleReport() {
    return (
        <Accordion>
            <AccordionItem title="01 · The cast">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    Everything the React facade does is orchestrate three imperative objects — a{' '}
                    <Code>Surface</Code>, a <Code>Camera</Code>, and an <Code>InputStore</Code> —
                    and stitch them together with an <Code>InputRouter</Code> and a set of{' '}
                    <Code>Gesture</Code>s. Ownership is strict and one-directional, which is why
                    teardown is exactly the reverse of mount: the surface owns its input bus and its
                    frame loop, the assembly owns the router, the resource hook owns creation and
                    disposal, and the gesture array is bridged live by ref. The camera is owned by
                    nobody but mutated by exactly one thing. Line numbers below refer to the current
                    source.
                </p>
                <ReportTable rows={CAST} />
            </AccordionItem>

            <AccordionItem title="02 · Mount — a <CpuCanvas> becomes a running demo">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    Seven steps, split between node attachment (stored as state, when the DOM node
                    exists) and effects (after paint). The trickiest ordering fact: DOM listeners
                    are bound at step 4, gestures only go live at step 6, and the rAF loop only
                    starts once a draw callback exists at step 7.
                </p>
                <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-foreground-muted">
                    <li>
                        React commits <Code>&lt;CpuCanvas&gt;</Code> and renders{' '}
                        <Code>{'<canvas ref={canvasRef}>'}</Code>.
                    </li>
                    <li>
                        The ref callback — <Code>setNode</Code> from <Code>useNodeResource</Code> —
                        stores the node as state. No surface exists yet; nothing has touched the
                        canvas beyond the DOM commit.
                    </li>
                    <li>
                        An effect sees the node and runs the pure assembly{' '}
                        <Code>createCpuStack</Code> <Code>surfaceStack.ts</Code>. It first builds
                        the camera chain: a <Code>Camera</Code> from <Code>initialCamera</Code> (or{' '}
                        <Code>options.camera</Code>), then <Code>createCameraControls</Code> wraps
                        it with min/max zoom bounds and an initial snapshot for <Code>reset()</Code>
                        .
                    </li>
                    <li>
                        Same assembly: <Code>{'createCpuSurface({ canvas, camera, dpr })'}</Code>.{' '}
                        The constructor<Code>CpuSurface.ts:38</Code> grabs the 2D context (throws if
                        unavailable), creates an <Code>InputStore</Code>, and calls{' '}
                        <Code>input.attach(this.canvas)</Code> — <Code>InputStore.ts:163</Code>{' '}
                        binds the pointer/wheel/context listeners on the canvas and key listeners on
                        the window via table-driven bindings, right here. It then resizes the canvas
                        once so one-shot draws made outside the loop survive.
                    </li>
                    <li>
                        Still in the assembly:{' '}
                        <Code>
                            {'new InputRouter({ input, cameraControls, getSurface, getGestures })'}
                        </Code>{' '}
                        <Code>gestures.ts:126</Code>. The router constructor subscribes to the
                        store&apos;s six handlers — pointerdown → <Code>onStart</Code>, pointermove
                        → <Code>onMove</Code>, pointerup/cancel → <Code>onEnd</Code>, wheel →{' '}
                        <Code>onZoom</Code>, contextmenu — <Code>gestures.ts:132</Code>. At this
                        point the store has listeners but nothing to feed: the gesture array is
                        still empty and no draw exists.
                    </li>
                    <li>
                        The assembled stack lands as reactive state, which re-runs the Canvas&apos;s
                        effects. The first one writes{' '}
                        <Code>
                            gesturesRef.current = createInteractionAdapter(canvasInteractions)
                        </Code>
                        . The default adapter returns <Code>[PanGesture, ZoomGesture]</Code>.
                        Gestures are now live — without any listener being re-bound.
                    </li>
                    <li>
                        A final effect calls <Code>onMount?.(surface)</Code> — exactly once per
                        surface instance — then subscribes its draw via{' '}
                        <Code>surface.onFrame(onFrame)</Code>. <Code>onFrame</Code>{' '}
                        <Code>CpuSurface.ts</Code> wraps the callback and hands it to the{' '}
                        <Code>FrameLoop</Code>, whose first subscriber starts the rAF clock{' '}
                        <Code>FrameLoop.ts</Code>. The demo is running.
                    </li>
                </ol>
                <CodeBlock label="one pipeline, end to end">{PIPE}</CodeBlock>
            </AccordionItem>

            <AccordionItem title="03 · The frame — what runs on every rAF tick">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    The <Code>FrameLoop</Code> owns the rAF stream: on each tick it converts
                    rAF&apos;s millisecond timestamp to seconds (<Code>time = rafTime / 1000</Code>)
                    and computes <Code>delta = time − lastTime</Code>, schedules the <em>next</em>{' '}
                    rAF, then hands both to the surface&apos;s frame step <Code>CpuSurface.ts</Code>
                    . That step is the callback:
                </p>
                <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-foreground-muted">
                    <li>
                        <Code>#resize()</Code> <Code>CpuSurface.ts:286</Code> — read{' '}
                        <Code>clientWidth/Height</Code>, scale by dpr, only touch{' '}
                        <Code>canvas.width/height</Code> when they actually changed. Zero cost on a
                        static canvas.
                    </li>
                    <li>
                        Stamp per-frame state onto the surface: <Code>frameCount</Code>,{' '}
                        <Code>time</Code>, <Code>deltaTime</Code>, <Code>width</Code>,{' '}
                        <Code>height</Code>. Your draw reads these directly.
                    </li>
                    <li>
                        <Code>applyCamera()</Code> <Code>CpuSurface.ts:95</Code> — reset the context
                        transform, then <Code>translate(x, y)</Code> → <Code>scale(zoom)</Code> →{' '}
                        <Code>scale(dpr)</Code>. A world point lands on screen at{' '}
                        <Code>(wx·zoom + x)·dpr</Code>, which is exactly what{' '}
                        <Code>Camera.worldToScreen</Code> / <Code>screenToWorld</Code> invert.
                    </li>
                    <li>
                        Fan out to every <Code>onFrame</Code> subscriber via the loop&apos;s{' '}
                        <Code>runFrameSubscribers()</Code>. The demo paints in world space; the
                        camera was applied for it.
                    </li>
                    <li>
                        <Code>input.endFrame(frameToken)</Code> <Code>InputStore.ts:156</Code> —
                        clear <Code>pressed</Code> keys and <Code>wheelDelta</Code>. Requires a{' '}
                        <Code>FrameToken</Code> proof from the frame loop; everything else (pointer
                        position, held keys, button state) persists across frames.
                    </li>
                </ol>
                <p className="text-sm leading-relaxed text-foreground-muted">
                    Note <Code>surface.pointer</Code> is a getter that runs{' '}
                    <Code>camera.screenToWorld(input.pointer)</Code> <Code>CpuSurface.ts:58</Code> —
                    it is always world space, at any zoom. That single line is why the GraphPaper
                    demo is just &quot;compute the visible world bounds with screenToWorld and draw
                    grid lines across them&quot;.
                </p>
            </AccordionItem>

            <AccordionItem title="04 · Input → gesture → camera, end to end">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    Trace one drag and one wheel tick. The pattern is identical every time: the{' '}
                    <Code>InputStore</Code> turns a native DOM event into CSS-px state, the{' '}
                    <Code>InputRouter</Code> wraps it in an <Code>InteractionEvent</Code>, and every
                    gesture in the live array gets a chance to act. Camera mutation is deferred — it
                    lands in the camera&apos;s x/y/zoom and is picked up by the next frame&apos;s{' '}
                    <Code>applyCamera</Code>.
                </p>
                <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-foreground-muted">
                    <li>
                        <strong>pointerdown</strong> — <Code>InputStore.#onPointerDown</Code>{' '}
                        <Code>InputStore.ts:224</Code> sets <Code>mouseDown</Code> /{' '}
                        <Code>mouseButtons</Code>, recomputes pointer + pointerDelta against the
                        canvas rect, and notifies subscribers with a frozen snapshot. The
                        router&apos;s <Code>#onStart</Code> <Code>gestures.ts:184</Code> builds the
                        event and iterates gestures: <Code>PanGesture.onStart</Code>{' '}
                        <Code>gestures.ts:51</Code> matches the button (default: any), sets{' '}
                        <Code>active = true</Code>, and claims the interaction by returning{' '}
                        <Code>true</Code>. The router owns capture policy: if any gesture claimed,
                        it calls <Code>setPointerCapture</Code> on the canvas so subsequent moves
                        keep firing even outside its box. If the demo supplies its own{' '}
                        <Code>onStart</Code>, the adapter replaced pan with it (section 05).
                    </li>
                    <li>
                        <strong>pointermove</strong> — <Code>InputStore.#onPointerMove</Code>{' '}
                        <Code>InputStore.ts:219</Code> recomputes <Code>pointerDelta</Code> (this
                        move minus last frame&apos;s pointer) and notifies with a frozen snapshot.
                        The router&apos;s <Code>#onMove</Code> delivers to{' '}
                        <Code>PanGesture.onMove</Code> <Code>gestures.ts:59</Code>: if active,{' '}
                        <Code>cameraControls.panBy(pointerDelta.x, pointerDelta.y)</Code> — just{' '}
                        <Code>camera.x += dx</Code>. Your draw code never sees this; next
                        frame&apos;s camera transform is simply elsewhere.
                    </li>
                    <li>
                        <strong>pointerup / pointercancel</strong> — <Code>InputStore</Code> clears{' '}
                        <Code>mouseDown</Code> and the router calls <Code>onEnd</Code>, so{' '}
                        <Code>PanGesture.onEnd</Code> flips <Code>active = false</Code>. Custom{' '}
                        <Code>onEnd</Code> handlers run alongside the built-ins, so captured state
                        is always released. If the router itself dies mid-drag,{' '}
                        <Code>dispose()</Code> unsubscribes first, then calls every gesture&apos;s{' '}
                        <Code>onCancel</Code> — same reset, so no phantom drag survives teardown.
                    </li>
                    <li>
                        <strong>wheel</strong> — bound <Code>passive: false</Code>{' '}
                        <Code>InputStore.ts:121</Code> so the gesture may{' '}
                        <Code>preventDefault()</Code> page scroll. <Code>#onWheel</Code>{' '}
                        <Code>InputStore.ts:244</Code> records <Code>wheelPosition</Code> and
                        accumulates <Code>wheelDelta</Code>, then notifies.{' '}
                        <Code>ZoomGesture.onZoom</Code> <Code>gestures.ts:91</Code> calls{' '}
                        <Code>cameraControls.zoomBy(Math.exp(−deltaY·speed), point)</Code>.
                    </li>
                    <li>
                        <strong>zoom-at-cursor</strong> — <Code>zoomBy</Code> delegates to{' '}
                        <Code>zoomAt(focal, zoom·factor)</Code> <Code>CameraControls.ts:39</Code>:
                        clamp the new zoom, read the world point under the cursor, then set{' '}
                        <Code>camera.x = focal.x − world.x·next</Code> and{' '}
                        <Code>camera.y = focal.y − world.y·next</Code>. Because the projection is{' '}
                        <Code>screen = world·zoom + pan</Code>, placing{' '}
                        <Code>pan = focal − world·next</Code> pins that world point exactly under
                        the cursor — the canvas zooms toward the mouse and the focal world point
                        never slips.
                    </li>
                </ol>
                <CodeBlock label="the gesture pipeline — every event fans out to every gesture">
                    {
                        'DOM event\n  - InputStore   normalize to CSS px (pointer, pointerDelta, wheelPosition)\n  - InputRouter  wrap: InteractionEvent { nativeEvent, point, input, cameraControls, surface }\n  - gestures     each receives it; PanGesture pans, ZoomGesture zooms, lifecycle handlers run\n  - next frame   applyCamera() renders the camera you just moved'
                    }
                </CodeBlock>
            </AccordionItem>

            <AccordionItem title="05 · The React bridge — gestures you can swap without touching the DOM">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    The <Code>InputRouter</Code> calls <Code>options.getGestures()</Code> at event
                    time, not at construction. The assembly exploits this with a closure: the router
                    is handed <Code>{'getGestures: () => gesturesRef.current'}</Code>{' '}
                    <Code>surfaceStack.ts</Code>, so changing the <Code>canvasInteractions</Code>{' '}
                    prop just rewrites <Code>gesturesRef.current</Code> in an effect — a new array,
                    the same six DOM listeners, zero re-binding. That is the &quot;Dynamic
                    Interaction Bridge&quot; the README advertises.
                </p>
                <p className="text-sm leading-relaxed text-foreground-muted">
                    <Code>createInteractionAdapter</Code> <Code>interactions.ts:56</Code> turns the
                    declarative <Code>CanvasInteractions</Code> config into a <Code>Gesture[]</Code>{' '}
                    with deliberate replace-vs-alongside semantics:
                </p>
                <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-foreground-muted">
                    <li>
                        An optional lifecycle gesture (holding any of <Code>onStart</Code> /{' '}
                        <Code>onMove</Code> / <Code>onEnd</Code> / <Code>onZoom</Code> /{' '}
                        <Code>onContextMenu</Code>) runs first.
                    </li>
                    <li>
                        Providing <Code>onStart</Code> or <Code>onMove</Code> suppresses the
                        built-in pan — you own the whole drag cycle and drive the camera yourself
                        via <Code>event.cameraControls</Code>. Providing <Code>onZoom</Code>{' '}
                        suppresses the built-in zoom.
                    </li>
                    <li>
                        <Code>onEnd</Code> and <Code>onContextMenu</Code> run <em>alongside</em> the
                        built-ins, so captured state like an active drag always releases.
                    </li>
                    <li>
                        <Code>pan: false</Code> / <Code>zoom: false</Code> turn a built-in off;{' '}
                        <Code>{'pan: { button: 2 }'}</Code> configures it (middle-drag pan);{' '}
                        <Code>pan: true</Code> or omitting it keeps the default.
                    </li>
                    <li>
                        Consumer handlers receive a <Code>LiveInteractionEvent</Code>{' '}
                        <Code>interactions.ts:9</Code> whose <Code>surface</Code> is always present
                        — the pipeline only routes while a surface is mounted, and{' '}
                        <Code>withSurface</Code> <Code>interactions.ts:43</Code> narrows the type.
                    </li>
                </ul>
            </AccordionItem>

            <AccordionItem title="06 · The GPU surface — same lifecycle, different innards">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    <Code>GpuSurface</Code> mirrors the whole skeleton: its own InputStore bound to
                    the canvas, its own <Code>FrameLoop</Code>, the same <Code>onFrame</Code> /{' '}
                    <Code>destroy</Code> contract, and a <Code>#frameStep</Code> of the same shape.
                    The deltas are all inside the draw path:
                </p>
                <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-foreground-muted">
                    <li>
                        Constructor <Code>GpuSurface.ts:54</Code> additionally creates a WebGL2
                        context, a <Code>ShapeBatcher</Code> (shapes are tessellated into one
                        dynamic vertex buffer — <Code>VERTEX_STRIDE 6</Code> for x, y, rgba),
                        configures GL state (blend on, depth off), and subscribes to{' '}
                        <Code>webglcontextlost/restored</Code>.
                    </li>
                    <li>
                        Shape calls don&apos;t paint — they append vertices to the batch.{' '}
                        <Code>clear()</Code> and <Code>renderProgram</Code> flush it into a single
                        draw call <Code>GpuSurface.ts:314</Code>. <Code>text</Code> flushes, then
                        draws through a lazily-built <Code>TextRasterizer</Code> + text program{' '}
                        <Code>GpuSurface.ts:279</Code>.
                    </li>
                    <li>
                        <Code>renderProgram</Code> applies the standard uniforms each pass{' '}
                        <Code>setUniforms.ts:84</Code>: <Code>u_resolution</Code> (device px),{' '}
                        <Code>u_aspect</Code>, <Code>u_mouse</Code> (pointer normalized + y-flipped
                        to UV), <Code>u_camera</Code> (x, y, zoom), <Code>u_dpr</Code>,{' '}
                        <Code>u_time</Code> — then draws the fullscreen triangle.
                    </li>
                    <li>
                        <Code>#frameStep</Code> <Code>GpuSurface.ts</Code>: resize → stamp state →
                        tick the onFrame subscribers → <Code>#flushBatch()</Code> →{' '}
                        <Code>input.endFrame()</Code>. One batched draw call per frame regardless of
                        how many shapes you issued.
                    </li>
                    <li>
                        Context loss is absorbed: a <Code>#lost</Code> flag makes every GL entry
                        point a no-op; on restore the surface reconfigures state, resizes, clears
                        the text cache, and reinitializes batch buffers and every registered program{' '}
                        <Code>GpuSurface.ts:332</Code>.
                    </li>
                </ul>
            </AccordionItem>

            <AccordionItem title="07 · Unmount — teardown is the reverse of mount">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    When React detaches or unmounts the canvas, the ownership effect&apos;s cleanup
                    runs <Code>useNodeResource.ts</Code> and walks the ownership chain down:
                </p>
                <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-foreground-muted">
                    <li>
                        <Code>inputRouter.dispose()</Code> — unsubscribes the router from the{' '}
                        <Code>InputStore</Code> <Code>gestures.ts:142</Code>.
                    </li>
                    <li>
                        <Code>surface.destroy()</Code> <Code>CpuSurface.ts</Code> —{' '}
                        <Code>#loop.dispose()</Code> stops the rAF loop, cancels the pending frame
                        and clears the subscriber set. Then <Code>input.destroy()</Code> (unbind
                        every DOM listener, clear key/state, <Code>InputStore.ts:189</Code>).
                    </li>
                    <li>
                        The GPU surface additionally removes the context-loss listeners and destroys
                        every program, the batch, and the text rasterizer <Code>GpuSurface.ts</Code>
                        .
                    </li>
                </ol>
                <p className="text-sm leading-relaxed text-foreground-muted">
                    Nothing survives: no listeners on the canvas or window, no scheduled rAF, no GL
                    resources. This is also why React 19 StrictMode (which double-mounts in dev) is
                    safe here — the unmount pass runs the teardown path in step 2 of section 02, and
                    the second mount rebuilds from scratch.
                </p>
            </AccordionItem>

            <AccordionItem title="08 · Suggested reading order">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    The modules build bottom-up; read them in the order the runtime runs:
                </p>
                <CodeBlock>
                    {'core/FrameLoop.ts the rAF heartbeat + onFrame fan-out\n' +
                        'core/Camera.ts          passive coordinate grid\n' +
                        'core/InputStore.ts      raw signal capture\n' +
                        'core/CameraControls.ts  pure camera transforms + a thin mutable facade\n' +
                        'core/gestures.ts        InputRouter + PanGesture + ZoomGesture\n' +
                        'cpu/CpuSurface.ts       the CPU runtime (spine of this report)\n' +
                        'gpu/GpuSurface.ts       the GPU twin + batching\n' +
                        'react/surfaceStack.ts   pure assembly: options -> Camera/Controls/Surface/Router\n' +
                        'react/useNodeResource.ts node attach -> reactive resource lifecycle\n' +
                        'react/CpuCanvas.tsx     effects: gestures + onFrame\n' +
                        'react/interactions.ts   CanvasInteractions -> Gesture[] adapter\n' +
                        'docs/GlazeDocs.tsx      this page'}
                </CodeBlock>
            </AccordionItem>
        </Accordion>
    );
}
