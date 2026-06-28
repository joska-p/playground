import { Canvas } from '@react-three/fiber';
import { expand } from '@repo/l-system-engine';
import { button, useControls } from 'leva';
import { useEffect, useMemo, useState } from 'react';
import { interpretWord } from '../core/interpreter';
import { GRAMMARS } from '../grammars';
import { Scene } from './Scene';

export function LSystemApp() {
  const [iterations, setIterations] = useState(0);

  const grammarOptions = useMemo(() => Object.fromEntries(GRAMMARS.map((g) => [g.name, g.id])), []);

  const { grammarId } = useControls('Grammar', {
    grammarId: { value: GRAMMARS[0]!.id, options: grammarOptions }
  });

  const { autoStep, interval } = useControls('Animation', {
    autoStep: { value: false },
    Step: button(() => setIterations((prev) => prev + 1)),
    Reset: button(() => setIterations(0)),
    interval: {
      value: 1,
      min: 0.25,
      max: 5,
      step: 0.25,
      render: (get: (path: string) => boolean) => get('Animation.autoStep')
    }
  });

  const { angle, stepLength, lengthFactor, lineWidth, widthFactor } = useControls('Turtle', {
    angle: { value: 90, min: 1, max: 180, step: 1 },
    stepLength: { value: 0.5, min: 0.01, max: 5 },
    lengthFactor: { value: 1, min: 0.1, max: 5, step: 0.1 },
    lineWidth: { value: 1, min: 0.5, max: 10, step: 0.5 },
    widthFactor: { value: 1, min: 0.1, max: 5, step: 0.1 }
  });

  const [prevGrammarId, setPrevGrammarId] = useState(grammarId);
  if (grammarId !== prevGrammarId) {
    setPrevGrammarId(grammarId);
    setIterations(0);
  }

  const currentGrammar = GRAMMARS.find((g) => g.id === grammarId) ?? GRAMMARS[0]!;

  useEffect(() => {
    if (!autoStep) return;
    const id = setInterval(() => {
      setIterations((prev) => {
        if (prev >= currentGrammar.maxIterations) return prev;
        return prev + 1;
      });
    }, interval * 1000);
    return () => clearInterval(id);
  }, [autoStep, interval, currentGrammar.maxIterations]);

  const segments = useMemo(() => {
    const word = expand(currentGrammar.grammar, iterations);
    const opts = { angle, stepLength, lengthFactor, lineWidth, widthFactor };
    return interpretWord(word, opts);
  }, [currentGrammar, iterations, angle, stepLength, lengthFactor, lineWidth, widthFactor]);

  return (
    <div className="relative h-screen w-full">
      <div className="bg-background/80 text-foreground pointer-events-none absolute top-4 left-4 z-10 rounded px-3 py-1.5 font-mono text-sm">
        {currentGrammar.name} &mdash; iter {iterations}/{currentGrammar.maxIterations} &mdash;{' '}
        {segments.length} segments
      </div>
      <Canvas camera={{ position: [5, 5, 10], fov: 60 }}>
        <Scene segments={segments} />
      </Canvas>
    </div>
  );
}
