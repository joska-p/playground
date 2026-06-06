import type { Drawings, Drawing, Student_name } from '../core/types';

type DisplayStudentProps = {
  student_name: Student_name;
  drawings: Drawings;
};

function DisplayStudent({ student_name, drawings }: DisplayStudentProps) {
  return (
    <div className="grid grid-cols-[10%_1fr] items-center gap-4 group/row">
      <h3 className="overflow-hidden text-ellipsis text-muted group-hover/row:text-foreground">
        {student_name}
      </h3>
      <div className="flex gap-4 overflow-y-auto">
        {drawings.map((drawing: Drawing) => {
          return (
            <div
              key={drawing.id}
              className="flex gap-2  flex-col group/col "
            >
              <label className="text-xs text-muted text-center group-hover/col:text-foreground">
                {drawing.label}
              </label>
              <img
                loading="lazy"
                className="object-cover p-2  border border-border/10 rounded bg-black/50"
                src={`/img/${drawing.id}.svg`}
                alt={drawing.label}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export { DisplayStudent };
