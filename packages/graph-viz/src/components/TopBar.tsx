import { FT_LABEL, REL_COLORS } from "../constants";
import { useGraphStore } from "../store/useGraphStore";
import type { ColorMode } from "../store/useGraphStore.types";

const FT_OPTIONS = Object.keys(FT_LABEL);
const REL_OPTIONS = Object.keys(REL_COLORS);

type TopBarProps = {
  onResetZoom: () => void;
};

export function TopBar({ onResetZoom }: TopBarProps) {
  const colorMode = useGraphStore((s) => s.colorMode);
  const filterFT = useGraphStore((s) => s.filterFT);
  const filterRel = useGraphStore((s) => s.filterRel);
  const search = useGraphStore((s) => s.search);
  const showHyper = useGraphStore((s) => s.showHyper);
  const stats = useGraphStore((s) => s.stats);

  const setColorMode = useGraphStore((s) => s.setColorMode);
  const setFilterFT = useGraphStore((s) => s.setFilterFT);
  const setFilterRel = useGraphStore((s) => s.setFilterRel);
  const setSearch = useGraphStore((s) => s.setSearch);
  const toggleHyper = useGraphStore((s) => s.toggleHyper);
  const resetFilters = useGraphStore((s) => s.resetFilters);

  return (
    <div style={styles["bar"]}>
      <span style={styles["logo"]}>◈ GRAPHIFY</span>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search nodes…"
        style={styles["input"]}
      />

      <select
        value={filterFT ?? ""}
        onChange={(e) => setFilterFT(e.target.value || null)}
        style={styles["select"]}
      >
        <option value="">All file types</option>
        {FT_OPTIONS.map((ft) => (
          <option key={ft} value={ft}>
            {FT_LABEL[ft]}
          </option>
        ))}
      </select>

      <select
        value={filterRel ?? ""}
        onChange={(e) => setFilterRel(e.target.value || null)}
        style={styles["select"]}
      >
        <option value="">All relations</option>
        {REL_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", gap: 6 }}>
        {(["community", "filetype"] as ColorMode[]).map((m) => (
          <button key={m} onClick={() => setColorMode(m)} style={colorToggleStyle(colorMode === m)}>
            {m === "community" ? "Community" : "File Type"}
          </button>
        ))}
      </div>

      <button onClick={toggleHyper} style={hyperToggleStyle(showHyper)}>
        {showHyper ? "Hyper ✓" : "Hyper ○"}
      </button>

      <button onClick={resetFilters} style={styles["ghostBtn"]}>
        ✕ Clear
      </button>
      <button onClick={onResetZoom} style={styles["ghostBtn"]}>
        ⊡ Reset
      </button>

      <span style={styles["statsLabel"]}>
        {stats.nodes.toLocaleString()} nodes · {stats.links.toLocaleString()} edges
      </span>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const base: React.CSSProperties = {
  background: "#0f172a",
  border: "1px solid #1e3a5f",
  borderRadius: 4,
  color: "#e2e8f0",
  padding: "4px 8px",
  fontSize: 11,
  fontFamily: "inherit",
  outline: "none",
};

const styles: Record<string, React.CSSProperties> = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 14px",
    background: "#0b1628",
    borderBottom: "1px solid #1e293b",
    flexWrap: "wrap",
    flexShrink: 0,
    zIndex: 10,
  },
  logo: {
    fontSize: 13,
    fontWeight: 700,
    color: "#38bdf8",
    letterSpacing: "0.05em",
    marginRight: 6,
    whiteSpace: "nowrap",
  },
  input: { ...base, width: 160, padding: "4px 10px" },
  select: { ...base, cursor: "pointer" },
  ghostBtn: {
    ...base,
    background: "transparent",
    border: "1px solid #1e293b",
    color: "#64748b",
    cursor: "pointer",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  },
  statsLabel: {
    marginLeft: "auto",
    fontSize: 10,
    color: "#475569",
    whiteSpace: "nowrap",
  },
};

function colorToggleStyle(active: boolean): React.CSSProperties {
  return {
    ...base,
    background: active ? "#1e3a5f" : "transparent",
    border: `1px solid ${active ? "#38bdf8" : "#1e3a5f"}`,
    color: active ? "#38bdf8" : "#64748b",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: 10,
  };
}

function hyperToggleStyle(active: boolean): React.CSSProperties {
  return {
    ...base,
    background: active ? "#1a2a1a" : "transparent",
    border: `1px solid ${active ? "#34d399" : "#1e3a5f"}`,
    color: active ? "#34d399" : "#64748b",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: 10,
  };
}
