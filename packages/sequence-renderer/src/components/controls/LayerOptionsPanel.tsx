import type { JSX } from 'react';
import type { ParamDescriptor } from '../../core/visualizations/types';

type LayerOptionsPanelProps = {
  params: Record<string, ParamDescriptor>;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
};

function LayerOptionsPanel({
  params,
  values,
  onChange
}: LayerOptionsPanelProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2 border-t border-zinc-700 pt-2 mt-2">
      {Object.entries(params).map(([key, descriptor]) => (
        <div key={key} className="flex items-center gap-3">
          <label className="w-28 shrink-0 text-xs text-zinc-400">
            {descriptor.label}
          </label>

          {descriptor.type === 'number' && (
            <div className="flex flex-1 items-center gap-2">
              <input
                type="range"
                min={descriptor.min}
                max={descriptor.max}
                step={descriptor.step}
                value={(values[key] as number) ?? descriptor.min}
                onChange={(e) => onChange(key, Number(e.target.value))}
                className="flex-1 accent-zinc-400"
              />
              <span className="w-10 text-right text-xs text-zinc-400 tabular-nums">
                {Number((values[key] as number) ?? descriptor.min).toFixed(
                  descriptor.step < 1 ? 2 : 0
                )}
              </span>
            </div>
          )}

          {descriptor.type === 'color' && (
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={
                  (values[key] as string) ?? '#ffffff'
                }
                onChange={(e) => onChange(key, e.target.value)}
                className="h-6 w-8 cursor-pointer rounded border border-zinc-600 bg-transparent"
              />
              <span className="text-xs text-zinc-500 font-mono">
                {(values[key] as string) ?? 'inherit'}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export { LayerOptionsPanel };
