import { useEffect, useRef } from "react";
import { putImageData } from "../../core/imageData";

type OutputProps = {
  imageData: ImageData;
};

function Output({ imageData }: OutputProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageData || !ref.current) return;

    putImageData(ref.current, imageData);
  }, [imageData]);

  const width = imageData?.width || 0;
  const height = imageData?.height || 0;

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      className="max-h-full max-w-full"
    />
  );
}

export { Output };
