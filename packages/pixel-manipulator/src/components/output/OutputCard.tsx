import { Badge, Card } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
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
          <div className="flex flex-row items-start justify-between gap-2 p-3 pb-0">
            <h3 className="text-sm">
              {index}. {output.description}
            </h3>
            <div className="flex shrink-0 items-center gap-1.5">
              {isSource && <Badge color="--color-primary">Original</Badge>}
              <Badge appearance="outline">
                {output.imageData.width}&times;{output.imageData.height}
              </Badge>
            </div>
          </div>
          <div className="p-3">
            <Output imageData={output.imageData} />
          </div>
          <div className="flex gap-2 p-3 pt-0">
            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
            >
              Download
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleZoom}
            >
              Zoom
            </Button>
          </div>
        </Card>
      </article>

      {isZoomed && (
        <ImageLightbox
          imageData={output.imageData}
          onClose={() => {
            setIsZoomed(false);
          }}
        />
      )}
    </>
  );
}

export { OutputCard };
export type { OutputCardProps };
