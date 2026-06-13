import { Button } from '@repo/ui/Button';
import { Card } from '@repo/ui/Card';
import { Icon } from '@repo/ui/Icon';
import { Input } from '@repo/ui/Input';
import { Slider } from '@repo/ui/Slider';
import { Switch } from '@repo/ui/Switch';
import { useEffect, useState } from 'react';
import { useDataStore } from '../../stores/dataStore';
import { useUiStore } from '../../stores/uiStore';
import { classifyNodeHealth } from '../../utils/nodes';
import { ColorLegend } from './ColorLegend';
import { PanelSection } from './PanelSection';

function GraphPanel() {
  const graphData = useDataStore((s) => s.graphData);
  const positions = useDataStore((s) => s.positions);
  const degrees = useDataStore((s) => s.degrees);
  const nodeIndex = useDataStore((s) => s.nodeIndex);
  const communities = useDataStore((s) => s.communities);
  const interCommunityEdges = useDataStore((s) => s.interCommunityEdges);

  const selectedNode = useUiStore((s) => s.selectedNode);
  const searchQuery = useUiStore((s) => s.searchQuery);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const communityFilter = useUiStore((s) => s.communityFilter);
  const autoRotate = useUiStore((s) => s.autoRotate);
  const showEdges = useUiStore((s) => s.showEdges);
  const showHyperedges = useUiStore((s) => s.showHyperedges);
  const showNodeLabels = useUiStore((s) => s.showNodeLabels);
  const isPanelOpen = useUiStore((s) => s.isPanelOpen);

  const selectNode = useUiStore((s) => s.selectNode);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const setMinCommunitySize = useUiStore((s) => s.setMinCommunitySize);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const setAutoRotate = useUiStore((s) => s.setAutoRotate);
  const setShowEdges = useUiStore((s) => s.setShowEdges);
  const setShowHyperedges = useUiStore((s) => s.setShowHyperedges);
  const setShowNodeLabels = useUiStore((s) => s.setShowNodeLabels);
  const togglePanel = useUiStore((s) => s.togglePanel);

  // Derive view mode from communityFilter
  const selectedCommunityId = (() => {
    const trimmed = communityFilter.trim();
    return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : null;
  })();
  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  // Sorted community list for display (overview only)
  const communityList = (() => {
    return [...communities.values()]
      .filter((c) => c.nodeCount >= minCommunitySize)
      .sort((a, b) => b.nodeCount - a.nodeCount)
      .slice(0, 50);
  })();

  // Selected community info
  const selectedCommunity =
    selectedCommunityId !== null ? communities.get(selectedCommunityId) : null;

  // Focused index for keyboard navigation of the ColorLegend list.
  // Clamped to stay within the valid range when the list changes.
  const [rawFocusedIndex, setRawFocusedIndex] = useState(0);
  const maxIndex = communityList.length - 1;
  const focusedIndex = Math.min(rawFocusedIndex, Math.max(0, maxIndex));

  // Keyboard navigation for the community list
  useEffect(() => {
    if (viewMode !== 'overview') return;

    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setRawFocusedIndex((prev) => Math.min(prev + 1, maxIndex));
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setRawFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        }
        case 'Enter': {
          if (communityList.length > 0 && communityList[focusedIndex]) {
            setCommunityFilter(String(communityList[focusedIndex]!.id));
            e.preventDefault();
          }
          break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, communityList, focusedIndex, maxIndex, setCommunityFilter]);

  // Compute codebase health insights from graph data
  const insights = (() => {
    if (!graphData || !positions || !degrees) return null;

    // Top 10 community concentration
    const sortedComms = [...communities.values()].sort(
      (a, b) => b.nodeCount - a.nodeCount
    );
    const top10Nodes = sortedComms
      .slice(0, 10)
      .reduce((sum, c) => sum + c.nodeCount, 0);
    const concentration = (
      (top10Nodes / graphData.nodes.length) *
      100
    ).toFixed(0);

    // Coupling density
    const totalPossiblePairs =
      (communities.size * (communities.size - 1)) / 2;
    const actualPairs = interCommunityEdges.size;
    const couplingDensity =
      totalPossiblePairs > 0
        ? ((actualPairs / totalPossiblePairs) * 100).toFixed(1)
        : '0.0';

    // Health counts
    let isolated = 0;
    let lowConfidence = 0;
    for (let i = 0; i < graphData.nodes.length; i++) {
      const health = classifyNodeHealth(
        graphData.nodes[i]!.id,
        graphData.links,
        degrees,
        nodeIndex,
        i
      );
      if (health === 'isolated') isolated++;
      else if (health === 'low-confidence') lowConfidence++;
    }

    // Most coupled community pair
    let maxCoupling = 0;
    let maxCouplingPair = '';
    for (const edge of interCommunityEdges.values()) {
      if (edge.count > maxCoupling) {
        maxCoupling = edge.count;
        const a = communities.get(edge.sourceCid);
        const b = communities.get(edge.targetCid);
        const aLabel = a?.label ?? `C${edge.sourceCid}`;
        const bLabel = b?.label ?? `C${edge.targetCid}`;
        maxCouplingPair = `${aLabel} ↔ ${bLabel}`;
      }
    }

    return {
      concentration,
      couplingDensity,
      isolated,
      lowConfidence,
      maxCoupling,
      maxCouplingPair
    };
  })();

  if (!graphData) return null;

  return (
    <>
      {/* Toggle button — always visible */}
      <Button
        size="icon"
        variant="ghost"
        onClick={togglePanel}
        className="absolute top-3 right-3 z-50"
        aria-label={isPanelOpen ? 'Close panel' : 'Open panel'}
      >
        <Icon
          name="wrench"
          className="h-4 w-4"
        />
      </Button>

      {/* Panel */}
      {isPanelOpen && (
        <Card className="absolute top-12 right-3 z-50 max-h-[calc(100vh-4rem)] w-72 overflow-y-auto backdrop-blur-md">
          <div className="flex flex-col gap-4 p-4">
            {/* Navigation section */}
            <PanelSection title="Navigation" defaultOpen={true}>
              {viewMode === 'detail' && (
                <Button
                  variant="ghost"
                  onClick={() => setCommunityFilter('')}
                  className="self-start text-xs"
                >
                  ← Back to overview
                </Button>
              )}
              {viewMode === 'overview' && (
                <ColorLegend
                  focusedIndex={focusedIndex}
                  onFocusChange={setRawFocusedIndex}
                />
              )}
            </PanelSection>

            {/* Search & Filter section */}
            <PanelSection title="Search & Filter" defaultOpen={false}>
              <Input
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
              <Slider
                label="Min community size"
                min={1}
                max={20}
                value={minCommunitySize}
                onChange={setMinCommunitySize}
              />
              <Input
                label="Community IDs"
                placeholder="e.g. 1, 5, 12-20"
                value={communityFilter}
                onChange={(e) => setCommunityFilter(e.target.value)}
                helperText="Filter specific communities"
                fullWidth
              />
            </PanelSection>

            {/* Display section */}
            <PanelSection title="Display" defaultOpen={false}>
              <div className="flex flex-col gap-2">
                <Switch
                  label="Auto-rotate"
                  checked={autoRotate}
                  onCheckedChange={setAutoRotate}
                />
                <Switch
                  label="Show edges"
                  checked={showEdges}
                  onCheckedChange={setShowEdges}
                />
                <Switch
                  label="Show hyperedges"
                  checked={showHyperedges}
                  onCheckedChange={setShowHyperedges}
                />
                {viewMode === 'detail' && (
                  <Switch
                    label="Show labels"
                    checked={showNodeLabels}
                    onCheckedChange={setShowNodeLabels}
                  />
                )}
              </div>
            </PanelSection>

            {/* Selection section */}
            <PanelSection title="Selection" defaultOpen={true}>
              {insights && (
                <div className="flex flex-col gap-1.5 rounded-lg border p-2.5 text-[11px]">
                  <div className="text-muted-foreground mb-0.5 text-[10px] font-medium tracking-wider uppercase">
                    Insights
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Top 10 communities</span>
                    <span className="font-medium">
                      {insights.concentration}% of nodes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Coupling density</span>
                    <span className="font-medium">
                      {insights.couplingDensity}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Isolated nodes</span>
                    <span className="font-medium text-red-400">
                      {insights.isolated}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Low-confidence</span>
                    <span className="font-medium text-amber-400">
                      {insights.lowConfidence}
                    </span>
                  </div>
                  {insights.maxCoupling > 0 && (
                    <div className="mt-0.5 border-t pt-1.5 text-[10px]">
                      <span className="text-muted-foreground">
                        Strongest coupling:{' '}
                      </span>
                      <span className="font-medium">
                        {insights.maxCouplingPair}
                      </span>
                      <span className="text-muted-foreground">
                        {' '}
                        ({insights.maxCoupling} edges)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Selected community info */}
              {selectedCommunity && (
                <div className="flex flex-col gap-1.5 rounded-lg border p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-3 w-3 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: selectedCommunity.color }}
                    />
                    <span className="truncate font-medium">
                      {selectedCommunity.label}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Community {selectedCommunity.id} ·{' '}
                    {selectedCommunity.nodeCount} nodes
                  </span>
                  {selectedCommunity.hasTrash && (
                    <span className="text-destructive">
                      Contains .Trash files
                    </span>
                  )}

                  {/* Linked communities in detail mode */}
                  {viewMode === 'detail' &&
                    (() => {
                      // Find actual inter-community edges for the selected community
                      const linkedEdges = [...interCommunityEdges.values()]
                        .filter(
                          (e) =>
                            e.sourceCid === selectedCommunity.id ||
                            e.targetCid === selectedCommunity.id
                        )
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 8);

                      if (linkedEdges.length === 0) return null;

                      return (
                        <div className="mt-1 flex flex-col gap-1">
                          <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                            Connected to
                          </span>
                          {linkedEdges.map((e) => {
                            const otherCid =
                              e.sourceCid === selectedCommunity.id
                                ? e.targetCid
                                : e.sourceCid;
                            const other = communities.get(otherCid);
                            if (!other) return null;
                            return (
                              <button
                                key={otherCid}
                                type="button"
                                onClick={() =>
                                  setCommunityFilter(String(otherCid))
                                }
                                className="hover:bg-accent flex items-center gap-1.5 rounded px-1 py-0.5 transition-colors"
                              >
                                <span
                                  className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                  style={{ backgroundColor: other.color }}
                                />
                                <span className="flex-1 truncate text-left">
                                  {other.label}
                                </span>
                                <span className="text-muted-foreground flex-shrink-0">
                                  {e.count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      );
                    })()}
                </div>
              )}

              {/* Selected node info */}
              {selectedNode && (() => {
                const nodeIndex = useDataStore.getState().nodeIndex;
                const degrees = useDataStore.getState().degrees;
                const idx = nodeIndex.get(selectedNode.id);
                const deg = idx !== undefined && degrees ? degrees[idx] : 0;
                const community = communities.get(selectedNode.community);

                // Find connected neighbors
                const neighbors: Array<{ node: typeof selectedNode; relation: string }> = [];
                for (const link of graphData.links) {
                  if (link.source === selectedNode.id) {
                    const targetIdx = nodeIndex.get(link.target);
                    if (targetIdx !== undefined) {
                      neighbors.push({
                        node: graphData.nodes[targetIdx]!,
                        relation: link.relation
                      });
                    }
                  } else if (link.target === selectedNode.id) {
                    const sourceIdx = nodeIndex.get(link.source);
                    if (sourceIdx !== undefined) {
                      neighbors.push({
                        node: graphData.nodes[sourceIdx]!,
                        relation: link.relation
                      });
                    }
                  }
                }
                neighbors.sort((a, b) => {
                  const degA = degrees?.[nodeIndex.get(a.node.id)!] ?? 0;
                  const degB = degrees?.[nodeIndex.get(b.node.id)!] ?? 0;
                  return degB - degA;
                });

                return (
                  <div className="flex flex-col gap-2 rounded-lg border p-3 text-xs">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        {community && (
                          <span
                            className="inline-block h-3 w-3 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: community.color }}
                          />
                        )}
                        <span className="truncate font-medium">
                          {selectedNode.label}
                        </span>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => selectNode(null)}
                        className="h-5 w-5 flex-shrink-0"
                        aria-label="Deselect"
                      >
                        <Icon
                          name="close"
                          className="h-3 w-3"
                        />
                      </Button>
                    </div>

                    {/* Metadata */}
                    <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
                      <span className="truncate">ID: {selectedNode.id}</span>
                      <span>Type: {selectedNode.file_type}</span>
                      <span>Degree: {deg}</span>
                      {community && (
                        <button
                          type="button"
                          onClick={() => setCommunityFilter(String(community.id))}
                          className="hover:underline"
                        >
                          Community: {community.label}
                        </button>
                      )}
                      <span className="truncate">File: {selectedNode.source_file}</span>
                    </div>

                    {/* Connected neighbors (top 8) */}
                    {neighbors.length > 0 && (
                      <div className="mt-1 flex flex-col gap-1">
                        <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                          Connected to ({neighbors.length})
                        </span>
                        <div className="flex flex-col gap-0.5">
                          {neighbors.slice(0, 8).map((n) => (
                            <button
                              key={n.node.id}
                              type="button"
                              onClick={() => selectNode(n.node)}
                              className="hover:bg-accent flex items-center gap-1.5 rounded px-1 py-0.5 transition-colors"
                            >
                              <span className="flex-1 truncate text-left">
                                {n.node.label}
                              </span>
                              <span className="text-muted-foreground flex-shrink-0 text-[10px]">
                                {n.relation}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </PanelSection>
          </div>
        </Card>
      )}
    </>
  );
}

export { GraphPanel };
