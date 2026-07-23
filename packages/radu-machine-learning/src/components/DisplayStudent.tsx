import { Card } from '@repo/ui/card';
import { getDrawingLabels } from '../core/api';
import type { Drawing, StudentName } from '../core/types';

type DisplayStudentProps = {
  name: StudentName;
  drawings: Drawing[];
};

function DisplayStudent({ name, drawings }: DisplayStudentProps) {
  const columnCount = getDrawingLabels().length + 1;

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
            className="w-fit"
            id={`drawing-${String(drawing.id)}`}
            data-label={drawing.label}
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
