import {
  block,
  beehive,
  loaf,
  blinker,
  toad,
  beacon,
  pulsar,
  pentadecathlon,
  glider,
  lwss,
  mwss,
  rPentomino,
  diehard,
  acorn,
  piHeptomino,
  bHeptomino,
  gosperGliderGun,
} from './builtin.ts';
import type { Creature } from './types.ts';

const creatures = new Map<string, Creature>([
  [block.id, block],
  [beehive.id, beehive],
  [loaf.id, loaf],
  [blinker.id, blinker],
  [toad.id, toad],
  [beacon.id, beacon],
  [pulsar.id, pulsar],
  [pentadecathlon.id, pentadecathlon],
  [glider.id, glider],
  [lwss.id, lwss],
  [mwss.id, mwss],
  [rPentomino.id, rPentomino],
  [diehard.id, diehard],
  [acorn.id, acorn],
  [piHeptomino.id, piHeptomino],
  [bHeptomino.id, bHeptomino],
  [gosperGliderGun.id, gosperGliderGun],
]);

function registerCreature(creature: Creature): void {
  creatures.set(creature.id, creature);
}

function getCreature(id: string): Creature | undefined {
  return creatures.get(id);
}

function getAllCreatures(): Creature[] {
  return Array.from(creatures.values());
}

export { getAllCreatures, getCreature, registerCreature };
