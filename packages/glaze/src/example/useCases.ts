import type { ComponentType } from 'react';
import { HelloShapes, helloShapesSnippet } from './demos/cpu/HelloShapes';

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
            'Draw once with onSurface, animate with onFrame. The static scene is drawn the moment the surface is ready; the moon runs every frame using surface.time. onFrame never clears, so the moon leaves a trail and paints its orbit. onFrame is shorthand for surface.setDraw.',
        snippet: helloShapesSnippet,
        Demo: HelloShapes
    }
];
