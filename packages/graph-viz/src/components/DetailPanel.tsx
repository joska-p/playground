import { cn } from '@repo/ui/cn';
import { FT_COLOR, REL_COLORS } from '../constants';
import { RAW_GRAPH } from '../data/graphData';
import {
  setGraphSelectedNode,
  useGraphSelectedNode,
} from '../store/graphStore';
import { communityColor } from '../utils/colors';

export function DetailPanel() {
  const selectedNode = useGraphSelectedNode();

  if (!selectedNode) return null;

  const connections = RAW_GRAPH.links.filter(
    (l) => l.s === selectedNode.id || l.t === selectedNode.id
  );

  return (
    <div className="flex w-65 shrink-0 flex-col overflow-y-auto border-l border-border bg-background p-4 text-sm">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <span className="flex-1 wrap-break-words font-bold text-primary">
          {selectedNode.label}
        </span>
        <button
          onClick={() => setGraphSelectedNode(null)}
          className="p-0 pl-2 text-base leading-none text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-2">
        <MetaRow
          label="ID"
          value={selectedNode.id}
          mono
        />
        <MetaRow
          label="Type"
          value={selectedNode.ft || '—'}
          color={FT_COLOR[selectedNode.ft]}
          bold
        />
        <MetaRow
          label="Community"
          value={String(selectedNode.c)}
          color={communityColor(selectedNode.c)}
          bold
        />
        <MetaRow
          label="Source"
          value={selectedNode.sf || '—'}
          mono
          small
        />
      </div>

      {/* Connections list */}
      <div className="mt-4 border-t border-border pt-3">
        <span className="mb-2 block text-sm uppercase tracking-[0.08em] text-muted-foreground">
          Connections ({connections.length})
        </span>

        {connections.slice(0, 20).map((l) => {
          const otherId = l.s === selectedNode.id ? l.t : l.s;
          const other = RAW_GRAPH.nodes.find((n) => n.id === otherId);
          return (
            <div
              key={otherId}
              onClick={() => other && setGraphSelectedNode(other)}
              className={cn(
                'mb-2 cursor-pointer rounded border-l-2 bg-card pl-1 pr-2 py-1',
                `border-l-[${REL_COLORS[l.r] ?? '#334155'}]`
              )}
            >
              <span
                className="mb-1 block text-xs uppercase tracking-[0.06em]"
                style={{ color: REL_COLORS[l.r] ?? '#64748b' }}
              >
                {l.r}
              </span>
              <span className="block wrap-break-words text-xs text-foreground">
                {other?.label ?? otherId}
              </span>
            </div>
          );
        })}

        {connections.length > 20 && (
          <span className="block pt-1 text-center text-xs text-muted-foreground">
            +{connections.length - 20} more
          </span>
        )}
      </div>
    </div>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

type MetaRowProps = {
  label: string;
  value: string;
  color?: string | undefined;
  bold?: boolean;
  mono?: boolean;
  small?: boolean;
};

function MetaRow({ label, value, color, bold, small }: MetaRowProps) {
  return (
    <>
      <span className="pt-1 text-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          'break-all text-foreground',
          bold && 'font-semibold',
          small ? 'text-xs' : 'text-sm'
        )}
        style={{ color: color ?? undefined }}
      >
        {value}
      </span>
    </>
  );
}
