import { creatures } from '@repo/automa-engine/creature/registry';
import type { GpuSurface } from '@repo/glaze/gpu/createGpuSurface';
import type { PointerHandlers } from '@repo/glaze/react/interaction';
import { useRef } from 'react';
import { eventToGridPoint } from '../lib/coordinates';
import { automaStore, paintCell, placePattern } from '../stores/automa';

function paintAtEvent(event: PointerEvent, surface: GpuSurface): void {
    const canvas = event.currentTarget;
    if (!(canvas instanceof HTMLCanvasElement)) return;

    const { cols, rows, toolMode, paletteBrush } = automaStore.getState();
    const { column: col, row } = eventToGridPoint(event, canvas, cols, rows, surface.camera);

    if (col < 0 || col >= cols || row < 0 || row >= rows) return;

    if (toolMode !== 'erase' && paletteBrush !== 'pixel') {
        placePattern(col, row, creatures[paletteBrush]);
        return;
    }

    paintCell(col, row, toolMode === 'erase' ? 0 : 1);
}

export function useCellPainting(): PointerHandlers<GpuSurface> {
    const isPainting = useRef(false);

    const onPointerDown = (event: PointerEvent, surface: GpuSurface): boolean | undefined => {
        // Only respond to primary left click
        if (event.button !== 0) return undefined;
        isPainting.current = true;
        paintAtEvent(event, surface);
        return undefined;
    };

    const onPointerMove = (event: PointerEvent, surface: GpuSurface): boolean | undefined => {
        if (!isPainting.current) return undefined;
        paintAtEvent(event, surface);
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
