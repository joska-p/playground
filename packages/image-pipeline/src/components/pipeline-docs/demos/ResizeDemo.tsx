import { Button } from '@repo/ui/Button';
import { useState } from 'react';
import { usePipeline } from '../../../hooks/usePipeline';
import { imageDataToUrl } from '../helpers';

const MODES = [
  { id: 'width', label: 'Width (100px)', options: { width: 100 } as const },
  { id: 'height', label: 'Height (100px)', options: { height: 100 } as const },
  {
    id: 'fill',
    label: 'Fill (100×100)',
    options: { width: 100, height: 100, fit: 'fill' as const },
  },
  {
    id: 'contain',
    label: 'Contain (100×100)',
    options: { width: 100, height: 100, fit: 'contain' as const },
  },
  {
    id: 'cover',
    label: 'Cover (100×100)',
    options: { width: 100, height: 100, fit: 'cover' as const },
  },
] as const;

type ModeId = (typeof MODES)[number]['id'];

function ResizeDemo({ sourceData }: { sourceData: ImageData | null }) {
  const [selected, setSelected] = useState<ModeId>('width');
  const mode = MODES.find((m) => m.id === selected)!;
  const steps = [{ id: 'resize', options: mode.options }] as const;
  const result = usePipeline(sourceData, steps);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <Button
            key={m.id}
            variant={selected === m.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelected(m.id)}
          >
            {m.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="w-20 shrink-0">
          {result && (
            <img
              src={imageDataToUrl(result[0])}
              alt="resized"
              className="border-border w-full rounded border"
              style={{ imageRendering: 'pixelated' }}
            />
          )}
        </div>
        {result && (
          <div className="text-muted-foreground text-xs">
            {result[0].width}×{result[0].height}
          </div>
        )}
      </div>
    </div>
  );
}

export { ResizeDemo };
