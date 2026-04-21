import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ComponentProps,
} from "react";
import type { SequenceRule } from "./lib/rules.js";
import { recamanRule } from "./lib/rules.js";

interface SequenceContextType {
  sequenceRule: SequenceRule;
  setSequenceRule: (type: SequenceRule) => void;
  steps: number;
  setSteps: (n: number) => void;
  drawMode: "vector-mode" | "canvas-mode";
  setDrawMode: (mode: "vector-mode" | "canvas-mode") => void;
  sequence: number[];
}

const SequenceContext = createContext<SequenceContextType | null>(null);

function SequenceProvider({ children }: ComponentProps<"div">) {
  const [sequenceRule, setSequenceRule] = useState<SequenceRule>(recamanRule);
  const [steps, setSteps] = useState<number>(100);
  const [drawMode, setDrawMode] = useState<"vector-mode" | "canvas-mode">(
    "vector-mode",
  );

  const getSequence = useCallback(
    (SequenceRule: SequenceRule, steps: number) => {
      const sequence: number[] = [0];
      const seen = new Set([0]);
      let current = 0;

      for (let i = 1; i < steps; i++) {
        current = SequenceRule.getNext(i, current, seen);
        sequence.push(current);
        seen.add(current);
      }
      return sequence;
    },
    [],
  );

  const sequence = useMemo(() => {
    return getSequence(sequenceRule, steps);
  }, [sequenceRule, steps, getSequence]);

  return (
    <SequenceContext.Provider
      value={{
        sequenceRule,
        setSequenceRule,
        steps,
        setSteps,
        drawMode,
        setDrawMode,
        sequence,
      }}
    >
      {children}
    </SequenceContext.Provider>
  );
}

function useSequenceContext() {
  const context = useContext(SequenceContext);
  if (!context)
    throw new Error(
      "useSequenceContext must be used within a SequenceProvider",
    );
  return context;
}

export { SequenceProvider, useSequenceContext };
