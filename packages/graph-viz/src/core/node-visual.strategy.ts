import * as THREE from 'three';
import type { GraphNode } from '../data/graphData.schema';

export type NodeVisualStrategy = {
  type: string;
  createGeometry: () => THREE.BufferGeometry;
  getSize: (node: GraphNode) => number;
};

const strategies = new Map<string, NodeVisualStrategy>();

const defaultStrategy: NodeVisualStrategy = {
  type: '__default__',
  createGeometry: () => new THREE.BoxGeometry(1, 1, 1),
  getSize: (node) => Math.log(node.inDegree + node.outDegree + 1) * 0.3 + 0.8,
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
  createGeometry: () => new THREE.SphereGeometry(1, 10, 10),
  getSize: (node) => Math.log(node.inDegree + node.outDegree + 1) * 0.3 + 0.8,
});
