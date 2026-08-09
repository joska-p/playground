import { useRef } from 'react';
import type { Camera } from '@repo/glaze/core/Camera';
import { useCamera, type CameraControls } from '@repo/glaze/react/useCamera';
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
    zoomSpeed: number;
    minZoom: number;
    maxZoom: number;
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
 * The wheel factor (`1 / zoomSpeed`, i.e. exp(−deltaY / zoomSpeed)) and zoom
 * bounds are handed back so the canvas's default zoom action matches the
 * fracture renderers' zoom speed.
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

    return {
        camera,
        controls,
        zoomSpeed: 1 / zoomSpeed,
        minZoom: MIN_ZOOM,
        maxZoom,
        syncView
    };
}
