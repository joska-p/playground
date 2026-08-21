import { randomartStore } from '../store';

import type { BehaviorId } from '@repo/randomart-engine-next/types';

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
