import { createRecamanSequence } from "./recaman.js";

export const SEQUENCE_GENERATORS = {
  recaman: {
    name: "Recamán's Sequence",
    generate: createRecamanSequence,
    defaultIterations: 30,
    maxIterations: 2000,
  },
} as const;

export type SequenceType = keyof typeof SEQUENCE_GENERATORS;
