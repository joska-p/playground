import { useEffect, useRef, useState } from "react";
import { useManipulatorStore } from "../../store/useManipulatorStore";
import { imageElementToImageData, putImageData } from "../../core/imageData";

function Display() {
  const imageFile = useManipulatorStore((state) => state.imageFile);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);

  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  useEffect(() => {
    if (!imageFile) return;

    const image = new Image();
    image.src = imageFile;

    image.onload = () => {
      try {
        const sourceImageData = imageElementToImageData(image);
        if (originalCanvasRef.current) {
          putImageData(originalCanvasRef.current, sourceImageData);
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Unknown error during processing"));
      }
    };

    image.onerror = () => {
      setError(new Error("Error loading image"));
    };
  }, [imageFile]);

  return <canvas ref={originalCanvasRef} className="bg-secondary max-h-screen max-w-screen" />;
}

export { Display };
