export type Sample = {
  readonly id: number;
  readonly label: string;
  readonly student_id: number;
  readonly student_name: string;
  point?: Point;
};
export type StudentName = Sample['student_name'];
export type Samples = Sample[];
export type Point = [number, number];
export type Path = Point[];
export type Paths = Path[];
export type Drawing = {
  id: number;
  label: string;
  point?: Point;
};
export type Drawings = Drawing[];
export type Features = {
  readonly featureNames: ['Path Count', 'Point Count'];
  readonly samples: Samples;
};

export type Student = {
  id: number;
  name: StudentName;
  drawings: Drawing[];
};
export type Students = Record<Student['id'], Student>;
