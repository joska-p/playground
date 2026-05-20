import { useGraphStore } from "../store/useGraphStore";

export function LoadingOverlay() {
  const isReady = useGraphStore((s) => s.isReady);

  if (isReady) return null;

  return (
    <div style={styles["overlay"]}>
      <span style={styles["text"]}>SIMULATING FORCES…</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    pointerEvents: "none",
  },
  text: {
    color: "#38bdf8",
    fontSize: 12,
    letterSpacing: "0.1em",
    animation: "gv-pulse 1.5s ease-in-out infinite",
  },
};
