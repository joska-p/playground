import type { Creature } from '@repo/automa-engine/creature/types';
import type { CellValue } from '@repo/automa-engine/types';
import { createCanvasToData, createWorldToGrid } from '@repo/graphics/math/transforms';
import { useRef } from 'react';
import type { BrushMode } from '../stores/ui/store';

type CellPaintingHandlers = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: () => void;
  onContextMenu: (e: React.MouseEvent<HTMLCanvasElement>) => void;
};

const useCellPainting = (
  cols: number,
  rows: number,
  brushMode: BrushMode,
  paintCell: (index: number, value: CellValue) => void,
  creature: Creature | null = null,
  paintCreature?: (col: number, row: number, creature: Creature) => void
): CellPaintingHandlers => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPainting = useRef(false);

  const paintAtCanvasPoint = (clientX: number, clientY: number, shiftKey: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (shiftKey) return;

    const bounds = canvas.getBoundingClientRect();

    // Map from canvas CSS pixels → grid cell coordinates.
    // The grid domain is [0, cols] × [0, rows] with origin at top-left,
    // and the texture UV origin matches (no Y-flip needed at this stage).
    const canvasToGrid = createCanvasToData(
      { xMin: 0, xMax: cols, yMin: 0, yMax: rows },
      bounds.width,
      bounds.height,
      'fill'
    );

    const localX = clientX - bounds.left;
    const localY = clientY - bounds.top;
    const worldToGrid = createWorldToGrid(cols, rows);
    const { column: col, row, index } = worldToGrid(canvasToGrid({ x: localX, y: localY }));

    if (col < 0 || col >= cols || row < 0 || row >= rows) return;

    if (creature && paintCreature && brushMode !== 'erase') {
      paintCreature(col, row, creature);
      return;
    }

    paintCell(index, brushMode === 'erase' ? 0 : 1);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return;
    isPainting.current = true;
    paintAtCanvasPoint(e.clientX, e.clientY, e.shiftKey);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPainting.current) return;
    paintAtCanvasPoint(e.clientX, e.clientY, e.shiftKey);
  };

  const onPointerUp = () => {
    isPainting.current = false;
  };

  const onContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return { canvasRef, onPointerDown, onPointerMove, onPointerUp, onContextMenu };
};

export { useCellPainting };
export type { CellPaintingHandlers };
