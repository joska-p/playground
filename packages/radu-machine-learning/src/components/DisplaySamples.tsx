import { getDrawingLabels, getSamplesByStudents } from '../core/api';
import { DisplayStudent } from './DisplayStudent';

function DisplaySamples() {
  const students = getSamplesByStudents();
  const columnCount = getDrawingLabels().length + 1;

  return (
    <div
      className="grid h-full content-start items-center gap-2 overflow-y-auto"
      style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
    >
      {Object.values(students).map((student) => {
        return (
          <DisplayStudent
            key={student.id}
            name={student.name}
            drawings={student.drawings}
          />
        );
      })}
    </div>
  );
}
export { DisplaySamples };
