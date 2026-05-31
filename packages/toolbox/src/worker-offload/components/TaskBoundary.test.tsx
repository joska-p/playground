// @vitest-environment jsdom
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TaskBoundary } from "./TaskBoundary.tsx";

let shouldError = false;

class FakeWorker implements Worker {
  onmessage: ((e: MessageEvent) => void) | null = null;
  onmessageerror: ((e: MessageEvent) => void) | null = null;
  onerror: ((e: ErrorEvent) => void) | null = null;
  postMessage(data: unknown): void {
    setTimeout(() => {
      if (shouldError) {
        this.onmessage?.({ data: { _error: "computation failed" } } as MessageEvent);
      } else {
        this.onmessage?.({ data: { _output: (data as { _input: unknown })._input } } as MessageEvent);
      }
    }, 0);
  }
  terminate(): void {}
  addEventListener(): void {}
  removeEventListener(): void {}
  dispatchEvent(): boolean { return false; }
}

beforeEach(() => {
  shouldError = false;
  vi.useFakeTimers();
  vi.stubGlobal("Worker", FakeWorker as unknown as typeof Worker);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  cleanup();
});

describe("TaskBoundary", () => {
  it("renders loading fallback while running", () => {
    const { container } = render(
      <TaskBoundary
        fn={(n: number) => n * 2}
        input={42}
        loading={<div>Loading...</div>}
      >
        {(result: number) => <div>{String(result)}</div>}
      </TaskBoundary>
    );

    expect(container.innerHTML).toContain("Loading...");
  });

  it("renders children result on success", async () => {
    const { container } = render(
      <TaskBoundary fn={(n: number) => n * 2} input={42}>
        {(result: number) => <div>{String(result)}</div>}
      </TaskBoundary>
    );

    await act(async () => {
      vi.runAllTimers();
    });

    expect(container.innerHTML).toContain("42");
  });

  it("renders error fallback on failure", async () => {
    shouldError = true;

    const { container } = render(
      <TaskBoundary
        fn={(n: number) => n * 2}
        input={42}
        error={(err: Error) => <div>{err.message}</div>}
      >
        {(result: number) => <div>{String(result)}</div>}
      </TaskBoundary>
    );

    await act(async () => {
      vi.runAllTimers();
    });

    expect(container.innerHTML).toContain("computation failed");
  });
});
