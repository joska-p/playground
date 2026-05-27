import { useEffect } from "react";
import { imageElementToImageData } from "../../core/imageData";
import type { OutputType } from "../../store/manipulatorStore";
import {
  addToManipulatorOutputs,
  useManipulatorImageFile,
  useManipulatorOutputs,
} from "../../store/manipulatorStore";
import { Output } from "./Output";

function Outputs() {
  const imageFile = useManipulatorImageFile();
  const outputs = useManipulatorOutputs();

  useEffect(() => {
    if (!imageFile) return;

    // 1. Setup an ignore flag to prevent race conditions & update on unmount
    let isSubscribed = true;

    const image = new Image();

    // Optional: Uncomment if imageFile can be an external URL
    // image.crossOrigin = "Anonymous";

    image.onload = () => {
      // Bail out if the component unmounted or imageFile changed
      if (!isSubscribed) return;

      try {
        const sourceImage: OutputType = {
          // 2. Ensure your store handles overwriting this ID properly
          id: "source",
          name: "source",
          description: "image source",
          imageData: imageElementToImageData(image),
        };
        addToManipulatorOutputs(sourceImage);
      } catch (e) {
        // 3. Handle async errors properly (do not throw)
        console.error("Failed to process image data:", e);
        // e.g., addToManipulatorOutputs(...);
      }
    };

    // 4. Handle image loading failures
    image.onerror = (err) => {
      if (!isSubscribed) return;
      console.error("Failed to load image from source:", err);
    };

    image.src = imageFile;

    // 5. Cleanup function
    return () => {
      isSubscribed = false;
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
