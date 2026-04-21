import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ComponentProps,
} from "react";
import type { SequenceRule } from "../core/rules.js";
import { recamanRule } from "../core/rules.js";
import { generateSequence } from "../core/generator.js";

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
  const [steps, setSteps] = useState<number>(1);
  const [drawMode, setDrawMode] = useState<"vector-mode" | "canvas-mode">(
    "vector-mode",
  );

  const sequence = useMemo(() => {
    return generateSequence(sequenceRule, steps);
  }, [sequenceRule, steps]);

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
