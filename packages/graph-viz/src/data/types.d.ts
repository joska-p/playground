declare module 'd3-force-3d' {
  export type SimulationNodeDatum = {
    index?: number;
    x?: number;
    y?: number;
    z?: number;
    vx?: number;
    vy?: number;
    vz?: number;
  }

  export type SimulationLinkDatum<NodeDatum extends SimulationNodeDatum> = {
    source: number | string | NodeDatum;
    target: number | string | NodeDatum;
  }

  export type Simulation<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>> = {
    tick(): this;
    stop(): this;
    restart(): this;
    alpha(value?: number): this | number;
    alphaDecay(value?: number): this | number;
    numDimensions(value?: number): this | number;
    nodes(): NodeDatum[];
    nodes(value: NodeDatum[]): this;
    force(name: string): Force<NodeDatum, LinkDatum> | undefined;
    force(name: string, force: Force<NodeDatum, LinkDatum>): this;
    find(x: number, y: number, radius?: number): NodeDatum | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(type: string, listener?: (event: any) => void): this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export type Force<NodeDatum extends SimulationNodeDatum, _LinkDatum extends SimulationLinkDatum<NodeDatum>> = {
    (alpha: number): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialize?(nodes: NodeDatum[], ...args: any[]): void;
  }

  export type ForceLink<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>> = {
    links(links: LinkDatum[]): this;
    id(accessor: (node: NodeDatum) => string | number): this;
    distance(d: number | ((link: LinkDatum, i: number) => number)): this;
    strength(s: number | ((link: LinkDatum, i: number) => number)): this;
    iterations(count: number): this;
  } & Force<NodeDatum, LinkDatum>

  export type ForceManyBody<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>> = {
    strength(s: number | ((node: NodeDatum, i: number) => number)): this;
    distanceMin(min: number): this;
    distanceMax(max: number): this;
    theta(value: number): this;
  } & Force<NodeDatum, LinkDatum>

  export type ForceCenter<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>> = {
    x(value?: number): this | number;
    y(value?: number): this | number;
    z(value?: number): this | number;
    strength(s?: number): this | number;
  } & Force<NodeDatum, LinkDatum>

  export type ForceCollide<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>> = {
    radius(r: number | ((node: NodeDatum, i: number) => number)): this;
    strength(s: number): this;
    iterations(count: number): this;
  } & Force<NodeDatum, LinkDatum>

  export function forceSimulation<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>>(
    nodes?: NodeDatum[],
  ): Simulation<NodeDatum, LinkDatum>;

  export function forceLink<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>>(
    links?: LinkDatum[],
  ): ForceLink<NodeDatum, LinkDatum>;

  export function forceManyBody<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>>(): ForceManyBody<
    NodeDatum,
    LinkDatum
  >;

  export function forceCenter<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>>(
    x?: number,
    y?: number,
    z?: number,
  ): ForceCenter<NodeDatum, LinkDatum>;

  export function forceCollide<NodeDatum extends SimulationNodeDatum, LinkDatum extends SimulationLinkDatum<NodeDatum>>(
    radius?: number,
  ): ForceCollide<NodeDatum, LinkDatum>;
}
