import type { samples } from '../data/dataset/ts_objects/samples';

export type Sample = (typeof samples)[number];
export type Samples = readonly Sample[];
export type Sample_id = Sample['id'];
export type Label = Sample['label'];
export type Student_name = Sample['student_name'];
export type Student_id = Sample['student_id'];
