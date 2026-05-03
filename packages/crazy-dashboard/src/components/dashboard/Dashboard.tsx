import { useDashboardStore } from "../../store/useDashboardStore.js";
import { standardVisualizations } from "../../core/visualizations/standard/index.js";

function Dashboard() {
  const mode = useDashboardStore((s) => s.mode);
  const visualizations = mode === "standard" ? standardVisualizations : standardVisualizations;

  const CpuViz = visualizations[0]?.component;
  const OtherVizs = visualizations.slice(1);

  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      {/* CPU spans full width */}
      <div className="col-span-1 rounded-lg border border-[var(--viz-border)] bg-[var(--viz-bg)] p-2 lg:col-span-2">
        {CpuViz && <CpuViz />}
      </div>

      {/* Bottom 2×2 grid */}
      {OtherVizs.map((viz) => {
        const VizComponent = viz.component;
        return (
          <div
            key={viz.id}
            className="min-h-[200px] rounded-lg border border-[var(--viz-border)] bg-[var(--viz-bg)] p-2"
          >
            <VizComponent />
          </div>
        );
      })}
    </div>
  );
}

export { Dashboard };
