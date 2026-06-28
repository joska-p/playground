type OutputType = {
  id: string;
  name: string;
  description: string;
  imageData: ImageData;
};

type WorkflowStep = {
  uid: string;
  id: string;
  options: Record<string, unknown>;
};

export type { OutputType, WorkflowStep };
