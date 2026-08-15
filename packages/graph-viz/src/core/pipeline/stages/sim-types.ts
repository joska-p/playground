/** Simulation-internal node — d3-force writes the optional position/velocity fields itself. */
export type SimNode = {
    index?: number;
    id: string;
    label: string;
    norm_label: string;
    file_type: string;
    community: number;
    inDegree: number;
    outDegree: number;
    x?: number;
    y?: number;
    z?: number;
    vx?: number;
    vy?: number;
    vz?: number;
};

export type SimLink = {
    source: SimNode | string;
    target: SimNode | string;
    relation: string;
};
