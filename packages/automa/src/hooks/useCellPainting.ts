import { useCallback, useRef } from 'react';
import type * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import type { CellValue } from '../core/types.ts';
import type { BrushMode } from '../stores/automaton/types.ts';

type CellPaintingHandlers = {
  meshRef: React.RefObject<THREE.Mesh | undefined>;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
  onPointerUp: () => void;
  onContextMenu: (e: ThreeEvent<MouseEvent>) => void;
};

const useCellPainting = (
  cols: number,
  rows: number,
  brushMode: BrushMode,
  paintCell: (index: number, value: CellValue) => void,
): CellPaintingHandlers => {
  const meshRef = useRef<THREE.Mesh>(undefined);
  const isPainting = useRef(false);

  const paintAtGridPosition = useCallback(
    (point: THREE.Vector3, shiftKey: boolean) => {
      const col = Math.floor(point.x);
      const row = Math.floor(point.y);

      if (col < 0 || col >= cols || row < 0 || row >= rows) return;
      if (shiftKey) return;

      const index = row * cols + col;
      paintCell(index, brushMode === 'erase' ? 0 : 1);
    },
    [cols, rows, brushMode, paintCell],
  );

  const onPointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (e.object !== meshRef.current) return;
      if (e.button !== 0) return;
      isPainting.current = true;
      paintAtGridPosition(e.point, e.shiftKey);
    },
    [paintAtGridPosition],
  );

  const onPointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!isPainting.current) return;
      if (e.object !== meshRef.current) return;
      if (e.buttons !== 1) return;
      paintAtGridPosition(e.point, e.shiftKey);
    },
    [paintAtGridPosition],
  );

  const onPointerUp = useCallback(() => {
    isPainting.current = false;
  }, []);

  const onContextMenu = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.nativeEvent.preventDefault();
  }, []);

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
