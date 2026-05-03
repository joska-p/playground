import { describe, it, expect } from "vitest";
import { generateWalker } from "../walker.js";
import { defaultWalkerRule } from "../../rules/walker-rules.js";

describe("generateWalker", () => {
  const bounds = { width: 100, height: 100 };

  it("returns a position within bounds", () => {
    const result = generateWalker(defaultWalkerRule, { x: 50, y: 50 }, Date.now(), bounds);
    expect(result.x).toBeGreaterThanOrEqual(0);
    expect(result.x).toBeLessThanOrEqual(100);
    expect(result.y).toBeGreaterThanOrEqual(0);
    expect(result.y).toBeLessThanOrEqual(100);
  });

  it("moves by approximately stepSize", () => {
    const result = generateWalker(defaultWalkerRule, { x: 50, y: 50 }, Date.now(), bounds);
    const dx = Math.abs(result.x - 50);
    const dy = Math.abs(result.y - 50);
    expect(dx + dy).toBeGreaterThan(0);
    expect(dx).toBeLessThanOrEqual(3);
    expect(dy).toBeLessThanOrEqual(3);
  });
});
