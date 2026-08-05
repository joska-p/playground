/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { createFrameLoop, type FrameLoop } from '../../core/createFrameLoop';

const FrameLoopContext = createContext<FrameLoop | null>(null);

function FrameLoopProvider({ children }: { children: ReactNode }) {
        const [loop] = useState(() => createFrameLoop());

        useEffect(() => {
                return () => {
                        loop.dispose();
                };
        }, [loop]);

        return <FrameLoopContext value={loop}>{children}</FrameLoopContext>;
}

function useFrame(callback: (time: number, delta: number) => void): void {
        const loop = useContext(FrameLoopContext);
        const ref = useRef(callback);

        useEffect(() => {
                ref.current = callback;
        });

        useEffect(() => {
                if (!loop) return;
                const cb = (time: number, delta: number) => {
                        ref.current(time, delta);
                };
                return loop.subscribe(cb);
        }, [loop]);
}

export { FrameLoopContext, FrameLoopProvider, useFrame };
