import { useContext, useEffect, useRef } from 'react';
import { FrameLoopContext } from './FrameLoopProvider';

/**
 * Subscribes a callback to the shared frame loop.
 * Must be used inside a <FrameLoopProvider>. Outside it, the callback never runs
 * (a development warning is emitted).
 */
export function useFrame(callback: (time: number, delta: number) => void): void {
    const loop = useContext(FrameLoopContext);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        if (!loop) {
            if (!import.meta.env.PROD) {
                console.warn(
                    'useFrame() called outside <FrameLoopProvider>. The callback will never be invoked.'
                );
            }
            return;
        }

        const handler = (time: number, delta: number) => {
            callbackRef.current(time, delta);
        };

        return loop.subscribe(handler);
    }, [loop]);
}
