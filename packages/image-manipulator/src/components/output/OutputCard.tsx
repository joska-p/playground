import { Badge } from '@repo/ui/Badge';
import { Button } from '@repo/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/Card';
import { useRef, useState } from 'react';
import type { OutputType } from '../../stores/manipulator/types';
import { downloadCanvas } from '../../utils/download';
import { ImageLightbox } from './ImageLightbox';
import { Output } from './Output';

type OutputCardProps = {
  output: OutputType;
  index: number;
  isSource?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
};

function OutputCard({
  output,
  index,
  isSource = false,
  isSelected = false,
  onSelect
}: OutputCardProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvas = cardRef.current?.querySelector('canvas');
    if (!canvas) return;
    downloadCanvas(canvas, `${output.name}.png`);
  };

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(true);
  };

  return (
    <>
      <article
        ref={cardRef}
        onClick={onSelect}
        className={onSelect ? 'cursor-pointer' : ''}
      >
        <Card
          className={`transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
            isSelected ? 'ring-primary ring-2' : ''
          }`}
        >
          <CardHeader className="flex flex-row items-start justify-between gap-2 p-3 pb-0">
            <h3 className="text-sm">
              {index}. {output.description}
            </h3>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
            >
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoom}
            >
              Zoom
            </Button>
          </CardFooter>
        </Card>
      </article>

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
export type { OutputCardProps };
