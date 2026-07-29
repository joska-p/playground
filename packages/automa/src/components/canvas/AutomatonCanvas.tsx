import { GraphicsProvider } from '@repo/graphics/react/FrameLoopContext';
import { useCols, useRows } from '../../stores/simulation/selectors';
import { useShowDebug } from '../../stores/ui/selectors';
import { CellMesh } from './CellMesh.tsx';
import { GridLines } from './GridLines.tsx';

function AutomatonCanvas() {
  const cols = useCols();
  const rows = useRows();
  const showDebug = useShowDebug();

  return (
    <GraphicsProvider>
      <CellMesh />
      {showDebug && (
        <GridLines
          cols={cols}
          rows={rows}
        />
      )}
    </GraphicsProvider>
  );
}

export { AutomatonCanvas };
