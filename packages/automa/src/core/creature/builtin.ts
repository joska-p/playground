import type { Creature } from './types.ts';
import { registerCreature } from './registry.ts';

function c(id: string, name: string, cells: number[][]): Creature {
  return {
    id,
    name,
    width: cells[0].length,
    height: cells.length,
    cells,
  };
}

// ── Still lifes ──────────────────────────────────────────

const block = c('block', 'Block', [
  [1, 1],
  [1, 1],
]);

const beehive = c('beehive', 'Beehive', [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
]);

const loaf = c('loaf', 'Loaf', [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 1, 0, 1],
  [0, 0, 1, 0],
]);

const boat = c('boat', 'Boat', [
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
]);

const tub = c('tub', 'Tub', [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
]);

// ── Oscillators ──────────────────────────────────────────

const blinker = c('blinker', 'Blinker', [[1, 1, 1]]);

const toad = c('toad', 'Toad', [
  [0, 1, 1, 1],
  [1, 1, 1, 0],
]);

const beacon = c('beacon', 'Beacon', [
  [1, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
]);

const pulsar = c('pulsar', 'Pulsar', [
  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
]);

// ── Spaceships ───────────────────────────────────────────

const glider = c('glider', 'Glider', [
  [0, 0, 1],
  [1, 0, 1],
  [0, 1, 1],
]);

const lwss = c('lwss', 'LWSS', [
  [0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0],
]);

// ── Methuselahs ──────────────────────────────────────────

const rPentomino = c('r-pentomino', 'R-pentomino', [
  [0, 1, 1],
  [1, 1, 0],
  [0, 1, 0],
]);

const diehard = c('diehard', 'Diehard', [
  [0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 1],
]);

const acorn = c('acorn', 'Acorn', [
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 1],
]);

const builtinCreatures: Creature[] = [
  block,
  beehive,
  loaf,
  boat,
  tub,
  blinker,
  toad,
  beacon,
  pulsar,
  glider,
  lwss,
  rPentomino,
  diehard,
  acorn,
];

builtinCreatures.forEach(registerCreature);

export { builtinCreatures };
