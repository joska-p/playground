export type NextStepOptions = {
  index: number;
  current: number;
  sequence: number[];
  seen: Set<number>;
};

export type SequenceRule = {
  name: string;
  id: string;
  description: string;
  maxSteps: number;
  getNext: (options: NextStepOptions) => number;
};
