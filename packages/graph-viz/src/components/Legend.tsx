import { useMemo } from "react";
import type { GraphNode } from "../types.js";
import { communityColor } from "../colors.js";

export type LegendProps = {
  nodes: GraphNode[];
  onCommunityClick: (communityId: number) => void;
};

export function Legend({ nodes, onCommunityClick }: LegendProps) {
  const communities = useMemo(() => {
    const map = new Map<number, number>();
    for (const n of nodes) {
      const c = n.community;
      if (c !== undefined) {
        map.set(c, (map.get(c) ?? 0) + 1);
      }
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [nodes]);

  if (communities.length === 0) return null;

  return (
    <div className="px-3 py-3">
      <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
        Communities ({communities.length})
      </span>
      <div className="mt-2 space-y-1">
        {communities.map(([id, count]) => (
          <button
            key={id}
            onClick={() => onCommunityClick(id)}
            className="hover:bg-accent text-foreground flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 text-left text-xs transition-colors"
          >
            <span
              className="inline-block h-3 w-3 shrink-0 rounded-sm"
              style={{ background: communityColor(id) }}
            />
            <span className="min-w-0 flex-1 truncate">Community {id}</span>
            <span className="text-muted-foreground shrink-0 text-[10px]">
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
