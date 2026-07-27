import { useCols, useRows } from '../../stores/simulation/selectors';
import { useShowDebug } from '../../stores/ui/selectors';
import { CellMesh } from './CellMesh.tsx';
import { GridLines } from './GridLines.tsx';

function AutomatonCanvas() {
  const cols = useCols();
  const rows = useRows();
  const showDebug = useShowDebug();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <CellMesh />
      {showDebug && (
        <GridLines
          cols={cols}
          rows={rows}
        />
      )}
    </div>
  );
}

export { AutomatonCanvas };
