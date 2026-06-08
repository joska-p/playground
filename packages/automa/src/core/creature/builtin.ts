import type { Creature } from './types.ts';

function creatureFactory(
  id: string,
  name: string,
  cells: number[][]
): Creature {
  return {
    id,
    name,
    width: cells[0].length,
    height: cells.length,
    cells,
  };
}

// ── Still lifes ──────────────────────────────────────────

const block = creatureFactory('block', 'Block', [
  [1, 1],
  [1, 1],
]);

const beehive = creatureFactory('beehive', 'Beehive', [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
]);

const loaf = creatureFactory('loaf', 'Loaf', [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 1, 0, 1],
  [0, 0, 1, 0],
]);

const boat = creatureFactory('boat', 'Boat', [
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
]);

const tub = creatureFactory('tub', 'Tub', [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
]);

// ── Oscillators ──────────────────────────────────────────

const blinker = creatureFactory('blinker', 'Blinker', [[1, 1, 1]]);

const toad = creatureFactory('toad', 'Toad', [
  [0, 1, 1, 1],
  [1, 1, 1, 0],
]);

const beacon = creatureFactory('beacon', 'Beacon', [
  [1, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
]);

const pulsar = creatureFactory('pulsar', 'Pulsar', [
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

const glider = creatureFactory('glider', 'Glider', [
  [0, 0, 1],
  [1, 0, 1],
  [0, 1, 1],
]);

const lwss = creatureFactory('lwss', 'LWSS', [
  [0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0],
]);

// ── Methuselahs ──────────────────────────────────────────

const rPentomino = creatureFactory('r-pentomino', 'R-pentomino', [
  [0, 1, 1],
  [1, 1, 0],
  [0, 1, 0],
]);

const diehard = creatureFactory('diehard', 'Diehard', [
  [0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 1],
]);

const acorn = creatureFactory('acorn', 'Acorn', [
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

export { builtinCreatures };
