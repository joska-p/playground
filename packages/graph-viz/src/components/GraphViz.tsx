import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';

import { useGraphData } from '../hooks/useGraphData';
import { useForceSimulationWorker } from '../hooks/useForceSimulationWorker';
import { create3DLayout } from '../utils/force3d';
import { Scene3D } from './Scene3D';

function GraphVizContent() {
  const { data, loading, error } = useGraphData();
  const { simulate } = useForceSimulationWorker();
  const [selectedNode, setSelectedNode] = useState<string | undefined>();
  const [hoveredNode, setHoveredNode] = useState<string | undefined>();
  const [showLinks, setShowLinks] = useState(true);
  const [layout, setLayout] = useState<ReturnType<
    typeof create3DLayout
  > | null>(null);

  // Initialize and simulate layout with web worker
  useEffect(() => {
    if (!data) return;

    const initializeLayout = async () => {
      // Limit nodes for performance
      const maxNodes = 500;
      const nodeSlice = data.nodes.slice(0, maxNodes);
      const nodeIds = new Set(nodeSlice.map((n) => n.id));
      const linkSlice = data.links.filter(
        (l) => nodeIds.has(l.source) && nodeIds.has(l.target)
      );

      // Create initial layout
      const currentLayout = create3DLayout(nodeSlice, linkSlice);

      // Run simulation in web worker chunks
      const chunks = 5;
      const iterationsPerChunk = 50;

      for (let i = 0; i < chunks; i++) {
        currentLayout.nodes = await simulate(
          currentLayout.nodes,
          currentLayout.links,
          iterationsPerChunk
        );
        setLayout({ ...currentLayout });
      }
    };

    initializeLayout();
  }, [data, simulate]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg border border-red-500 bg-red-50 p-6">
          <h2 className="mb-2 text-lg font-bold text-red-900">
            Error Loading Graph
          </h2>
          <p className="text-red-800">{error.message}</p>
        </div>
      </div>
    );
  }

  if (loading || !layout) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-foreground/60">Loading graph visualization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene3D
            layout={layout}
            selectedNode={selectedNode}
            hoveredNode={hoveredNode}
            onNodeHover={setHoveredNode}
            onNodeSelect={setSelectedNode}
            showLinks={showLinks}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="pointer-events-none absolute left-0 top-0 p-4">
        <div className="rounded-lg bg-black/50 px-4 py-3 text-sm text-white backdrop-blur">
          <p>Nodes: {layout.nodes.length}</p>
          <p>Links: {layout.links.length}</p>
          {selectedNode && (
            <p className="mt-2 text-blue-300">
              Selected: {layout.nodes.find((n) => n.id === selectedNode)?.label}
            </p>
          )}
          {hoveredNode && (
            <p className="text-green-300">
              Hover: {layout.nodes.find((n) => n.id === hoveredNode)?.label}
            </p>
          )}
        </div>
      </div>

      <div className="pointer-events-auto absolute right-0 top-0 p-4">
        <button
          onClick={() => setShowLinks(!showLinks)}
          className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
            showLinks
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-600 text-gray-200 hover:bg-gray-700'
          }`}
        >
          {showLinks ? '🔗 Links On' : '🔗 Links Off'}
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 p-4">
        <div className="rounded-lg bg-black/50 px-4 py-2 text-xs text-gray-400 backdrop-blur">
          <p>🖱 Orbit: Drag</p>
          <p>⚙ Zoom: Scroll</p>
          <p>👆 Click: Select</p>
        </div>
      </div>
    </div>
  );
}

function GraphViz() {
  return <GraphVizContent />;
}

export { GraphViz };
