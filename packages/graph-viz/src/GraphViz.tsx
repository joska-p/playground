import { useRef } from "react";

import { TopBar } from "./components/TopBar";
import { GraphCanvas } from "./components/GraphCanvas";
import { DetailPanel } from "./components/DetailPanel";
import { Legend } from "./components/Legend";

/**
 * Root component — purely structural layout.
 * All state lives in the Zustand store; all D3 logic lives in hooks.
 */
export function GraphViz() {
  // resetZoom is owned by GraphCanvas / useGraphSimulation.
  // We bubble it up here via a callback so TopBar can call it
  // without prop-drilling through the store.
  const resetZoomRef = useRef<() => void>(() => {});

  return (
    <div style={styles["root"]}>
      <TopBar onResetZoom={() => resetZoomRef.current()} />

      <div style={styles["body"]}>
        <GraphCanvas
          onResetZoomReady={(fn) => {
            resetZoomRef.current = fn;
          }}
        />
        <DetailPanel />
      </div>

      <Legend />

      {/* Global keyframe — kept here to avoid duplicating in every component */}
      <style>{`@keyframes gv-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }`}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    width: "100%",
    height: "100%",
    background: "#070d1a",
    display: "flex",
    flexDirection: "column",
    color: "#e2e8f0",
    overflow: "hidden",
  },
  body: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
  },
};
