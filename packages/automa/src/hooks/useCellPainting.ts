import { useRef } from 'react';
import type * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import type { CellValue } from '../core/types.ts';
import type { BrushMode } from '../stores/ui/store.ts';

type CellPaintingHandlers = {
  meshRef: React.RefObject<THREE.Mesh | null>;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
  onPointerUp: () => void;
  onContextMenu: (e: ThreeEvent<MouseEvent>) => void;
};

const useCellPainting = (
  cols: number,
  rows: number,
  brushMode: BrushMode,
  paintCell: (index: number, value: CellValue) => void
): CellPaintingHandlers => {
  const meshRef = useRef<THREE.Mesh>(null);
  const isPainting = useRef(false);

  const paintAtGridPosition = (point: THREE.Vector3, shiftKey: boolean) => {
    const col = Math.floor(point.x);
    const row = Math.floor(point.y);

    if (col < 0 || col >= cols || row < 0 || row >= rows) return;
    if (shiftKey) return;

    const index = row * cols + col;
    paintCell(index, brushMode === 'erase' ? 0 : 1);
  };

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.object !== meshRef.current) return;
    if (e.button !== 0) return; // Only react to primary mouse button
    isPainting.current = true;
    paintAtGridPosition(e.point, e.shiftKey);
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isPainting.current) return;
    if (e.object !== meshRef.current) return;
    paintAtGridPosition(e.point, e.shiftKey);
  };

  const onPointerUp = () => {
    isPainting.current = false;
  };

  const onContextMenu = (e: ThreeEvent<MouseEvent>) => {
    e.nativeEvent.preventDefault();
  };

  return {
    meshRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onContextMenu,
  };
};

export { useCellPainting };
export type { CellPaintingHandlers };
