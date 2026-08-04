import { type InputStore } from '@repo/pixelate2d-core';
import { useEffect, useState } from 'react';

/**
 * Polls the engine's input store on an interval and renders its state. The
 * store itself never triggers React renders — this widget deliberately pulls
 * values into React at UI frequency to display them.
 */
export function LiveStatus({ input }: { input: InputStore | null }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, []);

  if (!input) {
    return <p className="font-mono text-xs text-neutral-600">engine not mounted</p>;
  }

  const keys = ['W', 'A', 'S', 'D'].map((key) => (input.isKeyDown(`Key${key}`) ? key : '·')).join('');

  return (
    <dl className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-xs">
      <dt className="text-neutral-500">pointer</dt>
      <dd className="text-right text-neutral-200">
        {input.pointer.x.toFixed(0)}, {input.pointer.y.toFixed(0)}
      </dd>
      <dt className="text-neutral-500">mouse</dt>
      <dd className="text-right text-neutral-200">{input.mouseDown ? 'down' : 'up'}</dd>
      <dt className="text-neutral-500">WASD</dt>
      <dd className="text-right text-neutral-200">{keys}</dd>
    </dl>
  );
}
