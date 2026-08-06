// ==========================================
// 1. Base / Primitive Types
// ==========================================

export type Point = [number, number];
export type Path = Point[];

// ==========================================
// 2. Core Entities
// ==========================================

export type Label = 'car' | 'fish' | 'house' | 'tree' | 'bicycle' | 'guitar' | 'pencil' | 'clock';

export type RawSample = {
    session: number;
    student: string;
    drawings: Record<Label, Path[]>;
};

export type Sample = {
    readonly id: number;
    readonly label: Label;
    readonly student_id: number;
    readonly student_name: string;
};

export type Drawing = {
    id: number;
    label: Label;
    point?: Point;
};

export type Student = {
    id: number;
    name: string;
    drawings: Drawing[];
};

export type Students = Record<Student['id'], Student>;

// ==========================================
// 3. Feature Generation Types
// ==========================================

// Point is guaranteed to exist on each feature sample
export type FeatureSample = Sample & {
    point: Point;
};

export type Features = {
    readonly featureNames: readonly ['Path Count', 'Point Count'];
    readonly samples: FeatureSample[];
};
