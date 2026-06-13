import { useRef } from 'react';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import { useTooltipPosition } from '../hooks/useTooltipPosition';

const TOOLTIP_WIDTH = 220;

/**
 * Floating HTML overlay showing node info on hover.
 * Positioned near the cursor using pointer coordinates from uiStore.
 * Pure presentational — position logic extracted to useTooltipPosition hook.
 */
function NodeTooltip() {
  const hoveredNodeIndex = useUiStore((s) => s.hoveredNodeIndex);
  const pointerX = useUiStore((s) => s.pointerX);
  const pointerY = useUiStore((s) => s.pointerY);
  const graphData = useDataStore((s) => s.graphData);
  const degrees = useDataStore((s) => s.degrees);
  const communities = useDataStore((s) => s.communities);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const position = useTooltipPosition(pointerX, pointerY);

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
