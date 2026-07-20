import { features } from '../data/dataset/ts_objects/features';
import { DisplayStudent } from './DisplayStudent';

const { samples } = features;

function getDrawingIdsFromStudentId(id: number) {
  return samples.filter((sample) => sample.student_id === id).map((sample) => sample.id);
}

function DisplaySamples() {
  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto">
      {samples.map((sample) => {
        const drawingIds = getDrawingIdsFromStudentId(sample.student_id);
        return (
          <DisplayStudent
            key={sample.id}
            student_name={sample.student_name}
            drawingIds={drawingIds}
          />
        );
      })}
    </div>
  );
}
export { DisplaySamples };
