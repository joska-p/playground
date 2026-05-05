import { describe, it, expect } from "vitest";
import { constant } from "./constant.js";

describe("constant generator", () => {
  it("should always generate the same value", () => {
    const gen = constant(42);
    for (let i = 0; i < 10; i++) {
      expect(gen.next().value).toBe(42);
    }
  });

  it("should handle negative values", () => {
    const gen = constant(-10);
    expect(gen.next().value).toBe(-10);
    expect(gen.next().value).toBe(-10);
  });

  it("should handle zero", () => {
    const gen = constant(0);
    expect(gen.next().value).toBe(0);
  });

  it("should be infinite", () => {
    const gen = constant(1);
    for (let i = 0; i < 1000; i++) gen.next();
    expect(gen.next().done).toBe(false);
  });
});
