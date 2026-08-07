import { creatures } from '@repo/automa-engine/creature/registry';
import type { InteractionContext, PointerHandlers } from '@repo/glaze/react/interaction';
import { useRef } from 'react';
import { eventToGridPoint } from '../lib/coordinates';
import { automaStore, paintCell, placePattern } from '../stores/automa';

function paintAtEvent(event: PointerEvent, ctx: InteractionContext): void {
    const canvas = event.currentTarget;
    if (!(canvas instanceof HTMLCanvasElement)) return;

    const { cols, rows, toolMode, paletteBrush } = automaStore.getState();
    const { column: col, row } = eventToGridPoint(event, canvas, cols, rows, ctx.camera);

    if (col < 0 || col >= cols || row < 0 || row >= rows) return;

    if (toolMode !== 'erase' && paletteBrush !== 'pixel') {
        placePattern(col, row, creatures[paletteBrush]);
        return;
    }

    paintCell(col, row, toolMode === 'erase' ? 0 : 1);
}

export function useCellPainting(): PointerHandlers {
    const isPainting = useRef(false);

    const onPointerDown = (event: PointerEvent, ctx: InteractionContext): boolean | undefined => {
        // Only respond to primary left click
        if (event.button !== 0) return undefined;
        isPainting.current = true;
        paintAtEvent(event, ctx);
        return undefined;
    };

    const onPointerMove = (event: PointerEvent, ctx: InteractionContext): boolean | undefined => {
        if (!isPainting.current) return undefined;
        paintAtEvent(event, ctx);
        return undefined;
    };

    const onPointerUp = (): boolean | undefined => {
        isPainting.current = false;
        return undefined;
    };

    const onPointerCancel = (): boolean | undefined => {
        isPainting.current = false;
        return undefined;
    };

    const onContextMenu = (event: MouseEvent): void => {
        event.preventDefault();
    };

    return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onContextMenu };
}
