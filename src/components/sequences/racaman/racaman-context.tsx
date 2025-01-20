import { useSignal, type Signal } from "@preact/signals-react";
import { createContext, useContext, type ComponentProps } from "react";
import { createRacamanSequence } from "./lib/sequence";

interface RacamanContext {
  sequence: Signal<number[]>;
  drawMode: Signal<string>;
  containerSize: Signal<{ width: number; height: number }>;
  updateSequence: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeDrawMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RacamanContext = createContext<RacamanContext | null>(null);

function RacamanProvider({ children }: ComponentProps<"div">) {
  const sequence = useSignal<number[]>(createRacamanSequence(30));
  const drawMode = useSignal("vector-mode");
  const containerSize = useSignal({ width: 0, height: 0 });

  const updateSequence = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line react-compiler/react-compiler
    sequence.value = createRacamanSequence(Number(event.target.value));
  };

  const changeDrawMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    drawMode.value = event.target.value;
  };

  return (
    <RacamanContext.Provider
      value={{ sequence, drawMode, containerSize, updateSequence, changeDrawMode }}
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
