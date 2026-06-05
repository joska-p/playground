// graph/palette.ts — community colour helpers

export const PALETTE = [
  "#4cc9f0", "#4361ee", "#7209b7", "#f72585", "#f77f00",
  "#06d6a0", "#ffd166", "#ef476f", "#118ab2", "#06a77d",
  "#d62246", "#9b5de5", "#f15bb5", "#fee440", "#00bbf9",
  "#00f5d4", "#e07a5f", "#3d405b", "#81b29a", "#f2cc8f",
  "#a8dadc", "#457b9d", "#e63946", "#2a9d8f",
] as const;

export function communityColor(id?: number): string {
  if (id == null) return "#888888";
  return PALETTE[id % PALETTE.length];
}
