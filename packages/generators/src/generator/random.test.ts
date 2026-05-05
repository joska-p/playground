import { describe, it, expect, vi } from "vitest";
import { random } from "./random.js";

describe("random generator", () => {
  it("should generate values within range", () => {
    const gen = random(0, 100);
    for (let i = 0; i < 100; i++) {
      const value = gen.next().value;
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(100); // max is exclusive due to Math.random() behavior
    }
  });

  it("should generate different values", () => {
    // Mock Math.random to return deterministic sequence
    const mockValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.15, 0.25, 0.35];
    let callCount = 0;
    vi.spyOn(Math, "random").mockImplementation(() => mockValues[callCount++ % mockValues.length]);
    
    const gen = random(0, 1);
    const values = new Set<number>();
    for (let i = 0; i < 50; i++) values.add(gen.next().value);
    expect(values.size).toBeGreaterThan(10);
    
    vi.restoreAllMocks();
  });
});
