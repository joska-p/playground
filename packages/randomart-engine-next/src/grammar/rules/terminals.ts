/**
 * Terminal-only rule definitions — one rule per terminal operator.
 */

import { createRule } from './createRule.js';

export const terminalXRule = createRule({
  id: 'terminal-x',
  displayName: 'Terminal: x',
  operators: ['x'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalYRule = createRule({
  id: 'terminal-y',
  displayName: 'Terminal: y',
  operators: ['y'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalConstRule = createRule({
  id: 'terminal-const',
  displayName: 'Terminal: const',
  operators: ['const'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalRandomRule = createRule({
  id: 'terminal-random',
  displayName: 'Terminal: random',
  operators: ['random'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalRadialRule = createRule({
  id: 'terminal-radial',
  displayName: 'Terminal: radial',
  operators: ['radial'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalSweepRule = createRule({
  id: 'terminal-sweep',
  displayName: 'Terminal: sweep',
  operators: ['sweep'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalFbmRule = createRule({
  id: 'terminal-fbm',
  displayName: 'Terminal: fbm',
  operators: ['fbm'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalRecamanRule = createRule({
  id: 'terminal-recaman',
  displayName: 'Terminal: recaman-pattern',
  operators: ['recaman-pattern'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalNestedOscillationRule = createRule({
  id: 'terminal-nested-oscillation',
  displayName: 'Terminal: nested-oscillation',
  operators: ['nested-oscillation'],
  minDepth: 2,
  maxDepth: 6
});
