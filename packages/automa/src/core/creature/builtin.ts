import type { Creature } from './types';

function createCreature({
  id,
  name,
  cells
}: {
  id: string;
  name: string;
  cells: number[][];
}): Creature {
  return {
    id,
    name,
    width: cells[0].length,
    height: cells.length,
    cells
  };
}

// ── Still lifes ──────────────────────────────────────────
const block = createCreature({
  id: 'block',
  name: 'Block',
  cells: [
    [1, 1],
    [1, 1]
  ]
});

const beehive = createCreature({
  id: 'beehive',
  name: 'Beehive',
  cells: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
  ]
});

const loaf = createCreature({
  id: 'loaf',
  name: 'Loaf',
  cells: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 0]
  ]
});

// ── Oscillators ──────────────────────────────────────────
const blinker = createCreature({
  id: 'blinker',
  name: 'Blinker',
  cells: [[1, 1, 1]]
});

const toad = createCreature({
  id: 'toad',
  name: 'Toad',
  cells: [
    [0, 1, 1, 1],
    [1, 1, 1, 0]
  ]
});

const beacon = createCreature({
  id: 'beacon',
  name: 'Beacon',
  cells: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ]
});

// Period-3, beautiful symmetric oscillator
const pulsar = createCreature({
  id: 'pulsar',
  name: 'Pulsar',
  cells: [
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
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
  ]
});

// Period-15 — oscillates through 15 distinct phases
const pentadecathlon = createCreature({
  id: 'pentadecathlon',
  name: 'Pentadecathlon',
  cells: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 0]
  ]
});

// ── Spaceships ───────────────────────────────────────────
// Travels diagonally across the grid
const glider = createCreature({
  id: 'glider',
  name: 'Glider',
  cells: [
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 1]
  ]
});

// Travels horizontally, period 4
const lwss = createCreature({
  id: 'lwss',
  name: 'LWSS',
  cells: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0]
  ]
});

// Medium-weight spaceship — wider body, same period as LWSS
const mwss = createCreature({
  id: 'mwss',
  name: 'MWSS',
  cells: [
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1]
  ]
});

// ── Methuselahs ──────────────────────────────────────────
// 5 cells → stabilizes after 1103 generations
const rPentomino = createCreature({
  id: 'r-pentomino',
  name: 'R-pentomino',
  cells: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0]
  ]
});

// 7 cells → dies completely after exactly 130 generations
const diehard = createCreature({
  id: 'diehard',
  name: 'Diehard',
  cells: [
    [0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1]
  ]
});

// 7 cells → explodes into ~633 cells after 5206 generations
const acorn = createCreature({
  id: 'acorn',
  name: 'Acorn',
  cells: [
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1]
  ]
});

// 7 cells → stabilizes after 173 generations
const piHeptomino = createCreature({
  id: 'pi-heptomino',
  name: 'Pi-heptomino',
  cells: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1]
  ]
});

// 7 cells → stabilizes after 243 generations
const bHeptomino = createCreature({
  id: 'b-heptomino',
  name: 'B-heptomino',
  cells: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ]
});

// ── Infinite growth ──────────────────────────────────────
// The first pattern discovered that grows without bound.
// Every 30 generations it fires a new glider — population grows forever.
const gosperGliderGun = createCreature({
  id: 'gosper-glider-gun',
  name: 'Gosper Glider Gun',
  cells: [
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1
    ],
    [
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
  ]
});

export {
  acorn,
  beacon,
  beehive,
  bHeptomino,
  // Oscillators
  blinker,
  // Still lifes
  block,
  diehard,
  // Spaceships
  glider,
  // Infinite growth
  gosperGliderGun,
  loaf,
  lwss,
  mwss,
  pentadecathlon,
  piHeptomino,
  pulsar,
  // Methuselahs
  rPentomino,
  toad
};
