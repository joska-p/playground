declare module 'd3-force-3d' {
  export type SimulationNodeDatum = {
    index?: number;
    x?: number;
    y?: number;
    z?: number;
    vx?: number;
    vy?: number;
    vz?: number;
  };

  export type SimulationLinkDatum<NodeDatum extends SimulationNodeDatum> = {
    source: number | string | NodeDatum;
    target: number | string | NodeDatum;
  };

  export type Force = (alpha: number) => void;

  export type Simulation = {
    tick(): Simulation;
    stop(): Simulation;
    restart(): Simulation;
    alpha(value?: number): Simulation | number;
    alphaDecay(value?: number): Simulation | number;
    numDimensions(value?: number): Simulation | number;
    nodes(): SimulationNodeDatum[];
    nodes(value: SimulationNodeDatum[]): Simulation;
    force(name: string): Force | undefined;
    force(name: string, force: Force): Simulation;
    find(x: number, y: number, radius?: number): SimulationNodeDatum | undefined;
    on(type: string, listener?: (event: unknown) => void): Simulation;
  };

  export type ForceLink = {
    links(links: SimulationLinkDatum<SimulationNodeDatum>[]): ForceLink;
    id(accessor: (node: SimulationNodeDatum) => string | number): ForceLink;
    distance(d: number | ((link: SimulationLinkDatum<SimulationNodeDatum>, i: number) => number)): ForceLink;
    strength(s: number | ((link: SimulationLinkDatum<SimulationNodeDatum>, i: number) => number)): ForceLink;
    iterations(count: number): ForceLink;
  } & Force;

  export type ForceManyBody = {
    strength(s: number | ((node: SimulationNodeDatum, i: number) => number)): ForceManyBody;
    distanceMin(min: number): ForceManyBody;
    distanceMax(max: number): ForceManyBody;
    theta(value: number): ForceManyBody;
  } & Force;

  export type ForceCenter = {
    x(value?: number): ForceCenter | number;
    y(value?: number): ForceCenter | number;
    z(value?: number): ForceCenter | number;
    strength(s?: number): ForceCenter | number;
  } & Force;

  export type ForceCollide = {
    radius(r: number | ((node: SimulationNodeDatum, i: number) => number)): ForceCollide;
    strength(s: number): ForceCollide;
    iterations(count: number): ForceCollide;
  } & Force;

  export function forceSimulation(nodes?: SimulationNodeDatum[]): Simulation;

  export function forceLink(links?: SimulationLinkDatum<SimulationNodeDatum>[]): ForceLink;

  export function forceManyBody(): ForceManyBody;

  export function forceCenter(x?: number, y?: number, z?: number): ForceCenter;

  export function forceCollide(radius?: number): ForceCollide;
}
