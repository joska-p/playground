export type Color = string;

export type Rect = { x: number; y: number; w: number; h: number };

export type DrawStyle = {
        fill?: Color;
        stroke?: Color;
        lineWidth?: number;
};

export type TextStyle = {
        fill?: Color;
        stroke?: Color;
        lineWidth?: number;
        fontSize?: number;
        fontFamily?: string;
        align?: 'left' | 'center' | 'right';
        baseline?: 'alphabetic' | 'top' | 'middle' | 'bottom';
};

export type PathOptions = {
        closed?: boolean;
        fill?: boolean;
        stroke?: boolean;
};
