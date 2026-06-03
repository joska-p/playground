import { useRef, useState } from "react";
import type { OutputType } from "../../store/pipelineStore";
import { Badge } from "@repo/ui/Badge";
import { Button } from "@repo/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/Card";
import { Output } from "./Output";
import { downloadCanvas } from "./download";
import { ImageLightbox } from "./ImageLightbox";

type OutputCardProps = {
  output: OutputType;
  index: number;
  isSource?: boolean;
};

function OutputCard({ output, index, isSource = false }: OutputCardProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = cardRef.current?.querySelector("canvas");
    if (!canvas) return;
    downloadCanvas(canvas, `${output.name}.png`);
  };

  return (
    <>
      <div ref={cardRef}>
        <Card className="transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
          <CardHeader className="flex flex-row items-start justify-between gap-2 p-3 pb-0">
            <p className="text-sm">
              {index}. {output.description}
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              {isSource && <Badge variant="primary">Original</Badge>}
              <Badge variant="outline">
                {output.imageData.width}&times;{output.imageData.height}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <Output imageData={output.imageData} />
          </CardContent>
          <CardFooter className="flex gap-2 p-3 pt-0">
            <Button variant="ghost" size="small" onClick={handleDownload}>
              Download
            </Button>
            <Button variant="ghost" size="small" onClick={() => setIsZoomed(true)}>
              Zoom
            </Button>
          </CardFooter>
        </Card>
      </div>

      {isZoomed && (
        <ImageLightbox
          imageData={output.imageData}
          onClose={() => setIsZoomed(false)}
        />
      )}
    </>
  );
}

export { OutputCard };
