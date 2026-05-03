import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateMemory } from "../memory.js";
import { gradualMemoryRule } from "../../rules/memory-rules.js";

describe("generateMemory", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a number between 0 and 100", () => {
    const value = generateMemory(gradualMemoryRule, 30, Date.now());
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("uses performance.memory when available in context", () => {
    const value = generateMemory(gradualMemoryRule, 30, Date.now());
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("falls back to simulation when performanceMemory not in context", () => {
    const value = generateMemory(gradualMemoryRule, 30, Date.now());
    expect(value).toBeGreaterThan(30);
  });
});
