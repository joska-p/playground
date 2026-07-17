/**
 * Terminal-only rule definitions — one rule per terminal operator.
 */

import { createRule } from './createRule.js';

export const terminalXRule = createRule({
  id: 'terminal-x',
  displayName: 'Terminal: x',
  category: 'terminal',
  operators: ['x'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalYRule = createRule({
  id: 'terminal-y',
  displayName: 'Terminal: y',
  category: 'terminal',
  operators: ['y'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalConstRule = createRule({
  id: 'terminal-const',
  displayName: 'Terminal: const',
  category: 'terminal',
  operators: ['const'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalRandomRule = createRule({
  id: 'terminal-random',
  displayName: 'Terminal: random',
  category: 'terminal',
  operators: ['random'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalRadialRule = createRule({
  id: 'terminal-radial',
  displayName: 'Terminal: radial',
  category: 'terminal',
  operators: ['radial'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalSweepRule = createRule({
  id: 'terminal-sweep',
  displayName: 'Terminal: sweep',
  category: 'terminal',
  operators: ['sweep'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalFbmRule = createRule({
  id: 'terminal-fbm',
  displayName: 'Terminal: fbm',
  category: 'terminal',
  operators: ['fbm'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalRecamanRule = createRule({
  id: 'terminal-recaman',
  displayName: 'Terminal: recaman-pattern',
  category: 'terminal',
  operators: ['recaman-pattern'],
  minDepth: 2,
  maxDepth: 6
});

export const terminalNestedOscillationRule = createRule({
  id: 'terminal-nested-oscillation',
  displayName: 'Terminal: nested-oscillation',
  category: 'terminal',
  operators: ['nested-oscillation'],
  minDepth: 2,
  maxDepth: 6
});
