import { useEffect, useState } from 'react';
import { projects } from '../../../data/projects';

type Category =
  | 'generative'
  | 'color'
  | 'image'
  | 'data-viz'
  | 'random'
  | 'simulation';

const CATEGORY_META: Record<Category, { label: string; order: number }> = {
  generative: { label: 'Generative Art', order: 0 },
  color: { label: 'Color & Design', order: 1 },
  image: { label: 'Image Processing', order: 2 },
  'data-viz': { label: 'Data Visualization', order: 3 },
  random: { label: 'Random & Misc', order: 4 },
  simulation: { label: 'Simulation', order: 5 },
} as const;

const CATEGORY_ORDER = Object.entries(CATEGORY_META).sort(
  (a, b) => a[1].order - b[1].order
) as [Category, { label: string; order: number }][];

const grouped = CATEGORY_ORDER.map(([id, meta]) => ({
  id,
  label: meta.label,
  experiments: Object.values(projects).filter((p) => p.category === id),
})).filter((g) => g.experiments.length > 0);

function Cursor() {
  return (
    <span className="inline-block h-[1.1em] w-[0.55em] animate-pulse bg-current align-middle" />
  );
}

export function TerminalPreview() {
  const [phase, setPhase] = useState<'prompt' | 'command' | 'output'>('prompt');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('command'), 400);
    const t2 = setTimeout(() => setPhase('output'), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="border-border flex justify-center border-b px-6 py-8 lg:py-10">
      <div className="w-full max-w-6xl">
        <div className="overflow-hidden rounded-xl border border-[#504945] bg-[#1d2021] shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-[#504945] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#cc241d]" />
            <span className="h-3 w-3 rounded-full bg-[#d79921]" />
            <span className="h-3 w-3 rounded-full bg-[#689d6a]" />
            <span className="ml-auto font-mono text-[11px] tracking-wide text-[#a89984] uppercase">
              term
            </span>
          </div>

          <div className="space-y-1.5 px-5 py-4 pb-5 font-mono text-sm leading-relaxed text-[#ebdbb2]">
            <div className="flex flex-wrap items-baseline gap-x-1">
              <span className="text-[#83a598]">visitor</span>
              <span className="text-[#a89984]">@</span>
              <span className="text-[#b8bb26]">playground</span>
              <span className="text-[#a89984]">:~$</span>
              {phase === 'prompt' && <Cursor />}
              {phase === 'command' && (
                <span className="text-[#ebdbb2]">
                  ./explore
                  <Cursor />
                </span>
              )}
            </div>

            {phase === 'output' && (
              <>
                <div className="h-2" />
                {grouped.map(({ id, label, experiments }) => (
                  <div
                    key={id}
                    className="flex flex-wrap items-baseline gap-x-1"
                  >
                    <span className="text-[#83a598]">{label}</span>
                    <span className="text-[#a89984]">/</span>
                    {experiments.map((exp, i) => (
                      <span key={exp.slug}>
                        <span
                          className="font-bold"
                          style={{
                            color: `var(--category-${id})`,
                          }}
                        >
                          {exp.name}
                        </span>
                        {i < experiments.length - 1 && (
                          <span className="text-[#504945]">,&nbsp;</span>
                        )}
                      </span>
                    ))}
                    {id !== grouped[grouped.length - 1]?.id && (
                      <span className="mx-1 text-[#504945]">/</span>
                    )}
                  </div>
                ))}

                <div className="h-2" />
                <div className="flex flex-wrap items-baseline gap-x-1">
                  <span className="text-[#a89984]">──</span>
                  <span className="text-[#a89984]">
                    {grouped.length} categories
                  </span>
                  <span className="text-[#504945]">·</span>
                  <span className="text-[#a89984]">
                    {Object.keys(projects).length} experiments
                  </span>
                  <span className="text-[#a89984]">──</span>
                </div>
                <div className="h-1" />
                <div className="flex flex-wrap items-baseline gap-x-1">
                  <span className="text-[#83a598]">visitor</span>
                  <span className="text-[#a89984]">@</span>
                  <span className="text-[#b8bb26]">playground</span>
                  <span className="text-[#a89984]">:~$</span>
                  <Cursor />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
