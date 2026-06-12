// graph/useSimulation.ts
// Runs the force-simulation Web Worker and writes node positions into a
// shared Float32Array ref so Three.js objects can read them each frame.

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import type { GraphLink, GraphNode } from './types';
import { makeWorkerSrc } from './workerSrc';

type Options = {
  nodes: GraphNode[];
  links: GraphLink[];
  /** Ref that receives the flat [x,y,z, x,y,z, …] positions array. */
  posRef: RefObject<Float32Array | null>;
  onProgress: (pct: number) => void;
  onDone: () => void;
};

/**
 * Spawns a Web Worker that runs the force simulation and streams positions
 * back on every EVERY-th iteration.  Positions are written into `posRef.current`
 * so R3F components can consume them inside useFrame without re-renders.
 */
export function useSimulation({
  nodes,
  links,
  posRef,
  onProgress,
  onDone
}: Options) {
  // Track whether the effect is still mounted so stale worker messages are ignored.
  const activeRef = useRef(true);

  useEffect(() => {
    if (nodes.length === 0) return;
    activeRef.current = true;

    // Seed posRef with random initial positions immediately — the Canvas
    // will show the cloud before the worker sends its first update.
    const initPos = new Float32Array(nodes.length * 3);
    for (let i = 0; i < nodes.length; i++) {
      const th = Math.acos(2 * Math.random() - 1);
      const ph = Math.PI * 2 * Math.random();
      const r = 80 + Math.random() * 40;
      initPos[i * 3] = r * Math.sin(th) * Math.cos(ph);
      initPos[i * 3 + 1] = r * Math.sin(th) * Math.sin(ph);
      initPos[i * 3 + 2] = r * Math.cos(th);
    }
    posRef.current = initPos;

    // Spin up the worker
    const src = makeWorkerSrc(nodes, links);
    const blob = new Blob([src], { type: 'application/javascript' });
    const blobUrl = URL.createObjectURL(blob);
    const worker = new Worker(blobUrl);

    worker.onmessage = (
      e: MessageEvent<{ type: string; iter: number; pos: Float32Array }>
    ) => {
      if (!activeRef.current) return;
      const { type, iter, pos } = e.data;
      if (type === 'progress') {
        posRef.current = pos; // replace reference — R3F reads it next frame
        onProgress(Math.round(((iter + 1) / 120) * 100));
      }
      if (type === 'done') {
        onDone();
        worker.terminate();
        URL.revokeObjectURL(blobUrl);
      }
    };

    return () => {
      activeRef.current = false;
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, links]);
}
