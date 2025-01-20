import { useRacamanContext } from "./racaman-context";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { Slider } from "@/components/ui/slider/slider";

function Controls() {
  const { sequence, drawMode, updateSequence, changeDrawMode } = useRacamanContext();

  return (
    <form className="flex items-center justify-center gap-8 bg-background/90 py-4">
      <Slider.Label>
        Length: {sequence.value.length}
        <Slider.Input
          min={1}
          max={256}
          step={1}
          defaultValue={sequence.value.length}
          onChange={updateSequence}
        />
      </Slider.Label>
      <Label>
        <Input
          type="radio"
          value="canvas-mode"
          checked={drawMode.value === "canvas-mode"}
          name="canvas-mode"
          onChange={changeDrawMode}
        />
        Canvas mode
      </Label>
      <Label>
        <Input
          type="radio"
          value="vector-mode"
          checked={drawMode.value === "vector-mode"}
          name="vectors-mode"
          onChange={changeDrawMode}
        />
        Vector mode
      </Label>
    </form>
  );
}

export { Controls };
