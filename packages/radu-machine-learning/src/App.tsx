import { ErrorBoundary } from '@repo/tlc/components/display';
import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';
import { ControlPanel } from './components/ControlPanel';
import { Samples } from './components/Samples';
import { setBaseUrl } from './stores/selection';

function App({ baseUrl = '/' }: { baseUrl?: string }) {
    setBaseUrl(baseUrl);

    return (
        <ErrorBoundary>
            <Shell>
                <ShellCanvas>
                    <Samples />
                </ShellCanvas>

                <ShellPanels>
                    <ControlPanel />
                </ShellPanels>
            </Shell>
        </ErrorBoundary>
    );
}

export { App };
