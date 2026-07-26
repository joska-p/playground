import { Card } from '@repo/ui/card';
import { cn } from '@repo/ui/lib/cn';
import { labelToColorMap } from '../constants';
import { getDrawingLabels, getSamplesByStudents } from '../core/api';
import type { Drawing } from '../core/types';
import { setSelectedDrawingId, useBaseUrl, useSelectedDrawingId } from '../stores/store';

function StudentRow({ name, drawings }: { name: string; drawings: Drawing[] }) {
  const columnCount = getDrawingLabels().length + 1;
  const selectedDrawingId = useSelectedDrawingId();
  const baseUrl = useBaseUrl();

  return (
    <div
      className="grid items-center gap-2"
      style={{ gridTemplateColumns: `repeat(${String(columnCount)}, minmax(0, 1fr))` }}
    >
      <h3 className="text-muted text-ellipsis">{name}</h3>
      {drawings.map((drawing) => (
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
            src={`${baseUrl}radu-img/${String(drawing.id)}.svg`}
            alt={drawing.label}
          />
        </Card>
      ))}
    </div>
  );
}

function Samples() {
  const students = getSamplesByStudents();

  return (
    <div className="h-full min-h-0 max-w-2/3 space-y-4 overflow-y-auto p-2">
      {Object.values(students).map((student) => (
        <StudentRow
          key={student.id}
          name={student.name}
          drawings={student.drawings}
        />
      ))}
    </div>
  );
}

export { Samples };
