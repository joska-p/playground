import * as THREE from 'three';
import type { GraphNode } from '../data/graphData.schema';
import { CONFIG } from './config.ts';

export type NodeVisualStrategy = {
  type: string;
  createGeometry: () => THREE.BufferGeometry;
  getSize: (node: GraphNode) => number;
};

const strategies = new Map<string, NodeVisualStrategy>();

const defaultStrategy: NodeVisualStrategy = {
  type: '__default__',
  createGeometry: () =>
    new THREE.BoxGeometry(
      CONFIG.nodes.boxGeometry.width,
      CONFIG.nodes.boxGeometry.height,
      CONFIG.nodes.boxGeometry.depth
    ),
  getSize: (node) =>
    Math.log(node.inDegree + node.outDegree + 1) * CONFIG.nodes.sizeScale +
    CONFIG.nodes.sizeBase
};

export function registerStrategy(strategy: NodeVisualStrategy): void {
  strategies.set(strategy.type, strategy);
}

export function getStrategy(fileType: string): NodeVisualStrategy {
  return strategies.get(fileType) ?? defaultStrategy;
}

export function getRegisteredTypes(): string[] {
  return Array.from(strategies.keys());
}

registerStrategy({
  type: 'code',
  createGeometry: () =>
    new THREE.SphereGeometry(
      CONFIG.nodes.sphereGeometry.radius,
      CONFIG.nodes.sphereGeometry.widthSegments,
      CONFIG.nodes.sphereGeometry.heightSegments
    ),
  getSize: (node) =>
    Math.log(node.inDegree + node.outDegree + 1) * CONFIG.nodes.sizeScale +
    CONFIG.nodes.sizeBase
});
