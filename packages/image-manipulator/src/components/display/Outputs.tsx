import { useEffect } from "react";
import { Output } from "./Output";
import { imageElementToImageData } from "../../core/imageData";
import { useManipulatorStore, addToOutputs } from "../../store/useManipulatorStore";
import type { OutputType } from "../../store/useManipulatorStore";

function Outputs() {
  const imageFile = useManipulatorStore((state) => state.imageFile);
  const outputs = useManipulatorStore((state) => state.outputs);

  useEffect(() => {
    if (!imageFile) return;

    const image = new Image();
    image.src = imageFile;

    image.onload = () => {
      try {
        const sourceImage: OutputType = {
          id: "source",
          name: "source",
          description: "image source",
          imageData: imageElementToImageData(image),
        };
        addToOutputs(sourceImage);
      } catch (e) {
        throw new Error("Unknown error during processing", e);
      }
    };
  }, [imageFile]);

  return (
    <div>
      {outputs.map((output) => (
        <Output key={output.id} imageData={output.imageData} />
      ))}
    </div>
  );
}

export { Outputs };
