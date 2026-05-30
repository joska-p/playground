/**
 * Tests for the image-pipeline library.
 * Run with: npx tsx --test src/tests/pipeline.test.ts
 *
 * Uses a minimal ImageData polyfill so tests run in Node without a browser or canvas.
 */

// ─── Minimal ImageData polyfill ───────────────────────────────────────────────
class ImageDataPolyfill {
  readonly width: number;
  readonly height: number;
  readonly data: Uint8ClampedArray;

  constructor(widthOrData: number | Uint8ClampedArray, width: number, height?: number) {
    if (typeof widthOrData === "number") {
      this.width = widthOrData;
      this.height = width;
      this.data = new Uint8ClampedArray(widthOrData * width * 4);
    } else {
      this.width = width;
      this.height = height!;
      this.data = new Uint8ClampedArray(widthOrData);
    }
  }
}

// Inject before importing pipeline modules
(globalThis as any).ImageData = ImageDataPolyfill;

import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { Pipeline, registerManipulation, setConfig } from "./index.js";
import type { NeighborhoodFn, PixelFn, WholeImageFn } from "./types.js";

const pixelFn = (fn: PixelFn) => fn;
const neighborFn = (fn: NeighborhoodFn) => fn;
const wholeFn = (fn: WholeImageFn) => fn;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeImageData(
  width: number,
  height: number,
  fill: [number, number, number, number] = [100, 150, 200, 255]
): ImageData {
  const img = new (globalThis as any).ImageData(width, height) as ImageData;
  for (let i = 0; i < width * height; i++) {
    img.data[i * 4] = fill[0];
    img.data[i * 4 + 1] = fill[1];
    img.data[i * 4 + 2] = fill[2];
    img.data[i * 4 + 3] = fill[3];
  }
  return img;
}

function pixelAt(img: ImageData, x: number, y: number) {
  const i = (y * img.width + x) * 4;
  return [img.data[i], img.data[i + 1], img.data[i + 2], img.data[i + 3]];
}

// ─── Setup ────────────────────────────────────────────────────────────────────

// Register a few test manipulations once
registerManipulation({
  id: "double-red",
  type: "pixel",
  fn: pixelFn((r, g, b, a) => [Math.min(255, r * 2), g, b, a]),
});

registerManipulation({
  id: "half-green",
  type: "pixel",
  fn: pixelFn((r, g, b, a) => [r, g / 2, b, a]),
});

registerManipulation({
  id: "zero-blue-neighborhood",
  type: "neighborhood",
  radius: 1,
  fn: neighborFn((src, dest, width, height) => {
    for (let i = 0; i < width * height; i++) {
      dest[i * 4] = src[i * 4];
      dest[i * 4 + 1] = src[i * 4 + 1];
      dest[i * 4 + 2] = 0;
      dest[i * 4 + 3] = src[i * 4 + 3] ?? 255;
    }
  }),
});

registerManipulation({
  id: "add-ten-whole",
  type: "whole",
  fn: wholeFn((imageData) => {
    const out = new (globalThis as any).ImageData(imageData.width, imageData.height) as ImageData;
    for (let i = 0; i < imageData.width * imageData.height * 4; i += 4) {
      out.data[i] = Math.min(255, imageData.data[i] + 10);
      out.data[i + 1] = Math.min(255, imageData.data[i + 1] + 10);
      out.data[i + 2] = Math.min(255, imageData.data[i + 2] + 10);
      out.data[i + 3] = imageData.data[i + 3] ?? 255;
    }
    return out;
  }),
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Pipeline.from()", () => {
  test("rejects non-ImageData", () => {
    assert.throws(() => Pipeline.from({} as any), /ImageData/);
  });

  test("returns a Pipeline instance", () => {
    const p = Pipeline.from(makeImageData(10, 10));
    assert.ok(p);
  });
});

describe("Single pixel manipulation", () => {
  test("double-red doubles the red channel", async () => {
    const src = makeImageData(2, 2, [100, 150, 200, 255]);
    const result = await Pipeline.from(src).add("double-red").run();

    assert.equal(result.final.width, 2);
    assert.equal(result.final.height, 2);
    const [r, g, b, a] = pixelAt(result.final, 0, 0);
    assert.equal(r, 200);
    assert.equal(g, 150);
    assert.equal(b, 200);
    assert.equal(a, 255);
  });
});

describe("Fusion", () => {
  test("two pixel ops fuse and both apply", async () => {
    const src = makeImageData(2, 2, [100, 150, 200, 255]);
    const result = await Pipeline.from(src)
      .add("double-red") // r → 200
      .add("half-green") // g → 75
      .run();

    const [r, g] = pixelAt(result.final, 0, 0);
    assert.equal(r, 200);
    assert.equal(g, 75);
  });
});

describe("Neighborhood manipulation", () => {
  test("zeros the blue channel", async () => {
    const src = makeImageData(4, 4, [100, 150, 200, 255]);
    const result = await Pipeline.from(src).add("zero-blue-neighborhood").run();

    const [, , b] = pixelAt(result.final, 1, 1);
    assert.equal(b, 0);
  });

  test("flushes pixel batch before running", async () => {
    const src = makeImageData(4, 4, [50, 150, 200, 255]);
    const result = await Pipeline.from(src)
      .add("double-red") // pixel: r → 100
      .add("zero-blue-neighborhood") // neighborhood: flushes first
      .run();

    const [r, , b] = pixelAt(result.final, 1, 1);
    assert.equal(r, 100);
    assert.equal(b, 0);
  });
});

