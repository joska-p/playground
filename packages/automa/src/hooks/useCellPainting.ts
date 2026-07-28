import type { Creature } from '@repo/automa-engine/creature/types';
import type { CellValue } from '@repo/automa-engine/types';
import { useRef } from 'react';
import type { BrushMode } from '../stores/ui/store';
import { eventToGridPoint } from '../utils/grid-coords';

type CellPaintingHandlers = {
  onPointerDown: (e: React.PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: () => void;
  onContextMenu: (e: React.MouseEvent<HTMLCanvasElement>) => void;
};

export function useCellPainting(
  cols: number,
  rows: number,
  brushMode: BrushMode,
  paintCell: (index: number, value: CellValue) => void,
  creature: Creature | null = null,
  paintCreature?: (col: number, row: number, creature: Creature) => void,
  canvasRef?: React.RefObject<HTMLCanvasElement | null>
): CellPaintingHandlers {
  const localCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeCanvasRef = canvasRef ?? localCanvasRef;
  const isPainting = useRef(false);

  const paintAtEvent = (
    e:
      | React.PointerEvent<HTMLCanvasElement>
      | { clientX: number; clientY: number; shiftKey: boolean }
  ) => {
    const canvas = activeCanvasRef.current;
    if (!canvas || e.shiftKey) return;

    const { column: col, row, index } = eventToGridPoint(e, canvas, cols, rows);

    if (col < 0 || col >= cols || row < 0 || row >= rows) return;

    if (creature && paintCreature && brushMode !== 'erase') {
      paintCreature(col, row, creature);
      return;
    }

    paintCell(index, brushMode === 'erase' ? 0 : 1);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Only respond to primary left click
    if (e.button !== 0) return;
    isPainting.current = true;
    paintAtEvent(e);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPainting.current) return;
    paintAtEvent(e);
  };

  const onPointerUp = () => {
    isPainting.current = false;
  };

  const onContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onContextMenu
  };
}

export type { CellPaintingHandlers };
