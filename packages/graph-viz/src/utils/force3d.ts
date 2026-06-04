import type { LinkData, NodeData } from '../types/graph';
import type { Link3D, Node3D } from '../types/graph';

const CHARGE_STRENGTH = -30;
const LINK_DISTANCE = 30;
const DAMPING = 0.9;
const ALPHA_DECAY = 0.0228;
const ALPHA_MIN = 0.001;
const VELOCITY_DECAY = 0.4;

export function create3DLayout(nodes: NodeData[], links: LinkData[]): {
  nodes: Node3D[];
  links: Link3D[];
} {
  const nodeMap = new Map<string, Node3D>();
  const linkMap: Link3D[] = [];

  // Initialize nodes with random positions
  nodes.forEach((node) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 100;
    nodeMap.set(node.id, {
      ...node,
      x: Math.cos(angle) * radius,
      y: (Math.random() - 0.5) * 100,
      z: Math.sin(angle) * radius,
      vx: 0,
      vy: 0,
      vz: 0,
    });
  });

  // Create link references
  links.forEach((link) => {
    linkMap.push({
      ...link,
      sourceId: link.source,
      targetId: link.target,
    });
  });

  return {
    nodes: Array.from(nodeMap.values()),
    links: linkMap,
  };
}

export function simulateForces(
  nodes: Node3D[],
  links: Link3D[],
  iterations = 50
): Node3D[] {
  const nodeMap = new Map<string, Node3D>();
  nodes.forEach((n) => nodeMap.set(n.id, { ...n }));

  let alpha = 1;

  for (let i = 0; i < iterations && alpha > ALPHA_MIN; i++) {
    // Apply charge forces (repulsion)
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const na = nodes[a];
        const nb = nodes[b];

        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const dz = nb.z - na.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

        const strength = (CHARGE_STRENGTH * alpha) / dist;

        na.vx -= (strength * dx) / dist;
        na.vy -= (strength * dy) / dist;
        na.vz -= (strength * dz) / dist;

        nb.vx += (strength * dx) / dist;
        nb.vy += (strength * dy) / dist;
        nb.vz += (strength * dz) / dist;
      }
    }

    // Apply link forces (attraction)
    links.forEach((link) => {
      const source = nodeMap.get(link.sourceId);
      const target = nodeMap.get(link.targetId);

      if (!source || !target) return;

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dz = target.z - source.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      const strength = ((dist - LINK_DISTANCE) / dist) * alpha;

      source.vx += strength * dx;
      source.vy += strength * dy;
      source.vz += strength * dz;

      target.vx -= strength * dx;
      target.vy -= strength * dy;
      target.vz -= strength * dz;
    });

    // Apply velocity
    nodes.forEach((n) => {
      n.x += n.vx * VELOCITY_DECAY;
      n.y += n.vy * VELOCITY_DECAY;
      n.z += n.vz * VELOCITY_DECAY;

      n.vx *= DAMPING;
      n.vy *= DAMPING;
      n.vz *= DAMPING;
    });

    alpha *= 1 - ALPHA_DECAY;
  }

  return nodes;
}
