import { ControlGrid, ControlPanel as Panel, ControlRow } from '@repo/ui/control-panel';
import { Select, Slider } from '@repo/ui/data-entry';
import { computeMaxIterations } from '../core/perturbationOrbit';
import { setParam, useParams } from '../stores/createParamStore';
import { paramStores } from '../stores/paramStores';
import { setRenderer, useRenderer, useViewZoom, type Renderer } from '../stores/viewStore';

function ControlPanel() {
    const renderer = useRenderer();
    const active = paramStores[renderer];
    const params = useParams(active);

    const zoom = useViewZoom();

    const iterationsAtZoom = computeMaxIterations(
        zoom,
        params.iterationBase,
        params.iterationScale,
        params.iterationCap
    );
    const iterationsHint = [1, 1e3, 1e6]
        .map((z) =>
            computeMaxIterations(
                z,
                params.iterationBase,
                params.iterationScale,
                params.iterationCap
            )
        )
        .join(' / ');

    return (
        <Panel title="mandelbrot">
            <ControlRow label="renderer">
                <Select
                    value={renderer}
                    onChange={(e) => {
                        setRenderer(e.target.value as Renderer);
                    }}
                >
                    <option value="original">original</option>
                    <option value="double-single">double-single</option>
                    <option value="perturbation">perturbation</option>
                </Select>
            </ControlRow>

            <ControlRow label="zoom">
                <span className="text-foreground-dim text-sm">
                    {zoom >= 100 ? zoom.toExponential(2) : zoom.toFixed(3)}
                </span>
            </ControlRow>

            <ControlRow label="iterations @ zoom">
                <span className="text-foreground-dim text-sm">{iterationsAtZoom}</span>
            </ControlRow>

            <ControlGrid columns={2}>
                <Slider
                    label="iteration base"
                    min="20"
                    max="200"
                    step="5"
                    value={params.iterationBase}
                    onChange={(value) => {
                        setParam(active, 'iterationBase', value);
                    }}
                />

                <Slider
                    label="iteration / octave"
                    min="5"
                    max="80"
                    step="1"
                    value={params.iterationScale}
                    onChange={(value) => {
                        setParam(active, 'iterationScale', value);
                    }}
                />

                <Slider
                    label="iteration cap (perf)"
                    min="200"
                    max="3000"
                    step="50"
                    value={params.iterationCap}
                    onChange={(value) => {
                        setParam(active, 'iterationCap', value);
                    }}
                />

                <Slider
                    label="pixel eps"
                    min="0.0005"
                    max="0.1"
                    step="0.0005"
                    value={params.pixelEps}
                    onChange={(value) => {
                        setParam(active, 'pixelEps', value);
                    }}
                />

                <Slider
                    label="interior scale"
                    min="2.0"
                    max="25.0"
                    step="0.5"
                    value={params.interiorScale}
                    onChange={(value) => {
                        setParam(active, 'interiorScale', value);
                    }}
                />
            </ControlGrid>

            <ControlRow label="iterations @ 1 / 1e3 / 1e6">
                <span className="text-foreground-dim text-sm">{iterationsHint}</span>
            </ControlRow>

            <ControlGrid columns={2}>
                <Slider
                    label="sun angle"
                    min="0"
                    max="6.283"
                    step="0.01"
                    value={params.sunAngle}
                    onChange={(value) => {
                        setParam(active, 'sunAngle', value);
                    }}
                />

                <Slider
                    label="bump height"
                    min="1.0"
                    max="50.0"
                    step="0.5"
                    value={params.bumpHeight}
                    onChange={(value) => {
                        setParam(active, 'bumpHeight', value);
                    }}
                />

                <Slider
                    label="ambient light"
                    min="0.0"
                    max="0.8"
                    step="0.01"
                    value={params.ambientLight}
                    onChange={(value) => {
                        setParam(active, 'ambientLight', value);
                    }}
                />

                <Slider
                    label="hue shift"
                    min="0"
                    max="6.283"
                    step="0.01"
                    value={params.hueShift}
                    onChange={(value) => {
                        setParam(active, 'hueShift', value);
                    }}
                />

                <Slider
                    label="hue frequency"
                    min="0.01"
                    max="0.5"
                    step="0.001"
                    value={params.hueFrequency}
                    onChange={(value) => {
                        setParam(active, 'hueFrequency', value);
                    }}
                />

                <Slider
                    label="chroma scale"
                    min="0.0"
                    max="0.25"
                    step="0.005"
                    value={params.chromaScale}
                    onChange={(value) => {
                        setParam(active, 'chromaScale', value);
                    }}
                />
            </ControlGrid>
        </Panel>
    );
}

export { ControlPanel };
