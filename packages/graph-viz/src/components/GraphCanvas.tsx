import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { WorkerPool } from '@repo/worker-pool';
import type { GraphData, GraphNode, GraphLink, LayoutInput } from '../types';
import { GraphNodes } from './GraphNodes';
import { GraphEdges } from './GraphEdges';

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      Computing graph layout...
    </div>
  );
}

function Scene({
  positions,
  nodes,
  links,
  nodeIndex,
}: {
  positions: Float32Array;
  nodes: GraphNode[];
  links: GraphLink[];
  nodeIndex: Map<string, number>;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      <directionalLight position={[-10, 0, -20]} intensity={0.4} />

      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={5}
        maxDistance={200}
      />

      <GraphNodes positions={positions} nodes={nodes} />
      <GraphEdges positions={positions} links={links} nodeIndex={nodeIndex} />
    </>
  );
}

function GraphCanvas() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);

  // Load graph data
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/src/data/graph.json');
        const data = (await response.json()) as GraphData;
        setGraphData(data);
      } catch {
        // In dev mode Vite serves src/; fallback for edge cases
        const mod = await import('../data/graph.json');
        setGraphData(mod.default as unknown as GraphData);
      }
    }

    loadData();
  }, []);

  // Run force layout via WorkerPool once data is loaded
  useEffect(() => {
    if (!graphData) return;

    const pool = new WorkerPool<LayoutInput, Float32Array>({
      workerFactory: () =>
        new Worker(new URL('../workers/force-layout.worker', import.meta.url), {
          type: 'module',
        }),
      maxPoolSize: 1,
      serialize: (task) => ({ message: task }),
      deserialize: (event) => ({ ok: true, value: event.data as Float32Array }),
    });

    pool
      .run({
        nodes: graphData.nodes,
        links: graphData.links,
        center: [0, 0, 0],
        radius: 30,
      })
      .then((result) => {
        setPositions(result);
      });

    return () => {
      pool.teardown();
    };
  }, [graphData]);

  // Derived data: node index for edge construction
  const nodeIndex = useMemo(() => {
    if (!graphData) return new Map<string, number>();
    const idx = new Map<string, number>();
    graphData.nodes.forEach((node, i) => idx.set(node.id, i));
    return idx;
  }, [graphData]);

  if (!graphData || !positions) return <LoadingFallback />;

  return (
    <Canvas
      camera={{ position: [50, 40, 60], fov: 50 }}
      dpr={[1, 2]}
      className="h-full w-full"
    >
      <Scene
        positions={positions}
        nodes={graphData.nodes}
        links={graphData.links}
        nodeIndex={nodeIndex}
      />
    </Canvas>
  );
}

export { GraphCanvas };
