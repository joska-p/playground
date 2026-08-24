import { createObservable } from './observable';

import type { Clock } from '../core/Clock';
import type { TimeSpeed } from '../core/types';

export function createClockStore(clock: Clock) {
    const observable = createObservable();

    return {
        clock,
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
        setSpeed(speed: TimeSpeed) {
            clock.setSpeed(speed);
            observable.notify();
        },
        subscribe: (fn: () => void) => observable.subscribe(fn),
        getIsPlaying: () => clock.isPlaying
    };
}
export type ClockStore = ReturnType<typeof createClockStore>;
