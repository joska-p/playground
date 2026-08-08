import { useRef, useState } from 'react';
import type { Camera } from '@repo/glaze/core/coords/camera';
import type { GpuSurface } from '@repo/glaze/gpu/createGpuSurface';
import { useCamera, type CameraControls } from '@repo/glaze/react/useCamera';
import type { PointerHandlers } from '@repo/glaze/react/interaction';
import { setView, type View } from '../stores/viewStore';

const MIN_ZOOM = 0.05;

export type FractureViewOptions = {
    initialView: View;
    maxZoom: number;
    zoomSpeed?: number;
};

export type FractureView = {
    camera: Camera;
    controls: CameraControls;
    pointerHandlers: PointerHandlers<GpuSurface>;
    /** Write the live camera back to the view store (ControlPanel reads it). */
    syncView: () => void;
};

/**
 * Shared camera for the fracture scenes.
 *
 * Glaze stores pan in screen-pixel units accumulated without scaling by zoom;
 * the view store keeps pan zoom-normalized (old `scalePanWithZoom` semantics).
 * Conversion happens here on init (`pan * zoom`) and in `syncView`
 * (`x / zoom`), so shader math can keep using the old convention.
 *
 * Glaze zooms at 0.002/px; the fracture renderers use 250 (exponential factor
 * of 250 instead), so the wheel is overridden here. Returning `true` from the
 * handler consumes the event and skips glaze's default wheel zoom.
 */
export function useFractureView(options: FractureViewOptions): FractureView {
    const { initialView, maxZoom, zoomSpeed = 250 } = options;

    const [camera, controls] = useCamera({
        pan: {
            x: initialView.pan.x * initialView.zoom,
            y: initialView.pan.y * initialView.zoom
        },
        zoom: initialView.zoom,
        minZoom: MIN_ZOOM,
        maxZoom
    });

    // camera, controls and zoomSpeed never change after mount, and the stable
    // object identity keeps useCanvasInteraction from re-attaching listeners.
    const [pointerHandlers] = useState<PointerHandlers<GpuSurface>>(() => ({
        onWheel(event) {
            event.preventDefault();
            const target = event.target;
            if (!(target instanceof HTMLElement)) return true;
            const rect = target.getBoundingClientRect();
            controls.zoomTo(camera.zoom * Math.exp(-event.deltaY / zoomSpeed), {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            });
            return true;
        }
    }));

    const lastSync = useRef({ x: camera.x, y: camera.y, zoom: camera.zoom });

    const syncView = (): void => {
        const prev = lastSync.current;
        if (prev.x === camera.x && prev.y === camera.y && prev.zoom === camera.zoom) return;
        prev.x = camera.x;
        prev.y = camera.y;
        prev.zoom = camera.zoom;
        setView({
            pan: { x: camera.x / camera.zoom, y: camera.y / camera.zoom },
            zoom: camera.zoom
        });
    };

    return { camera, controls, pointerHandlers, syncView };
}
