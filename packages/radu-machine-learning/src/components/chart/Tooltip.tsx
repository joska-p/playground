import { useShowTooltipAt } from '../../stores/store';
import { HEIGHT, WIDTH } from './constants';

function Tooltip() {
  const showTooltipAt = useShowTooltipAt();
  if (!showTooltipAt) return null;

  return (
    <div
      className="bg-surface-raised text-foreground pointer-events-none absolute z-20 block -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded p-2 text-xs whitespace-nowrap shadow-lg transition-all duration-75"
      style={{
        left: `${String((showTooltipAt.cx / WIDTH) * 100)}%`,
        top: `${String((showTooltipAt.cy / HEIGHT) * 100)}%`
      }}
    >
      <div className="font-bold capitalize">{showTooltipAt.point.label}</div>
      <div>x: {showTooltipAt.point.x.toFixed(2)}</div>
      <div>y: {showTooltipAt.point.y.toFixed(2)}</div>
    </div>
  );
}

export { Tooltip };
