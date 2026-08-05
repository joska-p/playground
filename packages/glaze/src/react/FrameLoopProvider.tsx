import { createContext, useEffect, useState, type ReactNode } from 'react';
import { createFrameLoop, type FrameLoop } from '../core/createFrameLoop';

const FrameLoopContext = createContext<FrameLoop | null>(null);

export function FrameLoopProvider({ children }: { children: ReactNode }) {
        const [loop] = useState(() => createFrameLoop());

        useEffect(() => {
                return () => {
                        loop.dispose();
                };
        }, [loop]);

        return <FrameLoopContext value={loop}>{children}</FrameLoopContext>;
}

export { FrameLoopContext };
