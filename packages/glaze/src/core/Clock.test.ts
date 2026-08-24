import { describe, expect, expectTypeOf, it } from 'vitest';

import {
    advanceFree,
    advanceLooping,
    advanceOnce,
    advancePingPong,
    createClock
} from './Clock';
import { createDurationSeconds, createNonNegativeSeconds, createSeconds, createTimeSpeed } from './types';

import type { Clock, ClockOptions } from './Clock';
import type { Seconds } from './types';

const second = (value: number) => createSeconds(value);

describe('advanceFree', () => {
    it('accumulates deltas', () => {
        expect(advanceFree(second(1), second(0.5))).toBe(1.5);
    });

    it('floors at zero instead of going negative', () => {
        expect(advanceFree(second(0.2), second(-1))).toBe(0);
    });
});

describe('advancePingPong', () => {
    it('keeps moving forward below the bound', () => {
        const { time, direction } = advancePingPong(second(0), second(0.4), createDurationSeconds(1), 1);

        expect(time).toBe(0.4);
        expect(direction).toBe(1);
    });

    it('reflects off the far bound and flips direction', () => {
        const { time, direction } = advancePingPong(second(0.8), second(0.4), createDurationSeconds(1), 1);

        expect(time).toBeCloseTo(0.8, 12);
        expect(direction).toBe(-1);
    });

    it('reflects off the near bound while travelling backwards', () => {
        const { time, direction } = advancePingPong(second(0.2), second(0.4), createDurationSeconds(1), -1);

        expect(time).toBeCloseTo(0.2, 12);
        expect(direction).toBe(1);
    });

    it('never escapes the bounds, even for huge deltas', () => {
        const { time } = advancePingPong(second(0), second(10), createDurationSeconds(1), 1);

        expect(time).toBe(0);
        expect(time).toBeGreaterThanOrEqual(0);
    });
});

describe('advanceLooping', () => {
    it('wraps forward past the bound', () => {
        expect(advanceLooping(second(0.8), second(0.7), createDurationSeconds(1))).toBeCloseTo(0.5, 12);
    });

    it('wraps backwards into the tail of the timeline', () => {
        expect(advanceLooping(second(0), second(-0.25), createDurationSeconds(1))).toBeCloseTo(0.75, 12);
    });
});

describe('advanceOnce', () => {
    it('stops exactly at the bound and reports completion', () => {
        const result = advanceOnce(second(0.9), second(0.5), createDurationSeconds(1));

        expect(result.time).toBe(1);
        expect(result.finished).toBe(true);
    });

    it('floors at zero without completing when driven backwards', () => {
        const result = advanceOnce(second(0.1), second(-1), createDurationSeconds(1));

        expect(result.time).toBe(0);
        expect(result.finished).toBe(false);
    });

    it('passes intermediate values through unfinished', () => {
        const result = advanceOnce(second(0.25), second(0.25), createDurationSeconds(1));

        expect(result.time).toBe(0.5);
        expect(result.finished).toBe(false);
    });
});

describe('clock config union', () => {
    it('rejects ping-pong without a duration at compile time', () => {
        // @ts-expect-error ping-pong only exists inside the timed variant
        const invalid: ClockOptions = { pingPong: true };

        expect(invalid).toBeDefined();
    });

    it('rejects invalid durations through the branded factory', () => {
        expect(() => createDurationSeconds(-5)).toThrow(
            'Glaze: duration must be strictly positive, received -5'
        );
    });

    it('accepts non-negative frame deltas in update', () => {
        expectTypeOf<Clock['update']>().parameter(0).toEqualTypeOf<Seconds>();

        const clock = createClock();

        expect(clock.update(createNonNegativeSeconds(0.25)).time).toBe(0.25);
    });
});

describe('clock behavior', () => {
    it('free-runs by default with no duration and zero progress', () => {
        const clock = createClock();

        clock.update(second(1)).update(second(2));

        expect(clock.time).toBe(3);
        expect(clock.duration).toBeUndefined();
        expect(clock.progress).toBe(0);
        expect(clock.loop).toBe(false);
        expect(clock.pingPong).toBe(false);
        expect(clock.isPlaying).toBe(true);
    });

    it('loops by default when timed', () => {
        const clock = createClock({
            mode: 'timed',
            duration: createDurationSeconds(1)
        });

        clock.update(second(1.5));

        expect(clock.loop).toBe(true);
        expect(clock.time).toBeCloseTo(0.5, 12);
        expect(clock.isPlaying).toBe(true);
    });

    it('stops playing once a one-shot reaches its end', () => {
        const clock = createClock({ mode: 'timed', duration: createDurationSeconds(1), loop: false });

        clock.update(second(0.6));
        clock.update(second(10));

        expect(clock.time).toBe(1);
        expect(clock.progress).toBe(1);
        expect(clock.isPlaying).toBe(false);
        expect(clock.deltaTime).toBeGreaterThan(0);
    });

    it('ping-pongs between both bounds', () => {
        const clock = createClock({
            mode: 'timed',
            duration: createDurationSeconds(1),
            loop: false,
            pingPong: true
        });

        const times = [0, 0.4, 0.4, 0.4, 0.4].map(() => clock.update(second(0.4)).time);

        expect(times[0]).toBeCloseTo(0.4, 12);
        expect(times[1]).toBeCloseTo(0.8, 12);
        expect(times[2]).toBeCloseTo(0.8, 12);
        expect(times[3]).toBeCloseTo(0.4, 12);
        expect(times[4]).toBeCloseTo(0, 12);
        expect(clock.isPlaying).toBe(true);
    });

    it('ignores deltas while paused and reports a zero deltaTime', () => {
        const clock = createClock();

        clock.update(second(1));
        clock.pause();
        clock.update(second(1));

        expect(clock.time).toBe(1);
        expect(clock.deltaTime).toBe(0);
    });

    it('does not start before play when autoStart is false', () => {
        const clock = createClock({ autoStart: false });

        clock.update(second(1));

        expect(clock.time).toBe(0);

        clock.play().update(second(1));

        expect(clock.time).toBe(1);
    });

    it('scales deltas by speed', () => {
        const clock = createClock();

        clock.setSpeed(createTimeSpeed(2));
        clock.update(second(1));

        expect(clock.deltaTime).toBe(2);
        expect(clock.time).toBe(2);
    });

    it('clamps seeks inside the timeline', () => {
        const timed = createClock({ mode: 'timed', duration: createDurationSeconds(1) });

        timed.seek(second(5));
        expect(timed.time).toBe(1);

        timed.seek(second(-5));
        expect(timed.time).toBe(0);

        const free = createClock();

        free.seek(second(-5));
        expect(free.time).toBe(0);
    });

    it('restarts from zero with direction reset', () => {
        const clock = createClock({ mode: 'timed', duration: createDurationSeconds(1), pingPong: true });

        clock.seek(second(1));
        clock.reset().update(second(0.25));

        expect(clock.time).toBe(0.25);
        expect(clock.progress).toBe(0.25);
    });
});
