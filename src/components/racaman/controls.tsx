import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { createRacamanSequence } from "./lib/sequence";

type Props = {
  setSequence: (sequence: number[]) => void;
  sequenceLength: number;
  setDrawMode: (mode: string) => void;
  drawMode: string;
};

const Controls = ({ setSequence, sequenceLength, setDrawMode, drawMode }: Props) => {
  const handleSequenceLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSequence(createRacamanSequence(parseInt(event.target.value)));
  };

  const handleSetDrawMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrawMode(event.target.value);
  };

  return (
    <div className="space-y-6 bg-background/90">
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="sequence-Length" className="text-sm">
            Sequence Length: {sequenceLength}
          </Label>
          <Input
            type="range"
            id="sequence-Length"
            min={1}
            max={256}
            step={1}
            defaultValue={sequenceLength}
            onChange={handleSequenceLengthChange}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="canvas-mode"
              checked={drawMode === "canvas-mode"}
              name="change-draw-mode"
              id="canvas-mode"
              onChange={handleSetDrawMode}
            />
            <Label htmlFor="canvas-mode" className="cursor-pointer">
              Canvas mode
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="vector-mode"
              checked={drawMode === "vector-mode"}
              name="change-draw-mode"
              id="vector-mode"
              onChange={handleSetDrawMode}
            />
            <Label htmlFor="vector-mode" className="cursor-pointer">
              Vector mode
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
