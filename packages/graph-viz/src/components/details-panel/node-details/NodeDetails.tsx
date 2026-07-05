import { Badge } from '@repo/ui/data-display';
import { CONFIG } from '../../../core/config.ts';
import type { GraphNode } from '../../../core/pipeline/graphData.schema';
import { useCommunities, useLinks, useNodes } from '../../../stores/content/selectors';
import { getConnections } from '../utils';
import { ConnectionRow } from './ConnectionRow';

const MAX_CONNECTIONS_SHOWN = CONFIG.ui.maxConnectionsShown;

function NodeDetails({ node, idx }: { node: GraphNode; idx: number }) {
  const nodes = useNodes();
  const links = useLinks();
  const communities = useCommunities();
  const { incoming, outgoing } = getConnections(nodes, links, idx);
  const total = incoming.length + outgoing.length;
  const shown = outgoing
    .slice(0, MAX_CONNECTIONS_SHOWN)
    .concat(incoming.slice(0, MAX_CONNECTIONS_SHOWN));

  return (
    <>
      <div className="truncate text-base leading-tight">{node.label}</div>
      <div className="space-y-4">
        <dl className="grid grid-cols-[auto_1fr] items-center gap-4 text-xs">
          <dt className="text-muted-foreground">Community</dt>
          <dd>
            <Badge>{node.community}</Badge>
            {(() => {
              const comm = communities.find((c) => c.id === node.community);
              return comm ? (
                <span className="text-muted-foreground ml-1 text-xs">{comm.name}</span>
              ) : null;
            })()}
          </dd>
          <dt className="text-muted-foreground">Type</dt>
          <dd>
            <Badge appearance="outline">{node.file_type}</Badge>
          </dd>
        </dl>

        {total > 0 && (
          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">Connections ({total})</p>
            <ul className="max-h-60 space-y-0.5 overflow-y-auto pr-1">
              {shown.map((n, i) => (
                <ConnectionRow
                  key={`${n.id}-${String(i)}`}
                  node={n}
                  direction={i < outgoing.length ? 'out' : 'in'}
                />
              ))}
            </ul>
            {total > shown.length && (
              <p className="text-muted-foreground px-2 text-xs italic">
                +{total - shown.length} more
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export { NodeDetails };
