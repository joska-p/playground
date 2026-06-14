import { Button } from '@repo/ui/Button';
import { Card } from '@repo/ui/Card';
import { Icon } from '@repo/ui/Icon';
import { Input } from '@repo/ui/Input';
import { Slider } from '@repo/ui/Slider';
import { Switch } from '@repo/ui/Switch';
import { useDataStore } from '../../../stores/dataStore';
import {
  ENTITY_TYPES,
  RELATION_TYPES,
  useUiStore
} from '../../../stores/uiStore';
import { useCommunityInsights } from '../hooks/useCommunityInsights';
import { useCommunityList } from '../hooks/useCommunityList';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import {
  findNodeNeighbors,
  getLinkedCommunities
} from '../services/insightsCalculator';
import { ColorLegend } from './ColorLegend';
import { PanelSection } from './PanelSection';

function GraphPanel() {
  const graphData = useDataStore((s) => s.graphData);
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
  const hiddenRelationTypes = useUiStore((s) => s.hiddenRelationTypes);
  const toggleRelationType = useUiStore((s) => s.toggleRelationType);
  const entityTypeFilter = useUiStore((s) => s.entityTypeFilter);
  const setEntityTypeFilter = useUiStore((s) => s.setEntityTypeFilter);

  const selectNode = useUiStore((s) => s.selectNode);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const setMinCommunitySize = useUiStore((s) => s.setMinCommunitySize);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const setAutoRotate = useUiStore((s) => s.setAutoRotate);
  const setShowEdges = useUiStore((s) => s.setShowEdges);
  const setShowHyperedges = useUiStore((s) => s.setShowHyperedges);
  const setShowNodeLabels = useUiStore((s) => s.setShowNodeLabels);
  const togglePanel = useUiStore((s) => s.togglePanel);

  // Derive selected community, view mode, and max index for keyboard nav
  const { selectedCommunity, viewMode, maxIndex } = useCommunityList();

  // Keyboard navigation for the community list
  const { focusedIndex, setFocusedIndex } = useKeyboardNav(maxIndex);

  // Compute codebase health insights from graph data
  const insights = useCommunityInsights(
    graphData,
    degrees,
    communities,
    interCommunityEdges
  );

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
            <PanelSection
              title="Navigation"
              defaultOpen={true}
            >
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
                  onFocusChange={setFocusedIndex}
                />
              )}
            </PanelSection>

            {/* Search & Filter section */}
            <PanelSection
              title="Search & Filter"
              defaultOpen={false}
            >
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
            <PanelSection
              title="Display"
              defaultOpen={false}
            >
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

            {/* Edge-type filters — hide noisy 'contains' by default */}
            <PanelSection
              title="Edge Types"
              defaultOpen={false}
            >
              <div className="flex flex-col gap-1">
                {RELATION_TYPES.map((rel) => {
                  const hidden = hiddenRelationTypes.has(rel);
                  return (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => toggleRelationType(rel)}
                      className={`flex items-center gap-2 rounded px-1.5 py-1 text-xs transition-colors ${
                        hidden
                          ? 'text-muted-foreground line-through opacity-50'
                          : 'hover:bg-accent'
                      }`}
                    >
                      <span
                        className={`inline-block h-2 w-2 rounded-sm ${
                          hidden ? 'bg-muted' : 'bg-foreground'
                        }`}
                      />
                      {rel}
                    </button>
                  );
                })}
              </div>
            </PanelSection>

            {/* Entity type filter — highlight a single entity kind */}
            <PanelSection
              title="Entity Types"
              defaultOpen={false}
            >
              <div className="flex flex-col gap-1">
                {ENTITY_TYPES.map((type) => {
                  const active = entityTypeFilter === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEntityTypeFilter(active ? '' : type)}
                      className={`flex items-center gap-2 rounded px-1.5 py-1 text-xs transition-colors ${
                        active
                          ? 'bg-accent font-medium'
                          : 'text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      <span
                        className={`inline-block h-2 w-2 rounded-sm ${
                          active ? 'bg-foreground' : 'bg-muted'
                        }`}
                      />
                      {type}
                    </button>
                  );
                })}
              </div>
            </PanelSection>

            {/* Selection section */}
            <PanelSection
              title="Selection"
              defaultOpen={true}
            >
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
                      {selectedCommunity.semantic_label ??
                        selectedCommunity.label}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex flex-wrap gap-x-2">
                    <span>Community {selectedCommunity.id}</span>
                    <span>· {selectedCommunity.nodeCount} nodes</span>
                    {selectedCommunity.dominant_package && (
                      <span className="text-[10px]">
                        · {selectedCommunity.dominant_package}
                      </span>
                    )}
                  </div>
                  {selectedCommunity.hasTrash && (
                    <span className="text-destructive">
                      Contains .Trash files
                    </span>
                  )}

                  {/* Linked communities in detail mode */}
                  {viewMode === 'detail' &&
                    (() => {
                      const linkedEdges = getLinkedCommunities(
                        selectedCommunity.id,
                        interCommunityEdges,
                        communities
                      );

                      if (linkedEdges.length === 0) return null;

                      return (
                        <div className="mt-1 flex flex-col gap-1">
                          <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                            Connected to
                          </span>
                          {linkedEdges.map(({ otherCid, other, count }) => (
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
                                {other.semantic_label ?? other.label}
                              </span>
                              <span className="text-muted-foreground flex-shrink-0">
                                {count}
                              </span>
                            </button>
                          ))}
                        </div>
                      );
                    })()}
                </div>
              )}

              {/* Selected node info */}
              {selectedNode &&
                (() => {
                  const idx = nodeIndex.get(selectedNode.id);
                  const deg = idx !== undefined && degrees ? degrees[idx] : 0;
                  const community = communities.get(selectedNode.community);

                  const neighbors = findNodeNeighbors(
                    selectedNode.id,
                    graphData.nodes,
                    graphData.links,
                    nodeIndex,
                    degrees
                  );

                  return (
                    <div className="flex flex-col gap-2 rounded-lg border p-3 text-xs">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-2">
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
                        <span>
                          {selectedNode.entity_type ?? selectedNode.file_type}
                        </span>
                        {selectedNode.package_name && (
                          <span>{selectedNode.package_name}</span>
                        )}
                        <span>Degree: {deg}</span>
                        {community && (
                          <button
                            type="button"
                            onClick={() =>
                              setCommunityFilter(String(community.id))
                            }
                            className="hover:underline"
                          >
                            {community.semantic_label ?? community.label}
                          </button>
                        )}
                        <span className="truncate">
                          {selectedNode.source_file}
                        </span>
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
