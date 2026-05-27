import { useGraphIsReady } from "../store/graphStore";

export function LoadingOverlay() {
  const isReady = useGraphIsReady();

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
    fontFamily: "'JetBrains Mono','Fira Code',monospace",
    animation: "gv-pulse 1.5s ease-in-out infinite",
  },
};
