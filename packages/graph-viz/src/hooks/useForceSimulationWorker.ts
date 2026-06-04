import { useEffect, useRef } from 'react';

import type { Link3D, Node3D } from '../types/graph';

export function useForceSimulationWorker() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const workerCode = new URL('../workers/force-simulation.worker.ts', import.meta.url);
    workerRef.current = new Worker(workerCode, { type: 'module' });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const simulate = (
    nodes: Node3D[],
    links: Link3D[],
    iterations: number
  ): Promise<Node3D[]> => {
    return new Promise((resolve) => {
      if (!workerRef.current) {
        resolve(nodes);
        return;
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'result') {
          workerRef.current?.removeEventListener('message', handleMessage);
          resolve(event.data.nodes);
        }
      };

      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.postMessage({
        type: 'simulate',
        nodes,
        links,
        iterations,
      });
    });
  };

  return { simulate };
}
