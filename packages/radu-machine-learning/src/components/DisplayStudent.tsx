import type { Drawing, Drawings, Student_name } from '../core/types';

type DisplayStudentProps = {
  student_name: Student_name;
  drawings: Drawings;
};

function DisplayStudent({ student_name, drawings }: DisplayStudentProps) {
  return (
    <div className="group/row grid grid-cols-[10%_1fr] items-center gap-4">
      <h3 className="text-muted group-hover/row:text-foreground overflow-hidden text-ellipsis">
        {student_name}
      </h3>
      <div className="flex gap-4 overflow-y-auto">
        {drawings.map((drawing: Drawing) => {
          return (
            <div
              key={drawing.id}
              className="group/col flex flex-col gap-2"
            >
              <label className="text-muted group-hover/col:text-foreground text-center text-xs">
                {drawing.label}
              </label>
              <img
                loading="lazy"
                className="border-border/10 rounded border bg-black/50 object-cover p-2"
                src={`/radu-img/${drawing.id}.svg`}
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
