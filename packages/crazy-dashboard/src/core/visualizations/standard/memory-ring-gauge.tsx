import { useDashboardStore } from "../../../store/useDashboardStore.js";
import type { NumberMetricState } from "../../../core/types.js";

function MemoryRingGauge() {
  const memoryMetric = useDashboardStore((s) => s.metrics.memory as NumberMetricState | undefined);
  const current: number = memoryMetric?.current ?? 0;
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (current / 100) * circumference;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg width={radius * 2} height={radius * 2}>
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="var(--viz-grid, #ccc)"
          strokeWidth={stroke}
        />
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="var(--viz-gauge, currentColor)"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--viz-text, currentColor)"
          className="font-mono text-sm"
        >
          {Math.round(current)}%
        </text>
      </svg>
    </div>
  );
}

export { MemoryRingGauge };
