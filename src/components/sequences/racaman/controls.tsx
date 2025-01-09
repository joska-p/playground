import { Slider } from "@/components/ui/slider/slider";
import { createRacamanSequence } from "./lib/sequence";

type Props = {
  setSequence: (sequence: number[]) => void;
  sequenceLength: number;
  setDrawMode: (mode: string) => void;
  drawMode: string;
};

function Controls({ setSequence, sequenceLength, setDrawMode, drawMode }: Props) {
  function handleSequenceLengthChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSequence(createRacamanSequence(Number.parseInt(event.target.value)));
  }

  function handleSetDrawMode(event: React.ChangeEvent<HTMLInputElement>) {
    setDrawMode(event.target.value);
  }

  return (
    <form className="flex items-center justify-center gap-8 bg-background/90 py-4">
      <Slider.Label className="flex w-fit cursor-pointer items-center gap-2 text-sm">
        <span className="mr-2 text-nowrap">Length: {sequenceLength}</span>
        <Slider.Input min={1} max={256} step={1} defaultValue={sequenceLength} onChange={handleSequenceLengthChange} />
      </Slider.Label>
      <label className="cursor-pointer text-sm">
        <input
          type="radio"
          value="canvas-mode"
          checked={drawMode === "canvas-mode"}
          name="change-draw-mode"
          onChange={handleSetDrawMode}
          className="mr-2"
        />
        Canvas mode
      </label>
      <label htmlFor="vector-mode" className="cursor-pointer text-sm">
        <input
          type="radio"
          value="vector-mode"
          checked={drawMode === "vector-mode"}
          name="change-draw-mode"
          onChange={handleSetDrawMode}
          className="mr-2"
        />
        Vector mode
      </label>
    </form>
  );
}

export { Controls };
