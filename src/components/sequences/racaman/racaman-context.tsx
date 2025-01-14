import { signal, type Signal } from "@preact/signals-react";
import { createContext, useContext, type ComponentProps } from "react";
import { createRacamanSequence } from "./lib/sequence";

interface RacamanContext {
  sequence: Signal<number[]>;
  drawMode: Signal<string>;
  containerSize: Signal<{ width: number; height: number }>;
}

const RacamanContext = createContext<RacamanContext | null>(null);

function RacamanProvider({ children }: ComponentProps<"div">) {
  const sequence = signal<number[]>(createRacamanSequence(30));
  const drawMode = signal("vector-mode");
  const containerSize = signal({ width: 0, height: 0 });

  return (
    <RacamanContext.Provider value={{ sequence, drawMode, containerSize }}>
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
