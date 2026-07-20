export type Sample = {
  id: number;
  label: string;
  student_id: string;
  student_name: string;
};
export type StudentName = Sample['student_name'];
export type Samples = Sample[];
export type Point = [number, number];
export type Path = Point[];
export type Paths = Path[];
export type Drawing = {
  id: number;
  label: string;
  paths: [number, number][][];
};
export type Drawings = Drawing[];
