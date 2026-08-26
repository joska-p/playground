import { ControlGrid, FieldRow, Select, Slider } from '@repo/tlc/components/forms';
import { Panel } from '@repo/tlc/layout';

import { computeMaxIterations } from '../core/perturbationOrbit';
import { setParam, useParams } from '../stores/createParamStore';
import { paramStores } from '../stores/paramStores';
import { setRenderer, useRenderer, type Renderer } from '../stores/viewStore';

function ControlPanel() {
    const renderer = useRenderer();
    const active = paramStores[renderer];
    const params = useParams(active);

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
            <FieldRow label="renderer">
                <Select
                    value={renderer}
                    onChange={(value) => {
                        setRenderer(value as Renderer);
                    }}
                    options={[
                        { label: 'original', value: 'original' },
                        { label: 'double-single', value: 'double-single' },
                        { label: 'perturbation', value: 'perturbation' }
                    ]}
                />
            </FieldRow>

            <ControlGrid columns={2}>
                <FieldRow label="iteration base">
                    <Slider
                        min="20"
                        max="200"
                        step="5"
                        value={params.iterationBase}
                        onChange={(value) => {
                            setParam(active, 'iterationBase', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="iteration / octave">
                    <Slider
                        min="5"
                        max="80"
                        step="1"
                        value={params.iterationScale}
                        onChange={(value) => {
                            setParam(active, 'iterationScale', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="iteration cap (perf)">
                    <Slider
                        min="200"
                        max="3000"
                        step="50"
                        value={params.iterationCap}
                        onChange={(value) => {
                            setParam(active, 'iterationCap', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="pixel eps">
                    <Slider
                        min="0.0005"
                        max="0.1"
                        step="0.0005"
                        value={params.pixelEps}
                        onChange={(value) => {
                            setParam(active, 'pixelEps', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="interior scale">
                    <Slider
                        min="2.0"
                        max="25.0"
                        step="0.5"
                        value={params.interiorScale}
                        onChange={(value) => {
                            setParam(active, 'interiorScale', value);
                        }}
                    />
                </FieldRow>
            </ControlGrid>

            <FieldRow label="iterations @ 1 / 1e3 / 1e6">
                <span className="text-foreground-dim text-sm">{iterationsHint}</span>
            </FieldRow>

            <ControlGrid columns={2}>
                <FieldRow label="sun angle">
                    <Slider
                        min="0"
                        max="6.283"
                        step="0.01"
                        value={params.sunAngle}
                        onChange={(value) => {
                            setParam(active, 'sunAngle', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="bump height">
                    <Slider
                        min="1.0"
                        max="50.0"
                        step="0.5"
                        value={params.bumpHeight}
                        onChange={(value) => {
                            setParam(active, 'bumpHeight', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="ambient light">
                    <Slider
                        min="0.0"
                        max="0.8"
                        step="0.01"
                        value={params.ambientLight}
                        onChange={(value) => {
                            setParam(active, 'ambientLight', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="hue shift">
                    <Slider
                        min="0"
                        max="6.283"
                        step="0.01"
                        value={params.hueShift}
                        onChange={(value) => {
                            setParam(active, 'hueShift', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="hue frequency">
                    <Slider
                        min="0.01"
                        max="0.5"
                        step="0.001"
                        value={params.hueFrequency}
                        onChange={(value) => {
                            setParam(active, 'hueFrequency', value);
                        }}
                    />
                </FieldRow>

                <FieldRow label="chroma scale">
                    <Slider
                        min="0.0"
                        max="0.25"
                        step="0.005"
                        value={params.chromaScale}
                        onChange={(value) => {
                            setParam(active, 'chromaScale', value);
                        }}
                    />
                </FieldRow>
            </ControlGrid>
        </Panel>
    );
}

export { ControlPanel };
