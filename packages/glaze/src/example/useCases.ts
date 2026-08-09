import type { ComponentType } from 'react';
import { HelloShapes, helloShapesSnippet } from './demos/cpu/HelloShapes';
import { PointerShapes, pointerShapesSnippet } from './demos/cpu/PointerShapes';

export type UseCase = {
    id: string;
    title: string;
    description: string;
    snippet: string;
    Demo: ComponentType;
};

export const useCases: UseCase[] = [
    {
        id: 'hello-shapes',
        title: 'Hello shapes',
        description:
            'Animate with onFrame. The scene is drawn on every frame using surface.time. onFrame always clears. onFrame is shorthand for surface.setDraw.',
        snippet: helloShapesSnippet,
        Demo: HelloShapes
    },
    {
        id: 'pointer-shapes',
        title: 'Pointer shapes',
        description:
            'interactions.onStart receives the interaction block (native event, screen point, input store, camera controls, surface): left-click draws a circle, right-click clears. surface.input.getPointerWorldPos(surface.camera) maps the cursor into world space, and the builtin surface.circle paints it. onFrame never clears, so each circle stays — no refs, no state.',
        snippet: pointerShapesSnippet,
        Demo: PointerShapes
    }
];
