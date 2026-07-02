import { renderTreesToPngBlob } from '@repo/randomart-engine/png';
import type { Control, ControlSection } from '@repo/ui/ControlPanel/types';
import { useState } from 'react';
import { setCorrelatedRGB } from '../../stores/randomart/actions/display';
import {
  useCorrelatedRGB,
  useSeedText,
  useTreeB,
  useTreeG,
  useTreeR
} from '../../stores/randomart/selectors';
import { randomartStore } from '../../stores/randomart/store';

const DOWNLOAD_SIZE = 1024;

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function useDisplaySection() {
  const correlatedRGB = useCorrelatedRGB();
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const seedText = useSeedText();
  const [downloading, setDownloading] = useState(false);

  const correlatedControl: Control = {
    id: 'correlatedRGB',
    type: 'toggle',
    label: 'Correlated RGB',
    value: correlatedRGB,
    onChange: setCorrelatedRGB
  };

  const filename = `randomart-${(seedText || 'untitled').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;

  function handleDownload() {
    setDownloading(true);

    const liveCanvas = document.querySelector<HTMLCanvasElement>('canvas');
    if (liveCanvas) {
      liveCanvas.toBlob((blob) => {
        if (blob && blob.size > 0) {
          triggerDownload(blob, filename);
          setDownloading(false);
          return;
        }
        fallbackDownload();
      }, 'image/png');
      return;
    }

    fallbackDownload();
  }

  function fallbackDownload() {
    try {
      const exportR = correlatedRGB ? treeR.args[0] : treeR;
      const exportG = correlatedRGB ? treeR.args[1] : treeG;
      const exportB = correlatedRGB ? treeR.args[2] : treeB;
      const currentTime = randomartStore.getState().time;

      const blob = renderTreesToPngBlob(exportR, exportG, exportB, DOWNLOAD_SIZE, currentTime);
      triggerDownload(blob, filename);
    } catch (err) {
      console.error('Fallback render failed:', err);
    } finally {
      setDownloading(false);
    }
  }

  const downloadControl: Control = {
    id: 'download',
    type: 'button',
    label: downloading ? 'Rendering...' : 'Download PNG',
    variant: 'primary',
    disabled: downloading,
    onClick: handleDownload
  };

  const section: ControlSection = {
    id: 'display',
    label: 'Display',
    defaultOpen: true,
    controls: [correlatedControl, downloadControl]
  };

  return section;
}

export { useDisplaySection };
