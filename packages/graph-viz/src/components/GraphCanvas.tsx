import { Canvas } from '@react-three/fiber';
import { WorkerPool } from '@repo/worker-pool';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useDataStore } from '../stores/dataStore';
import type { GraphData, LayoutInput } from '../types';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { GraphPanel } from './GraphPanel';
import { LoadingFallback } from './LoadingFallback';
import { NodeTooltip } from './NodeTooltip';
import { Scene } from './Scene';

// Graph data is bundled at build time — never fetch at runtime
import graphDataRaw from '../data/graph.json';

function GraphCanvas() {
  const graphData = useDataStore((s) => s.graphData);
  const isLoaded = useDataStore((s) => s.isLoaded);
  const setGraphData = useDataStore((s) => s.setGraphData);
  const setPositions = useDataStore((s) => s.setPositions);

  // Setup keyboard shortcuts
  useKeyboardShortcuts();

  // ── Load graph data on mount ──

  useEffect(() => {
    setGraphData(graphDataRaw as unknown as GraphData);
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
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [50, 40, 60], fov: 50 }}
        dpr={[1, 2]}
        className="h-full w-full"
      >
        <Scene />
      </Canvas>

      <GraphPanel />
      <NodeTooltip />
    </div>
  );
}

export { GraphCanvas };
