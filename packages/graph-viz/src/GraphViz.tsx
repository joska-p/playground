import { useEffect, useRef } from "react";

import { TopBar } from "./components/TopBar";
import { GraphCanvas } from "./components/GraphCanvas";
import { DetailPanel } from "./components/DetailPanel";
import { Legend } from "./components/Legend";
import { useGraphStore } from "./store/useGraphStore";
import type { GraphData } from "./types";

export function GraphViz({ graphData }: { graphData?: GraphData }) {
  // resetZoom is owned by GraphCanvas / useGraphSimulation.
  const resetZoomRef = useRef<() => void>(() => {});
  const setGraphData = useGraphStore((s) => s.setGraphData);

  useEffect(() => {
    if (graphData) setGraphData(graphData);
  }, [graphData, setGraphData]);

  return (
    <div className="bg-background text-foreground flex h-full w-full flex-col overflow-hidden">
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
    </div>
  );
}
