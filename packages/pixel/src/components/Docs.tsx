import { Sidebar } from '@repo/ui/widgets';
import { useEffect, useState } from 'react';
import type { EndpointId } from './data/pipeline-docs-data';
import { ENDPOINT_GROUPS } from './data/pipeline-docs-data';
import { loadDemoImage } from './helpers';
import { SwaggerSidebar } from './SwaggerSidebar';
import { EndpointView } from './views/EndpointView';

const CANVAS_SIZE = 200;

function Docs() {
  const [activeEndpoint, setActiveEndpoint] = useState<EndpointId>({
    kind: 'overview'
  });
  const [sourceData, setSourceData] = useState<ImageData | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    void loadDemoImage(CANVAS_SIZE).then((image) => {
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
      position="left"
      panelWidth="280px"
      className="min-h-dvh"
    >
      <Sidebar.Panel className="border-border border-r">
        <SwaggerSidebar
          groups={ENDPOINT_GROUPS}
          activeEndpoint={activeEndpoint}
          onSelect={setActiveEndpoint}
        />
      </Sidebar.Panel>

      <Sidebar.Main className="p-6">
        <EndpointView
          activeEndpoint={activeEndpoint}
          sourceData={sourceData}
          paramValues={paramValues}
          onParamChange={handleParamChange}
        />
      </Sidebar.Main>
    </Sidebar>
  );
}

export { Docs };
