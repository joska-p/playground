import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FrameLoopProvider } from './FrameLoopProvider';
import { useFrame } from './useFrame';

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

function FrameRecorder({ onFrame }: { onFrame: (time: number, delta: number) => void }) {
  useFrame(onFrame);
  return null;
}

const mountRecorder = (onFrame: (time: number, delta: number) => void) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const render = (callback: (time: number, delta: number) => void): void => {
    act(() => {
      root.render(
        <FrameLoopProvider>
          <FrameRecorder onFrame={callback} />
        </FrameLoopProvider>
      );
    });
  };
  const unmount = (): void => {
    act(() => {
      root.unmount();
    });
    container.remove();
  };
  render(onFrame);
  return { render, unmount };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useFrame', () => {
  it('subscribes to the provider loop and receives time + delta', () => {
    stubRaf();
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    const recorded: [number, number][] = [];
    const { unmount } = mountRecorder((time, delta) => {
      recorded.push([time, delta]);
    });
    expect(recorded).toEqual([[1, 0]]);
    act(() => {
      fireRaf(1500);
    });
    expect(recorded).toEqual([
      [1, 0],
      [1.5, 0.5]
    ]);
    unmount();
  });

  it('uses the latest callback for subsequent frames', () => {
    stubRaf();
    const firstCalls: [number, number][] = [];
    const secondCalls: [number, number][] = [];
    const { render, unmount } = mountRecorder((time, delta) => {
      firstCalls.push([time, delta]);
    });
    render((time, delta) => {
      secondCalls.push([time, delta]);
    });
    act(() => {
      fireRaf(1500);
    });
    expect(firstCalls).toHaveLength(1);
    expect(secondCalls).toEqual([[1.5, 0.5]]);
    unmount();
  });

  it('is a no-op when no provider is mounted', () => {
    stubRaf();
    const recorded: [number, number][] = [];
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <FrameRecorder
          onFrame={(time, delta) => {
            recorded.push([time, delta]);
          }}
        />
      );
    });
    act(() => {
      fireRaf(1500);
    });
    expect(recorded).toEqual([]);
    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
