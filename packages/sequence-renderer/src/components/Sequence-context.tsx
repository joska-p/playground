import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ComponentProps,
} from "react";
import { SEQUENCE_GENERATORS, type SequenceType } from "./generators/index.js";

interface SequenceContextType {
  sequenceType: SequenceType;
  setSequenceType: (type: SequenceType) => void;
  iterations: number;
  setIterations: (n: number) => void;
  drawMode: "vector-mode" | "canvas-mode";
  setDrawMode: (mode: "vector-mode" | "canvas-mode") => void;
  containerSize: { width: number; height: number };
  setContainerSize: (size: { width: number; height: number }) => void;
  sequence: number[];
}

const SequenceContext = createContext<SequenceContextType | null>(null);

function SequenceProvider({ children }: ComponentProps<"div">) {
  const [sequenceType, setSequenceType] = useState<SequenceType>("recaman");
  const [iterations, setIterations] = useState<number>(
    SEQUENCE_GENERATORS[sequenceType].defaultIterations,
  );
  const [drawMode, setDrawMode] = useState<"vector-mode" | "canvas-mode">(
    "vector-mode",
  );
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const sequence = useMemo(() => {
    return SEQUENCE_GENERATORS[sequenceType].generate(iterations);
  }, [sequenceType, iterations]);

  return (
    <SequenceContext.Provider
      value={{
        sequenceType,
        setSequenceType,
        iterations,
        setIterations,
        drawMode,
        setDrawMode,
        containerSize,
        setContainerSize,
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
