import { createSeconds, createTimeSpeed } from './types';

import type { DurationSeconds, Seconds, TimeSpeed } from './types';

const DEFAULT_TIME_SPEED = createTimeSpeed(1);
const ZERO_SECONDS = createSeconds(0);

// ── Advance strategies ──
// Pure time-domain arithmetic: same inputs, same outputs, no clock state touched.

/** Free-running time: accumulates forever, floored at zero. */
export function advanceFree(time: Seconds, delta: Seconds): Seconds {
    return createSeconds(Math.max(0, time + delta));
}

/**
 * Reflects between the duration bounds like a ball between two walls; returns the flipped
 * direction so the caller can carry it into the next update.
 */
export function advancePingPong(
    time: Seconds,
    delta: Seconds,
    duration: DurationSeconds,
    direction: 1 | -1
): { time: Seconds; direction: 1 | -1 } {
    let t = time + delta * direction;
    let nextDirection = direction;

    if (t >= duration) {
        t = duration - (t - duration);
        nextDirection = -1;

        if (t < 0) t = 0;
    } else if (t <= 0) {
        t = -t;
        nextDirection = 1;

        if (t > duration) t = duration;
    }

    return { time: createSeconds(Math.max(0, Math.min(duration, t))), direction: nextDirection };
}

/** Wraps around the duration like a modulo timeline, in both directions. */
export function advanceLooping(time: Seconds, delta: Seconds, duration: DurationSeconds): Seconds {
    const t = time + delta;

    return createSeconds(((t % duration) + duration) % duration);
}

/** Plays toward the duration once and reports whether the end has been reached. */
export function advanceOnce(
    time: Seconds,
    delta: Seconds,
    duration: DurationSeconds
): { time: Seconds; finished: boolean } {
    const t = time + delta;

    if (t >= duration) return { time: createSeconds(duration), finished: true };

    if (t <= 0) return { time: ZERO_SECONDS, finished: false };

    return { time: createSeconds(t), finished: false };
}

// ── Config union ──

interface ClockRuntimeOptions {
    /** Multiplier applied to every delta; defaults to 1. */
    speed?: TimeSpeed;
    /** Whether the clock starts playing immediately; defaults to true. */
    autoStart?: boolean;
}

export type FreeClockOptions = ClockRuntimeOptions & { mode?: 'free' };

export type TimedClockOptions = ClockRuntimeOptions & {
    mode: 'timed';
    duration: DurationSeconds;
    /** Wraps back to the start after reaching the end; defaults to true. */
    loop?: boolean;
    /** Reflects at both ends instead of wrapping; takes precedence over `loop`. */
    pingPong?: boolean;
};

/** A clock is either free-running or timed — there is no duration-less ping-pong to ignore. */
export type ClockOptions = FreeClockOptions | TimedClockOptions;

/** Resolved config mirroring the options union, so `update()` dispatches on the same shape. */
type ClockState =
    | { kind: 'free' }
    | { kind: 'timed'; duration: DurationSeconds; loop: boolean; pingPong: boolean };

/**
 * Playback state driven by explicit seconds deltas (`update(delta)`); owns no clock of its own.
 * Options carry branded values only — build them through the `create*` factories in
 * `core/types`.
 */
export class Clock {
    #time: Seconds = ZERO_SECONDS;
    #deltaTime: Seconds = ZERO_SECONDS;
    #isPlaying: boolean;
    #speed: TimeSpeed;
    #state: ClockState;
    #direction: 1 | -1 = 1;

    constructor(options: ClockOptions = {}) {
        this.#speed = options.speed ?? DEFAULT_TIME_SPEED;
        this.#isPlaying = options.autoStart ?? true;
        this.#state =
            options.mode === 'timed'
                ? {
                      kind: 'timed',
                      duration: options.duration,
                      loop: options.loop ?? true,
                      pingPong: options.pingPong ?? false
                  }
                : { kind: 'free' };
    }

    get time(): Seconds {
        return this.#time;
    }

    get deltaTime(): Seconds {
        return this.#deltaTime;
    }

    get isPlaying(): boolean {
        return this.#isPlaying;
    }

    get speed(): TimeSpeed {
        return this.#speed;
    }

    get duration(): DurationSeconds | undefined {
        return this.#state.kind === 'timed' ? this.#state.duration : undefined;
    }

    get loop(): boolean {
        return this.#state.kind === 'timed' && this.#state.loop;
    }

    get pingPong(): boolean {
        return this.#state.kind === 'timed' && this.#state.pingPong;
    }

    get progress(): number {
        if (this.#state.kind !== 'timed') return 0;

        return Math.max(0, Math.min(1, this.#time / this.#state.duration));
    }

    play(): this {
        this.#isPlaying = true;

        return this;
    }

    pause(): this {
        this.#isPlaying = false;
        this.#deltaTime = ZERO_SECONDS;

        return this;
    }

    togglePlay(): this {
        return this.#isPlaying ? this.pause() : this.play();
    }

    reset(): this {
        this.#time = ZERO_SECONDS;
        this.#deltaTime = ZERO_SECONDS;
        this.#direction = 1;

        return this;
    }

    seek(time: Seconds): this {
        this.#time =
            this.#state.kind === 'timed'
                ? (Math.max(0, Math.min(this.#state.duration, time)) as Seconds)
                : (Math.max(0, time) as Seconds);
        this.#deltaTime = ZERO_SECONDS;

        return this;
    }

    setSpeed(speed: TimeSpeed): this {
        this.#speed = speed;

        return this;
    }

    update(delta: Seconds): this {
        if (!this.#isPlaying) {
            this.#deltaTime = ZERO_SECONDS;

            return this;
        }

        const scaledDelta = (delta * this.#speed) as Seconds;

        this.#deltaTime = scaledDelta;

        const state = this.#state;

        if (state.kind === 'free') {
            this.#time = advanceFree(this.#time, scaledDelta);
        } else if (state.pingPong) {
            const advanced = advancePingPong(this.#time, scaledDelta, state.duration, this.#direction);

            this.#time = advanced.time;
            this.#direction = advanced.direction;
        } else if (state.loop) {
            this.#time = advanceLooping(this.#time, scaledDelta, state.duration);
        } else {
            const advanced = advanceOnce(this.#time, scaledDelta, state.duration);

            this.#time = advanced.time;

            if (advanced.finished) this.#isPlaying = false;
        }

        return this;
    }
}

export function createClock(options?: ClockOptions): Clock {
    return new Clock(options);
}
