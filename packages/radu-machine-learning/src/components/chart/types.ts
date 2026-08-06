import type { Label } from '../../core/types';

export type ChartPoint = {
    drawingId: number | null;
    label: Label | 'current';
    x: number;
    y: number;
};

export type Domain = [number, number];

export type ChartBounds = {
    xDomain: Domain;
    yDomain: Domain;
};
