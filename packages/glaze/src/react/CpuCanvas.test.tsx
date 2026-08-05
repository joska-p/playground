import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CpuDoor } from '../cpu/createCpuDoor';
import { CpuCanvas } from './CpuCanvas';

let rafCallback: FrameRequestCallback | null = null;

const stubRaf = (): void => {
  rafCallback = null;
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback): number => {
    rafCallback = callback;
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
};

const fireRaf = (time: number): void => {
  const callback = rafCallback;
  rafCallback = null;
  if (callback) callback(time);
};

const fake2dContext = new Proxy(
  {},
  {
    get: (): ((...args: unknown[]) => undefined) => () => undefined,
    set: (): boolean => true
  }
) as unknown as CanvasRenderingContext2D;

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(fake2dContext);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('CpuCanvas', () => {
  it('creates the door on mount, drives onFrame, and destroys it on unmount', () => {
    stubRaf();
    const frames: number[] = [];
    const doors: (CpuDoor | null)[] = [];
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <CpuCanvas
          onDoor={(door) => doors.push(door)}
          onFrame={(ctx) => frames.push(ctx.frameCount)}
        />
      );
    });
    expect(doors.some((door) => door !== null)).toBe(true);
    expect(frames).toHaveLength(1);
    act(() => {
      fireRaf(1500);
    });
    expect(frames).toHaveLength(2);
    act(() => {
      root.unmount();
    });
    container.remove();
    expect(doors[doors.length - 1]).toBeNull();
  });

  it('stops drawing when onFrame is removed', () => {
    stubRaf();
    const frames: number[] = [];
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    const render = (onFrame: ((ctx: { frameCount: number }) => void) | null): void => {
      act(() => {
        root.render(<CpuCanvas onFrame={onFrame} />);
      });
    };
    render((ctx) => frames.push(ctx.frameCount));
    expect(frames).toHaveLength(1);
    render(null);
    act(() => {
      fireRaf(1500);
    });
    expect(frames).toHaveLength(1);
    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
