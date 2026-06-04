import { useHierarchyStats } from '../stores/graph/store';

/**
 * Debug panel showing hierarchy distribution
 * Shows how many nodes are in each hierarchy level
 */
export function HierarchyInfo() {
  const hierarchyStats = useHierarchyStats();

  if (!hierarchyStats || hierarchyStats.total === 0) {
    return null;
  }

  return (
    <div className="pointer-events-auto absolute bottom-4 left-4 flex flex-col gap-2 rounded-lg border border-border/50 bg-background/90 px-3 py-2 text-xs backdrop-blur">
      <div className="font-mono font-bold text-primary">📊 Hierarchy</div>
      <div className="flex flex-col gap-1 font-mono text-muted-foreground">
        <div>
          <span className="text-cyan-400">●</span> Core:{' '}
          <span className="text-foreground">{hierarchyStats.core}</span>
          {' ('}
          <span className="text-foreground">{hierarchyStats.corePercent}%</span>
          )
        </div>
        <div>
          <span className="text-blue-400">●</span> Secondary:{' '}
          <span className="text-foreground">{hierarchyStats.secondary}</span>
          {' ('}
          <span className="text-foreground">
            {hierarchyStats.secondaryPercent}%
          </span>
          )
        </div>
        <div>
          <span className="text-gray-400">●</span> Detail:{' '}
          <span className="text-foreground">{hierarchyStats.detail}</span>
          {' ('}
          <span className="text-foreground">
            {hierarchyStats.detailPercent}%
          </span>
          )
        </div>
        <div className="mt-1 border-t border-border/30 pt-1 text-xs text-muted-foreground">
          Total: <span className="text-foreground">{hierarchyStats.total}</span>
        </div>
      </div>
    </div>
  );
}
