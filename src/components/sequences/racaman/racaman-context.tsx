import { createContext, useContext, useState, type ComponentProps } from "react";
import { createRacamanSequence } from "./lib/sequence";

interface RacamanContext {
  sequence: number[];
  drawMode: "vector-mode" | "canvas-mode";
  containerSize: { width: number; height: number };
  setContainerSize: React.Dispatch<React.SetStateAction<{ width: number; height: number }>>;
  updateSequence: (value: number) => void;
  changeDrawMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RacamanContext = createContext<RacamanContext | null>(null);

function RacamanProvider({ children }: ComponentProps<"div">) {
  const [sequence, setSequence] = useState<number[]>(createRacamanSequence(30));
  const [drawMode, setDrawMode] = useState<"vector-mode" | "canvas-mode">("vector-mode");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const updateSequence = (value: number) => {
    setSequence(createRacamanSequence(value));
  };

  const changeDrawMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "canvas-mode" && event.target.value !== "vector-mode")
      throw new Error("Invalid draw mode");
    setDrawMode(event.target.value);
  };

  return (
    <RacamanContext.Provider
      value={{
        sequence,
        drawMode,
        containerSize,
        setContainerSize,
        updateSequence,
        changeDrawMode,
      }}
    >
      {children}
    </RacamanContext.Provider>
  );
}

function useRacamanContext() {
  const context = useContext(RacamanContext);
  if (!context) throw new Error("useRacaman must be used within a RacamanProvider");
  return context;
}

export { RacamanProvider, useRacamanContext };
