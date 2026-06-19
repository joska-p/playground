import { randomartStore } from '../store';

export function toggleAnimationBehavior(id: string) {
  const { activeAnimationBehaviorIds } = randomartStore.getState();
  const isActive = activeAnimationBehaviorIds.includes(id);

  if (isActive) {
    randomartStore.setState({
      activeAnimationBehaviorIds: activeAnimationBehaviorIds.filter(
        (bId) => bId !== id
      )
    });
  } else {
    randomartStore.setState({
      activeAnimationBehaviorIds: [...activeAnimationBehaviorIds, id]
    });
  }
}
