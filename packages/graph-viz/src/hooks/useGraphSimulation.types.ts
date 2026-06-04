import type * as d3 from 'd3';
import type { RawNode } from '../data/graphData.types';

export type SimNode = {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
} & RawNode &
  d3.SimulationNodeDatum;

export type SimLink = {
  s: string;
  t: string;
  r: string;
  w: number;
} & d3.SimulationLinkDatum<SimNode>;
