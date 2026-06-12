import { Badge } from '@repo/ui/Badge';
import { Button } from '@repo/ui/Button';
import { Card } from '@repo/ui/Card';
import { Icon } from '@repo/ui/Icon';
import { Input } from '@repo/ui/Input';
import { Slider } from '@repo/ui/Slider';
import { Switch } from '@repo/ui/Switch';
import { useMemo } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';

function GraphPanel() {
  const graphData = useDataStore((s) => s.graphData);
  const communities = useDataStore((s) => s.communities);
  const interCommunityEdges = useDataStore((s) => s.interCommunityEdges);

  const selectedNode = useUiStore((s) => s.selectedNode);
  const searchQuery = useUiStore((s) => s.searchQuery);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const communityFilter = useUiStore((s) => s.communityFilter);
  const autoRotate = useUiStore((s) => s.autoRotate);
  const showEdges = useUiStore((s) => s.showEdges);
  const showNodeLabels = useUiStore((s) => s.showNodeLabels);
  const isPanelOpen = useUiStore((s) => s.isPanelOpen);

  const selectNode = useUiStore((s) => s.selectNode);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const setMinCommunitySize = useUiStore((s) => s.setMinCommunitySize);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const setAutoRotate = useUiStore((s) => s.setAutoRotate);
  const setShowEdges = useUiStore((s) => s.setShowEdges);
  const setShowNodeLabels = useUiStore((s) => s.setShowNodeLabels);
  const togglePanel = useUiStore((s) => s.togglePanel);

  // Derive view mode from communityFilter
  const selectedCommunityId = useMemo(() => {
    const trimmed = communityFilter.trim();
    return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : null;
  }, [communityFilter]);
  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  // Sorted community list for display (overview only)
  const communityList = useMemo(() => {
    return [...communities.values()]
      .filter((c) => c.nodeCount >= minCommunitySize)
      .sort((a, b) => b.nodeCount - a.nodeCount)
      .slice(0, 50);
  }, [communities, minCommunitySize]);

  // Selected community info
  const selectedCommunity =
    selectedCommunityId !== null ? communities.get(selectedCommunityId) : null;

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
            {/* Back to overview (detail mode) */}
            {viewMode === 'detail' && (
              <Button
                variant="ghost"
                onClick={() => setCommunityFilter('')}
                className="self-start text-xs"
              >
                ← Back to overview
              </Button>
            )}

            {/* Search */}
            <Input
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />

            {/* Community size filter */}
            <Slider
              label="Min community size"
              min={1}
              max={20}
              value={minCommunitySize}
              onChange={setMinCommunitySize}
            />

            {/* Community IDs filter */}
            <Input
              label="Community IDs"
              placeholder="e.g. 1, 5, 12-20"
              value={communityFilter}
              onChange={(e) => setCommunityFilter(e.target.value)}
              helperText="Filter specific communities"
              fullWidth
            />

            {/* Toggles */}
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
              {viewMode === 'detail' && (
                <Switch
                  label="Show labels"
                  checked={showNodeLabels}
                  onCheckedChange={setShowNodeLabels}
                />
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">
                {viewMode === 'detail' && selectedCommunity
                  ? `1/${communities.size} comm`
                  : `${communityList.length}/${communities.size} comms`}
              </Badge>
              <Badge variant="secondary">{graphData.nodes.length} nodes</Badge>
              <Badge variant="secondary">{graphData.links.length} edges</Badge>
            </div>

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

            {/* Community list (overview mode) */}
            {viewMode === 'overview' && communityList.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs font-medium">
                  Communities
                </span>
                {communityList.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCommunityFilter(String(c.id))}
                    className="hover:bg-accent flex items-center gap-2 rounded px-1.5 py-1 text-xs transition-colors"
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="flex-1 truncate text-left">{c.label}</span>
                    <span className="text-muted-foreground flex-shrink-0">
                      {c.nodeCount}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Selected node info */}
            {selectedNode && (
              <div className="flex flex-col gap-1.5 rounded-lg border p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="truncate font-medium">
                    {selectedNode.label}
                  </span>
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
                <span className="text-muted-foreground truncate">
                  {selectedNode.id}
                </span>
                <span className="text-muted-foreground">
                  {selectedNode.file_type}
                </span>
                <span className="text-muted-foreground truncate">
                  {selectedNode.source_file}
                </span>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
}

export { GraphPanel };
