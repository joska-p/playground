import { useCallback, useRef } from 'react';
import type * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import type { CellValue } from '../core/types.ts';
import type { ToolMode } from '../stores/automaton/types.ts';

type PointerHandlers = {
  meshRef: React.RefObject<THREE.Mesh | undefined>;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
  onPointerUp: () => void;
  onContextMenu: (e: ThreeEvent<MouseEvent>) => void;
};

const usePointerPaint = (
  cols: number,
  rows: number,
  toolMode: ToolMode,
  paintCell: (index: number, value: CellValue) => void,
): PointerHandlers => {
  const meshRef = useRef<THREE.Mesh>(undefined);
  const isPointerDown = useRef(false);

  const paintAtPointer = useCallback(
    (point: THREE.Vector3, shiftKey: boolean) => {
      const col = Math.floor(point.x);
      const row = Math.floor(point.y);

      if (col < 0 || col >= cols || row < 0 || row >= rows) return;
      if (shiftKey || toolMode === 'pan') return;

      const index = row * cols + col;
      paintCell(index, toolMode === 'erase' ? 0 : 1);
    },
    [cols, rows, toolMode, paintCell],
  );

  const onPointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (e.object !== meshRef.current) return;
      if (e.button !== 0) return;
      isPointerDown.current = true;
      paintAtPointer(e.point, e.shiftKey);
    },
    [paintAtPointer],
  );

  const onPointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!isPointerDown.current) return;
      if (e.object !== meshRef.current) return;
      if (e.buttons !== 1) return;
      paintAtPointer(e.point, e.shiftKey);
    },
    [paintAtPointer],
  );

  const onPointerUp = useCallback(() => {
    isPointerDown.current = false;
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

export { usePointerPaint };
export type { PointerHandlers };
