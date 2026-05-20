import { FT_COLOR, REL_COLORS } from "../constants";
import { communityColor } from "../utils/colors";
import { useGraphStore } from "../store/useGraphStore";
import { Badge, Button } from "@repo/ui";

export function DetailPanel() {
  const selectedNode = useGraphStore((s) => s.selectedNode);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);
  const graphData = useGraphStore((s) => s.graphData);

  if (!selectedNode) return null;

  const links = graphData?.links ?? [];
  const nodes = graphData?.nodes ?? [];
  const connections = links.filter((l) => l.s === selectedNode.id || l.t === selectedNode.id);

  return (
    <aside className="w-64 p-0">
      <div className="bg-[#0b1628] border-l border-slate-800 p-4 overflow-y-auto text-sm">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-semibold text-sky-400 break-words">{selectedNode.label}</h3>
          <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
            ×
          </Button>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 items-start">
          <span className="text-slate-500 pt-1">ID</span>
          <span className="text-slate-400 break-all">{selectedNode.id}</span>

          <span className="text-slate-500 pt-1">Type</span>
          <span className="text-slate-400"><Badge variant="accent" size="sm">{selectedNode.ft || '—'}</Badge></span>

          <span className="text-slate-500 pt-1">Community</span>
          <span className="text-slate-400"><Badge variant="outline" size="sm">{String(selectedNode.c)}</Badge></span>

          <span className="text-slate-500 pt-1">Source</span>
          <span className="text-slate-400 break-all">{selectedNode.sf || '—'}</span>
        </div>

        <div className="mt-4 border-t border-slate-800 pt-3">
          <div className="text-slate-500 text-xs uppercase tracking-wider mb-2">Connections ({connections.length})</div>

          {connections.slice(0, 20).map((l) => {
            const otherId = l.s === selectedNode.id ? l.t : l.s;
            const other = nodes.find((n) => n.id === otherId);
            return (
              <div
                key={otherId}
                onClick={() => other && setSelectedNode(other)}
                className="mb-2 p-2 bg-[#0f172a] rounded cursor-pointer border-l-4"
                style={{ borderLeftColor: REL_COLORS[l.r] ?? '#334155' }}
              >
                <div className="mb-1"><Badge variant="outline" size="sm">{l.r}</Badge></div>
                <div className="text-slate-400 text-sm break-words">{other?.label ?? otherId}</div>
              </div>
            );
          })}

          {connections.length > 20 && (
            <div className="text-slate-500 text-xs text-center pt-1">+{connections.length - 20} more</div>
          )}
        </div>
      </div>
    </aside>
  );
}
