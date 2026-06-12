import { Canvas } from '@react-three/fiber';
import { WorkerPool } from '@repo/worker-pool';
import { useEffect } from 'react';
import { useDataStore } from '../stores/dataStore';
import type { GraphData, LayoutInput } from '../types';
import { GraphPanel } from './GraphPanel';
import { LoadingFallback } from './LoadingFallback';
import { Scene } from './Scene';

function GraphCanvas() {
  const graphData = useDataStore((s) => s.graphData);
  const isLoaded = useDataStore((s) => s.isLoaded);
  const setGraphData = useDataStore((s) => s.setGraphData);
  const setPositions = useDataStore((s) => s.setPositions);

  // ── Load graph data ──

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/src/data/graph.json');
        const data = (await response.json()) as GraphData;
        setGraphData(data);
      } catch {
        const mod = await import('../data/graph.json');
        setGraphData(mod.default as unknown as GraphData);
      }
    }
    loadData();
  }, [setGraphData]);

  // ── Run force layout ──

  useEffect(() => {
    if (!graphData) return;

    const pool = new WorkerPool<LayoutInput, Float32Array>({
      workerFactory: () =>
        new Worker(new URL('../workers/force-layout.worker', import.meta.url), {
          type: 'module'
        }),
      maxPoolSize: 1,
      serialize: (task) => ({ message: task }),
      deserialize: (event) => ({ ok: true, value: event.data as Float32Array })
    });

    pool
      .run({
        nodes: graphData.nodes,
        links: graphData.links,
        center: [0, 0, 0],
        radius: 30
      })
      .then((result) => {
        setPositions(result);
      });

    return () => {
      pool.teardown();
    };
  }, [graphData, setPositions]);

  if (!isLoaded) return <LoadingFallback />;

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [50, 40, 60], fov: 50 }}
        dpr={[1, 2]}
        className="h-full w-full"
      >
        <Scene />
      </Canvas>

      <GraphPanel />
    </div>
  );
}

export { GraphCanvas };
