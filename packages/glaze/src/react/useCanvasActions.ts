import { useEffect, useRef } from 'react';
import type { InputStore } from '../cpu/createInputStore';
import type { CameraControls } from '../core/coords/cameraControls';
import {
    createInputRouter,
    createPanGesture,
    createPointerHandlersGesture,
    createZoomGesture,
    type Gesture,
    type InputRouterOptions,
    type RouterOptions
} from './actions';

export type CanvasActions<TSurface extends { input: InputStore }> = {
    controls: CameraControls;
    surface: TSurface | null;
};

function buildGestures<TSurface>(options: RouterOptions<TSurface>): Gesture<TSurface>[] {
    const gestures: Gesture<TSurface>[] = [];

    if (options.pointerHandlers)
        gestures.push(createPointerHandlersGesture(options.pointerHandlers));
    if (options.gestures) gestures.push(...options.gestures);
    if (options.pan) gestures.push(createPanGesture({ button: options.panButton }));
    if (options.zoom) gestures.push(createZoomGesture({ speed: options.zoomSpeed }));

    return gestures;
}

export function useCanvasActions<TSurface extends { input: InputStore }>(
    actions: CanvasActions<TSurface>,
    options: RouterOptions<TSurface> = {}
): void {
    const routerOptionsRef = useRef<InputRouterOptions<TSurface> | null>(null);
    const actionsRef = useRef(actions);
    const optionsRef = useRef(options);

    // Keep live options and the camera controls in sync without re-subscribing.
    useEffect(() => {
        actionsRef.current = actions;
        optionsRef.current = options;
        const opts = routerOptionsRef.current;
        if (!opts) return;
        opts.controls = actions.controls;
        opts.gestures = buildGestures(options);
    });

    useEffect(() => {
        const surface = actionsRef.current.surface;
        if (!surface) return;

        const opts: InputRouterOptions<TSurface> = {
            input: surface.input,
            controls: actionsRef.current.controls,
            getSurface: () => actionsRef.current.surface,
            gestures: buildGestures(optionsRef.current)
        };

        routerOptionsRef.current = opts;
        const { dispose } = createInputRouter(opts);

        return () => {
            dispose();
            routerOptionsRef.current = null;
        };
    }, [actions.surface]);
}
