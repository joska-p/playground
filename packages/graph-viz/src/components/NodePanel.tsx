// graph/NodePanel.tsx
// Detail panel shown when a node is selected.

import { useMemo } from 'react';
import type { GraphNode, GraphLink } from './types';
import { communityColor } from './palette';
import { styles } from './styles';

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
    <div style={styles.panel}>
      <button
        style={styles.panelClose}
        onClick={onClose}
      >
        ✕
      </button>

      <div
        style={{ ...styles.panelType, color: communityColor(node.community) }}
      >
        {(node.file_type ?? 'node').toUpperCase()} · community {node.community}
      </div>

      <div style={styles.panelTitle}>{node.label}</div>
      <div style={styles.panelMeta}>{node.source_file}</div>
      {node.source_location && (
        <div style={styles.panelMeta}>{node.source_location}</div>
      )}

      <div style={styles.panelDivider} />

      <div style={styles.panelSectionTitle}>
        Connections ({neighbours.length}
        {neighbours.length === 20 ? '+' : ''})
      </div>

      <div style={styles.neighbourList}>
        {neighbours.map((nb, i) => (
          <div
            key={i}
            style={styles.neighbourRow}
          >
            <span style={styles.neighbourDir}>{nb.dir}</span>
            <span style={styles.neighbourRel}>{nb.rel}</span>
            <span style={styles.neighbourLabel}>
              {nb.node?.label ?? nb.rawId}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NodePanel };
