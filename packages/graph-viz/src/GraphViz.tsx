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
    <div className="w-full h-full bg-[#070d1a] text-slate-200 overflow-hidden flex flex-col">
      <TopBar onResetZoom={() => resetZoomRef.current()} />

      <div className="flex-1 flex overflow-hidden">
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
