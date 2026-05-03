import { describe, it, expect } from "vitest";
import { defaultWalkerRule, bounceWalkerRule } from "../walker-rules.js";

describe("defaultWalkerRule", () => {
  it("returns a position within bounds", () => {
    const bounds = { width: 100, height: 100 };
    const result = defaultWalkerRule.getNext({
      current: { x: 50, y: 50 },
      timestamp: Date.now(),
      bounds,
    });
    expect(result.x).toBeGreaterThanOrEqual(0);
    expect(result.x).toBeLessThanOrEqual(100);
    expect(result.y).toBeGreaterThanOrEqual(0);
    expect(result.y).toBeLessThanOrEqual(100);
  });

  it("moves by approximately stepSize (3)", () => {
    const bounds = { width: 100, height: 100 };
    const result = defaultWalkerRule.getNext({
      current: { x: 50, y: 50 },
      timestamp: Date.now(),
      bounds,
    });
    const dx = Math.abs(result.x - 50);
    const dy = Math.abs(result.y - 50);
    expect(dx + dy).toBeGreaterThan(0);
    expect(dx).toBeLessThanOrEqual(3);
    expect(dy).toBeLessThanOrEqual(3);
  });
});

describe("bounceWalkerRule", () => {
  it("returns a position within bounds", () => {
    const bounds = { width: 100, height: 100 };
    const result = bounceWalkerRule.getNext({
      current: { x: 50, y: 50 },
      timestamp: Date.now(),
      bounds,
    });
    expect(result.x).toBeGreaterThanOrEqual(0);
    expect(result.x).toBeLessThanOrEqual(100);
    expect(result.y).toBeGreaterThanOrEqual(0);
    expect(result.y).toBeLessThanOrEqual(100);
  });

  it("moves by stepSize (2)", () => {
    const bounds = { width: 100, height: 100 };
    const result = bounceWalkerRule.getNext({
      current: { x: 50, y: 50 },
      timestamp: Date.now(),
      bounds,
    });
    const dx = Math.abs(result.x - 50);
    const dy = Math.abs(result.y - 50);
    expect(dx + dy).toBeGreaterThan(0);
    expect(dx).toBeLessThanOrEqual(2);
    expect(dy).toBeLessThanOrEqual(2);
  });
});
