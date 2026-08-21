import { computeChartBounds, createScalers, getTicks } from './chart-utils';
import { HEIGHT, MARGIN, WIDTH } from './constants';
import { ScatterDot } from './ScatterDot';
import { Xaxis } from './Xaxis';
import { Yaxis } from './Yaxis';
import { features } from '../../data/dataset/ts_objects/features';
import { useSketchpadPathCount, useSketchpadPointCount } from '../../stores/sketchpad';

import type { ChartPoint } from './types';

const { featureNames, samples } = features;

function Chart() {
    const data: ChartPoint[] = samples.map(({ label, point, id }) => ({
        drawingId: id,
        label,
        x: point[0],
        y: point[1]
    }));

    const currentDrawingPathCount = useSketchpadPathCount();
    const currentDrawingPointCount = useSketchpadPointCount();
    const domain = computeChartBounds(data);
    const xDomain = domain.xDomain;
    const yDomain = domain.yDomain;

    const { xScale, yScale } = createScalers(xDomain, yDomain, {
        width: WIDTH,
        height: HEIGHT,
        margin: MARGIN
    });

    const xTicks = getTicks(xDomain, 5);
    const yTicks = getTicks(yDomain, 5);

    if (currentDrawingPointCount > 0) {
        data.push({
            drawingId: null,
            label: 'current',
            x: currentDrawingPathCount,
            y: currentDrawingPointCount
        });
    }

    return (
        <div className="relative aspect-4/3 w-full">
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${String(WIDTH)} ${String(HEIGHT)}`}
                preserveAspectRatio="xMidYMid meet"
                className="overflow-visible"
            >
                <Xaxis
                    xTicks={xTicks}
                    xScale={xScale}
                    xName={featureNames[0]}
                />

                <Yaxis
                    yTicks={yTicks}
                    yScale={yScale}
                    yName={featureNames[1]}
                />

                <ScatterDot
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                />
            </svg>
        </div>
    );
}

export { Chart };
