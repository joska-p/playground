// graph/NodePanel.tsx
// Detail panel shown when a node is selected.

import { useMemo } from 'react';
import type { GraphNode, GraphLink } from './types';
import { communityColor } from './palette';
import s from './styles';

type Neighbour = {
  dir: '→' | '←';
  rel?: string;
  node?: GraphNode;
  rawId: string;
};

type Props = {
  node: GraphNode;
  links: GraphLink[];
  nodes: GraphNode[];
  onClose: () => void;
};

const NodePanel = ({ node, links, nodes, onClose }: Props) => {
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const neighbours = useMemo<Neighbour[]>(() => {
    const out: Neighbour[] = [];
    for (const l of links) {
      if (l.source === node.id)
        out.push({
          dir: '→',
          rel: l.relation,
          node: nodeMap.get(l.target),
          rawId: l.target,
        });
      else if (l.target === node.id)
        out.push({
          dir: '←',
          rel: l.relation,
          node: nodeMap.get(l.source),
          rawId: l.source,
        });
      if (out.length >= 20) break;
    }
    return out;
  }, [node, links, nodeMap]);

  return (
    <div style={s.panel}>
      <button
        style={s.panelClose}
        onClick={onClose}
      >
        ✕
      </button>

      <div style={{ ...s.panelType, color: communityColor(node.community) }}>
        {(node.file_type ?? 'node').toUpperCase()} · community {node.community}
      </div>

      <div style={s.panelTitle}>{node.label}</div>
      <div style={s.panelMeta}>{node.source_file}</div>
      {node.source_location && (
        <div style={s.panelMeta}>{node.source_location}</div>
      )}

      <div style={s.panelDivider} />

      <div style={s.panelSectionTitle}>
        Connections ({neighbours.length}
        {neighbours.length === 20 ? '+' : ''})
      </div>

      <div style={s.neighbourList}>
        {neighbours.map((nb, i) => (
          <div
            key={i}
            style={s.neighbourRow}
          >
            <span style={s.neighbourDir}>{nb.dir}</span>
            <span style={s.neighbourRel}>{nb.rel}</span>
            <span style={s.neighbourLabel}>{nb.node?.label ?? nb.rawId}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NodePanel };
