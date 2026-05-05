import { describe, it, expect } from "vitest";
import { square } from "./square.js";

describe("square generator", () => {
  it("should generate square wave values", () => {
    const gen = square(1, 1);
    for (let i = 0; i < 50; i++) expect(gen.next().value).toBe(1);
    for (let i = 0; i < 50; i++) expect(gen.next().value).toBe(-1);
  });

  it("should respect duty cycle", () => {
    const gen = square(1, 1, 0.25);
    for (let i = 0; i < 25; i++) expect(gen.next().value).toBe(1);
    for (let i = 0; i < 75; i++) expect(gen.next().value).toBe(-1);
  });

  it("should handle duty cycle of 0", () => {
    const gen = square(1, 1, 0);
    for (let i = 0; i < 100; i++) expect(gen.next().value).toBe(-1);
  });

  it("should handle duty cycle of 1", () => {
    const gen = square(1, 1, 1);
    for (let i = 0; i < 100; i++) expect(gen.next().value).toBe(1);
  });

  it("should complete full period", () => {
    const gen = square(1, 1); // frequency=1, period=1s
    const samplesPerPeriod = 100; // sampleRate=100
    const values: number[] = [];
    for (let i = 0; i < samplesPerPeriod; i++) values.push(gen.next().value);
    // After one period, should repeat
    expect(gen.next().value).toBe(values[0]);
  });

  it("should be infinite", () => {
    const gen = square(1, 1);
    for (let i = 0; i < 1000; i++) gen.next();
    expect(gen.next().done).toBe(false);
  });
});
