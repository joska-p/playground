import { useEffect, useRef, useState } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';

const TOOLTIP_MARGIN = 10;
const TOOLTIP_WIDTH = 220;

/**
 * Floating HTML overlay showing node info on hover.
 * Positioned near the cursor using pointer coordinates from uiStore.
 * Clamps to viewport edges to avoid overflow.
 */
function NodeTooltip() {
  const hoveredNodeIndex = useUiStore((s) => s.hoveredNodeIndex);
  const pointerX = useUiStore((s) => s.pointerX);
  const pointerY = useUiStore((s) => s.pointerY);
  const graphData = useDataStore((s) => s.graphData);
  const degrees = useDataStore((s) => s.degrees);
  const communities = useDataStore((s) => s.communities);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    if (pointerX === null || pointerY === null || !tooltipRef.current) {
      setPosition(null);
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = pointerX + TOOLTIP_MARGIN;
    let top = pointerY + TOOLTIP_MARGIN;

    // Try to place below cursor, flip above if not enough room
    const estimatedHeight = 120;
    if (top + estimatedHeight > vh - TOOLTIP_MARGIN) {
      top = pointerY - estimatedHeight - TOOLTIP_MARGIN;
    }

    // Clamp horizontal
    if (left + TOOLTIP_WIDTH > vw - TOOLTIP_MARGIN) {
      left = pointerX - TOOLTIP_WIDTH - TOOLTIP_MARGIN;
    }

    // Clamp to viewport edges
    left = Math.max(TOOLTIP_MARGIN, Math.min(left, vw - TOOLTIP_WIDTH - TOOLTIP_MARGIN));
    top = Math.max(TOOLTIP_MARGIN, top);

    setPosition({ left, top });
  }, [pointerX, pointerY]);

  if (hoveredNodeIndex === null || !graphData || !position) return null;

  const node = graphData.nodes[hoveredNodeIndex];
  if (!node) return null;

  const deg = degrees?.[hoveredNodeIndex] ?? 0;
  const community = communities.get(node.community);

  return (
    <div
      ref={tooltipRef}
      className="pointer-events-none fixed z-50 rounded-lg border border-border bg-background/80 p-3 text-xs shadow-lg backdrop-blur-sm"
      style={{ left: position.left, top: position.top, width: TOOLTIP_WIDTH }}
    >
      <div className="flex items-center gap-2">
        {community && (
          <span
            className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: community.color }}
          />
        )}
        <span className="font-medium truncate">{node.label}</span>
      </div>
      <div className="text-muted-foreground mt-1 flex flex-col gap-0.5">
        <span>Type: {node.file_type}</span>
        {community && <span>Community: {community.label}</span>}
        <span>Connections: {deg}</span>
      </div>
    </div>
  );
}

export { NodeTooltip };
