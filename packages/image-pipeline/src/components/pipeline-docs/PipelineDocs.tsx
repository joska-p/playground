import { Sidebar } from '@repo/ui/Sidebar';
import { useEffect, useState } from 'react';
import { EndpointView } from './EndpointView';
import { loadDemoImage } from './helpers';
import type { EndpointId } from './manipData';
import { ENDPOINT_GROUPS } from './manipData';
import { SwaggerSidebar } from './SwaggerSidebar';

const CANVAS_SIZE = 200;

function PipelineDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState<EndpointId>({
    kind: 'overview',
  });
  const [sourceData, setSourceData] = useState<ImageData | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    loadDemoImage(CANVAS_SIZE).then((image) => {
      if (!cancelled) setSourceData(image);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleParamChange(id: string, key: string, value: number) {
    setParamValues((prev) => ({ ...prev, [`${id}:${key}`]: value }));
  }

  return (
    <Sidebar
      desktopPosition="left"
      mobilePosition="bottom"
      panelWidth="280px"
      className="min-h-dvh"
    >
      <Sidebar.Toggle />
      <Sidebar.Panel className="border-border border-r">
        <SwaggerSidebar
          groups={ENDPOINT_GROUPS}
          activeEndpoint={activeEndpoint}
          onSelect={setActiveEndpoint}
        />
      </Sidebar.Panel>

      <Sidebar.Main>
        <div className="relative h-full">
          <div className="h-full overflow-y-auto p-6">
            <EndpointView
              activeEndpoint={activeEndpoint}
              sourceData={sourceData}
              paramValues={paramValues}
              onParamChange={handleParamChange}
            />
          </div>
        </div>
      </Sidebar.Main>
    </Sidebar>
  );
}

export { PipelineDocs };
