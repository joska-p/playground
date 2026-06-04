import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

import type { GraphLink, GraphNode } from '../core/graph.types';
import { makeWorkerSrc } from '../core/force-layout-worker';
import type { ThreeState } from './useThreeScene';

const SIM_ITERATIONS = 120;

type UseForceSimulationResult = {
  simProgress: number;
  simDone: boolean;
};

/**
 * Spawns a disposable Web Worker that runs the force-directed layout.
 * Updates node positions and edge lines on each progress tick via the
 * shared ThreeState ref.
 */
function useForceSimulation(
  threeRef: RefObject<ThreeState | null>,
  nodes: GraphNode[],
  links: GraphLink[]
): UseForceSimulationResult {
  const [simProgress, setSimProgress] = useState(0);
  const [simDone, setSimDone] = useState(false);

  useEffect(() => {
    const state = threeRef.current;
    if (!state || nodes.length === 0) return;

    const src = makeWorkerSrc(nodes, links);
    const blob = new Blob([src], { type: 'application/javascript' });
    const blobUrl = URL.createObjectURL(blob);
    const worker = new Worker(blobUrl);

    worker.onmessage = (
      e: MessageEvent<{ type: string; iter: number; pos: Float32Array }>
    ) => {
      const { type, iter, pos } = e.data;
      if (type === 'progress') {
        setSimProgress(Math.round(((iter + 1) / SIM_ITERATIONS) * 100));
        applyPositions(state, links, pos);
      }
      if (type === 'done') {
        setSimDone(true);
        worker.terminate();
        URL.revokeObjectURL(blobUrl);
      }
    };

    return () => {
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, links]);

  return { simProgress, simDone };
}

// ── Position application ────────────────────────────────────────────────────

function applyPositions(
  state: ThreeState,
  links: GraphLink[],
  pos: Float32Array
): void {
  const { mesh, lineBuf, lineAttr, lines, idToIdx, dummy } = state;

  // Update node spheres
  for (let i = 0; i < state.nodes.length; i++) {
    const x = pos[i * 3];
    const y = pos[i * 3 + 1];
    const z = pos[i * 3 + 2];
    if (!isFinite(x) || !isFinite(y) || !isFinite(z)) continue;
    dummy.position.set(x, y, z);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  // Update edge lines
  if (links.length > 0) {
    let anyWritten = false;
    for (let e = 0; e < links.length; e++) {
      const si = idToIdx.get(links[e]!.source);
      const ti = idToIdx.get(links[e]!.target);
      if (si === undefined || ti === undefined) continue;
      const sx = pos[si * 3],
        sy = pos[si * 3 + 1],
        sz = pos[si * 3 + 2];
      const tx = pos[ti * 3],
        ty = pos[ti * 3 + 1],
        tz = pos[ti * 3 + 2];
      if (
        !isFinite(sx) ||
        !isFinite(sy) ||
        !isFinite(sz) ||
        !isFinite(tx) ||
        !isFinite(ty) ||
        !isFinite(tz)
      )
        continue;
      lineBuf[e * 6] = sx;
      lineBuf[e * 6 + 1] = sy;
      lineBuf[e * 6 + 2] = sz;
      lineBuf[e * 6 + 3] = tx;
      lineBuf[e * 6 + 4] = ty;
      lineBuf[e * 6 + 5] = tz;
      anyWritten = true;
    }
    lineAttr.needsUpdate = true;
    if (anyWritten) lines.visible = true;
  }
}

export { useForceSimulation };
