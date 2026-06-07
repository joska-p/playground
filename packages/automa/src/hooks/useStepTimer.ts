import { useEffect, useRef, useState } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import type { CAStore } from '../stores/automaton/types.ts';

type StepTimer = {
  stepTime: number;
  roundTripTime: number;
  lastStepTime: React.MutableRefObject<number>;
};

const useStepTimer = (store: StoreApi<CAStore>): StepTimer => {
  const [stepTime, setStepTime] = useState(0);
  const [roundTripTime, setRoundTripTime] = useState(0);
  const lastStepTime = useRef(0);

  useEffect(() => {
    const unsub = store.subscribe((state, prev) => {
      if (state.generation !== prev.generation) {
        setStepTime(performance.now() - lastStepTime.current);
        setRoundTripTime(performance.now() - lastStepTime.current);
      }
    });
    return unsub;
  }, [store]);

  return { stepTime, roundTripTime, lastStepTime };
};

export { useStepTimer };
export type { StepTimer };
