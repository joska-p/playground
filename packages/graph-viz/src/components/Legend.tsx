import { FT_COLOR, FT_LABEL, REL_COLORS } from "../constants";
import { useGraphColorMode } from "../store/graphStore";

const FT_OPTIONS = Object.keys(FT_LABEL);
const REL_PREVIEW = Object.entries(REL_COLORS).slice(0, 6);

export function Legend() {
  const colorMode = useGraphColorMode();

  return (
    <div style={styles["bar"]}>
      {/* Left: node colour legend */}
      <div style={styles["left"]}>
        {colorMode === "filetype" ? (
          FT_OPTIONS.map((ft) => (
            <div key={ft} style={styles["item"]}>
              <div style={{ ...styles["dot"], background: FT_COLOR[ft] }} />
              <span style={styles["label"]}>{FT_LABEL[ft]}</span>
            </div>
          ))
        ) : (
          <span style={styles["muted"]}>Nodes coloured by community</span>
        )}
      </div>

      {/* Right: edge relation legend */}
      <div style={styles["right"]}>
        {REL_PREVIEW.map(([rel, color]) => (
          <div key={rel} style={styles["item"]}>
            <div style={{ ...styles["dash"], background: color }} />
            <span style={styles["muted"]}>{rel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "6px 14px",
    background: "#0b1628",
    borderTop: "1px solid #1e293b",
    flexWrap: "wrap",
    flexShrink: 0,
  },
  left: { display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" },
  right: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginLeft: "auto" },
  item: { display: "flex", alignItems: "center", gap: 5 },
  dot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  dash: { width: 14, height: 2, borderRadius: 1, flexShrink: 0 },
  label: { color: "#64748b", fontSize: 10 },
  muted: { color: "#475569", fontSize: 10 },
};
