export type Color = string;

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface DrawStyle {
    fill?: Color;
    stroke?: Color;
    lineWidth?: number;
}

export interface TextStyle {
    fill?: Color;
    stroke?: Color;
    lineWidth?: number;
    fontSize?: number;
    fontFamily?: string;
    align?: 'left' | 'center' | 'right';
    baseline?: 'alphabetic' | 'top' | 'middle' | 'bottom';
}

export interface PathOptions {
    closed?: boolean;
    fill?: boolean;
    stroke?: boolean;
}
