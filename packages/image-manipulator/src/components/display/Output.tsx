import { useEffect, useRef } from "react";
import { putImageData } from "../../core/imageData";

type Props = {
  imageData: ImageData;
};

function Output({ imageData }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageData || !ref) return;
    putImageData(ref.current, imageData);
  }, [imageData]);

  return <canvas ref={ref} className="bg-secondary max-h-screen max-w-screen" />;
}

export { Output };
