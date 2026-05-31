// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, cleanup } from "@testing-library/react";
import { useWorker } from "./useWorker.ts";

let workers: Worker[] = [];
let shouldError = false;

class FakeWorker implements Worker {
  onmessage: ((e: MessageEvent) => void) | null = null;
  onmessageerror: ((e: MessageEvent) => void) | null = null;
  onerror: ((e: ErrorEvent) => void) | null = null;

  constructor() {
    workers.push(this as unknown as Worker);
  }

  postMessage(data: unknown): void {
    setTimeout(() => {
      if (shouldError) {
        this.onmessage?.({ data: { _error: "computation failed" } } as MessageEvent);
      } else {
        this.onmessage?.({ data: { _output: (data as { _input: unknown })._input } } as MessageEvent);
      }
    }, 0);
  }

  terminate(): void {
    workers = workers.filter((w) => w !== this);
  }

  addEventListener(): void {}
  removeEventListener(): void {}
  dispatchEvent(): boolean { return false; }
}

beforeEach(() => {
  workers = [];
  shouldError = false;
  vi.useFakeTimers();
  vi.stubGlobal("Worker", FakeWorker as unknown as typeof Worker);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  cleanup();
});

describe("useWorker", () => {
  it("starts in idle status", () => {
    const { result } = renderHook(() => useWorker((n: number) => n * 2));

    expect(result.current.status).toBe("idle");
    expect(result.current.result).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it("transitions to success when task completes", async () => {
    const { result } = renderHook(() => useWorker((n: number) => n * 2));

    act(() => {
      result.current.execute(42);
    });

    await act(async () => {
      vi.runAllTimers();
    });

    expect(result.current.status).toBe("success");
    expect(result.current.result).toBe(42);
  });

  it("captures error on worker error response", async () => {
    const { result } = renderHook(() => useWorker((n: number) => n * 2));

    shouldError = true;

    act(() => {
      result.current.execute(42);
    });

    await act(async () => {
      vi.runAllTimers();
    });

    expect(result.current.status).toBe("error");
    expect(result.current.error?.message).toBe("computation failed");
  });

  it("resets state on retry after error", async () => {
    const { result } = renderHook(() => useWorker((n: number) => n * 2));

    shouldError = true;
    act(() => { result.current.execute(1); });
    await act(async () => { vi.runAllTimers(); });
    expect(result.current.status).toBe("error");

    shouldError = false;
    act(() => { result.current.execute(100); });
    expect(result.current.status).toBe("running");

    await act(async () => { vi.runAllTimers(); });
    expect(result.current.status).toBe("success");
    expect(result.current.result).toBe(100);
  });

  it("cleans up worker on unmount", () => {
    const { result, unmount } = renderHook(() => useWorker((n: number) => n * 2));

    act(() => { result.current.execute(42); });

    const worker = workers[0];
    const terminateSpy = vi.spyOn(worker, "terminate");

    unmount();

    expect(terminateSpy).toHaveBeenCalled();
  });
});
