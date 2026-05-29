import { useRef } from "react";

import { DetailPanel } from "./DetailPanel";
import { GraphCanvas } from "./GraphCanvas";
import { Legend } from "./Legend";
import { TopBar } from "./TopBar";

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
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      <TopBar onResetZoom={() => resetZoomRef.current()} />

      <div className="flex flex-1 overflow-hidden">
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
