import { useMemo } from 'react';
import type React from 'react';
import type { CSSProperties } from 'react';

import type { GraphLink, GraphNode } from '../core/graph.types';
import { communityColor } from '../core/palette';

type NodePanelProps = {
  node: GraphNode;
  links: GraphLink[];
  nodes: GraphNode[];
  onClose: () => void;
};

type Neighbour = {
  dir: '→' | '←';
  rel?: string;
  node?: GraphNode;
  rawId: string;
};

function NodePanel({
  node,
  links,
  nodes,
  onClose,
}: NodePanelProps): React.JSX.Element {
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
        {neighbours.length === 20 ? '+' : ' '})
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
}

// ── Styles ──────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  panel: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 300,
    maxHeight: 'calc(100% - 32px)',
    overflowY: 'auto',
    background: 'rgba(8,12,20,0.92)',
    border: '1px solid rgba(76,201,240,0.25)',
    borderRadius: 12,
    padding: '18px 20px',
    backdropFilter: 'blur(16px)',
    color: '#e0eaf8',
    fontFamily: 'monospace',
  },
  panelClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: 'transparent',
    border: 'none',
    color: '#6080a0',
    cursor: 'pointer',
    fontSize: 14,
  },
  panelType: {
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  panelTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#e8f4ff',
    marginBottom: 4,
    wordBreak: 'break-word',
  },
  panelMeta: {
    fontSize: 11,
    color: '#5a7a9a',
    marginBottom: 2,
    wordBreak: 'break-word',
  },
  panelDivider: {
    height: 1,
    background: 'rgba(255,255,255,0.07)',
    margin: '12px 0',
  },
  panelSectionTitle: {
    fontSize: 11,
    color: '#4cc9f0',
    letterSpacing: '0.1em',
    marginBottom: 8,
  },
  neighbourList: { display: 'flex', flexDirection: 'column', gap: 4 },
  neighbourRow: { display: 'flex', alignItems: 'center', gap: 6 },
  neighbourDir: { color: '#7209b7', fontSize: 12, minWidth: 16 },
  neighbourRel: {
    fontSize: 10,
    color: '#3a6080',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    padding: '1px 5px',
    minWidth: 60,
  },
  neighbourLabel: {
    fontSize: 11,
    color: '#a0c0d8',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 160,
  },
};

export { NodePanel };
export type { NodePanelProps };
