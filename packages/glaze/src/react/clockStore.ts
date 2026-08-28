import { createObservable } from './observable';
import type { ClockStore } from './types';
import type { Clock } from '../core/Clock';
import type { Seconds, DurationSeconds, TimeSpeed } from '../core/types';

export function createClockStore(clock: Clock): ClockStore {
    const observable = createObservable();

    return {
        clock,
        get time(): Seconds {
            return clock.time;
        },
        get deltaTime(): Seconds {
            return clock.deltaTime;
        },
        get duration(): DurationSeconds | undefined {
            return clock.duration;
        },
        get progress(): number {
            return clock.progress;
        },
        // ── Actions ──
        togglePlay() {
            clock.togglePlay();
            observable.notify();
        },
        play() {
            clock.play();
            observable.notify();
        },
        pause() {
            clock.pause();
            observable.notify();
        },
        reset() {
            clock.reset();
            observable.notify();
        },
        setSpeed(speed: TimeSpeed) {
            clock.setSpeed(speed);
            observable.notify();
        },
        subscribe: (fn: () => void) => observable.subscribe(fn),
        getSnapshot: () => clock.time,
        getIsPlaying: () => clock.isPlaying
    };
}
