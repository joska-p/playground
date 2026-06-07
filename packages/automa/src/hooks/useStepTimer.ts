import { useEffect, useRef, useState } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import type { CAStore } from '../stores/automaton/types.ts';

type StepTimer = {
  stepTime: number;
  roundTripTime: number;
  tickStartTime: React.MutableRefObject<number>;
};

const useStepTimer = (store: StoreApi<CAStore>): StepTimer => {
  const [stepTime, setStepTime] = useState(0);
  const [roundTripTime, setRoundTripTime] = useState(0);
  const tickStartTime = useRef(0);

  useEffect(() => {
    tickStartTime.current = performance.now();
    const unsub = store.subscribe((state, prev) => {
      if (state.generation !== prev.generation) {
        const now = performance.now();
        setStepTime(now - tickStartTime.current);
        setRoundTripTime(now - tickStartTime.current);
        tickStartTime.current = now;
      }
    });
    return unsub;
  }, [store]);

  return { stepTime, roundTripTime, tickStartTime };
};

export { useStepTimer };
export type { StepTimer };
