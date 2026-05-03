import { describe, it, expect, vi, beforeEach } from "vitest";
import { gradualMemoryRule, stepMemoryRule } from "../memory-rules.js";

describe("gradualMemoryRule", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a value between 0 and 100", () => {
    const value = gradualMemoryRule.getNext({
      current: 30,
      timestamp: Date.now(),
    });
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("uses performanceMemory when provided in context", () => {
    const value = gradualMemoryRule.getNext({
      current: 30,
      timestamp: Date.now(),
      performanceMemory: { usedJSHeapSize: 50_000_000, jsHeapSizeLimit: 100_000_000 },
    });
    expect(value).toBeCloseTo(50, 0);
  });

  it("falls back to simulation when performanceMemory not provided", () => {
    const value = gradualMemoryRule.getNext({
      current: 30,
      timestamp: Date.now(),
    });
    expect(value).toBeGreaterThan(30);
    expect(value).toBeLessThanOrEqual(95);
  });
});

describe("stepMemoryRule", () => {
  it("returns a value between 0 and 100", () => {
    const value = stepMemoryRule.getNext({
      current: 30,
      timestamp: Date.now(),
    });
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("cycles through base levels every 5000ms", () => {
    const val1 = stepMemoryRule.getNext({ current: 30, timestamp: 0 });
    const val2 = stepMemoryRule.getNext({ current: 30, timestamp: 5000 });
    expect(Math.abs(val2 - val1)).toBeGreaterThan(10);
  });
});
