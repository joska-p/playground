import type { Rule } from './types';

function parseRule(id: string, name: string, notation: string, stateCount = 2): Rule {
  const birth = Array<boolean>(9).fill(false);
  const survive = Array<boolean>(9).fill(false);

  const [bPart = '', sPart = ''] = notation.toUpperCase().split('/');

  for (const ch of bPart.replace('B', '')) {
    birth[Number(ch)] = true;
  }
  for (const ch of sPart.replace('S', '')) {
    survive[Number(ch)] = true;
  }

  return { id, name, stateCount, birth, survive };
}

export { parseRule };
