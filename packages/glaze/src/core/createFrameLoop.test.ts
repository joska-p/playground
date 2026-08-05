import { afterEach, describe, expect, it, vi } from 'vitest';
import { createFrameLoop } from './createFrameLoop';

let rafCallback: FrameRequestCallback | null = null;
let cancelCalls = 0;

const stubRaf = (): void => {
  rafCallback = null;
  cancelCalls = 0;
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback): number => {
    rafCallback = callback;
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', (): void => {
    cancelCalls++;
  });
};

const fireRaf = (time: number): void => {
  const callback = rafCallback;
  rafCallback = null;
  if (callback) callback(time);
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('createFrameLoop', () => {
  it('fires an initial tick synchronously on the first subscribe', () => {
    stubRaf();
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    const callback = vi.fn();
    const loop = createFrameLoop();
    loop.subscribe(callback);
    expect(loop.isRunning).toBe(true);
    expect(loop.subscriberCount).toBe(1);
    expect(callback).toHaveBeenNthCalledWith(1, 1, 0);
  });

  it('reports elapsed time and delta to later frames', () => {
    stubRaf();
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    const callback = vi.fn();
    const loop = createFrameLoop();
    loop.subscribe(callback);
    fireRaf(1500);
    fireRaf(1700);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(2, 1.5, 0.5);
    expect(callback).toHaveBeenNthCalledWith(3, 1.7, 0.2);
  });

  it('stops when the last subscriber unsubscribes', () => {
    stubRaf();
    const callback = vi.fn();
    const loop = createFrameLoop();
    const unsubscribe = loop.subscribe(callback);
    expect(loop.isRunning).toBe(true);
    unsubscribe();
    expect(loop.isRunning).toBe(false);
    expect(loop.subscriberCount).toBe(0);
    expect(cancelCalls).toBeGreaterThan(0);
  });

  it('restarts when a new subscriber arrives after stopping', () => {
    stubRaf();
    const first = vi.fn();
    const loop = createFrameLoop();
    const unsubscribe = loop.subscribe(first);
    unsubscribe();
    const second = vi.fn();
    loop.subscribe(second);
    expect(loop.isRunning).toBe(true);
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('keeps running while at least one subscriber remains', () => {
    stubRaf();
    const loop = createFrameLoop();
    const unsubscribeA = loop.subscribe(vi.fn());
    const unsubscribeB = loop.subscribe(vi.fn());
    unsubscribeA();
    expect(loop.isRunning).toBe(true);
    expect(loop.subscriberCount).toBe(1);
    unsubscribeB();
    expect(loop.isRunning).toBe(false);
  });

  it('dispose stops the loop and clears subscribers', () => {
    stubRaf();
    const callback = vi.fn();
    const loop = createFrameLoop();
    loop.subscribe(callback);
    loop.dispose();
    expect(loop.isRunning).toBe(false);
    expect(loop.subscriberCount).toBe(0);
    fireRaf(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
