import { GRID_DEFAULT_DENSITY } from '@repo/automa-engine/config';
import { ErrorBoundary } from '@repo/ui/feedback';
import { useEffect } from 'react';
import { CellMesh } from './components/canvas/CellMesh.tsx';
import { GridLines } from './components/canvas/GridLines.tsx';
import { ControlPanel } from './components/controls/ControlPanel';
import { destroy, init, useShowDebug } from './stores/automa';

/** Props for configuring the Automa interactive workbench component. */
type AppProps = {
    /** Number of grid rows (default 300). */
    rows?: number;
    /** Number of grid columns (default 400). */
    cols?: number;
    /** Random seed for grid generation. */
    seed?: number;
    /** Initial cell density ratio between 0 and 1. */
    initialDensity?: number;
};

/**
 * Main interactive WebGL2 cellular automaton workbench component.
 *
 * @param props - Grid dimensions and initial seeding parameters.
 */
function App({ rows = 300, cols = 400, seed, initialDensity }: AppProps) {
    const showDebug = useShowDebug();

    useEffect(() => {
        init({
            rows,
            cols,
            initialDensity: initialDensity ?? GRID_DEFAULT_DENSITY,
            seed: seed ?? Date.now()
        });
        return destroy;
    }, [cols, initialDensity, rows, seed]);

    return (
        <div className="relative h-screen overflow-hidden">
            <ErrorBoundary>
                <CellMesh />
                {showDebug && <GridLines />}
                <ControlPanel />
            </ErrorBoundary>
        </div>
    );
}

export { App };
export type { AppProps };
