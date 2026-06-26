export type NextStepOptions = {
  index: number;
  current: number;
  sequence: number[];
  seen: Set<number>;
  seed?: string | undefined;
};

export type SequenceRule = {
  name: string;
  id: string;
  description: string;
  maxSteps: number;
  getNext: (options: NextStepOptions) => number;
};
