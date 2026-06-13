import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useDataStore } from '../stores/dataStore';
import type { PreparedGraphData } from '../types';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { GraphPanel } from '../features/panel/components/GraphPanel';
import { NodeTooltip } from '../features/annotation/components/NodeTooltip';
import { Scene } from '../features/scene/components/Scene';

// Graph data is bundled at build time — never fetch or compute at runtime
import graphPreparedData from '../data/graph-prepared.json';

function GraphCanvas() {
  const isLoaded = useDataStore((s) => s.isLoaded);
  const setPreparedData = useDataStore((s) => s.setPreparedData);

  // Toast hint for rotation toggle
  const [showHint, setShowHint] = useState(true);

  useKeyboardShortcuts();

  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, [showHint]);

  // ── Load precomputed data on mount ──
  useEffect(() => {
    setPreparedData(graphPreparedData as unknown as PreparedGraphData);
  }, [setPreparedData]);

  if (!isLoaded) return null;

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
