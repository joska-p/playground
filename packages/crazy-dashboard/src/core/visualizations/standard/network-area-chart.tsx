import { useRef, useEffect, useMemo } from "react";
import { useDashboardStore } from "../../../store/useDashboardStore.js";

function NetworkAreaChart() {
  const history = useDashboardStore((s) => s.metrics.network.history);
  const svgRef = useRef<SVGSVGElement>(null);

  const { path, area } = useMemo(() => {
    const h = history ?? [];
    if (h.length === 0) return { path: "", area: "" };
    const width = 300;
    const height = 100;
    const maxVal = Math.max(...h, 1);
    const step = width / Math.max(h.length - 1, 1);
    const points = h.map((val, i) => ({
      x: i * step,
      y: height - (val / maxVal) * height,
    }));
    const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    const areaPath = `${linePath} L${points[points.length - 1]?.x ?? 0},${height} L0,${height} Z`;
    return { path: linePath, area: areaPath };
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
        <path d={area} fill="var(--viz-line, currentColor)" opacity="0.2" />
        <path d={path} fill="none" stroke="var(--viz-line, currentColor)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export { NetworkAreaChart };
