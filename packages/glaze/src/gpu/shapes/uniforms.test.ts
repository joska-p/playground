import { describe, expect, it } from 'vitest';
import { circleUniforms } from './circle';
import { lineUniforms } from './line';
import { rectUniforms } from './rect';
import { textUniforms } from './text';

describe('shape uniform builders', () => {
        it('circle uniforms apply style defaults', () => {
                const uniforms = circleUniforms({ x: 10, y: 20 }, 5, { fill: '#ff0000' });
                expect(uniforms['u_center']).toEqual([10, 20]);
                expect(uniforms['u_radius']).toBe(5);
                expect(uniforms['u_fill']).toEqual([1, 0, 0, 1]);
                expect(uniforms['u_stroke']).toEqual([0, 0, 0, 0]);
                expect(uniforms['u_strokeWidth']).toBe(1);
        });

        it('circle uniforms pass stroke through', () => {
                const uniforms = circleUniforms({ x: 0, y: 0 }, 2, {
                        stroke: '#00ff00',
                        lineWidth: 3
                });
                expect(uniforms['u_stroke']).toEqual([0, 1, 0, 1]);
                expect(uniforms['u_strokeWidth']).toBe(3);
        });

        it('rect uniforms map the rect and style', () => {
                const uniforms = rectUniforms({ x: 1, y: 2, w: 10, h: 20 }, { fill: '#0000ff' });
                expect(uniforms['u_position']).toEqual([1, 2]);
                expect(uniforms['u_size']).toEqual([10, 20]);
                expect(uniforms['u_fill']).toEqual([0, 0, 1, 1]);
                expect(uniforms['u_stroke']).toEqual([0, 0, 0, 0]);
                expect(uniforms['u_strokeWidth']).toBe(1);
        });

        it('line uniforms prefer stroke over fill over black', () => {
                expect(
                        lineUniforms(
                                { x: 0, y: 0 },
                                { x: 5, y: 5 },
                                { stroke: '#ff0000', lineWidth: 4 }
                        )['u_color']
                ).toEqual([1, 0, 0, 1]);
                expect(
                        lineUniforms({ x: 0, y: 0 }, { x: 5, y: 5 }, { fill: '#00ff00' })['u_color']
                ).toEqual([0, 1, 0, 1]);
                expect(lineUniforms({ x: 0, y: 0 }, { x: 5, y: 5 }, {})['u_color']).toEqual([
                        0, 0, 0, 1
                ]);
        });

        it('line uniforms carry endpoints and width', () => {
                const uniforms = lineUniforms(
                        { x: 1, y: 2 },
                        { x: 3, y: 4 },
                        { stroke: '#ffffff' }
                );
                expect(uniforms['u_a']).toEqual([1, 2]);
                expect(uniforms['u_b']).toEqual([3, 4]);
                expect(uniforms['u_width']).toBe(1);
        });

        it('text uniforms position the baseline and tint the fill', () => {
                const texture = {} as WebGLTexture;
                const uniforms = textUniforms({ x: 100, y: 50 }, 60, 40, 28, texture, {
                        fill: '#ff0000'
                });
                expect(uniforms['u_position']).toEqual([100, 22]);
                expect(uniforms['u_size']).toEqual([60, 40]);
                expect(uniforms['u_texture']).toBe(texture);
                expect(uniforms['u_color']).toEqual([1, 0, 0, 1]);
        });
});
