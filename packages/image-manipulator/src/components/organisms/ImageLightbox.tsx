import { useEscapeKey } from "../../hooks/useEscapeKey";
import { Output } from "../atoms/Output";

type ImageLightboxProps = {
  imageData: ImageData;
  onClose: () => void;
};

function ImageLightbox({ imageData, onClose }: ImageLightboxProps) {
  useEscapeKey(onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="bg-background text-foreground hover:bg-muted absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md"
        >
          ✕
        </button>
        <Output imageData={imageData} />
      </div>
    </div>
  );
}

export { ImageLightbox };
export type { ImageLightboxProps };
