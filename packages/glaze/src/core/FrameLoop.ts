import { createMilliseconds, createNonNegativeSeconds, createSeconds, msToSeconds } from './types';

import type { Milliseconds, NonNegativeSeconds, Seconds } from './types';

declare const frameTokenBrand: unique symbol;

/** Proof that a frame is actively being dispatched; issued fresh by the loop on every tick. */
export interface FrameToken {
    readonly [frameTokenBrand]: true;
}

/** The owner's frame step: stamped state, then the loop fans out to subscribers. */
export type FrameStep = (time: Seconds, delta: NonNegativeSeconds, frame: FrameToken) => void;

/** One subscriber of the frame fan-out, invoked by the owner's step via `runFrameSubscribers`. */
export type FrameSubscriber = () => void;

/** Environment capabilities of the heartbeat; defaults bind it to the browser's rAF clock. */
export interface FrameLoopOptions {
    /** Reads the wall clock in milliseconds; defaults to `performance.now()`. */
    now?: () => Milliseconds;
    /** Schedules the next tick and returns its canceller; defaults to `requestAnimationFrame`. */
    schedule?: (callback: (time: Milliseconds) => void) => () => void;
}

const defaultNow = (): Milliseconds => createMilliseconds(performance.now());

const defaultSchedule = (callback: (time: Milliseconds) => void): (() => void) => {
    const rafId = requestAnimationFrame((time) => {
        callback(createMilliseconds(time));
    });

    return () => {
        cancelAnimationFrame(rafId);
    };
};

const issueFrameToken = (): FrameToken => ({}) as FrameToken;

/**
 * The heartbeat: reads the injected `now`, converts to seconds, and hands time + a non-negative
 * delta + a fresh `FrameToken` to the owner's frame step, which fans out to subscribers via
 * `runFrameSubscribers`. Starts on the first subscriber, stops when the last one leaves, so an idle
 * surface never keeps ticking.
 */
export class FrameLoop {
    readonly #step: FrameStep;
    readonly #now: () => Milliseconds;
    readonly #schedule: (callback: (time: Milliseconds) => void) => () => void;
    readonly #subscribers = new Set<FrameSubscriber>();
    #cancelScheduled: (() => void) | null = null;
    #running = false;
    #lastTime: Seconds = createSeconds(0);

    constructor(step: FrameStep, options: FrameLoopOptions = {}) {
        this.#step = step;
        this.#now = options.now ?? defaultNow;
        this.#schedule = options.schedule ?? defaultSchedule;
    }

    get isRunning(): boolean {
        return this.#running;
    }

    subscribe(callback: FrameSubscriber): () => void {
        this.#subscribers.add(callback);
        this.#start();

        return () => {
            this.#subscribers.delete(callback);

            if (this.#subscribers.size === 0) this.#stop();
        };
    }

    /**
     * Runs every subscriber once over a snapshot taken at entry: subscribing mid-frame joins at the
     * next frame, unsubscribing skips at the next frame — never mid-pass.
     */
    runFrameSubscribers(): void {
        for (const callback of [...this.#subscribers]) callback();
    }

    dispose(): void {
        this.#stop();
        this.#subscribers.clear();
    }

    #start(): void {
        if (this.#running) return;

        this.#running = true;
        const startMs = this.#now();

        this.#lastTime = msToSeconds(startMs);
        this.#tick(startMs);
    }

    #stop(): void {
        this.#running = false;
        this.#cancelScheduled?.();
        this.#cancelScheduled = null;
    }

    /**
     * Schedule-before-dispatch: the next frame is re-linked before any callback runs, so a throwing
     * callback can never kill the animation chain.
     */

    #tick = (rafTime: Milliseconds): void => {
        if (!this.#running) return;

        // The scheduler provides milliseconds; every value past this line is seconds.
        const time = msToSeconds(rafTime);

        // Clock jumps and the synchronous first tick yield non-positive gaps; delta floors at 0.
        const delta = createNonNegativeSeconds(Math.max(time - this.#lastTime, 0));

        this.#lastTime = time;

        // Keep-alive first (schedule-before-dispatch): the chain is re-linked before any callback
        // runs, so a throwing callback can never kill the loop.
        this.#cancelScheduled = this.#schedule(this.#tick);

        this.#step(time, delta, issueFrameToken());
    };
}
