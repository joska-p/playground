import { describe, expect, it } from 'vitest';
import { createCanvasToNormalized } from './createCanvasToNormalized';
import { createNormalizedToUv } from './createNormalizedToUv';
import { createScreenToCanvas } from './createScreenToCanvas';

describe('coordinate ladder', () => {
        it('screen to canvas subtracts the element bounds', () => {
                const toCanvas = createScreenToCanvas({
                        left: 10,
                        top: 20,
                        width: 400,
                        height: 300
                });
                expect(toCanvas({ x: 210, y: 120 })).toEqual({ x: 200, y: 100 });
        });

        it('canvas to normalized divides by the canvas size', () => {
                const toNormalized = createCanvasToNormalized(400, 300);
                expect(toNormalized({ x: 200, y: 150 })).toEqual({ x: 0.5, y: 0.5 });
        });

        it('normalized to uv flips y only', () => {
                const toUv = createNormalizedToUv();
                expect(toUv({ x: 0.25, y: 0.25 })).toEqual({ x: 0.25, y: 0.75 });
        });

        it('guards against a zero-size canvas', () => {
                const toNormalized = createCanvasToNormalized(0, 0);
                expect(toNormalized({ x: 5, y: 5 })).toEqual({ x: 0, y: 0 });
        });
});
