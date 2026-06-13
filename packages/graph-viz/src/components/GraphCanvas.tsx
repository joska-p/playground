import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
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

  // Loading progress: 0-1
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Setup keyboard shortcuts
  useKeyboardShortcuts();

  // Toast hint for rotation toggle
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, [showHint]);

  // ── Load graph data on mount ──

  useEffect(() => {
    setGraphData(graphDataRaw as unknown as GraphData);
  }, [setGraphData]);

  // ── Run force layout with progress tracking ──

  useEffect(() => {
    if (!graphData) return;

    const worker = new Worker(
      new URL('../workers/force-layout.worker', import.meta.url),
      { type: 'module' }
    );

    worker.addEventListener('message', (event) => {
      const data = event.data;

      if (data.type === 'progress') {
        setLoadingProgress(data.progress as number);
      } else if (data.type === 'result') {
        setPositions(data.positions as Float32Array);
        setLoadingProgress(1);
        worker.terminate();
      }
    });

    worker.addEventListener('error', () => {
      setLoadingProgress(0);
      worker.terminate();
    });

    const task: LayoutInput = {
      nodes: graphData.nodes,
      links: graphData.links,
      center: [0, 0, 0],
      radius: 30
    };

    worker.postMessage(task);

    return () => {
      worker.terminate();
    };
  }, [graphData, setPositions]);

  if (!isLoaded) return <LoadingFallback progress={loadingProgress} />;

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
      {showHint && (
        <div className="bg-background/80 pointer-events-none absolute top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2 text-xs shadow-lg backdrop-blur-sm">
          Press <kbd className="rounded border px-1 font-mono">R</kbd> to toggle rotation
        </div>
      )}
    </div>
  );
}

export { GraphCanvas };
