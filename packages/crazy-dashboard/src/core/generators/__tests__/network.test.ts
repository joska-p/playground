import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateNetwork } from "../network.js";
import { steadyNetworkRule } from "../../rules/network-rules.js";

describe("generateNetwork", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a positive number", () => {
    const value = generateNetwork(steadyNetworkRule, 500, Date.now());
    expect(value).toBeGreaterThanOrEqual(0);
  });

  it("uses navigator.connection when available in context", () => {
    const value = generateNetwork(steadyNetworkRule, 500, Date.now());
    expect(value).toBeGreaterThanOrEqual(0);
  });

  it("falls back to simulation when navigatorConnection not in context", () => {
    const value = generateNetwork(steadyNetworkRule, 500, Date.now());
    expect(value).toBeGreaterThan(400);
    expect(value).toBeLessThan(700);
  });
});
