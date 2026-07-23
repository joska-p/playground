import { getSamplesByStudents } from '../core/api';
import { DisplayStudent } from './DisplayStudent';

function DisplaySamples() {
  const students = getSamplesByStudents();

  return (
    <div className="h-full min-h-0 max-w-2/3 space-y-4 overflow-y-auto p-2">
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
