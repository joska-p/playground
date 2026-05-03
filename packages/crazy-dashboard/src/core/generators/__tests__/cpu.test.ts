import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateCpu } from "../cpu.js";
import { sineCpuRule, randomCpuRule } from "../../rules/cpu-rules.js";

describe("generateCpu", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a number between 0 and 100 with sine rule", () => {
    const value = generateCpu(sineCpuRule, 50, Date.now());
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("returns a number between 0 and 100 with random rule", () => {
    const value = generateCpu(randomCpuRule, 50, Date.now());
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("uses default rule when none provided", () => {
    const value = generateCpu(undefined, 50, Date.now());
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("uses default current (50) when not provided", () => {
    const value = generateCpu(sineCpuRule, undefined, Date.now());
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });
});
