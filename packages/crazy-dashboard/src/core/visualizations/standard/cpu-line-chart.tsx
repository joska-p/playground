import { useRef, useEffect, useMemo } from "react";
import { useDashboardStore } from "../../../store/useDashboardStore.js";

function CpuLineChart() {
  const history = useDashboardStore((s) => s.metrics.cpu.history);
  const svgRef = useRef<SVGSVGElement>(null);

  const pathData = useMemo(() => {
    const h = history ?? [];
    if (h.length === 0) return "";
    const width = 300;
    const height = 100;
    const step = width / Math.max(h.length - 1, 1);
    return h
      .map((val, i) => {
        const x = i * step;
        const y = height - (val / 100) * height;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  }, [history]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0]?.contentRect ?? { width: 0 };
      el.setAttribute("width", String(width));
    });
    observer.observe(el.parentElement!);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full w-full">
      <svg ref={svgRef} height="100" className="w-full">
        <path d={pathData} fill="none" stroke="var(--viz-line, currentColor)" strokeWidth="2" />
        <line x1="0" y1="50" x2="300" y2="50" stroke="var(--viz-grid, #ccc)" strokeDasharray="4" />
      </svg>
    </div>
  );
}

export { CpuLineChart };
