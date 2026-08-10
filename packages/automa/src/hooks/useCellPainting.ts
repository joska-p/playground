import { creatures } from '@repo/automa-engine/creature/registry';
import type { GpuSurface } from '@repo/glaze/gpu/GpuSurface';
import type { CanvasInteractions, LiveInteractionEvent } from '@repo/glaze/react/interactions';
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

export function useCellPainting(): CanvasInteractions<GpuSurface> {
    const isPainting = useRef(false);

    const onStart = ({
        nativeEvent,
        surface
    }: LiveInteractionEvent<PointerEvent, GpuSurface>): boolean => {
        // Only respond to primary left click
        if (nativeEvent.button !== 0) return false;
        isPainting.current = true;
        paintAtEvent(nativeEvent, surface);
        return false;
    };

    const onMove = ({
        nativeEvent,
        surface
    }: LiveInteractionEvent<PointerEvent, GpuSurface>): boolean => {
        if (!isPainting.current) return false;
        paintAtEvent(nativeEvent, surface);
        return false;
    };

    const onEnd = (): void => {
        isPainting.current = false;
    };

    const onContextMenu = ({ nativeEvent }: LiveInteractionEvent<MouseEvent, GpuSurface>): void => {
        nativeEvent.preventDefault();
    };

    return { onStart, onMove, onEnd, onContextMenu };
}
