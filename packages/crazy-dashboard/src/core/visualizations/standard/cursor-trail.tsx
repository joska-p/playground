import { useRef, useEffect, useMemo } from "react";
import { useDashboardStore } from "../../../store/useDashboardStore.js";

function CursorTrail() {
  const cursorMetric = useDashboardStore((s) => s.metrics.cursor);
  const history = cursorMetric.history;
  const current = cursorMetric.current;
  const svgRef = useRef<SVGSVGElement>(null);

  const pathData = useMemo(() => {
    const h = history ?? [];
    if (h.length === 0) return "";
    const width = 300;
    const height = 100;
    const maxX = Math.max(...h.map((p) => p.x), 1);
    const maxY = Math.max(...h.map((p) => p.y), 1);
    return h
      .map((p, i) => {
        const x = (p.x / maxX) * width;
        const y = height - (p.y / maxY) * height;
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
        <path
          d={pathData}
          fill="none"
          stroke="var(--viz-line, currentColor)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <text x="5" y="15" fill="var(--viz-text, currentColor)" className="font-mono text-xs">
          x: {Math.round(current.x)} y: {Math.round(current.y)}
        </text>
      </svg>
    </div>
  );
}

export { CursorTrail };
