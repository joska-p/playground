import type { StudentName } from '../core/types';

type DisplayStudentProps = {
  student_name: StudentName;
  drawingIds: number[];
};

function DisplayStudent({ student_name, drawingIds }: DisplayStudentProps) {
  return (
    <div className="group/row grid grid-cols-[10%_1fr] items-center gap-4">
      <h3 className="text-muted group-hover/row:text-foreground overflow-hidden text-ellipsis">
        {student_name}
      </h3>
      <div className="flex gap-4 overflow-y-auto">
        {drawingIds.map((drawingId: number) => {
          return (
            <div
              key={drawingId}
              className="group/col flex flex-col gap-2"
            >
              <label className="text-muted group-hover/col:text-foreground text-center text-xs">
                TODO: display the label
              </label>
              <img
                loading="lazy"
                className="border-border/10 rounded border bg-black/50 object-cover p-2"
                src={`/radu-img/${drawingId}.svg`}
                alt="TODO: display the label"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export { DisplayStudent };
