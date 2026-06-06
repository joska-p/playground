import { DisplayStudent } from './DisplayStudent';
import { samples } from '../data/dataset/ts_objects/samples';

function DisplaySamples() {
  return (
    <div className="flex flex-col gap-2">
      {samples.map((sample) => (
        <DisplayStudent
          key={sample.student_id}
          student_name={sample.student_name}
          drawings={sample.drawings}
        />
      ))}
    </div>
  );
}
export { DisplaySamples };
