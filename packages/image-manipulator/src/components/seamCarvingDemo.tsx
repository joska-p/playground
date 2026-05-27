import { Input } from "@repo/ui";
import { useEffect, useRef, useState } from "react";
import { fork } from "../core/fork.js";
import { imageElementToImageData, putImageData } from "../core/imageData.js";
import { pipe } from "../core/pipe.js";
import { useImageUpload } from "../hooks/use-image-upload.js";
import { brightness } from "../manipulations/brightness.js";
import { energyMap } from "../manipulations/energyMap.js";
import { grayscale } from "../manipulations/grayscale.js";
import { useManipulatorStore } from "../store/useManipulatorStore.js";

function ImageManipulator() {
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

export { ImageManipulator };
