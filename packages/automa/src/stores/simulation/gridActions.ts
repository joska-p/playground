import { GRID_DEFAULT_DENSITY } from '@repo/automa-engine/config';
import type { Creature } from '@repo/automa-engine/creature/types';
import { createGrid, seedGrid } from '@repo/automa-engine/grid';
import type { CellValue } from '@repo/automa-engine/types';
import { getEngine } from '../../core/gpu/engineRegistry';
import { simulationStore } from './store';

const clear = (): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = simulationStore.getState();
  const empty = new Uint8Array(state.cols * state.rows);
  engine.init(empty);
  simulationStore.setState({ generation: state.generation + 1 });
};

const randomize = (density?: number): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = simulationStore.getState();
  const grid = createGrid(state.rows, state.cols);
  seedGrid(grid, density ?? GRID_DEFAULT_DENSITY, state.seed);
  engine.init(grid);
  simulationStore.setState({ generation: state.generation + 1 });
};

const paintCell = (col: number, row: number, value: CellValue): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = simulationStore.getState();
  const brushSize = 1.0 / Math.min(state.cols, state.rows);
  engine.paint(col / state.cols, row / state.rows, brushSize, value);
  simulationStore.setState({ generation: state.generation + 1 });
};

const placePattern = (col: number, row: number, creature: Creature): void => {
  const engine = getEngine();
  if (!engine) return;

  const state = simulationStore.getState();
  const offsetX = Math.floor(creature.width / 2);
  const offsetY = Math.floor(creature.height / 2);
  const brushSize = 1.0 / Math.min(state.cols, state.rows);

  let changed = false;
  for (let y = 0; y < creature.height; y++) {
    const rowCells = creature.cells[y];
    if (!rowCells) continue;
    for (let x = 0; x < creature.width; x++) {
      const val = rowCells[x];
      if (!val) continue;
      const gx = col - offsetX + x;
      const gy = row - offsetY + y;
      if (gx < 0 || gx >= state.cols || gy < 0 || gy >= state.rows) continue;
      engine.paint(gx / state.cols, gy / state.rows, brushSize, val);
      changed = true;
    }
  }

  if (changed) {
    simulationStore.setState({ generation: state.generation + 1 });
  }
};

export { clear, paintCell, placePattern, randomize };
