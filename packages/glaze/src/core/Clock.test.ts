import { describe, expect, it } from 'vitest';

import { Clock, createClock } from './Clock';

describe('Clock', () => {
    it('initializes with default values', () => {
        const clock = new Clock();

        expect(clock.time).toBe(0);
        expect(clock.isPlaying).toBe(true);
        expect(clock.speed).toBe(1);
        expect(clock.loop).toBe(false);
        expect(clock.pingPong).toBe(false);
    });

    it('createClock is a thin new Clock() wrapper', () => {
        expect(createClock()).toBeInstanceOf(Clock);
    });

    it('advances time when updated', () => {
        const clock = new Clock();

        clock.update(0.5);
        expect(clock.time).toBe(0.5);
        expect(clock.deltaTime).toBe(0.5);
    });

    it('does not advance time when paused', () => {
        const clock = new Clock();

        clock.pause();
        clock.update(0.5);
        expect(clock.time).toBe(0);
        expect(clock.deltaTime).toBe(0);
        expect(clock.isPlaying).toBe(false);
    });

    it('handles play, pause, toggle', () => {
        const clock = new Clock();

        clock.pause();
        expect(clock.isPlaying).toBe(false);
        clock.togglePlay();
        expect(clock.isPlaying).toBe(true);
        clock.togglePlay();
        expect(clock.isPlaying).toBe(false);
    });

    it('respects speed multiplier', () => {
        const clock = new Clock({ speed: 2 });

        clock.update(1);
        expect(clock.time).toBe(2);
        expect(clock.deltaTime).toBe(2);

        clock.setSpeed(0.5);
        clock.update(1);
        expect(clock.time).toBe(2.5);
        expect(clock.deltaTime).toBe(0.5);
    });

    it('handles duration and looping', () => {
        const clock = new Clock({ duration: 5, loop: true });

        clock.update(6);
        expect(clock.time).toBe(1);
    });

    it('handles ping-pong mode', () => {
        const clock = new Clock({ duration: 4, pingPong: true });

        clock.update(3);
        expect(clock.time).toBe(3);
        clock.update(2); // reaches 5, bounces back 1 unit to 3
        expect(clock.time).toBe(3);
    });

    it('seeks and resets correctly', () => {
        const clock = new Clock({ duration: 10 });

        clock.seek(4);
        expect(clock.time).toBe(4);
        clock.reset();
        expect(clock.time).toBe(0);
    });
});
