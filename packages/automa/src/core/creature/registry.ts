import type { Creature } from './types.ts';

const creatures = new Map<string, Creature>();

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
