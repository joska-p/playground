import { useEffect, useRef } from 'react';
import type { InputStore } from '../cpu/createInputStore';
import type { CameraControls } from '../core/coords/cameraControls';
import {
    InputRouter,
    createInteractionAdapter,
    type CanvasInteractions,
    type InputRouterOptions
} from './actions';

export type CanvasActions<TSurface extends { input: InputStore }> = {
    controls: CameraControls;
    surface: TSurface | null;
};

export function useCanvasActions<TSurface extends { input: InputStore }>(
    actions: CanvasActions<TSurface>,
    interactions: CanvasInteractions<TSurface> = {}
): void {
    const routerOptionsRef = useRef<InputRouterOptions<TSurface> | null>(null);
    const actionsRef = useRef(actions);
    const interactionsRef = useRef(interactions);

    // Keep live interactions and the camera controls in sync without re-subscribing.
    useEffect(() => {
        actionsRef.current = actions;
        interactionsRef.current = interactions;
        const opts = routerOptionsRef.current;
        if (!opts) return;
        opts.controls = actions.controls;
        opts.gestures = createInteractionAdapter(interactions);
    });

    useEffect(() => {
        const surface = actionsRef.current.surface;
        if (!surface) return;

        const opts: InputRouterOptions<TSurface> = {
            input: surface.input,
            controls: actionsRef.current.controls,
            getSurface: () => actionsRef.current.surface,
            gestures: createInteractionAdapter(interactionsRef.current)
        };

        routerOptionsRef.current = opts;
        const router = new InputRouter(opts);

        return () => {
            router.dispose();
            routerOptionsRef.current = null;
        };
    }, [actions.surface]);
}
