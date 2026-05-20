import { RAW_GRAPH } from "../data/graphData";
import { FT_COLOR, REL_COLORS } from "../constants";
import { communityColor } from "../utils/colors";
import { useGraphStore } from "../store/useGraphStore";

export function DetailPanel() {
  const selectedNode = useGraphStore((s) => s.selectedNode);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);

  if (!selectedNode) return null;

  const connections = RAW_GRAPH.links.filter(
    (l) => l.s === selectedNode.id || l.t === selectedNode.id
  );

  return (
    <div style={styles["panel"]}>
      {/* Header */}
      <div style={styles["header"]}>
        <span style={styles["title"]}>{selectedNode.label}</span>
        <button onClick={() => setSelectedNode(null)} style={styles["closeBtn"]}>
          ×
        </button>
      </div>

      {/* Metadata grid */}
      <div style={styles["grid"]}>
        <MetaRow label="ID" value={selectedNode.id} mono />
        <MetaRow
          label="Type"
          value={selectedNode.ft || "—"}
          color={FT_COLOR[selectedNode.ft]}
          bold
        />
        <MetaRow
          label="Community"
          value={String(selectedNode.c)}
          color={communityColor(selectedNode.c)}
          bold
        />
        <MetaRow label="Source" value={selectedNode.sf || "—"} mono small />
      </div>

      {/* Connections list */}
      <div style={styles["section"]}>
        <span style={styles["sectionLabel"]}>Connections ({connections.length})</span>

        {connections.slice(0, 20).map((l) => {
          const otherId = l.s === selectedNode.id ? l.t : l.s;
          const other = RAW_GRAPH.nodes.find((n) => n.id === otherId);
          return (
            <div
              key={otherId}
              onClick={() => other && setSelectedNode(other)}
              style={{ ...styles["connItem"], borderLeftColor: REL_COLORS[l.r] ?? "#334155" }}
            >
              <span style={{ ...styles["relLabel"], color: REL_COLORS[l.r] ?? "#64748b" }}>
                {l.r}
              </span>
              <span style={styles["connLabel"]}>{other?.label ?? otherId}</span>
            </div>
          );
        })}

        {connections.length > 20 && (
          <span style={styles["overflow"]}>+{connections.length - 20} more</span>
        )}
      </div>
    </div>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

type MetaRowProps = {
  label: string;
  value: string;
  color?: string | undefined;
  bold?: boolean;
  mono?: boolean;
  small?: boolean;
};

function MetaRow({ label, value, color, bold, mono, small }: MetaRowProps) {
  return (
    <>
      <span style={styles["metaKey"]}>{label}</span>
      <span
        style={{
          ...styles["metaVal"],
          color: color ?? "#94a3b8",
          fontWeight: bold ? 600 : undefined,
          fontFamily: mono ? "inherit" : undefined,
          fontSize: small ? 9 : 11,
          lineHeight: small ? 1.4 : undefined,
          wordBreak: "break-all",
        }}
      >
        {value}
      </span>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: 260,
    background: "#0b1628",
    borderLeft: "1px solid #1e293b",
    padding: 16,
    overflowY: "auto",
    flexShrink: 0,
    fontSize: 11,
    fontFamily: "'JetBrains Mono','Fira Code',monospace",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
    color: "#38bdf8",
    wordBreak: "break-word",
    flex: 1,
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#475569",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
    padding: "0 0 0 8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "6px 10px",
    alignItems: "start",
  },
  metaKey: { color: "#475569", paddingTop: 1 },
  metaVal: { color: "#94a3b8" },
  section: {
    marginTop: 14,
    borderTop: "1px solid #1e293b",
    paddingTop: 12,
  },
  sectionLabel: {
    display: "block",
    color: "#475569",
    marginBottom: 6,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  connItem: {
    marginBottom: 6,
    padding: "5px 8px",
    background: "#0f172a",
    borderRadius: 4,
    cursor: "pointer",
    borderLeft: "2px solid",
  },
  relLabel: {
    display: "block",
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 2,
  },
  connLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: 10,
    wordBreak: "break-word",
  },
  overflow: {
    display: "block",
    color: "#475569",
    fontSize: 10,
    textAlign: "center",
    paddingTop: 4,
  },
};
