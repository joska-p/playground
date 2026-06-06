import { DisplayStudent } from './DisplayStudent';
import { samples } from '../data/dataset/ts_objects/samples';

function DisplayGroups() {
  const students = Object.groupBy(samples, (sample) => sample.student_id);

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(students).map((student) => {
        const [student_id, samples] = student;
        return (
          <DisplayStudent
            key={student_id}
            samples={samples}
          />
        );
      })}
    </div>
  );
}
export { DisplayGroups };
