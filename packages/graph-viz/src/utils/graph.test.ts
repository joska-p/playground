import { describe, it, expect } from "vitest";
import type { GraphEdge } from "../types.js";
import { edgesForNode, neighborIds, fileTypeIcon, confidenceLabel } from "./graph.js";

function makeEdge(overrides: Partial<GraphEdge> = {}): GraphEdge {
  return {
    source: "a",
    target: "b",
    relation: "depends_on",
    confidence: "EXTRACTED",
    confidence_score: 1,
    source_file: "f",
    weight: 1,
    ...overrides,
  };
}

describe("edgesForNode", () => {
  it("returns edges where node is source", () => {
    const edges = [
      makeEdge({ source: "a", target: "b" }),
      makeEdge({ source: "b", target: "c" }),
      makeEdge({ source: "a", target: "c" }),
    ];
    expect(edgesForNode(edges, "a")).toHaveLength(2);
  });

  it("returns edges where node is target", () => {
    const edges = [
      makeEdge({ source: "a", target: "b" }),
      makeEdge({ source: "b", target: "c" }),
      makeEdge({ source: "c", target: "a" }),
    ];
    expect(edgesForNode(edges, "a")).toHaveLength(2);
  });

  it("returns empty array for unknown node", () => {
    expect(edgesForNode([makeEdge()], "z")).toEqual([]);
  });
});

describe("neighborIds", () => {
  it("returns deduplicated neighbor IDs", () => {
    const edges = [
      makeEdge({ source: "a", target: "b" }),
      makeEdge({ source: "b", target: "a" }),
    ];
    expect(neighborIds(edges, "a")).toEqual(["b"]);
  });

  it("handles multiple neighbors", () => {
    const edges = [
      makeEdge({ source: "a", target: "b" }),
      makeEdge({ source: "b", target: "c" }),
      makeEdge({ source: "b", target: "d" }),
    ];
    const ids = neighborIds(edges, "b");
    expect(ids).toContain("a");
    expect(ids).toContain("c");
    expect(ids).toContain("d");
    expect(ids).toHaveLength(3);
  });

  it("returns empty array for node with no edges", () => {
    expect(neighborIds([], "z")).toEqual([]);
  });
});

describe("fileTypeIcon", () => {
  it("maps code to </>", () => {
    expect(fileTypeIcon("code")).toBe("</>");
  });
  it("maps document to 📄", () => {
    expect(fileTypeIcon("document")).toBe("📄");
  });
  it("maps paper to 📝", () => {
    expect(fileTypeIcon("paper")).toBe("📝");
  });
  it("maps image to 🖼", () => {
    expect(fileTypeIcon("image")).toBe("🖼");
  });
  it("maps rationale to 💡", () => {
    expect(fileTypeIcon("rationale")).toBe("💡");
  });
  it("falls back to bullet for unknown", () => {
    expect(fileTypeIcon("unknown")).toBe("•");
  });
});

describe("confidenceLabel", () => {
  it("capitalizes EXTRACTED", () => {
    expect(confidenceLabel("EXTRACTED")).toBe("Extracted");
  });
  it("capitalizes INFERRED", () => {
    expect(confidenceLabel("INFERRED")).toBe("Inferred");
  });
  it("capitalizes AMBIGUOUS", () => {
    expect(confidenceLabel("AMBIGUOUS")).toBe("Ambiguous");
  });
});
