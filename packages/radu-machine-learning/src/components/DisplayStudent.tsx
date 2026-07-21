import type { Drawing, Drawings, StudentName } from '../core/types';

type DisplayStudentProps = {
  name: StudentName;
  drawings: Drawings;
};

function DisplayStudent({ name, drawings }: DisplayStudentProps) {
  return (
    <>
      <h3 className="text-muted text-ellipsis">{name}</h3>
      {drawings.map((drawing: Drawing) => {
        return (
          <img
            key={drawing.id}
            loading="lazy"
            className="shrink rounded object-cover p-2"
            src={`/radu-img/${drawing.id}.svg`}
            alt={drawing.label}
          />
        );
      })}
    </>
  );
}
export { DisplayStudent };
