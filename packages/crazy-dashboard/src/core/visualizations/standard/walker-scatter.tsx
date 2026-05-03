import { useRef, useEffect, useMemo } from "react";
import { useDashboardStore } from "../../../store/useDashboardStore.js";

function WalkerScatter() {
  const history = useDashboardStore((s) => s.metrics.walker.history);
  const svgRef = useRef<SVGSVGElement>(null);

  const points = useMemo(() => {
    const h = history ?? [];
    if (h.length === 0) return [];
    const width = 100;
    const height = 100;
    return h.map((p) => ({
      cx: (p.x / 100) * width,
      cy: (p.y / 100) * height,
    }));
  }, [history]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? { width: 0, height: 0 };
      el.setAttribute("width", String(width));
      el.setAttribute("height", String(height));
    });
    observer.observe(el.parentElement!);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full w-full">
      <svg ref={svgRef} width="100" height="100" className="h-full w-full">
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="2"
            fill="var(--viz-line, currentColor)"
            opacity={0.6}
          />
        ))}
      </svg>
    </div>
  );
}

export { WalkerScatter };
