import { Badge } from '@repo/ui/Badge';
import { Button } from '@repo/ui/Button';
import { Card } from '@repo/ui/Card';
import { Icon } from '@repo/ui/Icon';
import { Input } from '@repo/ui/Input';
import { Slider } from '@repo/ui/Slider';
import { Switch } from '@repo/ui/Switch';

type GraphPanelProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  minCommunitySize: number;
  onMinCommunitySizeChange: (size: number) => void;
  communityFilter: string;
  onCommunityFilterChange: (input: string) => void;
  autoRotate: boolean;
  onAutoRotateChange: (on: boolean) => void;
  showEdges: boolean;
  onShowEdgesChange: (on: boolean) => void;
  totalNodes: number;
  visibleNodes: number;
  totalLinks: number;
  visibleLinks: number;
  totalCommunities: number;
  visibleCommunities: number;
  isPanelOpen: boolean;
  onPanelToggle: () => void;
};

function GraphPanel({
  searchQuery,
  onSearchChange,
  minCommunitySize,
  onMinCommunitySizeChange,
  communityFilter,
  onCommunityFilterChange,
  autoRotate,
  onAutoRotateChange,
  showEdges,
  onShowEdgesChange,
  totalNodes,
  visibleNodes,
  totalLinks,
  visibleLinks,
  totalCommunities,
  visibleCommunities,
  isPanelOpen,
  onPanelToggle,
}: GraphPanelProps) {
  return (
    <>
      {/* Toggle button — always visible */}
      <Button
        size="icon"
        variant="ghost"
        onClick={onPanelToggle}
        className="absolute right-3 top-3 z-50"
        aria-label={isPanelOpen ? 'Close panel' : 'Open panel'}
      >
        <Icon name="wrench" className="h-4 w-4" />
      </Button>

      {/* Panel */}
      {isPanelOpen && (
        <Card className="absolute right-3 top-12 z-50 w-72 overflow-y-auto backdrop-blur-md">
          <div className="flex flex-col gap-4 p-4">
            {/* Search */}
            <Input
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              fullWidth
            />

            {/* Community size filter */}
            <Slider
              label="Min community size"
              min={1}
              max={20}
              value={minCommunitySize}
              onChange={onMinCommunitySizeChange}
            />

            {/* Community IDs */}
            <Input
              label="Community IDs"
              placeholder="e.g. 1, 5, 12-20"
              value={communityFilter}
              onChange={(e) => onCommunityFilterChange(e.target.value)}
              helperText="Filter specific communities"
              fullWidth
            />

            {/* Toggles */}
            <div className="flex flex-col gap-2">
              <Switch
                label="Auto-rotate"
                checked={autoRotate}
                onCheckedChange={onAutoRotateChange}
              />
              <Switch
                label="Show edges"
                checked={showEdges}
                onCheckedChange={onShowEdgesChange}
              />
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">
                {visibleCommunities}/{totalCommunities} comms
              </Badge>
              <Badge variant="secondary">
                {visibleNodes}/{totalNodes} nodes
              </Badge>
              <Badge variant="secondary">
                {visibleLinks}/{totalLinks} edges
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

export { GraphPanel };
