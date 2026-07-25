import { Card } from '@repo/ui/card';
import { cn } from '@repo/ui/lib/cn';
import { getDrawingLabels } from '../core/api';
import type { Drawing, Label, StudentName } from '../core/types';
import { setSelectedDrawingId, useSelectedDrawingId } from '../stores/radu';

const labelToColorMap: Record<Label, string> = {
  car: 'var(--color-red)',
  fish: 'var(--color-blue)',
  house: 'var(--color-primary)',
  tree: 'var(--color-green)',
  bicycle: 'var(--color-yellow)',
  guitar: 'var(--color-purple)',
  pencil: 'var(--color-aqua)',
  clock: 'var(--color-orange)'
};

type DisplayStudentProps = {
  name: StudentName;
  drawings: Drawing[];
};

function DisplayStudent({ name, drawings }: DisplayStudentProps) {
  const columnCount = getDrawingLabels().length + 1;
  const selectedDrawingId = useSelectedDrawingId();

  return (
    <div
      className="grid items-center gap-2"
      style={{ gridTemplateColumns: `repeat(${String(columnCount)}, minmax(0, 1fr))` }}
    >
      <h3 className="text-muted text-ellipsis">{name}</h3>
      {drawings.map((drawing: Drawing) => {
        return (
          <Card
            key={drawing.id}
            data-drawing-id={String(drawing.id)}
            data-label={drawing.label}
            onClick={() => {
              setSelectedDrawingId(drawing.id);
            }}
            className={cn('w-fit cursor-pointer hover:ring', {
              'z-20 ring': selectedDrawingId === drawing.id
            })}
            style={{ '--tw-ring-color': labelToColorMap[drawing.label] } as React.CSSProperties}
          >
            <img
              loading="lazy"
              className="aspect-square object-cover"
              src={`/radu-img/${String(drawing.id)}.svg`}
              alt={drawing.label}
            />
          </Card>
        );
      })}
    </div>
  );
}
export { DisplayStudent };
