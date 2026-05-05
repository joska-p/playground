import { describe, it, expect } from "vitest";
import { ramp } from "./ramp.js";

describe("ramp generator", () => {
  it("should generate increasing values", () => {
    const gen = ramp(0, 10, 1);
    const values: number[] = [];
    for (const value of gen) values.push(value);

    expect(values.length).toBe(101);
    expect(values[0]).toBe(0);
    expect(values[values.length - 1]).toBe(10);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1] ?? 0);
    }
  });

  it("should handle decreasing ramp", () => {
    const gen = ramp(10, 0, 0.5);
    const values: number[] = [];
    let result = gen.next();
    while (!result.done) {
      values.push(result.value);
      result = gen.next();
    }
    expect(values[0]).toBe(10);
    expect(values[values.length - 1]).toBeCloseTo(0, 1);
  });

  it("should complete (finite generator)", () => {
    const gen = ramp(0, 1, 0.1);
    let result = gen.next();
    while (!result.done) result = gen.next();
    expect(result.done).toBe(true);
  });

  it("should handle duration=0", () => {
    const gen = ramp(5, 10, 0);
    const result = gen.next();
    expect(result.done).toBe(false);
    expect(result.value).toBe(5);
    expect(gen.next().done).toBe(true);
  });

  it("should handle negative duration", () => {
    const gen = ramp(5, 10, -1);
    const result = gen.next();
    expect(result.done).toBe(false);
    expect(result.value).toBe(5);
    expect(gen.next().done).toBe(true);
  });
});
