import { describe, it, expect } from "vitest";
import { generateCursor } from "../cursor.js";
import { defaultCursorRule } from "../../rules/cursor-rules.js";

describe("generateCursor", () => {
  it("returns the current cursor position", () => {
    const result = generateCursor(defaultCursorRule, { x: 100, y: 200 }, Date.now());
    expect(result).toEqual({ x: 100, y: 200 });
  });

  it("uses default rule when none provided", () => {
    const result = generateCursor(undefined, { x: 150, y: 300 }, Date.now());
    expect(result).toEqual({ x: 150, y: 300 });
  });
});
