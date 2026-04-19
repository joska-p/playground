import { createRacamanSequence } from "./racaman.js";

export const SEQUENCE_GENERATORS = {
  racaman: {
    name: "Racaman's Sequence",
    generate: createRacamanSequence,
    defaultIterations: 30,
    maxIterations: 2000,
  },
} as const;

export type SequenceType = keyof typeof SEQUENCE_GENERATORS;
