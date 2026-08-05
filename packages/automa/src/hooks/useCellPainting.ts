import { creatures } from '@repo/automa-engine/creature/registry';
import { useRef } from 'react';
import { eventToGridPoint, type Camera } from '../lib/coordinates';
import { automaStore, paintCell, placePattern } from '../stores/automa';

type CellPaintingHandlers = {
        onPointerDown: (e: React.PointerEvent<HTMLCanvasElement>) => void;
        onPointerMove: (e: React.PointerEvent<HTMLCanvasElement>) => void;
        onPointerUp: () => void;
        onContextMenu: (e: React.MouseEvent<HTMLCanvasElement>) => void;
};

export function useCellPainting(
        canvasRef?: React.RefObject<HTMLCanvasElement | null>,
        interactionState?: { current: Camera }
): CellPaintingHandlers {
        const localCanvasRef = useRef<HTMLCanvasElement | null>(null);
        const activeCanvasRef = canvasRef ?? localCanvasRef;
        const isPainting = useRef(false);

        const paintAtEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
                const canvas = activeCanvasRef.current;
                if (!canvas) return;

                const { cols, rows, toolMode, paletteBrush } = automaStore.getState();

                const interaction = interactionState?.current;
                const { column: col, row } = eventToGridPoint(e, canvas, cols, rows, interaction);

                if (col < 0 || col >= cols || row < 0 || row >= rows) return;

                if (toolMode !== 'erase' && paletteBrush !== 'pixel') {
                        placePattern(col, row, creatures[paletteBrush]);
                        return;
                }

                paintCell(col, row, toolMode === 'erase' ? 0 : 1);
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
