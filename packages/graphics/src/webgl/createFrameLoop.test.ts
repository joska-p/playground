import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createFrameLoop } from './createFrameLoop';

const noop = (): void => undefined;

describe('createFrameLoop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts the loop when the first subscriber registers', () => {
    const loop = createFrameLoop();

    expect(loop.isRunning).toBe(false);
    loop.subscribe(noop);
    expect(loop.isRunning).toBe(true);
  });

  it('runs exactly one frame per rAF regardless of subscriber count', () => {
    const loop = createFrameLoop();
    const first = vi.fn();
    const second = vi.fn();
    loop.subscribe(first);
    loop.subscribe(second);

    // The first tick runs synchronously during subscribe(first) — second is
    // not subscribed yet; each subsequent rAF fires exactly one frame.
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(0);

    vi.advanceTimersToNextTimer(); // frame 2
    expect(first).toHaveBeenCalledTimes(2);
    expect(second).toHaveBeenCalledTimes(1);

    vi.advanceTimersToNextTimer(); // frame 3
    expect(first).toHaveBeenCalledTimes(3);
    expect(second).toHaveBeenCalledTimes(2);
  });

  it('invokes all subscribers each frame with time and delta', () => {
    const loop = createFrameLoop();
    const times: number[] = [];
    const deltas: number[] = [];
    loop.subscribe(noop);
    loop.subscribe((time, delta) => {
      times.push(time);
      deltas.push(delta);
    });

    vi.advanceTimersToNextTimer(); // past the synchronous first tick
    vi.advanceTimersByTime(1000);

    expect(times.length).toBeGreaterThan(0);
    expect(deltas.length).toBeGreaterThan(0);
    expect(times.at(-1)).toBeGreaterThan(0);
    expect(deltas.at(-1)).toBeGreaterThan(0);
  });

  it('stops the loop when the last subscriber unsubscribes', () => {
    const loop = createFrameLoop();

    const unsubscribe = loop.subscribe(noop);
    expect(loop.isRunning).toBe(true);

    unsubscribe();
    expect(loop.isRunning).toBe(false);
    expect(loop.subscriberCount).toBe(0);
  });

  it('restarts the loop when a subscriber registers again after stopping', () => {
    const loop = createFrameLoop();
    const unsubscribe = loop.subscribe(noop);
    unsubscribe();
    expect(loop.isRunning).toBe(false);

    loop.subscribe(noop);
    expect(loop.isRunning).toBe(true);
  });

  it('does not tick after the last subscriber unsubscribes', () => {
    const loop = createFrameLoop();
    const callback = vi.fn();
    const unsubscribe = loop.subscribe(callback);
    expect(callback).toHaveBeenCalledTimes(1); // synchronous first tick

    unsubscribe();
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('dispose() stops the loop and clears all subscribers', () => {
    const loop = createFrameLoop();
    loop.subscribe(noop);
    loop.subscribe(noop);

    loop.dispose();
    expect(loop.isRunning).toBe(false);
    expect(loop.subscriberCount).toBe(0);
  });

  it('dispose() is idempotent', () => {
    const loop = createFrameLoop();
    loop.subscribe(noop);
    loop.dispose();
    expect(() => {
      loop.dispose();
    }).not.toThrow();
  });

  it('keeps the loop alive when a subscriber throws mid-frame', () => {
    const loop = createFrameLoop();
    const healthy = vi.fn();

    loop.subscribe(healthy); // first tick runs synchronously on subscribe
    expect(healthy).toHaveBeenCalledTimes(1);

    loop.subscribe(() => {
      throw new Error('boom');
    });

    // The throwing subscriber aborts its own frame but not the loop.
    expect(() => vi.advanceTimersByTime(16)).toThrow('boom');
    expect(loop.isRunning).toBe(true);
    expect(healthy).toHaveBeenCalledTimes(2);

    expect(() => vi.advanceTimersByTime(16)).toThrow('boom');
    expect(healthy).toHaveBeenCalledTimes(3);
  });

  it('dispose() from within a callback cancels the pending frame', () => {
    const loop = createFrameLoop();
    const callback = vi.fn();

    loop.subscribe(noop);
    loop.subscribe(() => {
      loop.dispose();
    });
    loop.subscribe(callback);

    expect(loop.isRunning).toBe(true);
    vi.advanceTimersByTime(16);
    expect(loop.isRunning).toBe(false);
    expect(callback).not.toHaveBeenCalled();
  });
});
