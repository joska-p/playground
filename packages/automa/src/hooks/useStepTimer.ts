import { useEffect, useRef, useState } from 'react';

const useStepTimer = (generation: number) => {
  const [stepTime, setStepTime] = useState(0);
  const [roundTripTime, setRoundTripTime] = useState(0);
  const prevGen = useRef<number | null>(null);
  const genTime = useRef(0);

  useEffect(() => {
    const genChanged =
      prevGen.current !== null && generation !== prevGen.current;
    if (genChanged) {
      const now = performance.now();
      setStepTime(now - genTime.current);
      setRoundTripTime(now - genTime.current);
    }
    genTime.current = performance.now();
    prevGen.current = generation;
  }, [generation]);

  return { stepTime, roundTripTime };
};

export { useStepTimer };
