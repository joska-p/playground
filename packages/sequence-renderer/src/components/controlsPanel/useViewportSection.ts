import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setViewport } from '../../stores/ui/actions';
import { useViewport } from '../../stores/ui/selectors';

function useViewportSection() {
  const viewport = useViewport();

  const enableControl: Control = {
    id: 'enableManual',
    type: 'toggle',
    label: 'Manual Viewport',
    value: viewport.enabled,
    onChange: (enabled) => { setViewport({ enabled, zoom: 1, panX: 0, panY: 0 }); }
  };

  const zoomControl: Control = {
    id: 'zoom',
    type: 'slider',
    label: 'Zoom',
    value: viewport.zoom,
    min: 0.1,
    max: 5,
    step: 0.05,
    onChange: (zoom) => { setViewport({ zoom }); },
    hidden: !viewport.enabled
  };

  const panXControl: Control = {
    id: 'panX',
    type: 'slider',
    label: 'Pan X',
    value: viewport.panX,
    min: -2000,
    max: 2000,
    step: 1,
    onChange: (panX) => { setViewport({ panX }); },
    hidden: !viewport.enabled
  };

  const panYControl: Control = {
    id: 'panY',
    type: 'slider',
    label: 'Pan Y',
    value: viewport.panY,
    min: -2000,
    max: 2000,
    step: 1,
    onChange: (panY) => { setViewport({ panY }); },
    hidden: !viewport.enabled
  };

  const section: ControlSection = {
    id: 'viewport',
    label: 'Viewport',
    defaultOpen: true,
    controls: [enableControl, zoomControl, panXControl, panYControl]
  };

  return section;
}

export { useViewportSection };
