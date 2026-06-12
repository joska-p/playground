import { useRef, useEffect, useMemo } from 'react';
import type { Sprite } from 'three';
import { CanvasTexture } from 'three';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';

function SelectedNodeGlow() {
  const ref = useRef<Sprite>(null);
  const positions = useDataStore((s) => s.positions);
  const nodeIndex = useDataStore((s) => s.nodeIndex);
  const selectedNode = useUiStore((s) => s.selectedNode);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new CanvasTexture(canvas);
  }, []);

  useEffect(() => {
    if (!selectedNode || !positions || !ref.current) return;
    const idx = nodeIndex.get(selectedNode.id);
    if (idx === undefined) return;
    ref.current.position.set(
      positions[idx * 3],
      positions[idx * 3 + 1],
      positions[idx * 3 + 2],
    );
  }, [selectedNode, positions, nodeIndex]);

  if (!selectedNode) return null;

  return (
    <sprite ref={ref} scale={[12, 12, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        opacity={0.8}
        blending={2}
      />
    </sprite>
  );
}

export { SelectedNodeGlow };
