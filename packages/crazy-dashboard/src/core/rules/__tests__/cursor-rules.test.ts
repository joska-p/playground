import { describe, it, expect } from "vitest";
import { defaultCursorRule, smoothedCursorRule } from "../cursor-rules.js";

const defaultBounds = { width: 1920, height: 1080 };

describe("defaultCursorRule", () => {
  it("returns the current cursor position", () => {
    const result = defaultCursorRule.getNext({
      current: { x: 100, y: 200 },
      timestamp: Date.now(),
      bounds: defaultBounds,
    });
    expect(result).toEqual({ x: 100, y: 200 });
  });
});

describe("smoothedCursorRule", () => {
  it("returns the current cursor position", () => {
    const result = smoothedCursorRule.getNext({
      current: { x: 150, y: 300 },
      timestamp: Date.now(),
      bounds: defaultBounds,
    });
    expect(result).toEqual({ x: 150, y: 300 });
  });
});
