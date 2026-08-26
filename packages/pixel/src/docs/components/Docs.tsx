import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';
import { useEffect, useState } from 'react';

import { ENDPOINT_GROUPS } from './data/pipeline-docs-data';
import { loadDemoImage } from './helpers';
import { SwaggerSidebar } from './SwaggerSidebar';
import { EndpointView } from './views/EndpointView';

import type { EndpointId } from './data/pipeline-docs-data';

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
        <Shell>
            <ShellPanels className="md:w-80">
                <SwaggerSidebar
                    groups={ENDPOINT_GROUPS}
                    activeEndpoint={activeEndpoint}
                    onSelect={setActiveEndpoint}
                />
            </ShellPanels>

            <ShellCanvas className="p-6 overflow-y-auto">
                <EndpointView
                    activeEndpoint={activeEndpoint}
                    sourceData={sourceData}
                    paramValues={paramValues}
                    onParamChange={handleParamChange}
                />
            </ShellCanvas>
        </Shell>
    );
}

export { Docs };
