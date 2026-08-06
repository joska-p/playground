import { features } from '../data/dataset/ts_objects/features';
import type { Drawing, Path, Students } from './types';

const { samples } = features;

function getSamplesByStudents(): Students {
    return samples.reduce((students: Students, sample) => {
        const existing = students[sample.student_id];

        const drawing: Drawing = {
            id: sample.id,
            label: sample.label,
            point: sample.point
        };

        if (existing) {
            existing.drawings.push(drawing);
        } else {
            students[sample.student_id] = {
                id: sample.student_id,
                name: sample.student_name,
                drawings: [drawing]
            };
        }

        return students;
    }, {});
}

function getDrawingLabels() {
    const labels = new Set<string>();

    for (const sample of samples) {
        labels.add(sample.label);
    }

    return Array.from(labels);
}

function getPointCount(paths: Path[]) {
    return paths.flat().length;
}

export { getDrawingLabels, getPointCount, getSamplesByStudents };
