import { features } from '../data/dataset/ts_objects/features';
import type { Drawing, Students } from './types';

const { samples } = features;

function getSamplesByStudents(): Students {
  const studentsMap: Students = {};

  for (const sample of samples) {
    const existing = studentsMap[sample.student_id];

    const drawing: Drawing = { id: sample.id, label: sample.label, point: sample.point };

    if (existing) {
      existing.drawings.push(drawing);
    } else {
      studentsMap[sample.student_id] = {
        id: sample.student_id,
        name: sample.student_name,
        drawings: [drawing]
      };
    }
  }

  return studentsMap;
}

function getDrawingLabels() {
  const labels = new Set<string>();

  for (const sample of samples) {
    labels.add(sample.label);
  }

  return Array.from(labels);
}

export { getDrawingLabels, getSamplesByStudents };
