import { SeededRandom } from './SeededRandom';

export type ExpressionNode =
  | { type: 'x' }
  | { type: 'y' }
  | { type: 'constant'; value: number }
  | { type: 'sin'; arg: ExpressionNode }
  | { type: 'cos'; arg: ExpressionNode }
  | { type: 'multiply'; left: ExpressionNode; right: ExpressionNode }
  | { type: 'add'; left: ExpressionNode; right: ExpressionNode }
  | { type: 'modulo'; left: ExpressionNode; right: ExpressionNode };

// Evaluates a built tree for a specific (x, y) pixel coordinate
export function evaluateNode(
  node: ExpressionNode,
  x: number,
  y: number
): number {
  switch (node.type) {
    case 'x':
      return x;
    case 'y':
      return y;
    case 'constant':
      return node.value;
    case 'sin':
      return Math.sin(Math.PI * evaluateNode(node.arg, x, y));
    case 'cos':
      return Math.cos(Math.PI * evaluateNode(node.arg, x, y));
    case 'multiply':
      return evaluateNode(node.left, x, y) * evaluateNode(node.right, x, y);
    case 'add':
      return (
        (evaluateNode(node.left, x, y) + evaluateNode(node.right, x, y)) / 2
      ); // bound to [-1, 1]
    case 'modulo': {
      const leftVal = evaluateNode(node.left, x, y);
      const rightVal = evaluateNode(node.right, x, y);
      return rightVal === 0 ? 0 : leftVal % rightVal;
    }
  }
}

// Recursively builds the math tree based on depth and seed
export function buildTree(
  rng: SeededRandom,
  currentDepth: number,
  maxDepth: number
): ExpressionNode {
  const terminals: ('x' | 'y' | 'constant')[] = ['x', 'y', 'constant'];
  const operators: ('sin' | 'cos' | 'multiply' | 'add' | 'modulo')[] = [
    'sin',
    'cos',
    'multiply',
    'add',
    'modulo'
  ];

  // Force a terminal node if we hit max depth
  if (currentDepth >= maxDepth) {
    const type = rng.pick(terminals);
    if (type === 'constant') return { type, value: rng.next() * 2 - 1 }; // range [-1, 1]
    return { type };
  }

  // Otherwise, mix terminals and operators
  const shouldBeTerminal = rng.next() < 0.15; // 15% chance to stop early
  if (shouldBeTerminal) {
    const type = rng.pick(terminals);
    if (type === 'constant') return { type, value: rng.next() * 2 - 1 };
    return { type };
  }

  const op = rng.pick(operators);
  switch (op) {
    case 'sin':
    case 'cos':
      return { type: op, arg: buildTree(rng, currentDepth + 1, maxDepth) };
    case 'multiply':
    case 'add':
    case 'modulo':
      return {
        type: op,
        left: buildTree(rng, currentDepth + 1, maxDepth),
        right: buildTree(rng, currentDepth + 1, maxDepth)
      };
  }
}

export function renderPixelMap(
  seedString: string,
  size: number,
  maxDepth: number
): ImageData {
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(size, size);

  const rngR = new SeededRandom(seedString + '_red');
  const rngG = new SeededRandom(seedString + '_green');
  const rngB = new SeededRandom(seedString + '_blue');

  const treeR = buildTree(rngR, 0, maxDepth);
  const treeG = buildTree(rngG, 0, maxDepth);
  const treeB = buildTree(rngB, 0, maxDepth);

  for (let py = 0; py < size; py++) {
    const y = (py / size) * 2 - 1;
    for (let px = 0; px < size; px++) {
      const x = (px / size) * 2 - 1;
      const rVal = evaluateNode(treeR, x, y);
      const gVal = evaluateNode(treeG, x, y);
      const bVal = evaluateNode(treeB, x, y);
      const r = Math.floor(((rVal + 1) / 2) * 255);
      const g = Math.floor(((gVal + 1) / 2) * 255);
      const b = Math.floor(((bVal + 1) / 2) * 255);
      const index = (py * size + px) * 4;
      imgData.data[index] = r;
      imgData.data[index + 1] = g;
      imgData.data[index + 2] = b;
      imgData.data[index + 3] = 255;
    }
  }

  return imgData;
}
