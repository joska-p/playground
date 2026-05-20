import { useState, useMemo } from "react";
import { Input } from "@repo/ui";
import type { GraphNode } from "../types.js";
import { communityColor } from "../colors.js";

type SearchProps = {
  nodes: GraphNode[];
  onSelect: (nodeId: string) => void;
};

export function Search({ nodes, onSelect }: SearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return nodes.filter((n) => n.label.toLowerCase().includes(q)).slice(0, 20);
  }, [query, nodes]);

  return (
    <div className="border-border border-b px-3 py-3">
      <Input
        type="text"
        placeholder="Search nodes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <div className="bg-muted mt-1 max-h-32 overflow-y-auto rounded-md">
          {results.map((n) => (
            <button
              key={n.id}
              onClick={() => { onSelect(n.id); setQuery(""); }}
              className="hover:bg-accent text-foreground w-full cursor-pointer px-3 py-1 text-left text-xs"
            >
              <span
                className="mr-1.5 inline-block h-2 w-2 rounded-full"
                style={{ background: communityColor(n.community) }}
              />
              {n.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
