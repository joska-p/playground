import { useState } from 'react';
import { useImageSource, useOutputs } from '../../stores/manipulator/selectors';
import { EmptyState } from '../shared/EmptyState';
import { CompareSlider } from './CompareSlider';
import { CompareToggle } from './CompareToggle';
import { OutputCard } from './OutputCard';
import { ProcessingOverlay } from './ProcessingOverlay';

function Outputs() {
  const imageSource = useImageSource();
  const outputs = useOutputs();
  const [mode, setMode] = useState<'grid' | 'compare'>('grid');
  const [selectedOutputId, setSelectedOutputId] = useState<string | undefined>(
    undefined
  );

  const hasComparableContent = imageSource && outputs.length > 0;

  const activeOutputId =
    selectedOutputId && outputs.some((o) => o.id === selectedOutputId)
      ? selectedOutputId
      : outputs[0]?.id;

  const selectedOutput = outputs.find((o) => o.id === activeOutputId);

  if (!imageSource && outputs.length === 0) {
    return <EmptyState message="Upload an image to begin" />;
  }

  return (
    <div className="relative">
      {hasComparableContent && (
        <div className="flex justify-end p-4 pb-0">
          <CompareToggle
            mode={mode}
            onChange={setMode}
          />
        </div>
      )}

      {mode === 'compare' && selectedOutput && (
        <div className="px-4 pt-4">
          <CompareSlider
            source={imageSource!.imageData}
            result={selectedOutput.imageData}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3">
        {imageSource && (
          <OutputCard
            key={imageSource.id}
            output={imageSource}
            index={0}
            isSource
          />
        )}
        {outputs.map((output, index) => (
          <OutputCard
            key={output.id}
            output={output}
            index={index + 1}
            isSelected={mode === 'compare' && activeOutputId === output.id}
            onSelect={
              mode === 'compare'
                ? () => setSelectedOutputId(output.id)
                : undefined
            }
          />
        ))}
      </div>

      <ProcessingOverlay />
    </div>
  );
}

export { Outputs };
