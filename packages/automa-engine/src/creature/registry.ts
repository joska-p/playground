import {
  acorn,
  beacon,
  beehive,
  bHeptomino,
  blinker,
  block,
  diehard,
  glider,
  gosperGliderGun,
  loaf,
  lwss,
  mwss,
  pentadecathlon,
  piHeptomino,
  pulsar,
  rPentomino,
  toad
} from './builtin';
import type { Creature } from './types';

export const allCreatures = [
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
  gosperGliderGun
] as const satisfies readonly Creature[];

type CreatureId = (typeof allCreatures)[number]['id'];

const creatures = new Map<CreatureId, Creature>(
  allCreatures.map((creature) => [creature.id, creature])
);

function getCreature(id: CreatureId): Creature | undefined {
  return creatures.get(id);
}

function getAllCreatures(): Creature[] {
  return Array.from(creatures.values());
}

export { getAllCreatures, getCreature };
export type { CreatureId };
