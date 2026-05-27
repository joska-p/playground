import { Input } from "@repo/ui/Input";
import { useEffect, useRef, useState } from "react";
import { fork } from "../core/fork";
import { imageElementToImageData, putImageData } from "../core/imageData";
import { pipe } from "../core/pipe";
import { useImageUpload } from "../hooks/useImageUpload";
import { brightness } from "../manipulations/brightness";
import { energyMap } from "../manipulations/energyMap";
import { grayscale } from "../manipulations/grayscale";
import { useManipulatorStore } from "../store/useManipulatorStore";

function SeamCarvingDemo() {
  const imageFile = useManipulatorStore((state) => state.imageFile);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const pipelineCanvasRef = useRef<HTMLCanvasElement>(null);
  const energyCanvasRef = useRef<HTMLCanvasElement>(null);

  const { handleImageUpload } = useImageUpload();
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  useEffect(() => {
    if (!imageFile) return;

    const image = new Image();
    image.src = imageFile;

    image.onload = () => {
      try {
        // --- Source ImageData (entry point for all transformations) ---
        const sourceImageData = imageElementToImageData(image);

        // --- Original: draw unmodified image ---
        if (originalCanvasRef.current) {
          putImageData(originalCanvasRef.current, sourceImageData);
        }

        // --- Pipeline: grayscale → brighten (one loop pass) ---
        const pipelineResult = pipe(
          grayscale.callback(),
          brightness.callback(1.3)
        )(sourceImageData);

        if (pipelineCanvasRef.current) {
          putImageData(pipelineCanvasRef.current, pipelineResult);
        }

        // --- Fork: energy map derived independently from the source ---
        const energyResult = fork(energyMap.callback())(sourceImageData);

        if (energyCanvasRef.current) {
          putImageData(energyCanvasRef.current, energyResult);
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Unknown error during processing"));
      }
    };

    image.onerror = () => {
      setError(new Error("Error loading image"));
    };
  }, [imageFile]);

  return (
    <div>
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
      <div>
        <canvas ref={originalCanvasRef} className="bg-card max-h-screen max-w-screen" />
        <canvas ref={pipelineCanvasRef} className="bg-card max-h-screen max-w-screen" />
        <canvas ref={energyCanvasRef} className="bg-card max-h-screen max-w-screen" />
      </div>
    </div>
  );
}

export { SeamCarvingDemo };
