import type { BehaviorId } from '@repo/randomart-engine-next/types';
import { randomartStore } from '../store';

export function toggleBehavior(id: BehaviorId): void {
  const { activeBehaviorIds } = randomartStore.getState();
  const isActive = activeBehaviorIds.includes(id);

  const nextBehaviors = isActive
    ? activeBehaviorIds.filter((bId) => bId !== id)
    : [...activeBehaviorIds, id];

  randomartStore.setState(
    { activeBehaviorIds: nextBehaviors },
    false,
    `animation/toggleBehavior (${id})`
  );
}
