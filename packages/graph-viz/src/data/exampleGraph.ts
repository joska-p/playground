import type { GraphData } from "../types";

const EXAMPLE_GRAPH: GraphData = {
  nodes: [
    { id: "n1", label: "Node 1", ft: "code", c: 0, sf: "" },
    { id: "n2", label: "Node 2", ft: "document", c: 1, sf: "" },
  ],
  links: [{ s: "n1", t: "n2", r: "references", w: 1 }],
  hyperedges: [],
};

export { EXAMPLE_GRAPH };
