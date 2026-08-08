import { useEffect, useRef, type RefObject } from 'react';
import type { Camera } from '../core/coords/camera';
import type { InputStore } from '../cpu/createInputStore';
import {
    createInteractionController,
    type InteractionControllerOptions,
    type InteractionOptions
} from './interaction';
import type { CameraControls } from './useCamera';

export type CanvasInteraction<TSurface extends { input: InputStore }> = {
    camera: Camera;
    controls: CameraControls;
    surface: TSurface | null;
};

export function useCanvasInteraction<TSurface extends { input: InputStore }>(
    target: RefObject<HTMLCanvasElement | null>,
    interaction: CanvasInteraction<TSurface>,
    options: InteractionOptions<TSurface> = {}
): void {
    const { camera, controls, surface } = interaction;
    const { pan, zoom, panButton, pointerHandlers } = options;

    const controllerOptionsRef = useRef<InteractionControllerOptions<TSurface> | null>(null);
    const cameraRef = useRef(camera);
    const controlsRef = useRef(controls);
    const interactionRef = useRef(interaction);

    // Keep mutable refs and live options in sync without re-attaching listeners
    useEffect(() => {
        interactionRef.current = interaction;
        cameraRef.current = camera;
        controlsRef.current = controls;

        const opts = controllerOptionsRef.current;
        if (opts) {
            opts.handlers = pointerHandlers ?? {};
            opts.pan = pan ?? true;
            opts.zoom = zoom ?? true;
            opts.panButton = panButton;
        }
    });

    useEffect(() => {
        const canvas = target.current;
        if (!canvas || !surface) return;

        surface.input.attach(canvas);

        const opts: InteractionControllerOptions<TSurface> = {
            handlers: pointerHandlers ?? {},
            pan: pan ?? true,
            zoom: zoom ?? true,
            panButton: panButton,
            getSurface: () => interactionRef.current.surface,
            onPan(dx, dy) {
                const cam = cameraRef.current;
                cam.x += dx;
                cam.y += dy;
            },
            onZoom(deltaY, focalPoint) {
                const cam = cameraRef.current;
                controlsRef.current.zoomTo(cam.zoom * Math.exp(-deltaY * 0.002), focalPoint);
            }
        };

        controllerOptionsRef.current = opts;
        const controller = createInteractionController(opts);

        canvas.addEventListener('pointerdown', controller.onPointerDown);
        canvas.addEventListener('pointermove', controller.onPointerMove);
        canvas.addEventListener('pointerup', controller.onPointerUp);
        canvas.addEventListener('pointercancel', controller.onPointerCancel);
        canvas.addEventListener('wheel', controller.onWheel, { passive: false });
        canvas.addEventListener('contextmenu', controller.onContextMenu);

        return () => {
            canvas.removeEventListener('pointerdown', controller.onPointerDown);
            canvas.removeEventListener('pointermove', controller.onPointerMove);
            canvas.removeEventListener('pointerup', controller.onPointerUp);
            canvas.removeEventListener('pointercancel', controller.onPointerCancel);
            canvas.removeEventListener('wheel', controller.onWheel);
            canvas.removeEventListener('contextmenu', controller.onContextMenu);
            surface.input.detach();
            controllerOptionsRef.current = null;
        };
    }, [target, surface, pointerHandlers, pan, zoom, panButton]);
}