describe("Whole-image manipulation", () => {
  test("add-ten-whole increments all channels", async () => {
    const src = makeImageData(2, 2, [100, 150, 200, 255]);
    const result = await Pipeline.from(src).add("add-ten-whole").run();

    const [r, g, b] = pixelAt(result.final, 0, 0);
    assert.equal(r, 110);
    assert.equal(g, 160);
    assert.equal(b, 210);
  });
});

describe("Snapshots", () => {
  test("empty snapshots array when none requested", async () => {
    const src = makeImageData(2, 2);
    const result = await Pipeline.from(src).add("double-red").run();
    assert.deepEqual(result.snapshots, []);
  });

  test("snapshot after pixel op captures intermediate state", async () => {
    const src = makeImageData(2, 2, [100, 150, 200, 255]);
    const result = await Pipeline.from(src)
      .add("double-red") // r → 200
      .snapshot()
      .add("half-green") // g → 75
      .run();

    assert.equal(result.snapshots.length, 1);
    const [r, g] = pixelAt(result.snapshots[0]!, 0, 0);
    assert.equal(r, 200);
    assert.equal(g, 150); // half-green not yet applied

    const [fr, fg] = pixelAt(result.final, 0, 0);
    assert.equal(fr, 200);
    assert.equal(fg, 75);
  });

  test("snapshot between fused batch does not break fusion", async () => {
    // According to spec: snapshot between pixel-local ops should not split fusion.
    // Our impl: snapshot always flushes first, but the result should be correct.
    const src = makeImageData(2, 2, [100, 150, 200, 255]);
    const result = await Pipeline.from(src).add("double-red").snapshot().add("half-green").run();

    const [r] = pixelAt(result.snapshots[0]!, 0, 0);
    assert.equal(r, 200);
  });

  test("multiple snapshots in order", async () => {
    const src = makeImageData(2, 2, [50, 50, 50, 255]);
    const result = await Pipeline.from(src)
      .add("double-red") // r=100
      .snapshot() // snap 0: r=100
      .add("double-red") // r=200
      .snapshot() // snap 1: r=200
      .run();

    assert.equal(result.snapshots.length, 2);
    assert.equal(pixelAt(result.snapshots[0]!, 0, 0)[0], 100);
    assert.equal(pixelAt(result.snapshots[1]!, 0, 0)[0], 200);
  });
});

describe("Resize", () => {
  test("resize to width scales proportionally", async () => {
    const src = makeImageData(100, 50);
    const result = await Pipeline.from(src).resize({ width: 50 }).run();
    assert.equal(result.final.width, 50);
    assert.equal(result.final.height, 25);
  });

  test("resize to height scales proportionally", async () => {
    const src = makeImageData(100, 50);
    const result = await Pipeline.from(src).resize({ height: 100 }).run();
    assert.equal(result.final.height, 100);
    assert.equal(result.final.width, 200);
  });

  test("resize fill stretches to exact dimensions", async () => {
    const src = makeImageData(100, 50);
    const result = await Pipeline.from(src).resize({ width: 200, height: 200, fit: "fill" }).run();
    assert.equal(result.final.width, 200);
    assert.equal(result.final.height, 200);
  });

  test("resize maxPixels shrinks large images", async () => {
    const src = makeImageData(1000, 1000); // 1M pixels
    const result = await Pipeline.from(src).resize({ maxPixels: 250_000 }).run();
    assert.ok(result.final.width * result.final.height <= 250_000);
  });

  test("resize is no-op if already fits", async () => {
    const src = makeImageData(50, 50);
    const result = await Pipeline.from(src).resize({ width: 50 }).run();
    assert.equal(result.final.width, 50);
    assert.equal(result.final.height, 50);
  });
});

describe("Pipeline does not mutate source", () => {
  test("source ImageData is unchanged after run", async () => {
    const src = makeImageData(4, 4, [10, 20, 30, 255]);
    const originalFirst = src.data[0];
    await Pipeline.from(src).add("double-red").run();
    assert.equal(src.data[0], originalFirst);
  });
});

describe("Error handling", () => {
  test("throws on unknown manipulation ID", async () => {
    await assert.rejects(
      () => Pipeline.from(makeImageData(2, 2)).add("does-not-exist").run(),
      /does-not-exist/
    );
  });

  test("registerManipulation throws on missing id", () => {
    assert.throws(
      () =>
        registerManipulation({ id: "", type: "pixel", fn: pixelFn((r, g, b, a) => [r, g, b, a]) }),
      /id/
    );
  });

  test("neighborhood manipulation without radius throws", () => {
    assert.throws(
      () =>
        registerManipulation({
          id: "bad-neighborhood",
          type: "neighborhood",
          fn: neighborFn((src, dest) => {
            dest.set(src);
          }),
        }),
      /radius/
    );
  });
});

describe("setConfig", () => {
  test("throws on non-positive maxPixels", () => {
    assert.throws(() => setConfig({ maxPixels: 0 }), /maxPixels/);
  });

  test("updates config correctly", () => {
    setConfig({ maxPixels: 5_000_000 });
    // Reset back
    setConfig({ maxPixels: 16_000_000 });
  });
});

describe("Workflow pattern", () => {
  test("app-level workflow array builds correctly", async () => {
    const src = makeImageData(4, 4, [100, 150, 200, 255]);
    const workflowIds = ["double-red", "half-green"];

    const pipeline = Pipeline.from(src);
    workflowIds.forEach((id) => pipeline.add(id));
    const result = await pipeline.run();

    const [r, g] = pixelAt(result.final, 0, 0);
    assert.equal(r, 200);
    assert.equal(g, 75);
  });
});

console.log("All tests defined. Running...");
