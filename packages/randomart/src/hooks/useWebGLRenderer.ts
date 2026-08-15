import { animationRegistry } from '@repo/randomart-engine/animation/behaviors';
import type { ExpressionNode } from '@repo/randomart-engine/types';
import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { randomartStore } from '../stores/randomart/store';
import { useAnimationLoop } from './useAnimationLoop';
import { useShaderProgram } from './useShaderProgram';
import { useWebGLContext } from './useWebGLContext';

export function useWebGLRenderer(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    trees: {
        treeR: ExpressionNode;
        treeG: ExpressionNode;
        treeB: ExpressionNode;
    },
    running: boolean
) {
    const timeRef = useRef(0);
    const speedRef = useRef(randomartStore.getState().animationSpeed);
    const mouseRef = useRef({ x: 0, y: 0 });

    const { glRef, bitmapSize } = useWebGLContext(canvasRef);

    const activeAnimationBehaviorIds = useStore(
        randomartStore,
        (s) => s.activeAnimationBehaviorIds
    );

    const behaviors = activeAnimationBehaviorIds
        .map((id) => animationRegistry.find((b) => b.id === id))
        .filter((b): b is NonNullable<typeof b> => !!b);

    // Copy the store value into a ref so the rAF loop below never re-renders on speed changes
    const animationSpeed = useStore(randomartStore, (s) => s.animationSpeed);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: (e.clientX - rect.left) * (canvas.width / rect.width),
                y: (e.clientY - rect.top) * (canvas.height / rect.height)
            };
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [canvasRef]);

    const { programRef, uniformLocsRef } = useShaderProgram(
        glRef,
        bitmapSize,
        trees,
        behaviors,
        (gl, locs) => {
            // Draw once right away: with the loop paused the first frame would never appear
            gl.uniform1f(locs.time, timeRef.current);
            gl.uniform1f(locs.animSpeed, speedRef.current);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    );

    useEffect(() => {
        speedRef.current = animationSpeed;

        // Snapshot frame while paused, so speed changes still show up immediately
        const gl = glRef.current;
        if (!running && gl && programRef.current) {
            const { time, animSpeed } = uniformLocsRef.current;
            gl.uniform1f(time, timeRef.current);
            gl.uniform1f(animSpeed, speedRef.current);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }, [animationSpeed, running, glRef, programRef, uniformLocsRef]);

    // Keep the local clock and the store timeline in sync, so pausing/resuming doesn't jump time
    useEffect(() => {
        if (running) {
            timeRef.current = randomartStore.getState().time;
        } else {
            randomartStore.setState({ time: timeRef.current });
        }
    }, [running]);

    useAnimationLoop(
        running,
        (deltaMs) => {
            timeRef.current += deltaMs / 1000;

            const gl = glRef.current;
            if (!gl || !programRef.current) return;

            const { time, animSpeed } = uniformLocsRef.current;
            gl.uniform1f(time, timeRef.current);
            gl.uniform1f(animSpeed, speedRef.current);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        },
        true
    );
}
