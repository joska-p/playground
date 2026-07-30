import type { Creature } from '@repo/automa-engine/creature/registry';
import { useRef } from 'react';
import type { Point2D } from '../lib/coordinates';
import { eventToGridPoint } from '../lib/coordinates';
import type { BrushMode } from '../stores/automa';

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
  paintCell: (col: number, row: number, value: number) => void,
  creature: Creature,
  paintCreature?: (col: number, row: number, creature: Creature) => void,
  canvasRef?: React.RefObject<HTMLCanvasElement | null>,
  interactionState?: { current: { pan: Point2D; zoom: number } }
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

    const interaction = interactionState?.current;
    const { column: col, row } = eventToGridPoint(e, canvas, cols, rows, interaction);

    if (col < 0 || col >= cols || row < 0 || row >= rows) return;

    if (paintCreature && brushMode !== 'erase') {
      paintCreature(col, row, creature);
      return;
    }

    paintCell(col, row, brushMode === 'erase' ? 0 : 1);
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
