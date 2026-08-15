/** `time` and `delta` are in seconds. */
export type FrameCallback = (time: number, delta: number) => void;

/** rAF dispatcher; starts on the first subscriber, stops when the last one leaves, so an idle surface never keeps ticking. */
export class FrameLoop {
    readonly #callbacks = new Set<FrameCallback>();
    #rafId = 0;
    #running = false;
    #lastTime = 0;

    get isRunning(): boolean {
        return this.#running;
    }

    get subscriberCount(): number {
        return this.#callbacks.size;
    }

    subscribe(cb: FrameCallback): () => void {
        this.#callbacks.add(cb);
        if (!this.#running) this.#start();
        return () => {
            this.#callbacks.delete(cb);
            if (this.#callbacks.size === 0) this.#stop();
        };
    }

    dispose(): void {
        this.#stop();
        this.#callbacks.clear();
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
        const time = now / 1000;
        this.#rafId = requestAnimationFrame(this.#tick);
        for (const cb of this.#callbacks) {
            cb(time, delta);
        }
    };
}

export function createFrameLoop(): FrameLoop {
    return new FrameLoop();
}
