import { useEffect } from "react";
import { imageElementToImageData } from "../core/imageData";
import type { OutputType } from "../store/pipelineStore";
import { addToPipelineOutputs, usePipelineImageFile } from "../store/pipelineStore";

function useSourceImage() {
  const imageFile = usePipelineImageFile();

  useEffect(() => {
    if (!imageFile) return;

    let isSubscribed = true;

    const image = new Image();

    image.onload = () => {
      if (!isSubscribed) return;

      try {
        const sourceImage: OutputType = {
          id: "source",
          name: "source",
          description: "image source",
          imageData: imageElementToImageData(image),
        };
        addToPipelineOutputs(sourceImage);
      } catch (e) {
        console.error("Failed to process image data:", e);
      }
    };

    image.onerror = (err) => {
      if (!isSubscribed) return;
      console.error("Failed to load image from source:", err);
    };

    image.src = imageFile;

    return () => {
      isSubscribed = false;
    };
  }, [imageFile]);
}

export { useSourceImage };
