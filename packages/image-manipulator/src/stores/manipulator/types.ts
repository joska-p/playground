type OutputType = {
  id: string;
  name: string;
  description: string;
  imageData: ImageData;
};

type WorkflowStep = {
  uid: string;
  id: string;
  options: Record<string, number>;
};

export type { OutputType, WorkflowStep };
