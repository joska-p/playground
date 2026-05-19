import { useMemo } from "react";
import type { GraphNode } from "../types.js";
import { communityColor } from "../colors.js";

export type LegendProps = {
  nodes: GraphNode[];
  onCommunityClick: (communityId: number) => void;
  theme: "dark" | "light";
};

export function Legend({ nodes, onCommunityClick, theme }: LegendProps) {
  const isDark = theme === "dark";

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
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: isDark ? "#888" : "#6b7280" }}
      >
        Communities ({communities.length})
      </span>
      <div className="mt-2 space-y-1">
        {communities.map(([id, count]) => (
          <button
            key={id}
            onClick={() => onCommunityClick(id)}
            className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 text-left text-xs transition-colors"
            style={{ color: isDark ? "#ccc" : "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? "#2a2a4e" : "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <span
              className="inline-block h-3 w-3 shrink-0 rounded-sm"
              style={{ background: communityColor(id) }}
            />
            <span className="min-w-0 flex-1 truncate">Community {id}</span>
            <span
              className="shrink-0 text-[10px]"
              style={{ color: isDark ? "#666" : "#9ca3af" }}
            >
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
