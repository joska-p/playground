import { useEffect, useRef } from 'react';
import type { InputStore } from '../cpu/createInputStore';
import type { Camera } from '../core/coords/camera';
import { createInputRouter, type InputRouterOptions, type RouterOptions } from './actions';

export type CanvasActions<TSurface extends { input: InputStore }> = {
    camera: Camera;
    surface: TSurface | null;
};

export function useCanvasActions<TSurface extends { input: InputStore }>(
    actions: CanvasActions<TSurface>,
    options: RouterOptions<TSurface> = {}
): void {
    const routerOptionsRef = useRef<InputRouterOptions<TSurface> | null>(null);
    const actionsRef = useRef(actions);
    const optionsRef = useRef(options);

    // Keep live options and the camera in sync without re-subscribing.
    useEffect(() => {
        actionsRef.current = actions;
        optionsRef.current = options;
        const opts = routerOptionsRef.current;
        if (!opts) return;
        opts.camera = actions.camera;
        opts.pointerHandlers = options.pointerHandlers;
        opts.pan = options.pan;
        opts.zoom = options.zoom;
        opts.panButton = options.panButton;
        opts.zoomSpeed = options.zoomSpeed;
        opts.minZoom = options.minZoom;
        opts.maxZoom = options.maxZoom;
    });

    useEffect(() => {
        const surface = actionsRef.current.surface;
        if (!surface) return;

        const opts: InputRouterOptions<TSurface> = {
            input: surface.input,
            camera: actionsRef.current.camera,
            getSurface: () => actionsRef.current.surface,
            pointerHandlers: optionsRef.current.pointerHandlers,
            pan: optionsRef.current.pan,
            zoom: optionsRef.current.zoom,
            panButton: optionsRef.current.panButton,
            zoomSpeed: optionsRef.current.zoomSpeed,
            minZoom: optionsRef.current.minZoom,
            maxZoom: optionsRef.current.maxZoom
        };

        routerOptionsRef.current = opts;
        const { dispose } = createInputRouter(opts);

        return () => {
            dispose();
            routerOptionsRef.current = null;
        };
    }, [actions.surface]);
}
