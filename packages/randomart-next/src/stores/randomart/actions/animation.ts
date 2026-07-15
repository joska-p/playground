import { randomartStore } from '../store';

export function toggleAnimationBehavior(id: string): void {
  const { activeAnimationBehaviorIds } = randomartStore.getState();
  const isActive = activeAnimationBehaviorIds.includes(id);

  const nextBehaviors = isActive
    ? activeAnimationBehaviorIds.filter((bId) => bId !== id)
    : [...activeAnimationBehaviorIds, id];

  randomartStore.setState(
    { activeAnimationBehaviorIds: nextBehaviors },
    false,
    `animation/toggleAnimationBehavior (${id})`
  );
}
