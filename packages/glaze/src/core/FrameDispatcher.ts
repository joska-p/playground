/** The owner's frame step: stamped state, then the dispatcher fans out to subscribers. */
export type FrameStep = (time: number, delta: number) => void;

/** Per-frame callback; state lives on the surface that owns the dispatcher, not in the arguments. */
export type FrameHandler = () => void;

/**
 * The rAF heartbeat: computes `time` + `delta` per frame, hands them to the owner's frame step,
 * then fans out to subscribers. Starts on the first subscriber, stops when the last one leaves, so
 * an idle surface never keeps ticking.
 */
export class FrameDispatcher {
    readonly #step: FrameStep;
    readonly #subscribers = new Set<FrameHandler>();
    #rafId = 0;
    #running = false;
    #lastTime = 0;

    constructor(step: FrameStep) {
        this.#step = step;
    }

    get isRunning(): boolean {
        return this.#running;
    }

    subscribe(callback: FrameHandler): () => void {
        this.#subscribers.add(callback);
        this.#start();

        return () => {
            this.#subscribers.delete(callback);

            if (this.#subscribers.size === 0) this.#stop();
        };
    }

    /** Runs every subscriber once; the owning surface's frame step decides when. */
    tick(): void {
        for (const callback of this.#subscribers) callback();
    }

    dispose(): void {
        this.#stop();
        this.#subscribers.clear();
    }

    #start(): void {
        if (this.#running) return;

        this.#running = true;
        this.#lastTime = performance.now();
        this.#tick(this.#lastTime);
    }

    #stop(): void {
        this.#running = false;

        if (this.#rafId) {
            cancelAnimationFrame(this.#rafId);
            this.#rafId = 0;
        }
    }

    #tick = (now: number): void => {
        if (!this.#running) return;

        const delta = (now - this.#lastTime) / 1000;

        this.#lastTime = now;

        // Schedule the next frame before dispatching, so a throwing callback can't kill the loop.
        this.#rafId = requestAnimationFrame(this.#tick);

        this.#step(now / 1000, delta);
    };
}
