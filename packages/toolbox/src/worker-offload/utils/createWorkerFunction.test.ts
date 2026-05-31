import { afterEach, describe, expect, it, vi } from "vitest";
import { createWorkerFunction } from "./createWorkerFunction.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("createWorkerFunction", () => {
  it("throws for native functions", () => {
    expect(() => createWorkerFunction(Math.sqrt)).toThrow(
      "createWorkerFunction requires a user-defined function"
    );
  });

  it("returns an object with createWorker and revoke", () => {
    const { createWorker, revoke } = createWorkerFunction((x: number) => x * 2);
    expect(typeof createWorker).toBe("function");
    expect(typeof revoke).toBe("function");
  });

  it("factory creates a Worker instance", () => {
    function MockWorker() {
      return {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        postMessage: vi.fn(),
        terminate: vi.fn(),
      };
    }
    vi.stubGlobal("Worker", MockWorker as unknown as typeof Worker);
    vi.stubGlobal("Blob", function Blob() {} as unknown as typeof Blob);
    vi.stubGlobal("URL", { createObjectURL: vi.fn(() => "blob:mock") });

    const { createWorker } = createWorkerFunction((x: number) => x * 2);
    const worker = createWorker();
    expect(worker).toBeDefined();
  });

  it("creates a Blob and object URL", () => {
    const createObjectURL = vi.fn(() => "blob:mock");
    function MockBlob() {
      return {} as Blob;
    }
    vi.stubGlobal("Blob", MockBlob as unknown as typeof Blob);
    vi.stubGlobal("URL", { createObjectURL });

    createWorkerFunction((x: number) => x * 2);

    expect(createObjectURL).toHaveBeenCalledTimes(1);
  });

  it("embeds the function source in the worker script", () => {
    const blobs: Array<{ parts: string[]; options: BlobPropertyBag }> = [];
    function MockBlob(this: Blob, parts: string[], options: BlobPropertyBag) {
      blobs.push({ parts, options });
      return {} as Blob;
    }
    vi.stubGlobal("Blob", MockBlob as unknown as typeof Blob);
    vi.stubGlobal("URL", { createObjectURL: vi.fn(() => "blob:mock") });

    const fn = (x: number) => x * 2;
    createWorkerFunction(fn);

    expect(blobs.length).toBe(1);
    const code = blobs[0].parts.join("");
    expect(code).toContain("x * 2");
    expect(code).toContain("_taskId");
    expect(code).toContain("_input");
  });
});
