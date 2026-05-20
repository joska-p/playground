// ── Node colours by file type ─────────────────────────────────────────────────

export const FT_COLOR: Record<string, string> = {
  code: "#22d3ee",
  document: "#a78bfa",
  concept: "#fbbf24",
  image: "#f472b6",
  rationale: "#34d399",
};

export const FT_LABEL: Record<string, string> = {
  code: "Code",
  document: "Document",
  concept: "Concept",
  image: "Image",
  rationale: "Rationale",
};

// ── Edge colours by relation type ─────────────────────────────────────────────

export const REL_COLORS: Record<string, string> = {
  contains: "#475569",
  references: "#0ea5e9",
  imports: "#6366f1",
  imports_from: "#818cf8",
  defines: "#22c55e",
  calls: "#f97316",
  conceptually_related_to: "#e879f9",
  cites: "#facc15",
  rationale_for: "#fb923c",
  method: "#4ade80",
};

// ── Community palette (cycles for 88+ communities) ────────────────────────────

export const COMMUNITY_PALETTE: string[] = [
  "#22d3ee",
  "#a78bfa",
  "#fbbf24",
  "#f472b6",
  "#34d399",
  "#60a5fa",
  "#fb923c",
  "#e879f9",
  "#4ade80",
  "#f87171",
  "#38bdf8",
  "#c084fc",
  "#86efac",
  "#fcd34d",
  "#fdba74",
  "#67e8f9",
  "#d946ef",
  "#bef264",
  "#fda4af",
  "#93c5fd",
];

// ── D3 simulation parameters ──────────────────────────────────────────────────

export const SIM_CONFIG = {
  linkDistance: 30,
  linkStrength: 0.3,
  chargeStrength: -60,
  chargeMaxDist: 200,
  collideBuffer: 2,
  alphaDecay: 0.02,
} as const;
