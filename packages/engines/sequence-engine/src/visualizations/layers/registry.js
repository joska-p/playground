import { drawBarChart } from './drawBarChart';
import { drawBaseline } from './drawBaseline';
import { drawConnectionLines } from './drawConnectionLines';
import { drawFactorWaves } from './drawFactorWaves';
import { drawMountain } from './drawMountain';
import { drawPlottedNumbers } from './drawPlottedNumbers';
import { drawRadialSpokes } from './drawRadialSpokes';
import { drawRecamanArcs } from './drawRecamanArcs';
import { drawStemPlot } from './drawStemPlot';
const layers = [
    drawBaseline,
    drawPlottedNumbers,
    drawFactorWaves,
    drawRecamanArcs,
    drawConnectionLines,
    drawRadialSpokes,
    drawMountain,
    drawBarChart,
    drawStemPlot
];
const layerMap = new Map(layers.map((l) => [l.id, l]));
function getAllLayers() {
    return layers;
}
function getLayer(id) {
    return layerMap.get(id);
}
export { getAllLayers, getLayer };
