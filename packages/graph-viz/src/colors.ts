const COMMUNITY_COLORS = [
  "#4E79A7",
  "#F28E2B",
  "#E15759",
  "#76B7B2",
  "#59A14F",
  "#EDC948",
  "#B07AA1",
  "#FF9DA7",
  "#9C755F",
  "#BAB0AC",
  "#86BCB6",
  "#8CD17D",
  "#B6992D",
  "#499894",
  "#D37295",
  "#F1CE63",
  "#A0CBE8",
  "#FFBE7D",
  "#FF9D76",
  "#EBEBEB",
  "#D4A6C8",
  "#D7B5A6",
  "#C7E8C7",
  "#F1E6C7",
];

export function communityColor(communityId: number | undefined): string {
  if (communityId === undefined) return "#6b7280";
  return COMMUNITY_COLORS[communityId % COMMUNITY_COLORS.length] ?? "#6b7280";
}

export function communityColors(): string[] {
  return COMMUNITY_COLORS;
}
