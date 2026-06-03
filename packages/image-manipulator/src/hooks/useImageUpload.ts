import { imageElementToImageData } from "../core/imageData";
import { setPipelineImageSource } from "../store/pipelineStore";

type UseImageUploadReturn = {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function useImageUpload(): UseImageUploadReturn {
  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        try {
          setPipelineImageSource({
            id: "source",
            name: "source",
            description: "image source",
            imageData: imageElementToImageData(image),
          });
        } catch (err) {
          console.error("Failed to process image data:", err);
        }
      };
      image.onerror = (err) => {
        console.error("Failed to load image from source:", err);
      };
      image.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  return { handleImageUpload };
}

export { useImageUpload };
