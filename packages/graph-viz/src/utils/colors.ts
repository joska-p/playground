import { COMMUNITY_PALETTE, FT_COLOR } from "../constants";
import type { SimNode } from "../hooks/useGraphSimulation.types";
import type { ColorMode } from "../store/useGraphStore.types";

export function communityColor(community: number): string {
  return COMMUNITY_PALETTE[community % COMMUNITY_PALETTE.length] ?? "#94a3b8";
}

export function nodeColor(node: SimNode, mode: ColorMode): string {
  if (mode === "filetype") return FT_COLOR[node.ft] ?? "#94a3b8";
  return communityColor(node.c);
}

export function nodeRadius(id: string, degMap: Map<string, number>): number {
  return 3 + Math.sqrt(degMap.get(id) ?? 0) * 2;
}

export function buildDegreeMap(links: Array<{ s: string; t: string }>): Map<string, number> {
  const map = new Map<string, number>();
  for (const { s, t } of links) {
    map.set(s, (map.get(s) ?? 0) + 1);
    map.set(t, (map.get(t) ?? 0) + 1);
  }
  return map;
}
