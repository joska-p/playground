import { useEffect, useRef } from "react";
import { putImageData } from "../../core/imageData";

type OutputProps = {
  imageData: ImageData;
};

function Output({ imageData }: OutputProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageData || !ref.current) return;

    // We can rely on the utility function to do the actual drawing
    putImageData(ref.current, imageData);
  }, [imageData]);

  // If imageData is null/undefined during the initial render, fallback to 0
  const width = imageData?.width || 0;
  const height = imageData?.height || 0;

  return (
    <canvas
      ref={ref}
      // 1. Set the internal drawing buffer resolution
      width={width}
      height={height}
      // 2. Let CSS handle the responsive display size
      className="bg-secondary max-h-screen max-w-screen object-contain"
      // 3. (Optional) Good for accessibility
      aria-label="Image processing output"
    />
  );
}

export { Output };
